import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins-experiment",
  display: "swap",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`about-poppins-scope ${poppins.variable}`}>
      <style>{`
        .about-poppins-scope,
        .about-poppins-scope * {
          font-family: var(--font-poppins-experiment), sans-serif;
        }
      `}</style>
      {children}
    </div>
  );
}
