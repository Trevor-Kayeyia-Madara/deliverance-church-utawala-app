import { ChevronLeft } from 'lucide-react';
import { getMinistryById } from '../content/ministries';
import type { Page } from '../types/page';
import type { MinistryId } from '../types/ministries';

export default function MinistryDetailPage({
  id,
  setPage,
}: {
  id: MinistryId;
  setPage: (p: Page) => void;
}) {
  const ministry = getMinistryById(id);

  if (!ministry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button
          onClick={() => setPage('ministries')}
          className="flex items-center gap-2 text-primary font-bold text-sm hover:underline w-fit mb-8"
        >
          <ChevronLeft className="size-4" /> Back to Ministries
        </button>
        <h1 className="text-3xl font-black mb-3">Ministry Not Found</h1>
        <p className="text-slate-600">
          This ministry page is missing. Please go back and select another ministry.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <button
        onClick={() => setPage('ministries')}
        className="flex items-center gap-2 text-primary font-bold text-sm hover:underline w-fit mb-8"
      >
        <ChevronLeft className="size-4" /> Back to Ministries
      </button>

      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-4">
          {ministry.title}
        </h1>
        <p className="text-slate-600 font-medium leading-relaxed">{ministry.summary}</p>
      </header>

      <article className="bg-white rounded-2xl border border-primary/10 shadow-sm p-8">
        <p className="text-slate-700 leading-relaxed whitespace-pre-line">
          {ministry.body}
        </p>
      </article>
    </div>
  );
}

