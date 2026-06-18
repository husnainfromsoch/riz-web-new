import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "Consulting & coaching",
    body: "1:1 advisory on AI strategy, automation design, and ops clarity. Fractional product and ops available. From $160/hr.",
    href: "/services/consulting",
    cta: "Explore consulting →",
  },
  {
    num: "02",
    title: "Build a system",
    body: "Custom AI workflow automations — n8n, Claude, and whatever connects your stack. That's what Soch does.",
    href: "/services/projects",
    cta: "See the build →",
  },
  {
    num: "03",
    title: "Speaking & workshops",
    body: "Keynotes and team sessions on AI leverage, the future of ops, and what actually changes when you give people powerful tools.",
    href: "/services/speaking",
    cta: "Speaking info →",
  },
];

export default function Services() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>Services</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "1.25rem",
                maxWidth: 600,
              }}
            >
              Three ways to work together.
            </h1>
          </AnimateIn>
          <AnimateIn delay={180}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.1rem",
                color: "var(--body)",
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              Each starts with the same question: what&apos;s actually broken?
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site flex flex-col gap-6">
          {services.map((s, i) => (
            <AnimateIn key={s.num} delay={i * 120}>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "2.5rem",
                  background: "#fff",
                  boxShadow: "var(--shadow)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.72rem",
                      color: "var(--coral)",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      paddingTop: "0.2rem",
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </span>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      color: "var(--ink)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </h2>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.7,
                    maxWidth: 620,
                  }}
                >
                  {s.body}
                </p>
                <div>
                  <Link href={s.href} className="btn-coral" style={{ fontSize: "0.9rem" }}>
                    {s.cta}
                  </Link>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "5rem 0" }}>
        <div className="max-w-site text-center">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: "#fff",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Not sure where to start?
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--faint)",
                marginBottom: "2rem",
              }}
            >
              Most engagements start with a short call.
            </p>
          </AnimateIn>
          <AnimateIn delay={200}>
            <Link href="/services/consulting" className="btn-coral">Book a call →</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
