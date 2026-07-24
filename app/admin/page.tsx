import Link from "next/link";
import { notFound } from "next/navigation";
import {
  UserCog,
  Users,
  Inbox,
  LayoutDashboard,
  ShieldCheck,
  ShieldAlert,
  Monitor,
  Mail,
  KeyRound,
  AlertTriangle,
} from "lucide-react";
import { ADMIN_EMAIL } from "@/lib/admin";
import { query } from "@/lib/db";
import { currentUser } from "@/lib/session";

/* The admin's own account — the one row deliberately missing from
   /admin/overview, which is the customer list.

   It's here rather than there because the two need opposite things. A customer
   row exists to be acted on (its delete button is the point); this one exists
   to be checked. The facts that matter about it are not "did they pay" but
   "how does this account get in, and can it be taken": which sign-in methods
   are attached, how many sessions are open, and whether the address is verified
   — the flag that IS the admin gate (lib/session.ts).

   Read-only. There is no delete button here on purpose: this account is the
   only administrator, and losing it means re-registering the address and
   re-verifying it through Google before the queue is reachable again. */

export const dynamic = "force-dynamic";

type AdminRow = {
  name: string | null;
  email: string;
  verified: boolean;
  created_at: Date;
  providers: string;
  sessions: number;
  /** Computed in SQL, not from Date.now(): a render has to be pure, and the
      database already knows what "now" is. */
  age_days: number;
  /** Every account registered on the admin address, this one included. More
      than one means somebody else has claimed it — see below. */
  duplicates: number;
};

const ADMIN_SQL = `
  select
    u.name,
    u.email,
    u."emailVerified"                                  as verified,
    u."createdAt"                                      as created_at,
    coalesce(string_agg(distinct a."providerId", ', '), '') as providers,
    count(distinct s.id) filter (where s."expiresAt" > now())::int as sessions,
    extract(day from now() - u."createdAt")::int                   as age_days,
    (select count(*)::int from "user" x where lower(x.email) = lower(u.email)) as duplicates
  from "user" u
  left join "account" a on a."userId" = u.id
  left join "session" s on s."userId" = u.id
  where u.id = $1
  group by u.id
`;

export default async function AdminAccount() {
  const me = await currentUser();
  // The layout has already established this is the admin; if the row is gone
  // between the two reads, there is nothing to show.
  if (!me) notFound();

  const [row] = await query<AdminRow>(ADMIN_SQL, [me.id]);
  if (!row) notFound();

  const facts = [
    {
      icon: Mail,
      label: "Email",
      value: row.email,
      note:
        row.email.toLowerCase() === ADMIN_EMAIL
          ? "The address hard-coded in lib/admin.ts"
          : "Not the address in lib/admin.ts",
    },
    {
      icon: KeyRound,
      label: "Sign in with",
      value: row.providers || "no method attached",
      note:
        row.providers === "google"
          ? "Google only — the password path was never used"
          : "More than one way in",
    },
    {
      icon: Monitor,
      label: "Open sessions",
      value: row.sessions === 0 ? "none" : String(row.sessions),
      note: "Devices currently signed in as you",
    },
    {
      icon: UserCog,
      label: "Account created",
      value: row.created_at.toLocaleDateString(),
      note: `${row.created_at.toLocaleTimeString()} · ${row.age_days} days ago`,
    },
  ];

  return (
    <section className="min-h-screen bg-white px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
            <UserCog className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {row.name?.trim() || "Admin"}
            </h1>
            <p className="text-sm text-slate-500">Your account — the one that runs the platform</p>
          </div>
        </div>

        {/* Verification is not a badge here, it's the lock itself: isAdmin()
            requires emailVerified, so an unverified admin account can't open
            /admin at all. Seeing it green is seeing the gate work. */}
        <div
          className={`mt-8 flex flex-col gap-2 rounded-2xl border p-5 ${
            row.verified
              ? "border-emerald-300 bg-emerald-50/60"
              : "border-amber-300 bg-amber-50/60"
          }`}
        >
          <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
            {row.verified ? (
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            ) : (
              <ShieldAlert className="h-4 w-4 text-amber-600" />
            )}
            {row.verified ? "Verified — the admin gate is open" : "Unverified"}
          </p>
          <p className="text-xs leading-relaxed text-slate-600">
            {row.verified
              ? "Google checked this address, so isAdmin() lets you through. Signup sends no confirmation email, which is exactly why a verified address is what separates you from anyone who merely typed it into a form."
              : "Nothing here should be reachable. isAdmin() requires a verified address, so if you can read this page the gate has been changed — check lib/session.ts."}
          </p>
        </div>

        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <fact.icon className="h-3.5 w-3.5 text-blue-500" />
                {fact.label}
              </dt>
              <dd className="mt-1 truncate text-sm font-bold text-slate-900" title={fact.value}>
                {fact.value}
              </dd>
              <dd className="mt-0.5 text-xs text-slate-500">{fact.note}</dd>
            </div>
          ))}
        </dl>

        {/* Anyone can register this address with a password, because signup
            sends no confirmation email — that impostor account can't pass
            isAdmin() (it never verifies), but it does block Google linking and
            it is worth knowing about. It won't show on /admin/overview either,
            which filters the whole address out. */}
        {row.duplicates > 1 && (
          <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-amber-300 bg-amber-50/60 p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              {row.duplicates} accounts exist on this address
            </p>
            <p className="text-xs leading-relaxed text-slate-600">
              Someone registered {row.email} with a password. That account can never pass the admin
              gate — it stays unverified — but remove it anyway:{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono text-[11px] text-slate-700">
                npm run user:delete -- {row.email}
              </code>{" "}
              deletes by address, so check with{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono text-[11px] text-slate-700">
                npm run users
              </code>{" "}
              first.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/admin/overview"
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Users className="h-3.5 w-3.5" />
            Customer accounts
          </Link>
          <Link
            href="/admin/briefs"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:text-blue-700"
          >
            <Inbox className="h-3.5 w-3.5 text-blue-500" />
            Brief queue
          </Link>
          {/* Your own dashboard — the customer view, which no longer redirects
              back here (app/dashboard/layout.tsx). */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:text-blue-700"
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-blue-500" />
            Customer view
          </Link>
        </div>
      </div>
    </section>
  );
}
