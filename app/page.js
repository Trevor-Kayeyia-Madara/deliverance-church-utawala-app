import HeroSection from "@/components/HeroSection";
import SectionWrapper from "@/components/SectionWrapper";
import LiveTVCard from "@/components/LiveTVCard";
import DonationCard from "@/components/DonationCard";
import SermonsPreview from "@/components/SermonsPreview";
import QuickActions from "@/components/QuickActions";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <SectionWrapper className="py-10 sm:py-14">
        <QuickActions />
      </SectionWrapper>

      <SectionWrapper className="py-12 sm:py-16" id="featured-sermons">
        <SermonsPreview />
      </SectionWrapper>

      <SectionWrapper className="py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-secondary/20 border border-secondary/30 p-7 sm:p-10 h-full">
              <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
                Online Presence
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black leading-tight">
                Stay connected throughout the week.
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed max-w-2xl">
                Sermons, announcements, and live streams — all in one place.
                Subscribe and never miss what God is doing in our community.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-6 py-3 hover:bg-accent transition-colors"
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit YouTube
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-bold hover:bg-white/10 transition-colors"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Follow on Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <LiveTVCard />
            <DonationCard />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

