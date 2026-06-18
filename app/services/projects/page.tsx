import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const projectTypes = [
  { icon: "🤖", title: "AI agents", body: "Custom agents that handle repetitive decisions — lead qualification, support triage, data enrichment, internal Q&A." },
  { icon: "🔁", title: "Automation workflows", body: "End-to-end workflow automation using tools like n8n, Make, or custom code. Built to survive the real world." },
  { icon: "📊", title: "Internal dashboards", body: "Operations visibility tools. Know what's happening without asking five people." },
  { icon: "🔌", title: "Integrations", body: "Connect your stack. CRM, comms, finance, ops — all talking to each other." },
];

export default function ProjectsPage() {
  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>BUILD & PROJECTS</p>
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
              }}
            >
              Systems that actually ship.
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "1.1rem", color: "var(--body)", lineHeight: 1.7, maxWidth: 520 }}>
              I build the automation, the agent, or the internal tool. You keep the IP.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.8rem", color: "var(--ink)", fontWeight: 700, marginBottom: "2.5rem" }}>
              What I build.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-6">
            {projectTypes.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 150}>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "2rem",
                    background: "#fff",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.1rem", color: "var(--ink)", fontWeight: 600, marginBottom: "0.5rem" }}>
                      {p.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.7 }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={400}>
            <div
              style={{
                marginTop: "3rem",
                padding: "2rem",
                background: "var(--cream)",
                border: "1px solid var(--line)",
                borderRadius: 12,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "1rem",
                  color: "var(--body)",
                  lineHeight: 1.7,
                }}
              >
                <strong style={{ color: "var(--ink)" }}>How it works:</strong> Every project starts with a scoping call. I quote a fixed price for a defined deliverable. No hourly billing, no scope creep surprises. You own everything I build.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section style={{ background: "var(--ink)", padding: "4rem 0" }}>
        <div className="max-w-site text-center">
          <AnimateIn>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "#fff", fontWeight: 700, marginBottom: "1rem" }}>
              Have a project in mind?
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "1rem", color: "var(--faint)", marginBottom: "2rem" }}>
              Tell me what you&apos;re trying to build. I&apos;ll tell you if I&apos;m the right person for it.
            </p>
          </AnimateIn>
          <AnimateIn delay={250}>
            <Link href="/about" className="btn-coral">Start a conversation →</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
