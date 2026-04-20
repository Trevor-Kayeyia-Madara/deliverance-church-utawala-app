import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import { getSiteSettings } from "@/lib/siteSettings.server";

export const metadata = {
  title: "Deliverance Church Utawala",
  description: "Worship. Word. Community. Service.",
};

export default async function RootLayout({ children }) {
  const site = await getSiteSettings();
  return (
    <html lang="en">
      <body>
        <Providers site={site}>
          <div className="min-h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
