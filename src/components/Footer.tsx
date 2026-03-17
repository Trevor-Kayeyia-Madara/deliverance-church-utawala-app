import { Mail, MapPin, Phone } from 'lucide-react';
import { SERVICE_TIMES } from '../content/serviceTimes';
import type { Page } from '../types/page';

export default function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-background-dark text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Deliverance Church Logo"
                className="size-10 object-contain"
              />
              <div>
                <p className="text-lg font-extrabold tracking-tight uppercase">
                  Deliverance Church
                </p>
                <p className="text-sm font-extrabold tracking-wide text-primary">
                  Utawala
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Apostolic Church Of Choice transforming &amp; empowering mankind in
              Africa and beyond.
            </p>
          </div>

          <div>
            <h5 className="font-black mb-6 text-primary">Quick Links</h5>
            <ul className="flex flex-col gap-3 text-slate-300 text-sm font-medium">
              <li>
                <button onClick={() => setPage('home')} className="hover:text-white">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setPage('about')} className="hover:text-white">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setPage('sermons')} className="hover:text-white">
                  Sermons
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('dominion-center')}
                  className="hover:text-white"
                >
                  Dominion Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPage('service-times')}
                  className="hover:text-white"
                >
                  Service Times
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-black mb-6 text-primary">Service Times</h5>
            <ul className="space-y-4">
              {SERVICE_TIMES.map((s) => (
                <li key={`${s.day}-${s.name}`}>
                  <p className="text-sm font-extrabold text-white">{s.name}</p>
                  <p className="text-sm text-slate-300">{s.time}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black mb-6 text-primary">Contact Info</h5>

            <div className="space-y-6 text-slate-300 text-sm">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-extrabold">Address</p>
                  <p>300m from ACK St. Monica,</p>
                  <p>Utawala, Nairobi</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-extrabold">Phone</p>
                  <p>+254 755 637 745</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-extrabold">Email</p>
                  <p>info@dcutawala.org</p>
                  <p>utawaladc@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} Deliverance Church Utawala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
