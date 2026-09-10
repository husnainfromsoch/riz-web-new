import type { Metadata } from "next";
import { Wix_Madefor_Text } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AudioProvider } from "@/contexts/audio-context";
import { AudioPlayer } from "@/components/AudioPlayer";

// One family carries display and body. 400/500 do the work, 600/700 cover
// the semibold and bold cases. Italics are the real cut, not a synthesised
// slant — several accent phrases are set in italic at display size, where a
// faux-oblique is obvious.
//
// The variable names the rest of the CSS references are remapped onto this
// one font in globals.css, so pointing them all here is the whole swap. Mono
// is the system stack rather than a second webfont: the only mono on the site
// is 12px instrumentation labels.
const wixMadeforText = Wix_Madefor_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-wix-madefor-text",
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
      className={`${wixMadeforText.variable} h-full`}
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
