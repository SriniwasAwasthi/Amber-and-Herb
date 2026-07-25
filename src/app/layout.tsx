import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amber & Herb — Eat Local, Eat Healthy",
  description:
    "Established 2015. Delicious, attainable and affordable meals for fitness enthusiasts, busy professionals and everyday families. From our kitchen to your door.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-bg text-ink antialiased">
        {children}
        <div className="bg-noise pointer-events-none fixed inset-0 z-[5]" aria-hidden="true" />
      </body>
    </html>
  );
}
