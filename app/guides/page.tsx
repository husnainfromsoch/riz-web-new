import AnimateIn from "@/components/AnimateIn";
import { getAllGuides } from "@/lib/guides";
import GuidesClient from "./GuidesClient";

export const metadata = {
  title: "Guides — Rizwan Mahmood",
  description: "Practical guides on building, automating, and thinking clearly.",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 60, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 900,
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: "0.75rem",
              }}
            >
              Guides
            </h1>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "1.05rem",
                color: "var(--body)",
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              Reference material and walkthroughs, kept in one place so you can find them again.
            </p>
          </AnimateIn>
        </div>
      </section>

      <GuidesClient guides={guides} />
    </>
  );
}
