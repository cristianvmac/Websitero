import { Check, Code2, Eye, FileText, Rocket, type LucideIcon } from "lucide-react";
import type { SiteStage } from "@/lib/site-stage";
import type { MaterialsSummary } from "@/src/data/dashboard";

/* The pre-launch centerpiece: where the hand-coded build is, told as four
   milestones. The six lifecycle stages fold into them — 'changes_requested'
   reads as being back in the workshop rather than a step backwards, and
   'approved' as the launch being prepared:

     received / in_build / changes_requested → milestone 2 active
     preview_ready                           → milestone 3 active
     approved                                → milestone 4 active
     live                                    → everything done

   The materials footer grounds "hand-coding your site" in what the owner
   actually sent; adding to it goes through email on purpose — there's no
   upload UI here yet, and the personal channel is the pitch. */

type MilestoneState = "done" | "active" | "upcoming";

type Milestone = {
  icon: LucideIcon;
  label: string;
  sub: string;
  state: MilestoneState;
};

/** Index of the active milestone; 4 means the journey is complete. */
const ACTIVE_MILESTONE: Record<SiteStage, number> = {
  received: 1,
  in_build: 1,
  changes_requested: 1,
  preview_ready: 2,
  approved: 3,
  live: 4,
};

function milestones(stage: SiteStage, receivedAt: string): Milestone[] {
  const active = ACTIVE_MILESTONE[stage];
  const state = (i: number): MilestoneState =>
    i < active ? "done" : i === active ? "active" : "upcoming";

  const received = new Date(receivedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const buildingSub =
    stage === "received"
      ? "In the queue — we'll start shortly."
      : stage === "changes_requested"
        ? "We're making the changes you asked for."
        : "A developer is hand-coding your pages right now.";

  return [
    {
      icon: FileText,
      label: "Brief received",
      sub: `Received ${received}`,
      state: "done",
    },
    {
      icon: Code2,
      label: "Hand-coding your site",
      sub: state(1) === "done" ? "Built by hand from your materials." : buildingSub,
      state: state(1),
    },
    {
      icon: Eye,
      label: "Your review",
      sub:
        state(2) === "done"
          ? "Preview approved."
          : state(2) === "active"
            ? "Your preview is ready — take a look below."
            : "You'll get a preview link right here to approve.",
      state: state(2),
    },
    {
      icon: Rocket,
      label: "Launch",
      sub:
        state(3) === "done"
          ? "Your site is live."
          : state(3) === "active"
            ? "Preparing your launch — your live link arrives by email."
            : "Your site goes live on its own address.",
      state: state(3),
    },
  ];
}

function Dot({ icon: Icon, state }: { icon: LucideIcon; state: MilestoneState }) {
  if (state === "done") {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
        <Check className="h-4.5 w-4.5" />
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-500/10 text-blue-700">
        <Icon className="h-4.5 w-4.5" />
      </span>
    );
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-300">
      <Icon className="h-4.5 w-4.5" />
    </span>
  );
}

type BuildTrackerProps = {
  stage: SiteStage;
  receivedAt: string;
  materials: MaterialsSummary | null;
};

export default function BuildTracker({ stage, receivedAt, materials }: BuildTrackerProps) {
  const steps = milestones(stage, receivedAt);

  const chips: string[] = materials
    ? [
        ...(materials.doc ? ["Your document"] : []),
        ...(materials.text ? ["Your description"] : []),
        materials.photos > 0
          ? `${materials.photos} photo${materials.photos === 1 ? "" : "s"}`
          : "Professional stock photos",
        ...(materials.phone ? ["Phone number"] : []),
      ]
    : [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Where your site is</h2>
      <p className="text-sm text-slate-500">
        Hand-coded step by step — this page updates as we go.
      </p>

      <ol className="mt-6">
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <Dot icon={step.icon} state={step.state} />
              {i < steps.length - 1 && (
                <span
                  className={`w-0.5 flex-1 rounded-full ${
                    step.state === "done" ? "bg-blue-500/40" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
            <div className={i < steps.length - 1 ? "pb-7" : ""}>
              <p
                className={`pt-1.5 text-sm font-semibold ${
                  step.state === "upcoming" ? "text-slate-400" : "text-slate-900"
                }`}
              >
                {step.label}
              </p>
              <p
                className={`mt-0.5 text-sm ${
                  step.state === "active" ? "font-medium text-blue-700" : "text-slate-500"
                }`}
              >
                {step.sub}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {chips.length > 0 && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            What we&apos;re building from
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Want to add or swap anything? Just reply to any of our emails.
          </p>
        </div>
      )}
    </section>
  );
}
