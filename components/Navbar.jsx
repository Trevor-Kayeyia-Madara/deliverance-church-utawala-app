"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useSite } from "@/lib/siteContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/sermons", label: "Sermons" },
  { href: "/ministries", label: "Ministries" },
  { href: "/school", label: "School" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const site = useSite();
  const siteName = site?.name || "Deliverance Church Utawala";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-black tracking-tight"
            onClick={() => setOpen(false)}
          >
            <span className="relative size-9 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Image
                src="/logo.png"
                alt={`${siteName} logo`}
                fill
                sizes="36px"
                className="object-contain p-1"
                priority
              />
            </span>
            <span className="hidden sm:block">
              {siteName.split(" Utawala")[0]}{" "}
              <span className="text-accent">Utawala</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "px-4 py-2 rounded-xl font-bold transition-colors",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact#give"
              className="ml-2 inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-5 py-2.5 hover:bg-accent transition-colors"
            >
              Give
            </Link>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden border-t border-white/10 bg-background/95">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "px-4 py-3 rounded-xl font-bold transition-colors",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact#give"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-5 py-3 hover:bg-accent transition-colors"
            >
              Give
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
