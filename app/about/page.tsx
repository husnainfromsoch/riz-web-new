"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import CalBookingButton from "@/components/CalModal";
import { Mic, Globe, Languages, Handshake } from "lucide-react";

const pills = [
  "Cambridge", "Careem", "Bolt", "Wise", "Tallinn", "Anthropic Partner",
];

const timeline = [
  {
    year: "2013",
    company: "Cambridge",
    body: "Read Economics. Learned how systems break before they scale. First time I understood that clarity precedes everything else.",
    active: false,
  },
  {
    year: "2015",
    company: "Careem",
    body: "Joined as one of the early ops hires. Scaled courier operations across multiple cities. Saved $3.9M in costs. Learned what real scale feels like.",
    active: false,
  },
  {
    year: "2018",
    company: "Wise",
    body: "Ran operations for payments infrastructure. Achieved 92% straight-through processing. First time I saw automation done right.",
    active: false,
  },
  {
    year: "2021",
    company: "Bolt",
    body: "Scaled across 4 markets. Won a wrongful termination case and published every document publicly. Some lessons cost more than others.",
    active: false,
  },
  {
    year: "2023",
    company: "Tallinn",
    body: "Landed in Estonia and stayed. Building toward citizenship. Learning Estonian. Running Soch with two people I trust.",
    active: false,
  },
  {
    year: "2024",
    company: "Now",
    body: "Building AI systems for founders who want to think clearly first, then automate. Recording a podcast. Shipping things I have no business building.",
    active: true,
  },
];

const trackRecordStats = [
  {
    target: 3.9,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    label: "COURIER COSTS SAVED",
    context: "Careem · Operations",
    delay: "0s",
  },
  {
    target: 92,
    prefix: "",
    suffix: "%",
    decimals: 0,
    label: "STRAIGHT-THROUGH PROCESSING",
    context: "Wise · Finance",
    delay: "0.5s",
  },
  {
    target: 20,
    prefix: "",
    suffix: "s",
    decimals: 0,
    label: "DISPATCH TIME (WAS 3 MIN)",
    context: "Careem · Logistics",
    delay: "1s",
  },
  {
    target: 4,
    prefix: "",
    suffix: "",
    decimals: 0,
    label: "MARKETS SCALED",
    context: "Bolt · Expansion",
    delay: "1.5s",
  },
];

const beyondFacts = [
  {
    icon: Mic,
    title: "The podcast",
    body: "Recorded from my apartment. Unscripted, mostly about work.",
  },
  {
    icon: Globe,
    title: "Four continents",
    body: "Lived and worked across them. Tallinn stuck.",
  },
  {
    icon: Languages,
    title: "Estonian, slowly",
    body: "Wrestling it into submission. It’s winning.",
  },
  {
    icon: Handshake,
    title: "Soch",
    body: "Built with two people I trust. Small on purpose.",
  },
];

const lessons = [
  {
    title: "Clarity before tools.",
    body: "Every failed automation I've seen started with the wrong question. Fix the thinking first.",
  },
  {
    title: "The bottleneck is usually the process.",
    body: "Not the people. Not the tools. The process nobody wants to admit is broken.",
  },
  {
    title: "Ship it, then improve it.",
    body: "The best system is the one that runs. Perfect is the enemy of shipped.",
  },
  {
    title: "Document everything.",
    body: "The Bolt case taught me this the hard way. Write it down. Every time.",
  },
  {
    title: "Automation amplifies what's already there.",
    body: "Good thinking gets better. Muddled thinking gets louder. Choose which one to scale.",
  },
  {
    title: "The human still matters.",
    body: "The best automation I've built makes the human more human — not less necessary.",
  },
];

function TimelineItem({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`,
      }}
    >
      {children}
    </div>
  );
}

function StatRow({
  stat,
  trigger,
}: {
  stat: (typeof trackRecordStats)[number];
  trigger: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 2000;
    let start: number | undefined;
    let raf: number;

    function tick(ts: number) {
      if (start === undefined) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(stat.target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, stat.target]);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 32,
          fontWeight: 900,
          fontFamily: "inherit",
          background: "linear-gradient(90deg, #F3ECDD, #EA6A47, #D79A36, #F3ECDD)",
          backgroundSize: "300% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "statGradient 4s linear infinite",
          animationDelay: stat.delay,
        }}
      >
        {stat.prefix}
        {display.toFixed(stat.decimals)}
        {stat.suffix}
      </span>
      <span style={{ textAlign: "right" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgba(243,236,221,0.5)",
            textTransform: "uppercase",
            lineHeight: 1.4,
          }}
        >
          {stat.label}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 9,
            color: "rgba(243,236,221,0.4)",
            letterSpacing: "0.08em",
            marginTop: 2,
          }}
        >
          {stat.context}
        </span>
      </span>
    </div>
  );
}

function TrackRecordPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#22332C",
        borderRadius: 20,
        padding: "40px 36px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          color: "#EA6A47",
          letterSpacing: "0.12em",
          marginBottom: 32,
        }}
      >
        TRACK RECORD
      </p>

      {trackRecordStats.map((stat) => (
        <StatRow key={stat.label} stat={stat} trigger={inView} />
      ))}

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontStyle: "italic",
            color: "rgba(243,236,221,0.65)",
            lineHeight: 1.7,
            fontFamily: "inherit",
            margin: 0,
          }}
        >
          Ten years. Four companies. One consistent result.
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "80px 0",
          borderBottom: "1px solid #ECE6D9",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 60px",
          }}
          className="about-hero-grid"
        >
          {/* Photo stack */}
          <AnimateIn>
            <div className="about-photo-stack">
              <div className="about-polaroid about-polaroid-back-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about/riz-italy-mussels.jpg"
                  alt="Rizwan Mahmood in Italy, holding two bowls of fresh mussels on a rooftop terrace"
                  style={{ objectPosition: "center 55%" }}
                />
              </div>
              <div className="about-polaroid about-polaroid-back-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about/riz-dinner.jpg"
                  alt="Rizwan Mahmood laughing over dinner at a candlelit restaurant"
                  style={{ objectPosition: "center 25%" }}
                />
              </div>
              <div className="about-polaroid about-polaroid-main">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Photos/riz-lake.jpg"
                  alt="Rizwan Mahmood on a boat, sunglasses on, with the city skyline behind him"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
            </div>
          </AnimateIn>

          {/* Text */}
          <div>
            <AnimateIn delay={60}>
              <h1
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontSize: 52,
                  fontWeight: 900,
                  color: "#22332C",
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                Operator. Builder.
              </h1>
            </AnimateIn>

            <AnimateIn delay={120}>
              <p
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: 24,
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "#EA6A47",
                  marginBottom: 32,
                }}
              >
                Occasionally funny.
              </p>
            </AnimateIn>

            <AnimateIn delay={180}>
              <p
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontSize: 17,
                  color: "rgba(34,51,44,0.75)",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Ten years running operations across four continents. Cambridge. ACCA. Careem. Bolt. Wise.
              </p>
            </AnimateIn>

            <AnimateIn delay={240}>
              <p
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontSize: 17,
                  color: "rgba(34,51,44,0.75)",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Now in Tallinn, building AI and figuring out what actually changes when smart people get powerful tools.
              </p>
            </AnimateIn>

            <AnimateIn delay={300}>
              <p
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontSize: 17,
                  color: "rgba(34,51,44,0.75)",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                I run Soch with two people I trust, record a podcast from my apartment, and I&apos;m slowly wrestling Estonian into submission.
              </p>
            </AnimateIn>

            <AnimateIn delay={360}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, margin: "28px 0" }}>
                {pills.map((pill, i) => (
                  <span key={pill} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {i > 0 && (
                      <span aria-hidden="true" style={{ color: "#EA6A47", fontSize: 13 }}>
                        &middot;
                      </span>
                    )}
                    <span className={pill === "Anthropic Partner" ? "about-pill about-pill-featured" : "about-pill"}>
                      {pill}
                    </span>
                  </span>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={420}>
              <Link href="/services" className="about-cta">
                Have a chat with me?
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
          padding: "80px 60px",
          background: "white",
          maxWidth: 1200,
          margin: "0 auto",
        }}
        className="longer-version-grid"
      >
        {/* LEFT — timeline */}
        <div>
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontSize: 36,
                fontWeight: 900,
                color: "#22332C",
                opacity: 1,
                marginBottom: 48,
              }}
            >
              The longer version.
            </h2>
          </AnimateIn>

          {timeline.map((item, i) => (
            <TimelineItem key={item.year} index={i}>
              <div
                style={{
                  borderLeft: "2px solid #DDD3BF",
                  paddingLeft: 28,
                  marginBottom: 36,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: -5,
                    top: 6,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: item.active ? "#EA6A47" : "#DDD3BF",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    color: "#EA6A47",
                    letterSpacing: "0.12em",
                    marginBottom: 6,
                    opacity: 1,
                  }}
                >
                  {item.year}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#22332C",
                    opacity: 1,
                    marginBottom: 6,
                  }}
                >
                  {item.company}
                </h3>
                <p
                  style={{
                    fontFamily: "inherit",
                    fontSize: 14,
                    color: "rgba(34,51,44,0.72)",
                    opacity: 1,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            </TimelineItem>
          ))}
        </div>

        {/* RIGHT — animated stats panel */}
        <div style={{ position: "sticky", top: 100 }} className="track-record-sticky">
          <TrackRecordPanel />
        </div>
      </section>

      {/* SECTION — OPERATOR NOTES */}
      <section style={{ background: "#22332C", padding: "80px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimateIn delay={60}>
            <h2
              style={{
                fontFamily: "var(--font-inter-tight), sans-serif",
                fontSize: 36,
                fontWeight: 900,
                color: "#F3ECDD",
                marginBottom: 48,
              }}
            >
              Things I&apos;ve learned the hard way.
            </h2>
          </AnimateIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
            className="lessons-grid"
          >
            {lessons.map((lesson, i) => (
              <AnimateIn key={lesson.title} delay={i * 80}>
                <div className="lesson-card">
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 11,
                      color: "rgba(234,106,71,0.6)",
                      marginBottom: 12,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#F3ECDD",
                      marginBottom: 8,
                    }}
                  >
                    {lesson.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter-tight), sans-serif",
                      fontSize: 14,
                      color: "rgba(243,236,221,0.75)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {lesson.body}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION — BEYOND THE WORK */}
      <section
        className="beyond-section"
        style={{
          background: "#F1EBDE",
          backgroundImage: "radial-gradient(rgba(34,51,44,0.12) 1px, transparent 1.6px)",
          backgroundSize: "22px 22px",
          padding: "110px 60px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimateIn delay={60}>
            <h2 className="beyond-heading">
              The parts that <em className="beyond-heading-accent">don&apos;t fit</em> a CV.
            </h2>
          </AnimateIn>

          <div className="beyond-grid">
            {/* LEFT — editorial photo pair */}
            <div className="beyond-photos">
              <AnimateIn className="beyond-photo-anim beyond-photo-slot-mussels">
                <figure className="beyond-photo beyond-photo-mussels">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/about/riz-italy-mussels.jpg"
                    alt="Rizwan Mahmood in Italy, holding two bowls of fresh mussels on a rooftop terrace"
                    style={{ objectPosition: "center 24%" }}
                  />
                  <figcaption>Mussels in Italy. Research.</figcaption>
                </figure>
              </AnimateIn>
              <AnimateIn delay={90} className="beyond-photo-anim beyond-photo-slot-dinner">
                <figure className="beyond-photo beyond-photo-dinner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/about/riz-dinner.jpg"
                    alt="Rizwan Mahmood laughing over dinner at a candlelit restaurant"
                    style={{ objectPosition: "center 22%" }}
                  />
                  <figcaption>Tallinn dinners. Also research.</figcaption>
                </figure>
              </AnimateIn>
            </div>

            {/* RIGHT — fact cards */}
            <div className="beyond-facts">
              {beyondFacts.map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <AnimateIn key={fact.title} delay={i * 90} className="beyond-fact-anim">
                    <div className="beyond-fact-card">
                      <div className="beyond-fact-icon">
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      <h3>{fact.title}</h3>
                      <p>{fact.body}</p>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION — HAVE A CHAT */}
      <section style={{ background: "#F3ECDD", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <div className="chat-card">
              {/* Left col — photo + badge */}
              <div className="chat-card-photo-col" style={{ width: "100%", maxWidth: 320, flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/riz-photo-new.jpg"
                  alt="Rizwan Mahmood"
                  style={{
                    width: "100%",
                    height: 420,
                    objectFit: "cover",
                    objectPosition: "center top",
                    borderRadius: 16,
                    display: "block",
                  }}
                />
                {/* Available badge */}
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 100,
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    marginTop: 16,
                  }}
                >
                  <span style={{ position: "relative", width: 10, height: 10, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="ping-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", opacity: 0.5 }} />
                    <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: "#22C55E", display: "block" }} />
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)" }}>
                    Available this week
                  </span>
                </div>
              </div>

              {/* Right col — content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1 }}>
                {/* Heading */}
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    color: "#22332C",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  Have a chat{" "}
                  <span style={{ color: "#EA6A47", fontStyle: "italic" }}>with me?</span>
                </h2>

                {/* Subtext */}
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1rem",
                    color: "#4A4A4A",
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: 440,
                  }}
                >
                  Thirty minutes. No deck, no pitch. Just the problem on your desk and the operator who has solved it before.
                </p>

                {/* Buttons */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
                  <CalBookingButton className="chat-btn-primary">
                    Book a call →
                  </CalBookingButton>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-btn-secondary"
                  >
                    Ask Claude about Riz →
                  </a>
                </div>
              </div>
            </div>

            {/* Caption */}
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.8rem",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "1.5rem",
                letterSpacing: "0.04em",
                fontStyle: "italic",
              }}
            >
              Rizwan Mahmood · Operator and AI Builder
            </p>
          </AnimateIn>
        </div>
      </section>

      <style>{`
        .chat-card {
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 48px;
        }
        @media (max-width: 768px) {
          .chat-card {
            flex-direction: column;
            text-align: center;
            gap: 32px;
            padding: 40px 28px;
          }
          .chat-card-photo-col {
            margin-left: 0;
          }
        }
        .about-pill {
          background: transparent;
          border: none;
          color: #5A605A;
          padding: 0;
          font-size: 0.85rem;
          font-weight: 500;
          font-family: var(--font-geist-mono), monospace;
          letter-spacing: 0.02em;
          cursor: default;
        }
        .about-pill-featured {
          color: #EA6A47;
        }
        .about-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #22332C;
          color: #F3ECDD;
          padding: 18px 40px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.02em;
          font-family: var(--font-inter-tight), sans-serif;
          text-decoration: none;
          width: fit-content;
          transition: all 0.22s ease;
        }
        .about-cta:hover {
          background: #EA6A47;
          transform: translateY(-2px);
        }
        @media (max-width: 860px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 0 24px !important;
          }
        }
        .about-photo-stack {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          min-height: 460px;
          max-height: 640px;
          margin: 0 auto;
        }
        .about-polaroid {
          position: absolute;
          box-sizing: border-box;
          background: #FFFFFF;
          padding: 10px 10px 30px;
          border-radius: 4px;
          box-shadow: 0 18px 36px rgba(120, 66, 30, 0.22), 0 4px 12px rgba(120, 66, 30, 0.14);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .about-polaroid img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 2px;
        }
        .about-polaroid-main {
          width: 82%;
          height: 88%;
          left: 9%;
          top: 3%;
          z-index: 3;
          transform: rotate(0deg);
        }
        .about-polaroid-back-1 {
          width: 62%;
          height: 62%;
          left: -6%;
          top: 12%;
          z-index: 1;
          transform: rotate(-3deg);
        }
        .about-polaroid-back-2 {
          width: 58%;
          height: 58%;
          right: -7%;
          bottom: 4%;
          z-index: 2;
          transform: rotate(2deg);
        }
        .about-photo-stack:hover .about-polaroid-main {
          transform: rotate(1.5deg) translate(2px, -4px);
        }
        .about-photo-stack:hover .about-polaroid-back-1 {
          transform: rotate(-5deg) translate(-10px, 6px);
        }
        .about-photo-stack:hover .about-polaroid-back-2 {
          transform: rotate(4deg) translate(10px, -6px);
        }
        @media (max-width: 860px) {
          .about-photo-stack {
            display: flex;
            align-items: flex-start;
            gap: 20px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding: 8px 4px 24px;
            aspect-ratio: auto;
            min-height: 0;
            max-height: none;
          }
          .about-polaroid {
            position: static;
            flex: 0 0 auto;
            width: 72vw;
            max-width: 320px;
            aspect-ratio: 3 / 4;
            height: auto;
            scroll-snap-align: center;
            transform: none !important;
          }
        }
        .beyond-heading {
          font-family: var(--font-fraunces), serif;
          font-size: 36px;
          font-weight: 900;
          color: #22332C;
          max-width: 640px;
          margin: 0 0 56px;
        }
        .beyond-heading-accent {
          color: #EA6A47;
          font-style: italic;
          font-weight: 800;
        }
        .beyond-grid {
          display: grid;
          grid-template-columns: 0.9fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .beyond-photos {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .beyond-photo-slot-mussels {
          width: 84%;
          position: relative;
          z-index: 1;
        }
        .beyond-photo-slot-dinner {
          width: 56%;
          align-self: flex-end;
          margin-top: -96px;
          position: relative;
          z-index: 2;
        }
        .beyond-photo {
          position: relative;
          display: block;
          margin: 0;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 44px rgba(120,70,40,0.18), 0 6px 14px rgba(120,70,40,0.10);
        }
        .beyond-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .beyond-photo figcaption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 24px 16px 14px;
          background: linear-gradient(to top, rgba(20,16,10,0.72), rgba(20,16,10,0));
          color: #F8F3E9;
          font-family: var(--font-fraunces), serif;
          font-style: italic;
          font-size: 13px;
          line-height: 1.4;
        }
        .beyond-photo-mussels {
          aspect-ratio: 4 / 5;
        }
        .beyond-photo-dinner {
          aspect-ratio: 4 / 3;
          border: 6px solid #F1EBDE;
        }
        .beyond-facts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .beyond-fact-card {
          height: 100%;
          background: #FFFFFF;
          border: 1px solid #E4DAC5;
          border-radius: 14px;
          padding: 24px 20px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .beyond-fact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 28px rgba(34,51,44,0.10);
        }
        .beyond-fact-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(234,106,71,0.10);
          color: #EA6A47;
          margin-bottom: 16px;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .beyond-fact-card:hover .beyond-fact-icon {
          background: #EA6A47;
          color: #FFFFFF;
          transform: scale(1.12);
        }
        .beyond-fact-card h3 {
          font-family: var(--font-fraunces), serif;
          font-size: 16px;
          font-weight: 800;
          color: #22332C;
          margin: 0 0 6px;
        }
        .beyond-fact-card p {
          font-family: var(--font-inter-tight), sans-serif;
          font-size: 13.5px;
          color: rgba(34,51,44,0.65);
          line-height: 1.6;
          margin: 0;
        }
        .beyond-photo-anim {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .beyond-photo-anim.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .beyond-fact-anim {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .beyond-fact-anim.visible {
          opacity: 1;
          transform: translateX(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .beyond-photo-anim,
          .beyond-fact-anim {
            transition: opacity 0.3s ease;
            transform: none !important;
          }
        }
        @media (max-width: 900px) {
          .beyond-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .beyond-photos {
            flex-direction: row;
            align-items: flex-end;
            gap: 14px;
          }
          .beyond-photo-slot-mussels,
          .beyond-photo-slot-dinner {
            width: 50%;
            align-self: flex-end;
            margin-top: 0;
          }
          .beyond-photo-dinner {
            border-width: 4px;
          }
        }
        @media (max-width: 700px) {
          .beyond-section {
            padding: 64px 24px !important;
          }
        }
        @media (max-width: 560px) {
          .beyond-facts {
            grid-template-columns: 1fr;
          }
        }
        .lesson-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 28px 24px;
          height: 100%;
          transition: all 0.25s ease;
        }
        .lesson-card:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-4px);
        }
        @media (max-width: 860px) {
          .lessons-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes statGradient {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @media (max-width: 860px) {
          .longer-version-grid {
            grid-template-columns: 1fr !important;
            padding: 60px 24px !important;
            gap: 48px !important;
          }
          .track-record-sticky {
            position: static !important;
            top: auto !important;
          }
        }
      `}</style>
    </>
  );
}
