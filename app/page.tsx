"use client";
import { useState } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import { useAudio } from "@/contexts/audio-context";

// ─── FLOW CARD ──────────────────────────────────────────────────────────────

const flowNodes = [
  { label: "Trigger", text: "When someone lands on this page", hint: "click to run ▶", type: "trigger" },
  { label: "Step 01", text: "Understand the problem", type: "step" },
  { label: "Step 02", text: "Design & build the system", type: "step" },
  { label: "Output", text: "Something that ships", type: "output" },
];

function FlowCard() {
  const [active, setActive] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const run = () => {
    if (running) return;
    setRunning(true);
    setActive(null);
    flowNodes.forEach((_, i) => {
      setTimeout(() => {
        setActive(i);
        if (i === flowNodes.length - 1) {
          setTimeout(() => { setActive(null); setRunning(false); }, 1200);
        }
      }, i * 700);
    });
  };

  return (
    <div
      style={{
        background: "var(--cream-2)",
        border: "1px solid var(--line)",
        borderRadius: 16,
        padding: "1.5rem",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, var(--line-2) 1px, transparent 1px)",
          backgroundSize: "20px 20px", opacity: 0.6,
        }}
      />
      <div style={{ position: "relative" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <span
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--muted)",
            }}
          >
            workflow.json
          </span>
          <button
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.68rem",
              color: "var(--muted)",
              background: "none",
              border: "1px solid var(--line-2)",
              borderRadius: 99,
              padding: "0.2rem 0.7rem",
              cursor: "default",
            }}
          >
            ♪ sound on
          </button>
        </div>

        {/* Nodes */}
        <div className="flex flex-col gap-2">
          {flowNodes.map((node, i) => (
            <div
              key={i}
              onClick={i === 0 ? run : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.65rem 0.9rem",
                borderRadius: 8,
                border: "1px solid",
                borderColor: active === i ? "var(--coral)" : "var(--line)",
                background: active === i ? "rgba(234,106,71,0.06)" : "#fff",
                transition: "all 0.3s var(--ease)",
                cursor: i === 0 ? "pointer" : "default",
              }}
            >
              <span
                style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: active === i
                    ? "var(--coral)"
                    : i === 0
                    ? "var(--amber)"
                    : "var(--faint)",
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: active === i ? "0 0 0 3px rgba(234,106,71,0.2)" : "none",
                }}
              />
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.65rem",
                    color: active === i ? "var(--coral)" : "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: 2,
                    transition: "color 0.3s ease",
                  }}
                >
                  {node.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.85rem",
                    color: active === i ? "var(--ink)" : "var(--body)",
                    fontWeight: active === i ? 600 : 400,
                    transition: "all 0.3s ease",
                  }}
                >
                  {node.text}
                </span>
              </div>
              {i === 0 && !running && (
                <span
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.65rem",
                    color: "var(--amber)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {node.hint}
                </span>
              )}
              {node.type === "output" && active === i && (
                <span style={{ color: "var(--coral)", fontSize: "0.9rem", fontWeight: 700 }}>✓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PROOF CARDS ────────────────────────────────────────────────────────────

const proofCards = [
  {
    num: "01",
    text: "10 years in operations across 4 continents — Careem, Bolt, Motive, Wise.",
  },
  {
    num: "02",
    text: "Shipped a hand-tracking arcade game with zero coding background.",
  },
  {
    num: "03",
    text: "Won a wrongful-termination case against Bolt — then published every document.",
  },
  {
    num: "04",
    text: "Member, Anthropic Claude Partner Network.",
  },
];

// ─── WORK CARDS ─────────────────────────────────────────────────────────────

const workCards = [
  {
    badge: "Proof",
    title: "Bug Catcher",
    body: "I'd never written a line of code. So I built a browser arcade game you play with your hands — live hand-tracking, built in public.",
    footer: "SHIPPED · PLAYABLE · POSTED ON LINKEDIN",
    link: "Read the story →",
  },
  {
    badge: "Automation",
    title: "The content engine",
    body: "Five connected n8n workflows that research, write, illustrate and publish — on their own. It runs without me.",
    footer: "LIVE · PUBLISHING WEEKLY",
    link: "See the build →",
  },
  {
    badge: "Receipt",
    title: "The Bolt case",
    body: "I won. Then I published every document. A wrongful-termination case at the Estonian Labour Dispute Committee — turned into a transparent series.",
    footer: "LINKEDIN · SUBSTACK · YOUTUBE",
    link: "Read it →",
  },
];

// ─── VIDEO TILES ─────────────────────────────────────────────────────────────

const videoTiles = [
  { title: "Stand-up · AI bit", duration: "0:48", gradient: "linear-gradient(160deg, #1b2e24 0%, #0e1f17 100%)" },
  { title: "Build session", duration: "3:12", gradient: "linear-gradient(160deg, #2c1a16 0%, #1c0d0a 100%)" },
  { title: "The podcast", duration: "28:40", gradient: "linear-gradient(160deg, #191d2c 0%, #0e1220 100%)" },
  { title: "Keynote · Tallinn", duration: "19:05", gradient: "linear-gradient(160deg, #2c2116 0%, #1c150c 100%)" },
  { title: "n8n breakdown", duration: "5:30", gradient: "linear-gradient(160deg, #1b2e24 0%, #0e1f17 100%)" },
  { title: "Stand-up · Urdu set", duration: "1:20", gradient: "linear-gradient(160deg, #2c1a16 0%, #1c0d0a 100%)" },
  { title: "Reel · the thesis", duration: "0:59", gradient: "linear-gradient(160deg, #191d2c 0%, #0e1220 100%)" },
  { title: "Workshop clip", duration: "4:15", gradient: "linear-gradient(160deg, #2c2116 0%, #1c150c 100%)" },
];
const allTiles = [...videoTiles, ...videoTiles];

// ─── PROCESS STEPS ──────────────────────────────────────────────────────────

const processSteps = [
  {
    num: "01",
    title: "Get clear",
    body: "Before tools, before n8n, before any of it — what's the actual problem? This is where most projects fail. Not here.",
  },
  {
    num: "02",
    title: "Design the system",
    body: "Map the workflow on paper. Decide what stays human and what doesn't. Architecture before wiring.",
  },
  {
    num: "03",
    title: "Build & test",
    body: "Rapid iteration, you in the loop. I build, you pressure-test, we tighten until it runs without thinking.",
  },
  {
    num: "04",
    title: "Hand it over",
    body: "Documentation, training, no lock-in. You own the machine completely.",
  },
];

// ─── ROUTES ─────────────────────────────────────────────────────────────────

const routes = [
  {
    title: "Consulting & coaching",
    sub: "1:1 advisory and fractional product / ops. From $160/hr.",
    href: "/services/consulting",
    rightLabel: null,
  },
  {
    title: "A system built for you",
    sub: "Custom AI workflow automations. That's what my company does.",
    href: "/services/projects",
    rightLabel: "Soch →",
  },
  {
    title: "Speaking & workshops",
    sub: "Talks and team sessions on AI leverage and the future of work.",
    href: "/services/speaking",
    rightLabel: null,
  },
  {
    title: "Just want to learn?",
    sub: "I write about this every week. Start reading.",
    href: "/blog",
    rightLabel: "Writing →",
  },
];

// ─── BLOG POSTS ─────────────────────────────────────────────────────────────

const blogPosts = [
  {
    meta: "2026 · 06 · Opinion",
    title: '"Just add AI" is the new "just add blockchain"',
    excerpt: "Bolting AI onto a broken process doesn't fix the process. It just makes the mess faster.",
  },
  {
    meta: "2026 · 05 · Field notes",
    title: "I let an automation write for a month. Here's what broke.",
    excerpt: "The pipeline ran beautifully. The thinking behind it didn't. A story about where the human still matters.",
  },
  {
    meta: "2026 · 05 · Operations",
    title: "The boring part is the part that matters",
    excerpt: "Ten years of scaling ops taught me the unglamorous truth about what actually compounds.",
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const { isPlaying, toggle } = useAudio();

  return (
    <>
      {/* LEFT DECORATIVE RAIL */}
      <div
        className="hidden md:block"
        style={{
          position: "fixed",
          left: 28,
          top: 0,
          width: 2,
          height: "100vh",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 2,
            height: "100%",
            background: "#EA6A47",
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#EA6A47",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#EA6A47",
          }}
        />
      </div>

      {/* SECTION 1 — HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="max-w-site">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <AnimateIn>
                <p
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Operator · Builder · Tallinn
                </p>
              </AnimateIn>
              <AnimateIn delay={80}>
                <h1
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(2.8rem, 6vw, 5rem)",
                    lineHeight: 1.12,
                    color: "var(--ink)",
                    marginBottom: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  AI doesn&apos;t fix bad thinking.
                  <em style={{ color: "var(--coral)", fontStyle: "italic", display: "block" }}>It scales it.</em>
                </h1>
              </AnimateIn>
              <AnimateIn delay={180}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.1rem",
                    color: "var(--body)",
                    lineHeight: 1.75,
                    marginBottom: "2rem",
                    maxWidth: 460,
                  }}
                >
                  I&apos;m Riz. Ten years running operations at Careem, Bolt and Wise. Now I help founders think clearly enough that automation actually works — and I build the systems that prove it.
                </p>
              </AnimateIn>
              <AnimateIn delay={280}>
                <div className="flex flex-wrap gap-3">
                  <Link href="/case-studies" className="btn-coral">See what I&apos;ve built →</Link>
                  <Link href="#thesis" className="btn-ghost">Read how I think →</Link>
                </div>
              </AnimateIn>
            </div>

            {/* Right — Portrait placeholder */}
            <AnimateIn delay={200}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <button
                  onClick={toggle}
                  aria-label={isPlaying ? "Pause intro audio" : "Play intro audio"}
                  style={{
                    display: "block",
                    position: "relative",
                    width: "100%",
                    maxWidth: 320,
                    aspectRatio: "4 / 5",
                    borderRadius: 16,
                    background: "linear-gradient(150deg, #EA6A47 0%, #CE5430 100%)",
                    border: "none",
                    cursor: "pointer",
                    overflow: "hidden",
                    padding: 0,
                  }}
                >
                  {/* Dot grid overlay */}
                  <svg
                    aria-hidden="true"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22, pointerEvents: "none" }}
                  >
                    <defs>
                      <pattern id="portrait-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.2" fill="#fff" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#portrait-dots)" />
                  </svg>

                  {/* Content: name + play/soundbar */}
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: "1.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(3rem, 8vw, 4.5rem)",
                        fontWeight: 700,
                        fontStyle: "italic",
                        color: "#fff",
                        opacity: isPlaying ? 0.35 : 1,
                        transition: "opacity 0.3s ease",
                        lineHeight: 1,
                      }}
                    >
                      Riz
                    </span>

                    {isPlaying ? (
                      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 28 }}>
                        {[0.55, 1, 0.7, 0.9, 0.45].map((h, i) => (
                          <div
                            key={i}
                            style={{
                              width: 4, borderRadius: 2,
                              background: "rgba(255,255,255,0.85)",
                              height: `${h * 100}%`,
                              animation: `soundbar 0.85s ease-in-out ${i * 0.13}s infinite alternate`,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 44, height: 44, borderRadius: "50%",
                          background: "rgba(255,255,255,0.18)",
                          border: "1.5px solid rgba(255,255,255,0.45)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <polygon points="5,2 14,8 5,14" fill="white" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                <p
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.65rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {isPlaying ? "click to pause ▐▐" : "click to hear me →"}
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* SECTION 1.5 — WORKFLOW CARD */}
      <section style={{ paddingBottom: 80 }}>
        <div className="max-w-site">
          <AnimateIn>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--muted)",
                marginBottom: "1.25rem",
              }}
            >
              How a project runs
            </p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <div style={{ maxWidth: 520 }}>
              <FlowCard />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 2 — PROOF */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>01 · Proof</p>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {proofCards.map((card, i) => (
              <AnimateIn key={card.num} delay={i * 100}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "1.5rem",
                    minHeight: 180,
                    boxShadow: "var(--shadow)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--coral)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {card.num}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.9rem",
                      color: "var(--body)",
                      lineHeight: 1.65,
                    }}
                  >
                    {card.text}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — THESIS */}
      <section id="thesis" style={{ padding: "6rem 0" }}>
        <div className="max-w-site">
          <div style={{ maxWidth: 720 }}>
            <AnimateIn>
              <p className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>02 · What I believe</p>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  color: "var(--ink)",
                  fontWeight: 700,
                  marginBottom: "2.5rem",
                }}
              >
                What I actually believe.
              </h2>
            </AnimateIn>

            {[
              "Everyone's selling AI like it's a brain you can rent. It isn't.",
              "AI doesn't think for you. It thinks like you — faster, and at scale.",
              "Feed it muddled thinking and you get muddled output. Just more of it.",
            ].map((line, i) => (
              <AnimateIn key={i} delay={100 + i * 80}>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                    color: "var(--body)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}
                >
                  {line}
                </p>
              </AnimateIn>
            ))}

            <AnimateIn delay={400}>
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                  color: "var(--ink)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                  fontWeight: 700,
                }}
              >
                Feed it clarity and it becomes leverage.
              </p>
            </AnimateIn>

            {[
              "So the work was never 'add AI.' The work is: get clear on the actual problem, design the system, then let the machine run it.",
              "The teams I watched scale weren't the ones with the best tools. They were the ones who thought clearly before they built.",
            ].map((line, i) => (
              <AnimateIn key={i} delay={480 + i * 80}>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                    color: "var(--body)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}
                >
                  {line}
                </p>
              </AnimateIn>
            ))}

            <AnimateIn delay={660}>
              <div style={{ marginTop: "1rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
                    color: "var(--ink)",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  That&apos;s the whole game.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                    color: "var(--coral)",
                    fontStyle: "italic",
                  }}
                >
                  Think first. Then automate.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WORK */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>03 · Selected work</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Things I&apos;ve actually shipped.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--muted)",
                marginBottom: "3rem",
              }}
            >
              Not a claim. Evidence. Each one is the thesis in action.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-5">
            {workCards.map((card, i) => (
              <AnimateIn key={card.title} delay={i * 120}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid",
                    borderColor: hoveredWork === i ? "var(--coral)" : "var(--line)",
                    borderRadius: 12,
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    height: "100%",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
                    boxShadow: hoveredWork === i ? "0 8px 32px rgba(234,106,71,0.12)" : "var(--shadow)",
                    transform: hoveredWork === i ? "translateY(-3px)" : "none",
                    cursor: "default",
                    position: "relative",
                  }}
                  onMouseEnter={() => setHoveredWork(i)}
                  onMouseLeave={() => setHoveredWork(null)}
                >
                  {/* Connector dot left */}
                  <div
                    style={{
                      position: "absolute",
                      left: -5, top: "50%",
                      width: 9, height: 9, borderRadius: "50%",
                      background: "var(--line-2)", border: "1.5px solid #fff",
                      transform: "translateY(-50%)",
                    }}
                  />
                  {/* Connector dot right */}
                  <div
                    style={{
                      position: "absolute",
                      right: -5, top: "50%",
                      width: 9, height: 9, borderRadius: "50%",
                      background: "var(--line-2)", border: "1.5px solid #fff",
                      transform: "translateY(-50%)",
                    }}
                  />

                  {/* Badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span
                      style={{
                        width: 6, height: 6, borderRadius: 1,
                        background: "var(--coral)", flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "0.68rem",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--coral)",
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.2rem",
                      color: "var(--ink)",
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.9rem",
                      color: "var(--body)",
                      lineHeight: 1.7,
                      flex: 1,
                    }}
                  >
                    {card.body}
                  </p>

                  <p
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.65rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "var(--faint)",
                    }}
                  >
                    {card.footer}
                  </p>

                  <Link
                    href="/case-studies"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--coral)",
                      textDecoration: "none",
                    }}
                  >
                    {card.link}
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — ON CAMERA */}
      <section style={{ padding: "5rem 0", overflow: "hidden" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>04 · On camera</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Where systems meet personality.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--muted)",
                marginBottom: "2.5rem",
              }}
            >
              I don&apos;t just build the machines — I talk about them. Stand-up, breakdowns, the podcast. There&apos;s a human behind the automations.
            </p>
          </AnimateIn>
        </div>

        {/* Marquee */}
        <div className="marquee-wrap" style={{ overflow: "hidden" }}>
          <div className="marquee-track">
            {allTiles.map((tile, i) => (
              <div
                key={i}
                style={{
                  width: 230,
                  height: 330,
                  borderRadius: 12,
                  background: tile.gradient,
                  flexShrink: 0,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Play button */}
                <div
                  style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#fff", fontSize: "1rem", marginLeft: 3 }}>▶</span>
                </div>

                {/* Bottom label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    padding: "1.5rem 1rem 0.75rem",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {tile.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {tile.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROCESS */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>05 · How I think</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Clarity is step zero.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--muted)",
                marginBottom: "3rem",
                maxWidth: 520,
              }}
            >
              Most &apos;automation&apos; projects fail before a single tool is opened. This is the order that doesn&apos;t.
            </p>
          </AnimateIn>

          {/* Steps row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-4"
          >
            {processSteps.map((step, i) => (
              <AnimateIn key={step.num} delay={i * 120}>
                <div style={{ position: "relative" }}>
                  {/* Arrow connector (desktop) */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="hidden md:block"
                      style={{
                        position: "absolute",
                        right: -20,
                        top: "1.25rem",
                        color: "var(--faint)",
                        fontSize: "1.1rem",
                        fontWeight: 300,
                        zIndex: 1,
                      }}
                    >
                      →
                    </div>
                  )}
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid var(--line)",
                      borderRadius: 12,
                      padding: "1.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "1.8rem",
                        fontWeight: 600,
                        color: "var(--coral)",
                        opacity: 0.4,
                        display: "block",
                        marginBottom: "0.75rem",
                        lineHeight: 1,
                      }}
                    >
                      {step.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "1.1rem",
                        color: "var(--ink)",
                        fontWeight: 700,
                        marginBottom: "0.65rem",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.875rem",
                        color: "var(--body)",
                        lineHeight: 1.7,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                  {/* Arrow (mobile) */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="flex md:hidden justify-center"
                      style={{ padding: "0.75rem 0", color: "var(--faint)", fontSize: "1rem" }}
                    >
                      ↓
                    </div>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — ROUTES */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>06 · Working with me</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "2.5rem",
              }}
            >
              How people work with me.
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  width: 8, height: 8, borderRadius: 1,
                  background: "var(--amber)", flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Switch — pick a branch
              </span>
            </div>
          </AnimateIn>

          <div className="flex flex-col">
            {routes.map((route, i) => (
              <AnimateIn key={route.title} delay={200 + i * 80}>
                <Link
                  href={route.href}
                  style={{ textDecoration: "none" }}
                  onMouseEnter={() => setHoveredRoute(i)}
                  onMouseLeave={() => setHoveredRoute(null)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.5rem 1rem 1.5rem 1.5rem",
                      borderLeft: "2px solid",
                      borderLeftColor: hoveredRoute === i ? "var(--coral)" : "var(--line)",
                      borderBottom: "1px solid var(--line)",
                      transition: "all 0.2s var(--ease)",
                      transform: hoveredRoute === i ? "translateX(6px)" : "none",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "1.1rem",
                          color: "var(--ink)",
                          fontWeight: 600,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {route.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.875rem",
                          color: "var(--muted)",
                        }}
                      >
                        {route.sub}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                      {route.rightLabel && (
                        <span
                          style={{
                            fontFamily: "var(--font-dm-mono), monospace",
                            fontSize: "0.72rem",
                            color: "var(--coral)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {route.rightLabel}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: hoveredRoute === i ? "var(--coral)" : "var(--muted)",
                          transition: "color 0.2s ease",
                        }}
                      >
                        Details →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — WRITING */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>07 · Writing</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              I think out loud.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--muted)",
                marginBottom: "3rem",
              }}
            >
              Notes on automation, operations, and using AI without losing the plot. New stuff most weeks.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-5">
            {blogPosts.map((post, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    height: "100%",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.68rem",
                      color: "var(--faint)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {post.meta}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.4,
                      flex: 1,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--body)",
                      lineHeight: 1.65,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    href="/blog"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--coral)",
                      textDecoration: "none",
                    }}
                  >
                    Read →
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={400}>
            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <Link href="/blog" className="btn-ghost">Read everything →</Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 9 — CTA */}
      <section style={{ padding: "6rem 0" }}>
        <div className="max-w-site" style={{ maxWidth: 680 }}>
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color: "var(--ink)",
                fontWeight: 700,
                lineHeight: 1.25,
                marginBottom: "1.25rem",
              }}
            >
              Got a process that should run itself?
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.05rem",
                color: "var(--body)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              Tell me what&apos;s eating your week. If it can be automated, I&apos;ll show you how — and if it shouldn&apos;t be, I&apos;ll tell you that too.
            </p>
          </AnimateIn>
          <AnimateIn delay={200}>
            <div className="flex flex-wrap gap-3">
              <Link href="/services/consulting" className="btn-coral">Book a call →</Link>
              <a href="mailto:riz@withsoch.com" className="btn-ghost">riz@withsoch.com</a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
