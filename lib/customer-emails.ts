import "server-only";

/* Customer-facing notification emails — the push half of a dashboard that is
   otherwise pull-only. Without these, an owner has no reason to return: nothing
   tells them the brief landed, the preview is ready, or the site is live.

   Plain text on purpose: lib/mailer.ts sends text only, and these read fine as
   text. Copy is for non-technical owners — no jargon, one clear next step.

   Each builder returns { subject, text }; the caller adds `to` (always the
   brief's contact email) and hands it to sendMail. They're best-effort at
   every call site: a failed notification must never roll back the thing it
   was announcing (the saved brief, the status the admin just set). */

function appUrl(): string {
  // Same resolution as lib/auth.ts — the app's own origin, localhost in dev.
  return (process.env.BETTER_AUTH_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

/** Greeting that works with or without a business name on the brief. */
function hello(businessName?: string): string {
  const name = businessName?.trim();
  return name ? `Hi ${name},` : "Hi there,";
}

type Email = { subject: string; text: string };

/** Sent the moment a brief is submitted (/api/forme). Its real job is to point
    the owner at signing up, so the dashboard they were just told about isn't
    invisible to them. */
export function briefReceivedEmail(businessName?: string): Email {
  return {
    subject: "We've got your details — your site is being built",
    text: [
      hello(businessName),
      "",
      "Thanks for sending your info over. A developer is already reading through it and hand-coding your website — you'll have a preview to look at within hours.",
      "",
      "Want to follow along? Create your free account and you can watch your build, see your preview, and approve it right from your dashboard:",
      `${appUrl()}/signup`,
      "",
      "We'll email you the moment your preview is ready.",
      "",
      "— The Websitero team",
    ].join("\n"),
  };
}

/** Sent when the admin moves a brief to preview_ready (with a preview URL). */
export function previewReadyEmail(businessName?: string): Email {
  return {
    subject: "Your website preview is ready to see",
    text: [
      hello(businessName),
      "",
      "Your preview is ready. Take a look, and when it's right, approve it in one click — or tell us what to change and we'll get back to it.",
      "",
      "Everything's on your dashboard:",
      `${appUrl()}/dashboard`,
      "",
      "If you haven't created your account yet, use the same email you gave us and your build will be waiting for you.",
      "",
      "— The Websitero team",
    ].join("\n"),
  };
}

/* Sent the moment the owner approves their preview — the revenue email. Under
   pay-at-approval this is what turns an approval into a launch, so the payment
   link is the whole point of it.

   `link` is "" when the brief has no tier or the Stripe link isn't configured;
   the email still goes (they approved, they deserve a reply) but promises an
   invoice by hand instead of showing a dead link. */
export function approvedActivateEmail(
  businessName: string | undefined,
  tierName: string,
  price: string,
  link: string,
): Email {
  return {
    subject: link ? "One step left — activate your website" : "Your preview is approved",
    text: [
      hello(businessName),
      "",
      "Great — your website is approved and ready to go live.",
      "",
      ...(link
        ? [
            `Your ${tierName} package is ${price}, a one-off payment. Once it's through we'll put your site on its own address and send you the link:`,
            link,
            "",
            "That's the last step — nothing recurring, no surprises.",
          ]
        : [
            "We'll send your invoice separately, and your site goes live as soon as it's settled.",
          ]),
      "",
      "Any questions, just reply to this email.",
      "",
      "— The Websitero team",
    ].join("\n"),
  };
}

/** Sent when the admin moves a brief to live (with a live URL). */
export function siteLiveEmail(businessName: string | undefined, liveUrl: string): Email {
  return {
    subject: "Your website is live 🎉",
    text: [
      hello(businessName),
      "",
      "It's official — your website is live:",
      liveUrl,
      "",
      "You can manage everything from your dashboard:",
      `${appUrl()}/dashboard`,
      "",
      "Need a change? Just reply to this email — edits are on us.",
      "",
      "— The Websitero team",
    ].join("\n"),
  };
}
