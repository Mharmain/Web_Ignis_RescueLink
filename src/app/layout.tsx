import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { site } from "@/config/site";
import EnvProvider from "@/components/EnvProvider";
import SceneLoader from "@/components/SceneLoader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxShapes from "@/components/ui/ParallaxShapes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: "Ignis RescueLink automatically alerts the nearest ambulances, plans a traffic-aware route and guides the driver hands-free, so help can reach a fire sooner.",
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.tagline, locale: "en_US" },
  twitter: { card: "summary", title: site.name, description: site.tagline },
};
export const viewport: Viewport = { themeColor: "#F5F9FF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <EnvProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-bold">Skip to content</a>
          {/* soft pastel blobs (behind everything) */}
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="blob absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#CFE0FF]/70 blur-3xl" />
            <div className="blob absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-[#FFD9DB]/60 blur-3xl" />
            <div className="blob absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-[#D6F1E3]/60 blur-3xl" />
          </div>
          <SceneLoader />
          <ParallaxShapes />
          <Navbar />
          <main id="main" className="relative z-10">{children}</main>
          <Footer />
        </EnvProvider>
      </body>
    </html>
  );
}
