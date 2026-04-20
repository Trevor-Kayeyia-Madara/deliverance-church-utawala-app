"use client";

import { useSite } from "@/lib/siteContext";

export default function OnlinePresenceSection() {
  const site = useSite();

  return (
    <div className="rounded-3xl bg-secondary/20 border border-secondary/30 p-7 sm:p-10 h-full">
      <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
        Online Presence
      </p>
      <h2 className="mt-3 text-3xl sm:text-4xl font-black leading-tight">
        Stay connected throughout the week.
      </h2>
      <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
        Sermons, announcements, and live streams â€” all in one place. Subscribe
        and never miss what God is doing in our community.
      </p>
      <div className="mt-7 flex flex-col sm:flex-row gap-3">
        <a
          className="inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-6 py-3 hover:bg-accent transition-colors"
          href={site.social.youtube}
          target="_blank"
          rel="noreferrer"
        >
          Visit YouTube
        </a>
        <a
          className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-bold hover:bg-white/10 transition-colors"
          href={site.social.facebook}
          target="_blank"
          rel="noreferrer"
        >
          Follow on Facebook
        </a>
      </div>
    </div>
  );
}

