import { redirect } from "next/navigation";
import Link from "next/link";
import { AUTH_CONFIGURED, auth } from "@/auth";
import SectionWrapper from "@/components/SectionWrapper";
import AdminYouTubeSync from "@/components/AdminYouTubeSync";

export const metadata = {
  title: "Admin YouTube Sync",
};

export const dynamic = "force-dynamic";

export default async function AdminYouTubePage() {
  if (!AUTH_CONFIGURED) {
    return (
      <SectionWrapper className="py-14 sm:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-10">
          <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
            Admin
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black leading-tight">
            Google OAuth not configured
          </h1>
          <p className="mt-4 text-white/80 max-w-3xl">
            Set <span className="font-extrabold">GOOGLE_CLIENT_ID</span> and{" "}
            <span className="font-extrabold">GOOGLE_CLIENT_SECRET</span> in
            your <span className="font-extrabold">.env</span>, then restart{" "}
            <span className="font-extrabold">npm run dev</span>.
          </p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-background/40 p-5 text-sm text-white/80">
            <p className="font-extrabold">Google Console</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-white/70">
              <li>
                Add Authorized redirect URI:{" "}
                <span className="font-mono">
                  http://localhost:3000/api/auth/callback/google
                </span>
              </li>
              <li>
                If your OAuth consent screen is in{" "}
                <span className="font-extrabold">Testing</span>, add your email
                under <span className="font-extrabold">Test users</span>.
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-7 py-3.5 hover:bg-accent transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin/youtube");
  }

  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background" />
        <SectionWrapper className="relative py-10 sm:py-14">
          <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
            Admin
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black leading-tight">
            YouTube Sermons Import
          </h1>
          <p className="mt-4 text-white/80 max-w-3xl">
            Signed in as{" "}
            <span className="font-extrabold">{session.user.email}</span>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-bold hover:bg-white/10 transition-colors"
              href="/sermons"
            >
              View Sermons
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-bold hover:bg-white/10 transition-colors"
              href="/api/auth/signout?callbackUrl=/"
            >
              Sign Out
            </Link>
          </div>
        </SectionWrapper>
      </div>

      <SectionWrapper className="py-10 sm:py-12">
        <AdminYouTubeSync />
      </SectionWrapper>
    </div>
  );
}
