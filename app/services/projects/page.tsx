import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const builds = [
  {
    title: "Lead qualification pipelines",
    body: "Automated intake, scoring, and routing. Stop spending sales time on leads that will never close.",
  },
  {
    title: "Content production automations",
    body: "Research → draft → illustrate → publish. The full pipeline, running without a human in the loop.",
  },
  {
    title: "Internal ops workflows",
    body: "The repetitive, predictable work your team does every day. Automated, documented, handed back to you.",
  },
  {
    title: "AI agents with memory",
    body: "Agents that know your context, learn from interactions, and handle decisions that used to require a person.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>Build a system</p>
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
              Custom AI workflow automations.
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
              This is what Soch does. We take your process, design the automation, build it in n8n, and hand it to you with documentation.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "2.5rem",
              }}
            >
              What we build.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-5">
            {builds.map((b, i) => (
              <AnimateIn key={b.title} delay={i * 100}>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "2rem",
                    background: "#fff",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.15rem",
                      color: "var(--ink)",
                      fontWeight: 700,
                      marginBottom: "0.65rem",
                    }}
                  >
                    {b.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.9rem",
                      color: "var(--body)",
                      lineHeight: 1.7,
                    }}
                  >
                    {b.body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={450}>
            <div
              style={{
                marginTop: "2.5rem",
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
                  marginBottom: "1rem",
                }}
              >
                <strong style={{ color: "var(--ink)" }}>How it works:</strong> Every project starts with a scoping call. We quote a fixed price for a defined deliverable. No hourly billing, no scope creep. You own everything we build.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "1.1rem",
                    color: "var(--ink)",
                    fontWeight: 700,
                  }}
                >
                  Project-based. Starts at $3,500.
                </span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SOCH CTA */}
      <section style={{ background: "var(--ink)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <div style={{ maxWidth: 560 }}>
            <AnimateIn>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Have a project in mind?
              </h2>
            </AnimateIn>
            <AnimateIn delay={100}>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "1rem",
                  color: "var(--faint)",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                Tell me what you&apos;re trying to build. Alternatively, visit Soch directly.
              </p>
            </AnimateIn>
            <AnimateIn delay={200}>
              <div className="flex flex-wrap gap-3">
                <Link href="/services/consulting#book" className="btn-coral">Get in touch →</Link>
                <a
                  href="https://withsoch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ color: "var(--faint)", borderColor: "rgba(255,255,255,0.2)" }}
                >
                  Visit withsoch.com ↗
                </a>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
