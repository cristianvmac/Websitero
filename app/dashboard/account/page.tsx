import type { Metadata } from "next";
import { LogOut, Mail, ShieldCheck, UserRound } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { getDashboardData } from "@/src/data/dashboard";
import LogOutButton from "@/components/auth/LogOutButton";
import { accountHasPassword, signInMethods } from "./account-info";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

export const metadata: Metadata = {
  title: "My Account | Websitero",
  description: "Your name, your email and how you sign in.",
};

/* The profile lives INSIDE the dashboard rather than at its own top-level
   route. Two reasons: the sidebar has always reserved this exact entry ("My
   Account" under My account), and everything someone does here — change a
   name, set a password, sign out — is account plumbing they reach while
   already in the app. A separate /profile would need its own header, its own
   session guard, and its own way back.

   The session guard is inherited: getDashboardData() redirects to /login when
   there's no session, so this page cannot render for a stranger. */

export default async function AccountPage() {
  const { user } = await getDashboardData();
  const methods = await signInMethods();
  const hasPassword = await accountHasPassword(methods);
  const hasGoogle = methods.includes("google");

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          My account
        </h1>
        <p className="mt-2 text-slate-500">Your details and how you sign in.</p>
      </header>

      {/* Who you are, at a glance — the same avatar and name the sidebar shows,
          so there's never a doubt about which account you're looking at. */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl font-bold uppercase text-white shadow-md shadow-blue-500/25">
            {user.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-slate-900">{user.name}</p>
            <p className="truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
            <UserRound className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-slate-900">Your details</h2>
            <p className="text-sm text-slate-500">
              Change how your name appears across your dashboard.
            </p>
            <ProfileForm name={user.name} email={user.email} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-slate-900">Signing in</h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {hasGoogle && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                  <FcGoogle className="h-4 w-4" />
                  Google
                </span>
              )}
              {hasPassword && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700">
                  <Mail className="h-4 w-4 text-slate-400" />
                  Email and password
                </span>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {hasPassword
                ? "Choose a new password below. Setting one signs out any other device."
                : "You sign in with Google. Add a password so you can also get in with your email."}
            </p>
            <PasswordForm hasPassword={hasPassword} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Sign out</h2>
            <p className="text-sm text-slate-500">
              Ends this session on this device. Your site and everything in it stays put.
            </p>
          </div>
          <LogOutButton className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50">
            <LogOut className="h-4 w-4" />
            Log out
          </LogOutButton>
        </div>
      </section>
    </div>
  );
}
