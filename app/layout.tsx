import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AudioProvider } from "@/contexts/audio-context";
import { AudioPlayer } from "@/components/AudioPlayer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
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
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} ${bebasNeue.variable} h-full`}
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
