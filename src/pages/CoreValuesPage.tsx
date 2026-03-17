import { BookOpen, HandHeart, Heart, Sparkles, Users, Volume2 } from 'lucide-react';
import { CORE_VALUES } from '../content/coreValues';

const iconFor = (key?: string) => {
  switch (key) {
    case 'faith':
      return Heart;
    case 'word':
      return BookOpen;
    case 'prayer':
      return Volume2;
    case 'community':
      return Users;
    case 'service':
      return HandHeart;
    case 'excellence':
    default:
      return Sparkles;
  }
};

export default function CoreValuesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary mb-4">
          Core Values
        </h1>
        <p className="text-slate-600 font-medium max-w-2xl">
          The values that shape our culture and guide our ministry at Deliverance Church
          Utawala.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CORE_VALUES.map((v) => {
          const Icon = iconFor(v.icon);
          return (
            <div
              key={v.title}
              className="bg-white rounded-2xl border border-primary/10 shadow-sm p-8"
            >
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <Icon className="size-6" />
              </div>
              <h2 className="text-xl font-extrabold mb-2">{v.title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

