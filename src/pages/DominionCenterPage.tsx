import { ArrowRight, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';

export default function DominionCenterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <GraduationCap className="size-4" />
            Dominion Center Kids School
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-6">
            A nurturing place for children to learn, grow, and discover their God-given
            potential.
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-2xl">
            Providing quality Christian education where children learn, grow, and
            discover their God-given potential in a nurturing environment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Play Group',
                badge: 'From Age 2',
                desc: 'Nurturing young minds with Christian values and foundational learning skills.',
                offers: [
                  'Play-based Learning',
                  'Christian Values',
                  'Qualified Teachers',
                  'Safe Environment',
                ],
              },
              {
                title: 'PP1',
                badge: 'Intake Ongoing',
                desc: 'Comprehensive primary education combining academic excellence with spiritual growth.',
                offers: [
                  'CBC Curriculum',
                  'Small Class Sizes',
                  'Extracurricular Activities',
                  'Moral Education',
                ],
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl border border-primary/10 shadow-sm p-8"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-extrabold">{p.title}</h2>
                  <span className="text-xs font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {p.badge}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {p.desc}
                </p>
                <div className="mb-6">
                  <h3 className="text-sm font-black text-slate-700 mb-3">What We Offer:</h3>
                  <ul className="space-y-2">
                    {p.offers.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="size-4 text-primary" /> {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                  Learn More <ArrowRight className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-primary/5 rounded-3xl border border-primary/10 p-10">
            <div className="flex items-center gap-3 mb-6 text-primary">
              <ShieldCheck className="size-6" />
              <h2 className="text-xl font-black">Ready to Enroll Your Child?</h2>
            </div>
            <p className="text-slate-700 leading-relaxed mb-8">
              Join the Dominion Center family and give your child a foundation built on
              Christian values and academic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 h-12 rounded-xl bg-primary text-white font-black hover:bg-primary/90 transition-colors">
                Apply Now
              </button>
              <button className="flex-1 h-12 rounded-xl bg-white border border-primary/20 text-primary font-black hover:bg-primary/5 transition-colors">
                Schedule Visit
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

