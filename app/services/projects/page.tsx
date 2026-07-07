"use client";
import AnimateIn from "@/components/AnimateIn";
import DirectLineCTA from "@/components/DirectLineCTA";
import { ProofChip, ProofChipRow, ProofChipIconAward, ProofChipIconGlobe, ProofChipIconCheck } from "@/components/ProofChip";
import { useParallax, useScrollFadeOut } from "@/hooks/useParallax";

const checkBullet = (text: string, i: number) => (
  <AnimateIn as="li" key={text} delay={i * 80} className="svc-check-item">
    <span
      className="svc-check-icon"
      style={{ background: "color-mix(in srgb, var(--coral) 16%, transparent)", color: "var(--coral)" }}
    >
      ✓
    </span>
    <span>{text}</span>
  </AnimateIn>
);

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
  const heroTextureRef = useParallax<HTMLDivElement>(0.1);
  const heroFadeRef = useScrollFadeOut<HTMLDivElement>(380);

  return (
    <>
      {/* HERO */}
      <section className="svc-hero-section" style={{ background: "var(--cream-2)" }}>
        <div className="svc-hero-texture" ref={heroTextureRef} data-parallax />
        <div className="max-w-site" ref={heroFadeRef}>
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
              Custom AI{" "}
              <span style={{ fontFamily: "var(--font-fraunces), serif", fontStyle: "italic", color: "var(--coral)" }}>
                workflow
              </span>
              {" "}automations.
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
          <AnimateIn delay={240}>
            <ProofChipRow>
              <ProofChip icon={<ProofChipIconAward />}>10+ yrs ops — Careem · Bolt · Wise</ProofChip>
              <ProofChip icon={<ProofChipIconGlobe />}>4 continents</ProofChip>
              <ProofChip icon={<ProofChipIconCheck />}>Anthropic Partner</ProofChip>
            </ProofChipRow>
          </AnimateIn>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section style={{ padding: "112px 0" }}>
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
              <AnimateIn key={b.title} delay={i * 80}>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 18,
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
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.25rem" }}>
                {[
                  "Fixed price quoted before we start",
                  "Built in n8n, documented, and handed over",
                  "You own the automation completely — no lock-in",
                ].map((t, i) => checkBullet(t, i))}
              </ul>
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

      {/* DIRECT LINE */}
      <section style={{ background: "var(--cream)", padding: "112px 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <DirectLineCTA />
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
