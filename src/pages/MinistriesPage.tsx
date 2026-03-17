import { ArrowRight } from 'lucide-react';
import { MINISTRIES } from '../content/ministries';
import type { Page } from '../types/page';

export default function MinistriesPage({
  setPage,
}: {
  setPage: (p: Page) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-4">
          Ministries
        </h1>
        <p className="text-slate-600 font-medium max-w-2xl">
          Find a place to grow, serve, and belong at Deliverance Church Utawala.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MINISTRIES.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-primary/10 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-5">
              <div>
                <h2 className="text-2xl font-extrabold mb-2">{m.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{m.summary}</p>
              </div>
              <button
                onClick={() => setPage(`ministry/${m.id}`)}
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline w-fit"
              >
                Learn More <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

