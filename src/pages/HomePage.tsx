import { motion } from 'framer-motion';
import {
  ArrowRight,
  Baby,
  BookOpen,
  Calendar,
  GraduationCap,
  HandHeart,
  Heart,
  Play,
  Users,
} from 'lucide-react';
import { LATEST_SERMONS, UPCOMING_EVENTS } from '../data/mockData';
import { WELCOME_MESSAGE } from '../content/pastorsWelcome';
import type { Page } from '../types/page';

export default function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="flex flex-col">
      <section className="relative h-[80vh] min-h-150 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-background-dark/80 via-transparent to-transparent z-10"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1920"
          alt="Church Sanctuary"
          referrerPolicy="no-referrer"
          width="1920"
          height="1080"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight"
          >
            A Place to Belong, <br />
            <span className="text-white/90">Grow, and Serve</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience warmth, faith, and community in our modern worship space.
            Join us this Sunday at 10:00 AM.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => setPage('events')}
              className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              Join Us
            </button>
            <button
              onClick={() => setPage('sermons')}
              className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Watch Live
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background-light">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl border border-primary/10 shadow-sm p-8 sm:p-10 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 mb-8">
                <img
                  src="/logo.png"
                  alt="Deliverance Church Logo"
                  className="size-14 object-contain"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary">
                    Deliverance Church
                  </p>
                  <p className="text-sm font-extrabold text-slate-800">Utawala</p>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden border border-primary/10 bg-primary/5">
                <img
                  src="/pst.jpg"
                  alt="Reverend Emmanuel & Pastor Lucy Kokonyo"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                {WELCOME_MESSAGE.pastors.map((p) => (
                  <div
                    key={p.name}
                    className="rounded-2xl bg-primary/5 border border-primary/10 p-5"
                  >
                    <p className="font-black text-slate-900">{p.name}</p>
                    <p className="text-sm font-bold text-primary">{p.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">
                {WELCOME_MESSAGE.title}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                {WELCOME_MESSAGE.message}
              </p>
              <p className="text-slate-700 leading-relaxed">{WELCOME_MESSAGE.signOff}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-2">
                Upcoming Events
              </h2>
              <p className="text-slate-500 font-medium">
                Be a part of our thriving community activities.
              </p>
            </div>
            <button
              onClick={() => setPage('events')}
              className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline"
            >
              View All <ArrowRight className="size-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UPCOMING_EVENTS.map((event) => (
              <div
                key={event.id}
                className="group bg-background-light rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={event.image}
                    alt={event.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="800"
                    height="450"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary text-sm font-bold mb-3">
                    <Calendar className="size-4" />
                    {event.date}
                  </div>
                  <h3 className="text-xl font-extrabold mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {event.description}
                  </p>
                  <button
                    onClick={() => setPage('events')}
                    className="w-full py-3 border-2 border-primary/20 hover:border-primary text-primary font-bold rounded-xl transition-colors"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-background-light">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 lg:aspect-auto">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"
                alt="Community"
                referrerPolicy="no-referrer"
                loading="lazy"
                width="800"
                height="600"
              />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              Rooted in Faith, Growing in Love
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              At Deliverance Church Utawala, we believe that everyone has a place. We
              remain committed to sharing the
              timeless message of the gospel in a way that resonates with our
              modern world.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Whether you&apos;re exploring faith for the first time or looking
              for a place to call home, our doors are open to you.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Heart, text: 'Authentic Love' },
                { icon: BookOpen, text: 'Biblical Truth' },
                { icon: Users, text: 'Diverse Community' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="size-6" />
                  </div>
                  <span className="font-bold">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            Latest Sermons
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto font-medium">
            Missed a service? Catch up on our recent messages and grow in your
            faith throughout the week.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LATEST_SERMONS.map((sermon) => (
              <div key={sermon.id} className="flex flex-col gap-4">
                <div
                  onClick={() => setPage('sermons')}
                  className="relative group cursor-pointer aspect-video rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={sermon.image}
                    alt={sermon.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="800"
                    height="450"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-primary shadow-xl scale-90 group-hover:scale-100 transition-transform">
                      <Play className="size-8 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded font-bold">
                    {sermon.duration}
                  </div>
                </div>
                <div>
                  <h4
                    onClick={() => setPage('sermons')}
                    className="text-lg font-bold mb-1 hover:text-primary transition-colors cursor-pointer leading-snug"
                  >
                    {sermon.title}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">
                    {sermon.speaker} · {sermon.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => setPage('sermons')}
              className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              Sermon Archive
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
            Connect in Community
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Baby, title: 'Kids Ministry', desc: 'Ages 0-12 years' },
              {
                icon: GraduationCap,
                title: 'Youth & College',
                desc: 'Building leaders',
              },
              { icon: Users, title: 'Small Groups', desc: 'Life together' },
              { icon: HandHeart, title: 'Outreach', desc: 'Serving the city' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10"
              >
                <div className="size-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <item.icon className="size-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section removed (per request) */}
    </div>
  );
}
