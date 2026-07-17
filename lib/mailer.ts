/* The one door all outgoing email goes through — today that's Better Auth's
   verification and password-reset links, later the team notifications too.

   Three modes, picked by environment:
   - RESEND_API_KEY set        → send via Resend's REST API. Plain fetch on
                                 purpose: one endpoint doesn't earn an SDK.
   - dev without a key         → print to the terminal and append to
                                 .dev-outbox.jsonl (gitignored), so a person can
                                 click the link out of the console and a test can
                                 read it back out of the file.
   - production without a key  → fail loudly. Auth emails are load-bearing;
                                 swallowing them is how you get accounts nobody
                                 can ever verify or recover.

   No `server-only` guard here — the Better Auth CLI loads lib/auth.ts (which
   imports this) outside Next's bundler when generating/applying schema, and
   `server-only` throws anywhere outside a React server context. Nothing
   client-side imports this; the actions and session helpers above it carry the
   guard instead. */

type Mail = { to: string; subject: string; text: string };

export async function sendMail(mail: Mail): Promise<void> {
  const key = process.env.RESEND_API_KEY;

  if (key) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Resend's shared onboarding address works before a domain is verified,
        // but only delivers to the account owner's own inbox — set MAIL_FROM to
        // a verified domain before real customers sign up.
        from: process.env.MAIL_FROM ?? "Websitero <onboarding@resend.dev>",
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend refused the email (${res.status}): ${await res.text()}`);
    }
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "RESEND_API_KEY is not set — refusing to silently drop an auth email in production.",
    );
  }

  console.log(`\n━━━ [dev mail → ${mail.to}] ${mail.subject}\n${mail.text}\n━━━\n`);
  const { appendFile } = await import("node:fs/promises");
  await appendFile(
    ".dev-outbox.jsonl",
    JSON.stringify({ at: new Date().toISOString(), ...mail }) + "\n",
  );
}
