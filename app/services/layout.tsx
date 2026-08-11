import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins-experiment",
  display: "swap",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`svc-poppins-scope ${poppins.variable}`}>
      <style>{`
        .svc-poppins-scope,
        .svc-poppins-scope * {
          font-family: var(--font-poppins-experiment), sans-serif;
        }
      `}</style>
      {children}
    </div>
  );
}
