import { Clock } from 'lucide-react';
import { SERVICE_TIMES } from '../content/serviceTimes';

export default function ServiceTimesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
          <Clock className="size-4" />
          Service Times
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-4">
          Join Us for Worship
        </h1>
        <p className="text-slate-600 font-medium max-w-2xl">
          Welcome to Deliverance Church Utawala. Here are our weekly services and fellowship
          times.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICE_TIMES.map((s) => (
          <div
            key={`${s.day}-${s.name}`}
            className="bg-white rounded-2xl border border-primary/10 shadow-sm p-8"
          >
            <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">
              {s.day}
            </p>
            <h2 className="text-xl font-extrabold mb-2">{s.name}</h2>
            <p className="text-slate-700 font-bold">{s.time}</p>
            {s.note && <p className="text-sm text-slate-600 mt-3">{s.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

