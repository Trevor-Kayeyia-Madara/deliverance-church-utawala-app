import { ChevronLeft, Hammer, Landmark, Smartphone } from 'lucide-react';
import type { Page } from '../types/page';

export default function GivingPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <button
        onClick={() => setPage('home')}
        className="flex items-center gap-2 text-primary font-bold text-sm hover:underline w-fit mb-8"
      >
        <ChevronLeft className="size-4" /> Back to Home
      </button>

      <div className="bg-primary/5 rounded-3xl p-8 sm:p-10 mb-10 border border-primary/10">
        <h1 className="text-4xl font-black mb-3">Giving</h1>
        <p className="text-slate-700 text-lg leading-relaxed max-w-3xl">
          Thank you for partnering with Deliverance Church Utawala. Below are the official
          giving channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-primary/10">
          <div className="flex items-center gap-3 mb-5 text-primary">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Smartphone className="size-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">M-Pesa</h2>
          </div>
          <div className="space-y-3 text-slate-700">
            <p className="font-bold">
              Paybill: <span className="font-black">4043891</span>
            </p>
            <p className="font-bold">
              Account: <span className="font-black">Your Name and Purpose</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-primary/10">
          <div className="flex items-center gap-3 mb-5 text-primary">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Landmark className="size-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Bank Transfer</h2>
          </div>
          <div className="space-y-3 text-slate-700">
            <p className="font-bold">
              Bank: <span className="font-black">Equity Bank</span>
            </p>
            <p className="font-bold">
              Paybill: <span className="font-black">247247</span>
            </p>
            <p className="font-bold">
              Account: <span className="font-black">0240290276813</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-primary/10">
          <div className="flex items-center gap-3 mb-5 text-primary">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Hammer className="size-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">For Development</h2>
          </div>
          <div className="space-y-3 text-slate-700">
            <p className="font-bold">
              Bank: <span className="font-black">Family Bank</span>
            </p>
            <p className="font-bold">
              Paybill: <span className="font-black">222111</span>
            </p>
            <p className="font-bold">
              Account: <span className="font-black">175579#Name</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 bg-white rounded-3xl border border-primary/10 shadow-sm p-8">
        <p className="text-slate-700 leading-relaxed">
          “Each of you should give what you have decided in your heart to give, not
          reluctantly or under compulsion, for God loves a cheerful giver.” — 2 Corinthians
          9:7
        </p>
      </div>
    </div>
  );
}

