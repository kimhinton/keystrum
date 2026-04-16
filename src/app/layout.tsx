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
    "A strum-based keyboard instrument. Four rows of keys, six chord columns, real strum detection. Browser-only, no install, no account.",
  keywords: [
    "keyboard instrument",
    "web audio instrument",
    "browser instrument",
    "strum keyboard",
    "chord instrument",
    "Karplus-Strong synth",
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
    title: "keystrum — Strum your keyboard",
    description:
      "Four rows = four strings. Six columns = six chords. A browser-based keyboard instrument with real strum detection. No install.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@keystrum_app",
    title: "keystrum — Strum your keyboard",
    description:
      "Four rows = four strings. Six columns = six chords. Browser-only. No install.",
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0f" },
  ],
  width: "device-width",
  initialScale: 1,
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
        "A strum-based keyboard instrument. Four rows, six chords, real strum detection. Browser-only.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/chords/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
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
        "A strum-based keyboard instrument. QWERTY rows are strings, columns are chords. Sweep keys to strum, tap to pick. Karplus-Strong synthesis in the browser.",
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
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Does it work on mobile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The page loads on mobile, but strumming requires a physical keyboard. Tapping the on-screen keys works as a fallback.",
          },
        },
        {
          "@type": "Question",
          name: "Why four rows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A QWERTY keyboard has four usable rows (number, QWERTY, ASDF, ZXCV). Each row is one string — sweep a column top-to-bottom to strum. Four strings is enough to voice any common chord.",
          },
        },
        {
          "@type": "Question",
          name: "Can I change the chords?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not in the current version. Column presets are editable in the next release. The default six chords are Am, C, Em, G, Dm, F — all diatonic to C major / A minor.",
          },
        },
        {
          "@type": "Question",
          name: "Why is the audio crunchy on some machines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "keystrum uses a Karplus-Strong physical-modeling synth rendered in the browser. Low-end devices can clip at high polyphony — lower the volume or hit fewer simultaneous keys.",
          },
        },
      ],
    },
  ],
};

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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
