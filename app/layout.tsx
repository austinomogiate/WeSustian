import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { MobileTabBar, SiteHeader } from "@/components/top-nav";

export const metadata: Metadata = {
  title: "We Sustain",
  description: "Employee volunteering, made personal. Find opportunities, track your impact, and give back together.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "We Sustain",
  },
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-24 md:pb-10">{children}</main>
          <MobileTabBar />
        </AppProvider>
      </body>
    </html>
  );
}
