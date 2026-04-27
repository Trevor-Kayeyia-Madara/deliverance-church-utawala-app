import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-3 font-black tracking-tight"
            >
              <span className="relative size-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <Image
                  src="/logo.png"
                  alt="Deliverance Church Utawala logo"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </span>
              <span className="leading-tight">
                <span className="block">Deliverance Church</span>
                <span className="block text-accent">Utawala</span>
              </span>
            </Link>
            <p className="mt-4 text-white/70 max-w-md leading-relaxed">
              The Apostolic Church Of Choice transforming &amp; empowering
              mankind in Africa and beyond.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-black tracking-[0.25em] uppercase text-accent/80">
              Quick Links
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link className="text-white/75 hover:text-white" href="/">
                Home
              </Link>
              <Link className="text-white/75 hover:text-white" href="/about">
                About Us
              </Link>
              <Link className="text-white/75 hover:text-white" href="/sermons">
                Sermons
              </Link>
              <Link
                className="text-white/75 hover:text-white"
                href="/about/leadership"
              >
                Leadership
              </Link>
              <Link
                className="text-white/75 hover:text-white"
                href="/ministries"
              >
                Departments
              </Link>
              <Link className="text-white/75 hover:text-white" href="/school">
                Dominion Center
              </Link>
              <Link className="text-white/75 hover:text-white" href="/contact#give">
                Giving
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-black tracking-[0.25em] uppercase text-accent/80">
              Service Times
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="font-extrabold text-white/85">
                  Sunday First Service
                </p>
                <p className="text-white/70 font-bold">6:30 AM &amp; 9:00 AM</p>
              </div>
              <div>
                <p className="font-extrabold text-white/85">
                  Sunday Second Service
                </p>
                <p className="text-white/70 font-bold">9:30 AM &amp; 12:00 PM</p>
              </div>
              <div>
                <p className="font-extrabold text-white/85">Tuesday Fellowship</p>
                <p className="text-white/70 font-bold">6:30 PM</p>
              </div>
              <div>
                <p className="font-extrabold text-white/85">
                  Wednesday Anchored Service
                </p>
                <p className="text-white/70 font-bold">6:30 PM - 8:00 PM</p>
              </div>
              <div>
                <p className="font-extrabold text-white/85">Friday Ignite Service</p>
                <p className="text-white/70 font-bold">6:30 PM - 8:00 PM</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-black tracking-[0.25em] uppercase text-accent/80">
              Contact Info
            </p>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-extrabold text-white/85">Address</p>
                  <p className="text-white/70 font-bold">
                    300m from ACK St. Monica,
                    <br />
                    Utawala, Nairobi
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-extrabold text-white/85">Phone</p>
                  <a
                    className="text-white/70 font-bold hover:text-white"
                    href="tel:+254755637745"
                  >
                    +254 755 637 745
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 size-4 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-extrabold text-white/85">Email</p>
                  <div className="flex flex-col gap-1">
                    <a
                      className="text-white/70 font-bold hover:text-white"
                      href="mailto:info@dcutawala.org"
                    >
                      info@dcutawala.org
                    </a>
                    <a
                      className="text-white/70 font-bold hover:text-white"
                      href="mailto:utawaladc@gmail.com"
                    >
                      dcutawala@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Deliverance Church Utawala. All rights reserved.</p>
          <p className="text-white/40">Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
