"use client";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const credentials = [
  "Cambridge", "ACCA", "Careem", "Bolt", "Wise",
  "Tallinn", "Anthropic Partner Network",
];

const principles = [
  {
    title: "Clarity first",
    body: "I don't touch tools until the problem is clear. Most projects fail here — not in execution.",
  },
  {
    title: "Build to own",
    body: "No lock-in. No dependency on me. You get the system, the docs, and the ability to run it yourself.",
  },
  {
    title: "Operator, not theorist",
    body: "Ten years of actual operations. I know what breaks at scale because I've watched it break.",
  },
  {
    title: "Taste matters",
    body: "The systems I build are ones I'd want to use. That's not a soft thing — it's quality control.",
  },
];

const socials = [
  { label: "LinkedIn", handle: "@riz", href: "https://www.linkedin.com/in/riz" },
  { label: "YouTube", handle: "@VibeWithRiz", href: "https://www.youtube.com/@VibeWithRiz" },
  { label: "Instagram", handle: "@etz.riz", href: "https://www.instagram.com/etz.riz/" },
  { label: "Substack", handle: "conversationswithriz", href: "https://conversationswithriz.substack.com/" },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="max-w-site">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Portrait placeholder */}
            <AnimateIn>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  borderRadius: 16,
                  background: "linear-gradient(160deg, var(--coral) 0%, var(--coral-d) 100%)",
                  border: "1px solid var(--line)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Grid overlay */}
                <div
                  style={{
                    position: "absolute", inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontWeight: 700,
                      fontSize: "4rem",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    Riz
                  </span>
                </div>
              </div>
            </AnimateIn>

            {/* Text */}
            <div>
              <AnimateIn>
                <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>About Riz</p>
              </AnimateIn>
              <AnimateIn delay={80}>
                <h1
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(2rem, 4vw, 2.8rem)",
                    lineHeight: 1.2,
                    color: "var(--ink)",
                    fontWeight: 700,
                    marginBottom: "1.75rem",
                  }}
                >
                  Operator. Builder.{" "}
                  <em style={{ fontStyle: "italic" }}>Occasionally funny.</em>
                </h1>
              </AnimateIn>
              <AnimateIn delay={180}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.75,
                    marginBottom: "1.25rem",
                  }}
                >
                  Ten years running operations across four continents. Cambridge. ACCA. Careem. Bolt. Wise.
                </p>
              </AnimateIn>
              <AnimateIn delay={260}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                  }}
                >
                  Now in Tallinn, building with AI and figuring out what actually changes when smart people get powerful tools.
                </p>
              </AnimateIn>
              <AnimateIn delay={340}>
                <Link href="/services" className="btn-coral">See how I work →</Link>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS STRIP */}
      <section
        style={{
          background: "var(--cream)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "1.5rem 0",
        }}
      >
        <div className="max-w-site">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {credentials.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
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

      {/* PRINCIPLES */}
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
              How I think about the work.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 100}>
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
                      fontSize: "1.2rem",
                      color: "var(--ink)",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
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
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "4rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <div
              style={{
                maxWidth: 680,
                margin: "0 auto",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)",
                  color: "var(--ink)",
                  fontStyle: "italic",
                  lineHeight: 1.65,
                }}
              >
                &ldquo;I&apos;m not here to automate your job. I&apos;m here to automate the parts of it that are eating you alive.&rdquo;
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SOCIALS */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "2rem",
              }}
            >
              Find me elsewhere.
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socials.map((s, i) => (
              <AnimateIn key={s.label} delay={i * 80}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 12,
                      padding: "1.5rem",
                      background: "#fff",
                      boxShadow: "var(--shadow)",
                      transition: "box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-lg)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--coral)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)";
                      (e.currentTarget as HTMLDivElement).style.transform = "none";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--line)";
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "var(--ink)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {s.label} ↗
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "0.72rem",
                        color: "var(--muted)",
                      }}
                    >
                      {s.handle}
                    </p>
                  </div>
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY BLOCK */}
      <section style={{ background: "var(--ink)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <div style={{ maxWidth: 560 }}>
            <AnimateIn>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Working on something bigger?
              </h2>
            </AnimateIn>
            <AnimateIn delay={100}>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "1.05rem",
                  color: "var(--faint)",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                Soch is my company. We build AI workflow systems for founders and ops teams.
              </p>
            </AnimateIn>
            <AnimateIn delay={200}>
              <a
                href="https://withsoch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-coral"
              >
                Visit Soch →
              </a>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
