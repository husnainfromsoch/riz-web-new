import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AudioProvider } from "@/contexts/audio-context";
import { AudioPlayer } from "@/components/AudioPlayer";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-inter-tight",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rizwan Mahmood — Operator · Builder · Tallinn",
  description:
    "I help founders think clearly enough that automation actually works — and I build the systems that prove it.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <AudioProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <AudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
