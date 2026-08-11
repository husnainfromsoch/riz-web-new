import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AudioProvider } from "@/contexts/audio-context";
import { AudioPlayer } from "@/components/AudioPlayer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rizwan Mahmood · Operator · Builder · Tallinn",
  description:
    "I help business owners think clearly enough that automation actually works, and I build the systems that prove it.",
  icons: {
    icon: "/favicon/v1-coral-circle-serif-icon-black-R.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full`}
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
