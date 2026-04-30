import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keystrum.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "keystrum — Strum your keyboard",
    template: "%s · keystrum",
  },
  description:
    "Practice guitar chords without a guitar — in your browser, on your QWERTY keyboard. Four rows = four strings, six columns = six chords. Real strum detection, Karplus-Strong synthesis, no install, no account.",
  keywords: [
    "virtual guitar online free",
    "play guitar online browser",
    "virtual guitar no download",
    "practice guitar chords without guitar",
    "learn guitar chords without guitar",
    "chord practice app",
    "chord practice browser",
    "play music on computer keyboard",
    "qwerty keyboard instrument",
    "folk song chord practice",
    "browser music maker no install",
    "keyboard strumming chord trainer",
    "Karplus-Strong web audio",
    "javascript guitar synthesis",
    "physical modeling synthesis",
    "chrome music lab alternative",
    "music teacher classroom chord tool",
    "open source browser instrument",
    "keystrum",
  ],
  authors: [{ name: "keystrum" }],
  creator: "keystrum",
  publisher: "keystrum",
  applicationName: "keystrum",
  category: "Music",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "keystrum",
    title: "keystrum — Practice guitar chords without a guitar",
    description:
      "Strum guitar chords on your QWERTY keyboard. 4 rows = 4 strings, 6 columns = 6 chords. Real strum detection, Karplus-Strong synthesis. Browser-only, no install.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@RBlue7681",
    creator: "@RBlue7681",
    title: "keystrum — Practice guitar chords without a guitar",
    description:
      "Guitar chords on your keyboard. 4 rows = 4 strings, 6 columns = 6 chords. Browser-only, no install.",
  },
  verification: {
    google: "oMRjOguNwRMb4i_c48G45E9_sbFlOw_uIUxr5xo5iKA",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "keystrum",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  other: {
    "msapplication-TileColor": "#0E0E12",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E12" },
  ],
  width: "device-width",
  initialScale: 1,
  // maximumScale + userScalable removed — both block pinch-zoom and trip
  // WCAG 2.1 AA (1.4.4 Resize Text). The PWA "no-scale" feel is preserved
  // through the body min-h-full + overflow rules; we don't need to forbid
  // the user from zooming to read the ?prog= URL or the chord theory page.
  viewportFit: "cover",
  colorScheme: "dark light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "keystrum",
      description:
        "Practice guitar chords without a guitar. A browser-based QWERTY keyboard instrument with real strum detection and Karplus-Strong synthesis. 6 chords, 4 rows, 3 folk songs built in.",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "keystrum",
      url: SITE_URL,
      logo: `${SITE_URL}/apple-icon`,
      sameAs: ["https://github.com/kimhinton/keystrum"],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "keystrum",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Musical Instrument",
      operatingSystem: "Web browser",
      description:
        "Practice guitar chords without a guitar. A browser instrument that maps QWERTY rows to guitar strings and columns to chords — sweep a column to strum, tap individual keys to pick. Karplus-Strong physical-modeling synthesis runs live in Web Audio. Includes 3 folk songs in practice mode (House of the Rising Sun, Scarborough Fair, Greensleeves) and a 6-chord dictionary. Targeted at music beginners, DAW producers sketching ideas, late-night jammers without a guitar at hand, and music teachers looking for a browser chord tool.",
      url: SITE_URL,
      screenshot: `${SITE_URL}/opengraph-image`,
      downloadUrl: SITE_URL,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@id": `${SITE_URL}/#organization` },
      featureList:
        "Four-row keyboard mapping, Real strum detection, Karplus-Strong synthesis, Practice mode with songs, Chord dictionary",
    },
  ],
};

import CapacitorBoot from "@/components/native/CapacitorBoot";
import { NativeOnly } from "@/components/native/NativeOnly";
import NativeTabBar from "@/components/native/NativeTabBar";
import SessionBreakNudge from "@/components/wellbeing/SessionBreakNudge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window;if(w.Capacitor&&w.Capacitor.isNativePlatform&&w.Capacitor.isNativePlatform()){document.body.setAttribute("data-native","true")}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CapacitorBoot />
        <NativeOnly>
          <NativeTabBar />
        </NativeOnly>
        <SessionBreakNudge />
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker"in navigator&&!window.Capacitor?.isNativePlatform?.()){window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js")})}`,
          }}
        />
      </body>
    </html>
  );
}
