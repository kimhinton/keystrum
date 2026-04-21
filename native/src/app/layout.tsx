import type { Metadata, Viewport } from "next";
import "./globals.css";
import CapacitorBoot from "@/components/native/CapacitorBoot";
import NativeTabBar from "@/components/native/NativeTabBar";

export const metadata: Metadata = {
  title: "keystrum",
  description: "keystrum native app.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0E0E12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function NativeRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body data-native="true" className="min-h-full flex flex-col">
        {children}
        <CapacitorBoot />
        <NativeTabBar />
      </body>
    </html>
  );
}
