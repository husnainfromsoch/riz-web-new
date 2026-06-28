"use client";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const chips = [
  "Cambridge", "Careem", "Bolt", "Wise", "Tallinn", "Anthropic Partner",
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
  {
    label: "LinkedIn",
    channel: "Riz",
    description: "Weekly systems thinking for operators.",
    href: "https://linkedin.com/in/riz",
    icon: (
      <svg viewBox="0 0 24 24" width={26} height={26} fill="#0077B5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    channel: "Rizwan talks",
    description: "Breakdowns, keynotes, and n8n builds.",
    href: "https://youtube.com/@riz",
    icon: (
      <svg viewBox="0 0 24 24" width={26} height={26} fill="#FF0000" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    channel: "@riz.ai",
    description: "Behind the automations.",
    href: "https://instagram.com/riz.ai",
    icon: (
      <svg viewBox="0 0 24 24" width={26} height={26} fill="#C13584" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Substack",
    channel: "Systematic thinking",
    description: "Long-form essays on AI and ops.",
    href: "https://riz.substack.com",
    icon: (
      <svg viewBox="0 0 24 24" width={26} height={26} fill="#FF6719" aria-hidden="true">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    label: "Podcast",
    channel: "The Riz Podcast",
    description: "Conversations with builders.",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" width={26} height={26} fill="#8B5CF6" aria-hidden="true">
        <path d="M12 1a4 4 0 014 4v6a4 4 0 01-8 0V5a4 4 0 014-4zm0 2a2 2 0 00-2 2v6a2 2 0 004 0V5a2 2 0 00-2-2zm6.5 6a1 1 0 011 1 7.5 7.5 0 01-15 0 1 1 0 112 0 5.5 5.5 0 0011 0 1 1 0 011-1zm-6.5 9a1 1 0 011 1v2h2a1 1 0 010 2H9a1 1 0 010-2h2v-2a1 1 0 011-1z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    channel: "@rizwanjavaid",
    description: "Raw thoughts, faster.",
    href: "https://twitter.com/rizwanjavaid",
    icon: (
      <svg viewBox="0 0 24 24" width={26} height={26} fill="#000" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <>
      <style>{`
        @keyframes termCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .term-cursor { animation: termCursor 1s ease infinite; }
      `}</style>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="max-w-site">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr",
              gap: "3.5rem",
              alignItems: "stretch",
            }}
            className="about-hero-grid"
          >
            {/* Terminal block */}
            <AnimateIn>
              <div
                style={{
                  background: "#22332C",
                  borderRadius: 12,
                  padding: "28px 32px",
                  minHeight: 480,
                  height: "100%",
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "0.78rem",
                  lineHeight: 1.8,
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                }}
              >
                {/* Traffic lights */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EA6A47", flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#D79A36", flexShrink: 0 }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4CAF50", flexShrink: 0 }} />
                </div>

                {/* Code lines */}
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#D79A36", margin: 0 }}># Operator thinking, automated</p>
                  <p style={{ margin: 0 }}>&nbsp;</p>
                  <p style={{ margin: 0 }}>
                    <span style={{ color: "#EA6A47" }}>trigger</span>
                    <span style={{ color: "#F3ECDD" }}>: new_lead_from_linkedin</span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <span style={{ color: "#EA6A47" }}>enrich</span>
                    <span style={{ color: "#F3ECDD" }}>: apify.scrape_profile()</span>
                  </p>
                  <p style={{ margin: 0 }}>
                    <span style={{ color: "#EA6A47" }}>qualify</span>
                    <span style={{ color: "#F3ECDD" }}>: claude.score(lead, rubric)</span>
                  </p>
                  <p style={{ color: "#D79A36", margin: 0 }}>if score &gt;= 8:</p>
                  <p style={{ margin: 0 }}>
                    <span style={{ color: "#F3ECDD" }}>&nbsp;&nbsp;</span>
                    <span style={{ color: "#EA6A47" }}>route_to</span>
                    <span style={{ color: "#F3ECDD" }}>: &ldquo;riz@withsoch.com&rdquo;</span>
                  </p>
                  <p style={{ margin: 0 }}>&nbsp;</p>
                  <p style={{ color: "#4CAF50", margin: 0 }}>→ Running · 847 leads processed · 99% accuracy</p>
                </div>

                {/* Blinking cursor */}
                <span className="term-cursor" style={{ color: "#F3ECDD", marginTop: 8 }}>_</span>
              </div>
            </AnimateIn>

            {/* Text */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.25rem" }}>
              <AnimateIn>
                <h1
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  Operator. Builder.
                </h1>
              </AnimateIn>

              <AnimateIn delay={80}>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)",
                    color: "var(--coral)",
                    fontStyle: "italic",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Occasionally funny.
                </p>
              </AnimateIn>

              <AnimateIn delay={160}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  Ten years running operations across four continents. Cambridge. ACCA. Careem. Bolt. Wise.
                </p>
              </AnimateIn>

              <AnimateIn delay={240}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--body)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  Now in Tallinn, building AI and figuring out what actually changes when smart people get powerful tools.
                </p>
              </AnimateIn>

              <AnimateIn delay={320}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        color: "var(--ink)",
                        background: "#FAF6EF",
                        border: "1px solid #E7E0D2",
                        borderRadius: 999,
                        padding: "5px 14px",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </AnimateIn>

              <AnimateIn delay={400}>
                <Link href="/services" className="btn-coral" style={{ alignSelf: "flex-start" }}>
                  See how I work →
                </Link>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* FIND ME ELSEWHERE */}
      <section style={{ paddingBottom: "5rem" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.75rem",
              }}
            >
              05 · FIND ME ELSEWHERE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.6rem",
                lineHeight: 1.2,
              }}
            >
              I show up in a few places.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--body)",
                marginBottom: "2.5rem",
                lineHeight: 1.6,
              }}
            >
              Talks, essays, breakdowns, and the occasional hot take. Pick your platform.
            </p>
          </AnimateIn>
        </div>

        <div className="social-ticker-wrap">
          <div className="social-ticker-track">
            {[...socials, ...socials].map((s, i) => (
              <a
                key={`${s.label}-${i}`}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-ticker-card"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>{s.icon}</div>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "1rem",
                      color: "var(--muted)",
                      lineHeight: 1,
                    }}
                  >
                    ↗
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "var(--ink)",
                      margin: 0,
                      marginBottom: "0.15rem",
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      margin: 0,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {s.channel}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.8rem",
                      color: "var(--body)",
                      margin: 0,
                      lineHeight: 1.45,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-site">
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.88rem",
              fontStyle: "italic",
              color: "var(--muted)",
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            Or just reply to one of my Substack emails. That works too.
          </p>
        </div>
      </section>

      {/* COMPANY BANNER */}
      <section style={{ background: "#22332C", padding: "5rem 0" }}>
        <div className="max-w-site">
          <div style={{ maxWidth: 600 }}>
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
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.75,
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

      {/* HOW I THINK ABOUT THE WORK */}
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
                      margin: 0,
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
      <section
        style={{
          background: "var(--cream)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "4rem 0",
        }}
      >
        <div className="max-w-site">
          <AnimateIn>
            <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", padding: "2rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)",
                  color: "var(--ink)",
                  fontStyle: "italic",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                &ldquo;I&apos;m not here to automate your job. I&apos;m here to automate the parts of it that are eating you alive.&rdquo;
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
