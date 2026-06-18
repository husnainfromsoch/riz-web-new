import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const steps = [
  { num: "01", title: "Discovery call", body: "30 minutes. You explain the problem. I ask uncomfortable questions." },
  { num: "02", title: "Ops mapping", body: "1–2 weeks. We document what's actually happening, not what the process doc says." },
  { num: "03", title: "Clarity report", body: "A written diagnosis: what's broken, why, and what to fix before anything else." },
  { num: "04", title: "Action plan", body: "Prioritised recommendations your team can execute — with or without me." },
];

export default function ConsultingPage() {
  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>CONSULTING</p>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "1.25rem",
                maxWidth: 580,
              }}
            >
              Clarity before you automate.
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.1rem",
                color: "var(--body)",
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              Most automation fails because the thinking underneath it is broken. I fix the thinking first.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.8rem", color: "var(--ink)", fontWeight: 700, marginBottom: "3rem" }}>
              How it works.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <AnimateIn key={s.num} delay={i * 150}>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "1.75rem",
                    background: "#fff",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.75rem",
                      color: "var(--coral)",
                      display: "block",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {s.num}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.15rem", color: "var(--ink)", fontWeight: 600, marginBottom: "0.5rem" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.7 }}>
                    {s.body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--ink)", padding: "4rem 0" }}>
        <div className="max-w-site text-center">
          <AnimateIn>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "#fff", fontWeight: 700, marginBottom: "1rem" }}>
              Ready to start?
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <Link href="/about" className="btn-coral">Get in touch →</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
