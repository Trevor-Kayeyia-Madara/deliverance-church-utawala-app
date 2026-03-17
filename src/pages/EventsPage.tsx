import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  Share2,
} from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/mockData';
import type { Page } from '../types/page';

export default function EventsPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col gap-6 mb-12">
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-2 text-primary font-bold text-sm hover:underline w-fit"
        >
          <ChevronLeft className="size-4" /> Back to Home
        </button>
        <h1 className="text-4xl font-bold tracking-tight">Events</h1>
        <p className="text-slate-500">Join our community in fellowship and growth.</p>
        <div className="flex border-b border-primary/10 gap-8">
          {['UPCOMING', 'PAST EVENTS', 'MY RSVPs'].map((tab, i) => (
            <button
              key={tab}
              className={`pb-3 font-bold text-sm tracking-wide ${
                i === 0
                  ? 'border-b-[3px] border-primary text-primary'
                  : 'text-slate-500 hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">Featured Event</h2>
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-primary/5 group cursor-pointer hover:shadow-md transition-shadow">
          <div className="lg:w-3/5 relative overflow-hidden aspect-video lg:aspect-auto">
            <img
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200"
              alt="Harvest Festival"
              referrerPolicy="no-referrer"
              loading="lazy"
              width="1200"
              height="675"
            />
            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Highlighted
            </div>
          </div>
          <div className="lg:w-2/5 p-8 flex flex-col justify-center gap-6">
            <div>
              <h3 className="text-3xl font-bold leading-tight">
                Annual Community Harvest Festival
              </h3>
              <div className="mt-4 flex flex-col gap-3 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-primary" />
                  <span className="text-sm font-medium">
                    Saturday, October 26, 2024
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-primary" />
                  <span className="text-sm font-medium">2:00 PM - 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  <span className="text-sm font-medium">
                    Deliverance Church Utawala, Main Campus
                  </span>
                </div>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Join us for our biggest event of the season! We&apos;ll have local food
              trucks, a pumpkin patch, live worship music, and activities for children
              of all ages. Bring your neighbors and friends!
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors">
                RSVP Now
              </button>
              <button className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
                <Share2 className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-8 border border-primary/5 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg">October 2024</h3>
              <div className="flex gap-2">
                <button className="p-1 text-slate-400 hover:text-primary">
                  <ChevronLeft className="size-5" />
                </button>
                <button className="p-1 text-slate-400 hover:text-primary">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-4 text-center text-xs font-bold text-slate-400 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className={`py-2 font-medium rounded-lg cursor-pointer transition-colors ${
                    i + 1 === 7 ? 'bg-primary text-white' : 'hover:bg-primary/5'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="mt-10">
              <h4 className="text-sm font-bold mb-4">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {['Worship', 'Small Groups', 'Youth', 'Community', 'Education'].map(
                  (c) => (
                    <span
                      key={c}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                    >
                      {c}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Browse All Events</h2>
            <button className="flex items-center gap-2 text-primary text-sm font-bold">
              <Menu className="size-4" /> Filter
            </button>
          </div>
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-primary/5 shadow-sm hover:border-primary/20 transition-all group"
            >
              <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={event.image}
                  alt={event.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="400"
                  height="400"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase">
                      {event.category}
                    </span>
                    <span className="text-xs font-medium text-slate-400">Oct 13</span>
                  </div>
                  <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-3 text-slate-500 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" /> 10:30 AM
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="size-4" /> Sanctuary
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                      >
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="avatar" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500 bg-slate-100">
                      +42
                    </div>
                  </div>
                  <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold px-5 py-2.5 rounded-lg">
                    RSVP
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full py-5 text-slate-500 font-bold text-sm border-2 border-dashed border-primary/10 rounded-2xl hover:bg-primary/5 transition-colors">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
}
