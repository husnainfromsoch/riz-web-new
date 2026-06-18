import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const credentials = ["Cambridge", "ACCA", "Careem", "Bolt", "Wise", "Tallinn"];

const principles = [
  {
    num: "01",
    title: "Clarity before systems",
    body: "Before any tool, any automation, any workflow — what are we actually trying to do? Most teams skip this question. It costs them everything.",
  },
  {
    num: "02",
    title: "Build to last, not to demo",
    body: "A demo that impresses investors and a system that survives Monday morning are different things. I build the second one.",
  },
  {
    num: "03",
    title: "Operator first, consultant second",
    body: "I've run the ops. I've been on the floor at 2am when things break. That's the lens I bring — not a framework from a slide deck.",
  },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="max-w-site">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo placeholder */}
            <AnimateIn>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  borderRadius: 16,
                  background: "var(--cream)",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "var(--line-2)",
                      margin: "0 auto 1rem",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Photo
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* Text */}
            <div>
              <AnimateIn>
                <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>ABOUT RIZ</p>
              </AnimateIn>
              <AnimateIn delay={100}>
                <h1
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(2rem, 4vw, 2.8rem)",
                    lineHeight: 1.2,
                    color: "var(--ink)",
                    fontWeight: 700,
                    marginBottom: "1.5rem",
                  }}
                >
                  Ten years running operations. Now building what comes next.
                </h1>
              </AnimateIn>
              <AnimateIn delay={200}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.75,
                    marginBottom: "1.25rem",
                  }}
                >
                  Cambridge. ACCA. Careem. Bolt. Wise. Four continents. A decade of watching what actually works at scale — and what looks good in a deck but breaks in the field.
                </p>
              </AnimateIn>
              <AnimateIn delay={300}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                  }}
                >
                  Now based in Tallinn, I work with founders who are serious about using AI and automation to build operations that scale — without breaking at the seams.
                </p>
              </AnimateIn>
              <AnimateIn delay={400}>
                <Link href="/services" className="btn-coral">See how I work →</Link>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS STRIP */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-site" style={{ padding: "1.5rem 1.5rem" }}>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {credentials.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "var(--muted)",
                  letterSpacing: "0.04em",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW I WORK */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "3rem",
              }}
            >
              How I work.
            </h2>
          </AnimateIn>
          <div className="flex flex-col gap-8">
            {principles.map((p, i) => (
              <AnimateIn key={p.num} delay={i * 150}>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    alignItems: "flex-start",
                    paddingBottom: "2rem",
                    borderBottom: i < principles.length - 1 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.8rem",
                      color: "var(--coral)",
                      fontWeight: 500,
                      flexShrink: 0,
                      paddingTop: "0.2rem",
                    }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "1.2rem",
                        color: "var(--ink)",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.95rem",
                        color: "var(--body)",
                        lineHeight: 1.7,
                      }}
                    >
                      {p.body}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
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
              Ready to work together?
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "1rem", color: "var(--faint)", marginBottom: "2rem" }}>
              Available for consulting, builds, and select speaking engagements.
            </p>
          </AnimateIn>
          <AnimateIn delay={250}>
            <Link href="/services" className="btn-coral">See services →</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
