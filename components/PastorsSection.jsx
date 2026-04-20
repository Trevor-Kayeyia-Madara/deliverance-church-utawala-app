import { getPastors } from "@/lib/pastors.server";

export default async function PastorsSection() {
  const pastors = await getPastors({ limit: 8 });
  if (!pastors || !pastors.length) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-10">
      <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
        Leadership
      </p>
      <h2 className="mt-3 text-3xl sm:text-4xl font-black">Meet our pastors.</h2>
      <p className="mt-3 text-white/75 max-w-2xl">
        A team committed to worship, the Word, discipleship, and service.
      </p>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pastors.map((p) => (
          <div
            key={p.slug}
            className="rounded-3xl bg-background/60 border border-white/10 overflow-hidden"
          >
            <div className="aspect-[4/3] bg-secondary/15">
              {p.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={p.name}
                  src={p.photoUrl}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white/40 font-black">
                  Photo
                </div>
              )}
            </div>
            <div className="p-5">
              <p className="text-primary text-xs font-black tracking-[0.25em] uppercase">
                Pastor
              </p>
              <h3 className="mt-2 text-lg font-black">{p.name}</h3>
              {p.roleTitle ? (
                <p className="mt-1 text-white/70 font-bold text-sm">
                  {p.roleTitle}
                </p>
              ) : null}
              {p.bio ? (
                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  {p.bio}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
