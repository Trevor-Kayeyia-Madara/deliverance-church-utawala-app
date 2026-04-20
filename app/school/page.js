import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import { getSiteSettings } from "@/lib/siteSettings.server";

export const metadata = {
  title: "School | Deliverance Church Utawala",
};

export default async function SchoolPage() {
  const site = await getSiteSettings();
  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-darkAccent/60 via-background to-background" />
        <SectionWrapper className="relative py-14 sm:py-20">
          <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
            School
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black leading-tight">
            {site.school.tagline}
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl">
            Our church school nurtures character, excellence, and spiritual
            growth — partnering with parents to raise strong foundations.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-7 py-3.5 hover:bg-accent transition-colors"
            >
              Admissions Enquiry
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-7 py-3.5 font-bold hover:bg-white/10 transition-colors"
            >
              Talk to Us
            </Link>
          </div>
        </SectionWrapper>
      </div>

      <SectionWrapper className="py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-10">
            <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
              Overview
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black">
              Holistic, values-driven education.
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              We focus on academic excellence, strong values, and a supportive
              environment where learners can thrive. Share the learner’s age and
              class level and we’ll guide you through the next steps.
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { k: "Curriculum", v: "Competency-based learning" },
                { k: "Culture", v: "Character & discipline" },
                { k: "Growth", v: "Faith + excellence" },
              ].map((b) => (
                <div
                  key={b.k}
                  className="rounded-2xl bg-background/60 border border-white/10 p-4"
                >
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
                    {b.k}
                  </p>
                  <p className="mt-1 font-extrabold">{b.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-3xl bg-secondary/25 border border-secondary/35 p-7">
              <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
                Admissions
              </p>
              <h3 className="mt-3 text-2xl font-black leading-tight">
                Ready to apply?
              </h3>
              <p className="mt-3 text-white/75">
                Send an enquiry and we’ll share requirements, fees, and available
                class levels.
              </p>
              <Link
                href={`/contact?subject=${encodeURIComponent("School Admissions")}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary text-black font-extrabold px-6 py-3.5 hover:bg-accent transition-colors"
              >
                Contact Admissions
              </Link>
              <p className="mt-3 text-xs text-white/50">
                Replace this copy with official school details when available.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="p-6">
                <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
                  Location
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight">
                  Visit the campus.
                </h3>
                <p className="mt-3 text-white/75">
                  Utawala, Nairobi, Kenya
                </p>
              </div>
              <iframe
                title="School Map"
                className="w-full h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Utawala%2C%20Nairobi%2C%20Kenya&output=embed"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
