import { Clock } from "lucide-react";

const serviceTimes = [
  { day: "Sunday", time: "10:00 AM", label: "Celebration Service" },
  { day: "Wednesday", time: "6:00 PM", label: "Midweek Service" },
  { day: "Friday", time: "6:00 PM", label: "Prayer & Worship" },
];

export default function ServiceTimesCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
      <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
        Service Times
      </p>
      <h3 className="mt-3 text-2xl font-black leading-tight">
        Join us every week.
      </h3>
      <div className="mt-5 flex flex-col gap-3">
        {serviceTimes.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-background/60 p-4 flex items-start gap-3"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25 text-primary">
              <Clock className="size-5" />
            </span>
            <div>
              <p className="font-extrabold">{s.day}</p>
              <p className="text-white/70 text-sm font-bold">
                {s.time} • {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

