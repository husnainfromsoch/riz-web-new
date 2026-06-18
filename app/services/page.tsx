import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "Consulting",
    icon: "🧠",
    body: "I sit with your team, map what's broken, and tell you what to fix before you automate it. Most engagements start here.",
    detail: "Typically a 2–4 week engagement. Deliverables: a clear ops map, prioritised automation opportunities, and a written action plan your team can execute.",
    href: "/services/consulting",
    cta: "Explore consulting →",
  },
  {
    num: "02",
    title: "Build & Projects",
    icon: "⚙️",
    body: "I build the automation, the agent, or the internal tool. You keep the IP.",
    detail: "From n8n workflows to custom AI agents to internal dashboards. Scoped projects with clear milestones and delivery dates.",
    href: "/services/projects",
    cta: "See projects →",
  },
  {
    num: "03",
    title: "Speaking",
    icon: "🎙️",
    body: "Conference keynotes, leadership offsites, and founder dinners.",
    detail: "Topics: AI operations, automation strategy, and what actually changes when you give smart people powerful tools.",
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
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>SERVICES</p>
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
                maxWidth: 600,
              }}
            >
              Three ways to work together.
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
              Each starts with the same question: what&apos;s actually broken?
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site flex flex-col gap-8">
          {services.map((s, i) => (
            <AnimateIn key={s.num} delay={i * 150}>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "2.5rem",
                  background: "#fff",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                }}
                className="flex-col md:grid"
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.72rem",
                      color: "var(--faint)",
                      fontWeight: 500,
                    }}
                  >
                    {s.num}
                  </span>
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.5rem",
                      color: "var(--ink)",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {s.title}
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "1rem", color: "var(--body)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                    {s.body}
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.7 }}>
                    {s.detail}
                  </p>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <Link href={s.href} className="btn-coral" style={{ whiteSpace: "nowrap" }}>
                    {s.cta}
                  </Link>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "4rem 0" }}>
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
          <AnimateIn delay={150}>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "1rem", color: "var(--faint)", marginBottom: "2rem" }}>
              Most engagements start with a short discovery call.
            </p>
          </AnimateIn>
          <AnimateIn delay={250}>
            <Link href="/about" className="btn-coral">Get in touch →</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
