"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import BookingSection from "@/components/BookingSection";
import HeroSection from "@/components/hero-section";

const PORTRAIT_URL =
  "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3a46d312c6d02c8e46bab1_691d97efffebe375af48ce33_Remove_GMNI-removebg-preview.png";

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
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodesRef = useRef<GainNode[]>([]);

  function startMusic() {
    if (audioCtxRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx: AudioContext = new Ctx();
    audioCtxRef.current = ctx;
    const freqs = [261.63, 329.63, 392.0, 440.0, 587.33];
    gainNodesRef.current = [];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.6 + i * 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gainNodesRef.current.push(gain);
    });
    setMusicPlaying(true);
  }

  function stopMusic() {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    gainNodesRef.current.forEach((g) => {
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    });
    setTimeout(() => {
      try { ctx.close(); } catch {}
      audioCtxRef.current = null;
      gainNodesRef.current = [];
    }, 900);
    setMusicPlaying(false);
  }

  function toggleMusic() {
    if (musicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  useEffect(() => {
    const el = document.getElementById("what-i-believe");
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startMusic();
          } else {
            stopMusic();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* KEYFRAMES + THESIS GRID */}
      <style>{`
        @keyframes vinyl-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .thesis-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          align-items: start;
          gap: 0;
        }
        .portrait-col {
          display: block;
        }
        @media (max-width: 768px) {
          .thesis-grid {
            grid-template-columns: 1fr;
          }
          .portrait-col {
            display: none;
          }
        }
      `}</style>

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
      <HeroSection />

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
        <div id="what-i-believe" className="max-w-site thesis-grid">

          {/* LEFT COL — text */}
          <div style={{ maxWidth: 720, paddingRight: "2rem" }}>
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

          {/* RIGHT COL — sticky portrait */}
          <div
            className="portrait-col"
            onClick={toggleMusic}
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {/* Portrait image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PORTRAIT_URL}
              alt="Rizwan Mahmood"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
            />

            {/* Vinyl record — shown when music is playing */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${musicPlaying ? 1 : 0.8})`,
                opacity: musicPlaying ? 1 : 0,
                transition: "opacity 0.4s ease, transform 0.4s ease",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at center, #1a1a1a 0%, #2a2a2a 30%, #1a1a1a 31%, #333 60%, #1a1a1a 61%, #2a2a2a 80%, #1a1a1a 100%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  animation: musicPlaying ? "vinyl-spin 3s linear infinite" : "none",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "#EA6A47",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    Riz
                  </span>
                </div>
              </div>
            </div>

            {/* Click-to-play label */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 0,
                right: 0,
                textAlign: "center",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "0.62rem",
                  color: "rgba(0,0,0,0.35)",
                  letterSpacing: "0.08em",
                  margin: 0,
                }}
              >
                {musicPlaying ? "click to pause ❚❚" : "♪ click to hear me"}
              </p>
            </div>
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

      {/* SECTION 9 — BOOKING */}
      <BookingSection />

      {/* SECTION 10 — CTA */}
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
