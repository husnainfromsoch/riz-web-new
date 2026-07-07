"use client";
import AnimateIn from "@/components/AnimateIn";
import DirectLineCTA from "@/components/DirectLineCTA";
import { ProofChip, ProofChipRow, ProofChipIconAward, ProofChipIconGlobe, ProofChipIconCheck } from "@/components/ProofChip";
import SpeakingHeroPhoto from "@/components/SpeakingHeroPhoto";
import { useParallax, useScrollFadeOut } from "@/hooks/useParallax";

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
  const heroTextureRef = useParallax<HTMLDivElement>(0.1);
  const heroFadeRef = useScrollFadeOut<HTMLDivElement>(380);

  return (
    <>
      {/* HERO */}
      <section className="svc-hero-section speaking-hero-section" style={{ background: "var(--cream-2)" }}>
        <div className="svc-hero-texture" ref={heroTextureRef} data-parallax />
        <div className="max-w-site speaking-hero-grid" ref={heroFadeRef}>
          <div className="speaking-hero-text">
            <AnimateIn delay={80}>
              <h1
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(3rem, 5vw, 4.25rem)",
                  lineHeight: 1.2,
                  color: "var(--ink)",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                }}
              >
                On stages and{" "}
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontStyle: "italic", color: "var(--coral)" }}>
                  in rooms
                </span>
                .
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
            <AnimateIn delay={240}>
              <div className="speaking-proof-chips">
                <ProofChipRow>
                  <ProofChip icon={<ProofChipIconAward />}>10+ yrs ops — Careem · Bolt · Wise</ProofChip>
                  <ProofChip icon={<ProofChipIconGlobe />}>4 continents</ProofChip>
                  <ProofChip icon={<ProofChipIconCheck />}>Anthropic Partner</ProofChip>
                </ProofChipRow>
              </div>
            </AnimateIn>
          </div>
          <AnimateIn delay={320} className="speaking-hero-photo-anim">
            <SpeakingHeroPhoto />
          </AnimateIn>
        </div>
      </section>

      <style>{`
        .svc-hero-section.speaking-hero-section {
          padding-top: 116px;
        }
        .speaking-hero-grid {
          display: grid;
          grid-template-columns: 55% 40%;
          gap: 5%;
          align-items: center;
        }
        .animate-in.speaking-hero-photo-anim {
          transform: translateX(48px);
        }
        .animate-in.visible.speaking-hero-photo-anim {
          transform: translateX(0);
        }
        .speaking-hero-photo {
          height: 520px;
          max-height: 520px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 48px rgba(120, 66, 30, 0.18), 0 8px 20px rgba(120, 66, 30, 0.12);
          will-change: transform;
        }
        .speaking-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .speaking-proof-chips > div > span {
          color: #3A3A3A !important;
          opacity: 1 !important;
        }
        @media (max-width: 860px) {
          .speaking-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .speaking-hero-photo {
            height: 340px;
            width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .speaking-hero-photo-anim {
            transform: none !important;
          }
        }
      `}</style>

      {/* TOPICS + FORMATS */}
      <section style={{ padding: "112px 0" }}>
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
                <AnimateIn key={t.title} delay={i * 80}>
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
                  <AnimateIn
                    key={f.label}
                    delay={i * 80}
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
                  </AnimateIn>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* DIRECT LINE — booking enquiries */}
      <section style={{ background: "var(--cream)", padding: "112px 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <DirectLineCTA
              heading={
                <>
                  Booking{" "}
                  <span className="chat-hayat-heading-accent">enquiries.</span>
                </>
              }
              description="Tell me about the event, the audience, and what you want them to leave thinking."
              primaryLabel="riz@withsoch.com"
              primaryHref="mailto:riz@withsoch.com"
              secondaryLabel="Fill out a brief →"
              secondaryHref="/services/consulting#book"
              secondaryExternal={false}
            />
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
