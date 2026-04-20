import Link from "next/link";
import { getUpcomingEvents } from "@/lib/events.server";

function formatEventMeta(date) {
  try {
    const day = new Intl.DateTimeFormat("en", {
      weekday: "short",
      timeZone: "Africa/Nairobi",
    }).format(date);
    const time = new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Nairobi",
    }).format(date);
    return `${day} â€¢ ${time}`;
  } catch {
    return date.toISOString();
  }
}

export default async function EventsSection() {
  const events = await getUpcomingEvents({ limit: 3 });
  const list =
    events && events.length
      ? events.map((e) => ({
          title: e.title,
          meta: formatEventMeta(e.startAt),
          posterUrl: e.posterUrl || null,
        }))
      : [
          { title: "Sunday Service", meta: "Sun â€¢ 10:00 AM" },
          { title: "Midweek Service", meta: "Wed â€¢ 6:00 PM" },
          { title: "Prayer & Worship", meta: "Fri â€¢ 6:00 PM" },
        ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
            Events
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black">
            Whats happening this week.
          </h2>
          <p className="mt-3 text-white/75 max-w-2xl">
            From worship nights to discipleship classes â€” thereâ€™s a place for
            you.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-bold hover:bg-white/10 transition-colors"
        >
          Ask for Details
        </Link>
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map((e) => (
          <div
            key={e.title}
            className="rounded-3xl bg-background/60 border border-white/10 p-6"
          >
            {e.posterUrl ? (
              <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-background/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={e.title}
                  src={e.posterUrl}
                  className="h-32 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
            <p className="text-primary text-xs font-black tracking-[0.25em] uppercase">
              Upcoming
            </p>
            <h3 className="mt-3 text-xl font-black">{e.title}</h3>
            <p className="mt-2 text-white/70 font-bold text-sm">{e.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
