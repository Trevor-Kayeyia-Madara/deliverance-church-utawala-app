"use client";

import Link from "next/link";
import { useSite } from "@/lib/siteContext";

export default function Footer() {
  const site = useSite();
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 font-black tracking-tight">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-black">
                DC
              </span>
              <span>
                {site.name.split(" Utawala")[0]}{" "}
                <span className="text-accent">Utawala</span>
              </span>
            </div>
            <p className="mt-4 text-white/70 max-w-md">
              A Christ-centered community committed to worship, the Word,
              discipleship, and service.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-black tracking-[0.25em] uppercase text-accent/80">
                Explore
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <Link className="text-white/75 hover:text-white" href="/">
                  Home
                </Link>
                <Link className="text-white/75 hover:text-white" href="/sermons">
                  Sermons
                </Link>
                <Link
                  className="text-white/75 hover:text-white"
                  href="/ministries"
                >
                  Ministries
                </Link>
                <Link className="text-white/75 hover:text-white" href="/school">
                  School
                </Link>
                <Link className="text-white/75 hover:text-white" href="/contact">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-black tracking-[0.25em] uppercase text-accent/80">
                Connect
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  className="text-white/75 hover:text-white"
                  href={site.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
                <a
                  className="text-white/75 hover:text-white"
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <a
                  className="text-white/75 hover:text-white"
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs font-black tracking-[0.25em] uppercase text-accent/80">
                Give
              </p>
              <p className="mt-3 text-white/70 text-sm">
                Partner with us to reach more lives.
              </p>
              <Link
                href="/contact#give"
                className="mt-3 inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-4 py-2.5 hover:bg-accent transition-colors"
              >
                Give Now
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Deliverance Church Utawala. All rights
            reserved.
          </p>
          <p className="text-white/40">Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
