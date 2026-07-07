import type { LucideIcon } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Shared v3 design primitives.
   Pure presentational components (no hooks) so they work in both
   server and client components. Brand: #4588ba → #316994.
   ──────────────────────────────────────────────────────────── */

export const BRAND_GRADIENT = "bg-linear-to-br from-[#4588ba] to-[#316994]";
export const BRAND_TEXT = "bg-linear-to-r from-[#4588ba] to-[#316994] bg-clip-text text-transparent";

/** Subtle dotted-grid background, layered behind a section. */
export function GridBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(69,136,186,0.10) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
      }}
    />
  );
}

/** Small pill "eyebrow" label above a section heading. */
export function Eyebrow({
  icon: Icon,
  children,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </span>
  );
}

/** Standard section heading block. */
export function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  subtitle,
  center = false,
  className = "",
}: {
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed text-slate-600 ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
