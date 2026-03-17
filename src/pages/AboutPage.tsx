import { Calendar, Church, Target, Telescope } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Church className="size-4" />
            About Deliverance Church Utawala
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-6">
            Rooted in Faith
          </h1>
          <p className="text-slate-700 text-lg leading-relaxed max-w-2xl">
            Deliverance Church Utawala is a community of believers committed to worship,
            discipleship, and service—welcoming families, individuals, and visitors from
            all walks of life to experience God&apos;s transformative love.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-primary/10 shadow-sm p-8">
            <img
              src="/logo.png"
              alt="Deliverance Church Logo"
              className="w-24 h-24 object-contain mb-5"
            />
            <p className="text-sm text-slate-600 leading-relaxed">
              Deliverance Church • Utawala
            </p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white rounded-3xl border border-primary/10 shadow-sm p-8">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
            <Target className="size-6" />
          </div>
          <h2 className="text-xl font-extrabold mb-3">Our Mission</h2>
          <p className="text-slate-700 leading-relaxed">
            &quot;To Equip Mankind For The Mission Of God.&quot;
          </p>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl border border-primary/10 shadow-sm p-8">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
            <Telescope className="size-6" />
          </div>
          <h2 className="text-xl font-extrabold mb-3">Our Vision</h2>
          <p className="text-slate-700 leading-relaxed">
            &quot;The Apostolic Church Of Choice transforming &amp; empowering mankind in
            Africa and beyond.&quot;
          </p>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl border border-primary/10 shadow-sm p-8">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
            <Calendar className="size-6" />
          </div>
          <h2 className="text-xl font-extrabold mb-3">Our Story</h2>
          <p className="text-slate-700 leading-relaxed">
            Born on the 24th of November, 2009, Deliverance Church Utawala began as a
            small fellowship of believers under the leadership of Pastor William Ouna,
            committed to seeking God&apos;s presence and sharing His love. Later on
            Reverend Emmanuel Kokonyo came in as the lead pastor. Over the years, we have
            grown into a vibrant community of faith, united by our shared commitment to
            worship, discipleship, and service.
            <br />
            <br />
            Our church is built on the foundation of God&apos;s Word, emphasizing prayer,
            biblical teaching, and authentic relationships. We believe in the power of
            community and the importance of supporting one another through life&apos;s joys
            and challenges.
            <br />
            <br />
            Today, we continue to grow in faith and in numbers, welcoming families,
            individuals, and visitors from all walks of life to experience God&apos;s
            transformative love in our midst.
          </p>
        </div>
      </section>
    </div>
  );
}

