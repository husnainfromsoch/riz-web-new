import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const topics = [
  {
    title: '"Think first, then automate"',
    body: "The core thesis. What goes wrong when companies add AI without getting clear first — and how to do it in the right order.",
  },
  {
    title: "What Careem, Bolt and Wise taught me about ops at scale",
    body: "Real stories from ten years of scaling operations across four continents. What breaks, why, and what actually holds.",
  },
  {
    title: "AI literacy for operators",
    body: "Practical frameworks for ops teams who need to work alongside AI — not fear it, not over-trust it.",
  },
];

const formats = [
  { label: "Keynote", detail: "45–60 min" },
  { label: "Workshop", detail: "Half day" },
  { label: "Founder dinner facilitation", detail: "2–3 hours" },
  { label: "Podcast guest", detail: "Flexible" },
];

export default function SpeakingPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>Speaking &amp; workshops</p>
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
              }}
            >
              On stages and in rooms.
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
              Talks and team sessions on AI leverage, the future of ops, and what actually changes when you give smart people powerful tools.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* TOPICS + FORMATS */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site grid md:grid-cols-2 gap-12">
          {/* Topics */}
          <div>
            <AnimateIn>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                  color: "var(--ink)",
                  fontWeight: 700,
                  marginBottom: "2rem",
                }}
              >
                Topics I speak on.
              </h2>
            </AnimateIn>
            <div className="flex flex-col gap-6">
              {topics.map((t, i) => (
                <AnimateIn key={t.title} delay={i * 120}>
                  <div
                    style={{
                      borderLeft: "2px solid var(--coral)",
                      paddingLeft: "1.25rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "1.1rem",
                        color: "var(--ink)",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {t.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.9rem",
                        color: "var(--body)",
                        lineHeight: 1.7,
                      }}
                    >
                      {t.body}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          {/* Formats */}
          <div>
            <AnimateIn delay={150}>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)",
                  color: "var(--ink)",
                  fontWeight: 700,
                  marginBottom: "2rem",
                }}
              >
                Formats.
              </h2>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "var(--shadow)",
                }}
              >
                {formats.map((f, i) => (
                  <div
                    key={f.label}
                    style={{
                      padding: "1.1rem 1.5rem",
                      borderBottom: i < formats.length - 1 ? "1px solid var(--line)" : "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.95rem",
                      color: "var(--body)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ color: "var(--coral)", fontSize: "0.55rem" }}>●</span>
                      <span style={{ fontWeight: 500, color: "var(--ink)" }}>{f.label}</span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "0.72rem",
                        color: "var(--muted)",
                      }}
                    >
                      {f.detail}
                    </span>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA */}
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
                Booking enquiries.
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
                Tell me about the event, the audience, and what you want them to leave thinking.
              </p>
            </AnimateIn>
            <AnimateIn delay={200}>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:riz@withsoch.com" className="btn-coral">riz@withsoch.com</a>
                <Link
                  href="/services/consulting#book"
                  className="btn-ghost"
                  style={{ color: "var(--faint)", borderColor: "rgba(255,255,255,0.2)" }}
                >
                  Fill out a brief →
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
