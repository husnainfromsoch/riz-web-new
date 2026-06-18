import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const topics = [
  { title: "AI operations in practice", body: "What changes — and what doesn't — when you add AI to an operations team. Grounded in real deployments, not theory." },
  { title: "Automation strategy for founders", body: "How to decide what to automate, in what order, and how to avoid building technical debt disguised as efficiency." },
  { title: "The human side of AI adoption", body: "What actually happens to teams when you introduce powerful tools. How to bring people along instead of leaving them behind." },
];

const formats = ["Conference keynote (30–60 min)", "Leadership offsite workshop (half/full day)", "Founder dinner talk (20–30 min)", "Podcast / panel"];

export default function SpeakingPage() {
  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>SPEAKING</p>
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
              On stages and in rooms.
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "1.1rem", color: "var(--body)", lineHeight: 1.7, maxWidth: 520 }}>
              Conference keynotes, leadership offsites, and founder dinners. No hype. Real experience.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site grid md:grid-cols-2 gap-12">
          <div>
            <AnimateIn>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.6rem", color: "var(--ink)", fontWeight: 700, marginBottom: "2rem" }}>
                Topics I speak on.
              </h2>
            </AnimateIn>
            <div className="flex flex-col gap-6">
              {topics.map((t, i) => (
                <AnimateIn key={t.title} delay={i * 150}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.05rem", color: "var(--ink)", fontWeight: 600, marginBottom: "0.5rem" }}>
                      {t.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.7 }}>
                      {t.body}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
          <div>
            <AnimateIn delay={200}>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.6rem", color: "var(--ink)", fontWeight: 700, marginBottom: "2rem" }}>
                Formats.
              </h2>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                {formats.map((f, i) => (
                  <div
                    key={f}
                    style={{
                      padding: "1rem 1.5rem",
                      borderBottom: i < formats.length - 1 ? "1px solid var(--line)" : "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.95rem",
                      color: "var(--body)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <span style={{ color: "var(--coral)", fontSize: "0.6rem" }}>●</span>
                    {f}
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--ink)", padding: "4rem 0" }}>
        <div className="max-w-site text-center">
          <AnimateIn>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2rem", color: "#fff", fontWeight: 700, marginBottom: "1rem" }}>
              Booking enquiries.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "1rem", color: "var(--faint)", marginBottom: "2rem" }}>
              Tell me about the event, the audience, and what you want them to leave thinking.
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
