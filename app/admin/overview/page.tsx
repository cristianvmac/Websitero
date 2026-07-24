import Link from "next/link";
import {
  Users,
  Inbox,
  ExternalLink,
  GitBranch,
  Globe,
  Wrench,
  ShieldCheck,
  ShieldAlert,
  CreditCard,
  CircleDashed,
  UserX,
  UserCog,
} from "lucide-react";
import type { Brief } from "@/app/forme/brief";
import { ADMIN_EMAIL } from "@/lib/admin";
import { query } from "@/lib/db";
import { FRAMEWORKS, isDiyFramework, repoSlug, type DiyFramework } from "@/lib/diy";
import { CURRENCY, isTier, TIERS, type Tier } from "@/lib/pricing";
import { asSiteStage, STAGE_LABELS, type SiteStage } from "@/lib/site-stage";
import { describeError, supabaseAdmin } from "@/lib/supabase";
import DeleteAccount from "./DeleteAccount";

/* Who has an account, and what is attached to it — one row per person, in the
   order they signed up.

   /admin/briefs answers "what do I have to build next?". This answers the
   questions that sit above that: who are these people, did their brief ever
   reach their account, are they DIY or done-for-you, and does anyone owe us
   money. It's the same information `npm run users` prints, joined to the sites
   and money and readable from a browser instead of a terminal.

   Almost read-only: deleting an account is the one thing this page can do, and
   it's here because this is the only page that lists accounts at all. Anything
   about a SITE — moving it through its lifecycle, setting a tier or a URL,
   deleting a brief — stays in /admin/briefs, where those controls already live
   and where the customer-facing emails are wired up.

   Admin-only: app/admin/layout.tsx gates everything under /admin on the one
   admin account in lib/admin.ts. */

export const dynamic = "force-dynamic"; // an accounts list is stale the moment it's cached

/* Accounts come over SQL, not PostgREST. Better Auth's tables are walled off
   from the Data API on purpose (supabase/migrations/0002_better_auth.sql), so
   this reads them the way Better Auth and scripts/list-users.mjs do — see
   lib/db.ts. Briefs and DIY profiles stay on the Supabase client with the rest
   of the app.

   Sessions are counted rather than listed: "2 devices signed in" is the useful
   fact, and the tokens themselves have no business being rendered anywhere.

   The admin's own account is excluded in the query, not hidden in the render:
   this is the customer list, and the one row that isn't a customer only ever
   sat there as a row you must not act on. It has its own page — /admin. The
   filter is by address rather than by session id so it holds no matter who is
   looking, and it deliberately catches any impostor row on that address too
   (signup sends no confirmation email, so anyone can register it); such a row
   is deletable via the API, which matches on id. */
const ACCOUNTS_SQL = `
  select
    u.id,
    u.name,
    u.email,
    u."emailVerified"                                  as verified,
    u."createdAt"                                      as created_at,
    coalesce(string_agg(distinct a."providerId", ', '), '') as providers,
    count(distinct s.id) filter (where s."expiresAt" > now())::int as sessions
  from "user" u
  left join "account" a on a."userId" = u.id
  left join "session" s on s."userId" = u.id
  where lower(u.email) <> $1
  group by u.id
  order by u."createdAt" desc
`;

type AccountRow = {
  id: string;
  name: string | null;
  email: string;
  verified: boolean;
  created_at: Date;
  providers: string;
  sessions: number;
};

type BriefRow = {
  id: string;
  userId: string | null;
  receivedAt: string;
  brief: Brief;
  stage: SiteStage;
  tier: Tier | null;
  previewUrl: string;
  liveUrl: string;
};

type DiyRow = {
  userId: string;
  framework: DiyFramework;
  startedAt: string;
  siteUrl: string;
  repoUrl: string;
};

async function loadData() {
  const supabase = supabaseAdmin();

  const [accounts, briefsRes, diyRes] = await Promise.all([
    query<AccountRow>(ACCOUNTS_SQL, [ADMIN_EMAIL]),
    supabase
      .from("briefs")
      .select("id, user_id, received_at, brief, status, tier, preview_url, live_url")
      .order("received_at", { ascending: false }),
    supabase.from("diy_profiles").select("user_id, framework, started_at, site_url, repo_url"),
  ]);

  /* Thrown, not swallowed, for the same reason as the brief queue: an
     unreadable table must not render as an empty overview. "No accounts yet"
     and "the database said no" have to look different. */
  if (briefsRes.error) throw new Error(`Could not load briefs: ${describeError(briefsRes.error)}`);
  if (diyRes.error) throw new Error(`Could not load DIY profiles: ${describeError(diyRes.error)}`);

  const briefs: BriefRow[] = (briefsRes.data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id ?? null,
    receivedAt: row.received_at,
    brief: row.brief as Brief,
    stage: asSiteStage(row.status),
    tier: isTier(row.tier) ? row.tier : null,
    previewUrl: row.preview_url ?? "",
    liveUrl: row.live_url ?? "",
  }));

  const diy: DiyRow[] = (diyRes.data ?? [])
    .filter((row) => isDiyFramework(row.framework))
    .map((row) => ({
      userId: row.user_id,
      framework: row.framework as DiyFramework,
      startedAt: row.started_at,
      siteUrl: row.site_url ?? "",
      repoUrl: row.repo_url ?? "",
    }));

  const briefsByUser = new Map<string, BriefRow[]>();
  for (const b of briefs) {
    if (b.userId) briefsByUser.set(b.userId, [...(briefsByUser.get(b.userId) ?? []), b]);
  }
  const diyByUser = new Map(diy.map((d) => [d.userId, d]));

  return {
    accounts,
    briefs,
    // Briefs nobody has claimed: submitted before the claim cookie existed, or
    // from a different device than the one that signed up. They still get built
    // — this is just where you notice they have no account behind them.
    unclaimed: briefs.filter((b) => !b.userId),
    briefsByUser,
    diyByUser,
  };
}

/* Whether this site has been paid for — inferred, because nothing records it.

   Stripe Payment Links send no webhook (see lib/pricing.ts), so there is no
   paid flag and 0007_brief_tier.sql refuses to invent one. What the app does
   have is the rule that a site only reaches 'live' once payment was confirmed
   in the Stripe dashboard by hand. So: 'approved' is the bill going out,
   'live' is it having been settled, and everything before that owes nothing
   yet. Read the money column here as "what the lifecycle implies", and Stripe
   as the truth. */
type Money = { label: string; amount: number; tone: "muted" | "due" | "paid" };

function payment(stage: SiteStage, tier: Tier | null): Money {
  const amount = tier ? TIERS[tier].price : 0;
  const priced = tier ? ` · ${CURRENCY}${amount}` : " · no tier set";

  if (stage === "live") return { label: `Paid${priced}`, amount, tone: "paid" };
  if (stage === "approved") return { label: `Awaiting payment${priced}`, amount, tone: "due" };
  return { label: "Nothing due yet", amount: 0, tone: "muted" };
}

const MONEY_STYLES: Record<Money["tone"], string> = {
  muted: "border-slate-200 bg-slate-50 text-slate-500",
  due: "border-amber-300 bg-amber-50 text-amber-800",
  paid: "border-emerald-300 bg-emerald-50 text-emerald-800",
};

/* Same three kinds of brief the queue tells apart, by the same signals: a DIY
   handoff carries a repo, the /builditforme upload flow has no wizard fields,
   everything else came through the full questionnaire. */
function briefTitle(brief: Brief): string {
  if (brief.repo) return `DIY handoff · ${repoSlug(brief.repo.url)}`;
  const name = brief.business?.name?.trim();
  if (name) return name;
  return "Materials (uploaded brief)";
}

export default async function AdminOverview() {
  const { accounts, briefs, unclaimed, briefsByUser, diyByUser } = await loadData();

  const money = briefs.map((b) => payment(b.stage, b.tier));
  const due = money.filter((m) => m.tone === "due");
  const paid = money.filter((m) => m.tone === "paid");
  const sum = (rows: Money[]) => rows.reduce((total, m) => total + m.amount, 0);

  const stats = [
    // "Customer" because the admin's own account is filtered out of the query.
    {
      label: "Customer accounts",
      value: String(accounts.length),
      hint: `${unclaimed.length} unclaimed briefs`,
    },
    {
      label: "Sites in build",
      value: String(briefs.filter((b) => b.stage !== "live").length),
      hint: `${briefs.filter((b) => b.stage === "live").length} live`,
    },
    {
      label: "Awaiting payment",
      value: `${CURRENCY}${sum(due)}`,
      hint: `${due.length} approved, unpaid`,
    },
    { label: "Collected", value: `${CURRENCY}${sum(paid)}`, hint: `${paid.length} sites live` },
  ];

  return (
    <section className="min-h-screen bg-white px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Overview</h1>
              <p className="text-sm text-slate-500">
                Every account, what&apos;s attached to it, and where the money stands
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:text-blue-700"
            >
              <UserCog className="h-3.5 w-3.5 text-blue-500" />
              My account
            </Link>
            <Link
              href="/admin/briefs"
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:text-blue-700"
            >
              <Inbox className="h-3.5 w-3.5 text-blue-500" />
              Brief queue
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{stat.hint}</p>
            </div>
          ))}
        </div>

        {/* The money numbers above are read off the lifecycle, not off Stripe —
            worth saying once on the page rather than only in the source. */}
        <p className="mt-3 flex items-start gap-1.5 text-xs text-slate-400">
          <CreditCard className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Payment Links send no webhook, so paid/unpaid is inferred from the stage: approved =
          billed, live = confirmed in Stripe by hand. Stripe is the record.
        </p>

        <div className="mt-8 space-y-4">
          {accounts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              No accounts yet.
            </div>
          )}

          {accounts.map((account) => {
            const owned = briefsByUser.get(account.id) ?? [];
            const kit = diyByUser.get(account.id);

            return (
              <div
                key={account.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold uppercase text-white">
                    {(account.name?.trim() || account.email).charAt(0)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-900">
                      {account.name?.trim() || account.email.split("@")[0]}
                      <span className="ml-2 text-xs font-medium text-slate-400">{account.email}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      Joined {account.created_at.toLocaleDateString()} ·{" "}
                      {account.providers || "no sign-in method"} ·{" "}
                      {account.sessions === 0
                        ? "signed out"
                        : `${account.sessions} session${account.sessions === 1 ? "" : "s"}`}
                    </p>
                  </div>

                  {/* Verified is not cosmetic here: it's what decides whether a
                      brief can be claimed by email match (src/data/dashboard.ts)
                      and, for one address, whether the admin gate opens. Only
                      Google sets it — password accounts never verify by design. */}
                  <span
                    className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                      account.verified
                        ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                  >
                    {account.verified ? (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    ) : (
                      <ShieldAlert className="h-3.5 w-3.5" />
                    )}
                    {account.verified ? "Verified" : "Unverified"}
                  </span>

                  {/* The account itself, not the site. Their briefs survive it
                      — the confirm says so, and they reappear under "Unclaimed
                      briefs" below the moment this list refreshes. */}
                  <DeleteAccount
                    userId={account.id}
                    email={account.email}
                    briefCount={owned.length}
                  />
                </div>

                {owned.length === 0 && !kit && (
                  <p className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500 ring-1 ring-slate-100">
                    <CircleDashed className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    Signed up, nothing started — no brief and no framework picked.
                  </p>
                )}

                {/* Their site(s) as done-for-you builds. More than one only
                    happens when a second brief gets claimed onto the account;
                    the dashboard shows them the furthest-along one. */}
                {owned.map((b) => {
                  const state = payment(b.stage, b.tier);
                  return (
                    <div
                      key={b.id}
                      className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="mr-auto truncate text-sm font-semibold text-slate-800">
                          {briefTitle(b.brief)}
                        </span>
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 text-xs font-semibold text-blue-700">
                          {STAGE_LABELS[b.stage]}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${MONEY_STYLES[state.tone]}`}
                        >
                          {state.label}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500">
                        Sent {new Date(b.receivedAt).toLocaleDateString()}
                        {b.tier && ` · ${TIERS[b.tier].label}`}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        {b.liveUrl && (
                          <a
                            href={b.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors hover:text-blue-700"
                          >
                            <Globe className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            Live site
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          </a>
                        )}
                        {b.previewUrl && (
                          <a
                            href={b.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors hover:text-blue-700"
                          >
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                            Preview
                          </a>
                        )}
                        <Link
                          href="/admin/briefs"
                          className="text-xs font-semibold text-blue-700 hover:underline"
                        >
                          Manage in queue
                        </Link>
                      </div>
                    </div>
                  );
                })}

                {/* The DIY side of the same account. Picking a framework is the
                    only signal DIY leaves, so an account can sit here with a kit
                    and nothing else for months — that's a normal DIY customer,
                    not an abandoned signup. */}
                {kit && (
                  <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mr-auto inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                        <Wrench className="h-4 w-4 text-blue-500" />
                        DIY · {FRAMEWORKS[kit.framework].label}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          kit.siteUrl
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 bg-slate-50 text-slate-500"
                        }`}
                      >
                        {kit.siteUrl ? "Site linked" : "No site linked"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      Started {new Date(kit.startedAt).toLocaleDateString()}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      {kit.siteUrl && (
                        <a
                          href={kit.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 truncate text-xs font-semibold text-slate-700 transition-colors hover:text-blue-700"
                        >
                          <Globe className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          {kit.siteUrl.replace(/^https?:\/\//, "")}
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </a>
                      )}
                      {kit.repoUrl && (
                        <a
                          href={kit.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors hover:text-blue-700"
                        >
                          <GitBranch className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                          {repoSlug(kit.repoUrl)}
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Briefs with no account behind them. Not an error state — they're
            built like any other — but each one is somebody who can't watch their
            own tracker, so it's worth seeing. */}
        {unclaimed.length > 0 && (
          <div className="mt-10">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
              <UserX className="h-4 w-4 text-amber-600" />
              Unclaimed briefs ({unclaimed.length})
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              No account has claimed these — submitted from a different device than the one that
              signed up, or never followed by a signup. They still get built.
            </p>
            <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {unclaimed.map((b) => (
                <li key={b.id} className="flex flex-wrap items-center gap-2 px-5 py-3">
                  <span className="mr-auto truncate text-sm font-semibold text-slate-800">
                    {briefTitle(b.brief)}
                    <span className="ml-2 text-xs font-medium text-slate-400">
                      {b.brief.contact?.email || "no email"}
                    </span>
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(b.receivedAt).toLocaleDateString()}
                  </span>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 text-xs font-semibold text-blue-700">
                    {STAGE_LABELS[b.stage]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
