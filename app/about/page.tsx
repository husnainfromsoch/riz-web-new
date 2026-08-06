"use client";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import { Mic, Globe, Languages, Handshake, BadgeCheck } from "lucide-react";
import { useParallax, useScrollFadeOut } from "@/hooks/useParallax";

const pills = [
  { label: "Careem", logo: "/logos/careem.png" },
  { label: "Bolt", logo: "/logos/bolt.png" },
  { label: "Wise", logo: "/logos/wise.svg" },
  { label: "Anthropic Partner", logo: "/logos/anthropic.png" },
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
    body: "Building AI systems for owners who want to think clearly first, then automate. Recording a podcast. Shipping things I have no business building.",
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

type BeyondFact = {
  icon: typeof Mic;
  title: string;
  body: string;
  extra?: string;
  linkText?: string;
  linkHref?: string;
};

const beyondFacts: BeyondFact[] = [
  {
    icon: Mic,
    title: "The podcast",
    body: "Recorded from my apartment. Unscripted, mostly about work.",
    extra: "Latest: AI didn't break my workflow. I did.",
  },
  {
    icon: Globe,
    title: "Four continents",
    body: "Lived and worked across them. Tallinn stuck.",
    extra: "Cambridge · Dubai · Karachi · Tallinn. In that order.",
  },
  {
    icon: Languages,
    title: "Estonian, slowly",
    body: "Wrestling it into submission. It’s winning.",
    extra: "B2 by end of 2025. Probably.",
  },
  {
    icon: Handshake,
    title: "Soch",
    body: "Built with two people I trust. Small on purpose.",
    extra: "We build AI systems for owners with ops-heavy teams.",
    linkText: "withsoch.com →",
    linkHref: "https://withsoch.com",
  },
];

const lessons = [
  {
    title: "Clarity before tools.",
    body: "Every failed automation I've seen started with the wrong question. Fix the thinking first.",
    accent: "#C24629",
    rotate: -1.5,
    offsetY: 0,
  },
  {
    title: "The bottleneck is usually the process.",
    body: "Not the people. Not the tools. The process nobody wants to admit is broken.",
    accent: "#5E7145",
    rotate: 1.2,
    offsetY: 18,
  },
  {
    title: "Ship it, then improve it.",
    body: "The best system is the one that runs. Perfect is the enemy of shipped.",
    accent: "#2E7C74",
    rotate: -1,
    offsetY: -8,
  },
  {
    title: "Document everything.",
    body: "The Bolt case taught me this the hard way. Write it down. Every time.",
    accent: "#8C6A1E",
    rotate: 1.6,
    offsetY: 6,
  },
  {
    title: "Automation amplifies what's already there.",
    body: "Good thinking gets better. Muddled thinking gets louder. Choose which one to scale.",
    accent: "#B5576B",
    rotate: -1.8,
    offsetY: 20,
  },
  {
    title: "The human still matters.",
    body: "The best automation I've built makes the human more human, not less necessary.",
    accent: "#3E6B4F",
    rotate: 1,
    offsetY: -4,
  },
];

function ParallaxLayer({
  children,
  speed,
  className = "",
}: {
  children: ReactNode;
  speed: number;
  className?: string;
}) {
  const ref = useParallax<HTMLDivElement>(speed);

  return (
    <div ref={ref} className={className} data-parallax>
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
          background: "linear-gradient(90deg, var(--cream), #EA6A47, #D79A36, var(--cream))",
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
          className="meta-label meta-label--inverse"
          style={{ display: "block", lineHeight: 1.4 }}
        >
          {stat.label}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 9,
            color: "rgba(243,236,221,0.75)",
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
  const heroFadeRef = useScrollFadeOut<HTMLDivElement>(380);

  return (
    <>
      {/* HERO */}
      <section
        className="about-hero-section"
        style={{
          background: "#FFFFFF",
          padding: "112px 0",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          ref={heroFadeRef}
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
          {/* Photo */}
          <AnimateIn>
            <div className="about-photo-single">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Photos/riz-lake.jpg"
                alt="Rizwan Mahmood on a boat, sunglasses on, with the city skyline behind him"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
          </AnimateIn>

          {/* Text */}
          <div>
            <AnimateIn delay={60}>
              <h1
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontSize: "clamp(3rem, 5vw, 4.25rem)",
                  fontWeight: 900,
                  color: "#22332C",
                  lineHeight: 1.05,
                  marginBottom: 4,
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
                  marginBottom: 28,
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
                  marginBottom: 12,
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
                  marginBottom: 12,
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
                  marginBottom: 12,
                }}
              >
                I run Soch with one person I trust, record a podcast from my apartment, and I&apos;m slowly learning to speak in Estonian.
              </p>
            </AnimateIn>

            <AnimateIn delay={360}>
              <div className="about-credentials">
                <p className="about-credentials-label">TRACK RECORD</p>
                <div className="about-credentials-row">
                  {pills.map((pill, i) => {
                    const featured = pill.label === "Anthropic Partner";
                    return (
                      <Fragment key={pill.label}>
                        {i > 0 && (
                          <span aria-hidden="true" className="about-credentials-dot">
                            &middot;
                          </span>
                        )}
                        <span className={featured ? "about-pill about-pill-featured" : "about-pill"}>
                          {pill.logo && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={pill.logo}
                              alt={pill.label}
                              className="about-pill-logo"
                            />
                          )}
                          {featured && (
                            <BadgeCheck
                              size={14}
                              strokeWidth={2.25}
                              className="about-pill-icon"
                            />
                          )}
                          {featured || !pill.logo ? pill.label : null}
                        </span>
                      </Fragment>
                    );
                  })}
                </div>
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
          padding: "112px 60px",
          background: "white",
          maxWidth: 1200,
          margin: "0 auto",
        }}
        className="longer-version-grid"
      >
        {/* LEFT - timeline */}
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
            <AnimateIn key={item.year} delay={i * 80}>
              <div
                style={{
                  borderLeft: "2px solid var(--line)",
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
                    background: item.active ? "#EA6A47" : "var(--line)",
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
                    fontFamily: "'Inter Tight', var(--font-inter-tight), sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "var(--ink)",
                    opacity: 1,
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* RIGHT - animated stats panel */}
        <div style={{ position: "sticky", top: 100 }} className="track-record-sticky">
          <TrackRecordPanel />
        </div>
      </section>

      {/* SECTION - OPERATOR NOTES */}
      <section className="lessons-section" style={{ background: "var(--cream)", padding: "112px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimateIn delay={60}>
            <h2
              style={{
                fontFamily: "var(--font-inter-tight), sans-serif",
                fontSize: 36,
                fontWeight: 900,
                color: "#22332C",
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
              gap: 28,
            }}
            className="lessons-grid"
          >
            {lessons.map((lesson, i) => (
              <AnimateIn key={lesson.title} delay={i * 90}>
                <div
                  className="lesson-card"
                  style={
                    {
                      "--lesson-rotate": `${lesson.rotate}deg`,
                      "--lesson-offset": `${lesson.offsetY}px`,
                      "--lesson-accent": lesson.accent,
                    } as CSSProperties
                  }
                >
                  <p className="lesson-card-number">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#22332C",
                      marginBottom: 8,
                    }}
                  >
                    {lesson.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter-tight), sans-serif",
                      fontSize: 14,
                      color: "rgba(34,51,44,0.72)",
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

      {/* SECTION - BEYOND THE WORK */}
      <section
        className="beyond-section"
        style={{
          background: "var(--cream)",
          backgroundImage: "radial-gradient(rgba(34,51,44,0.12) 1px, transparent 1.6px)",
          backgroundSize: "22px 22px",
          padding: "112px 60px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimateIn delay={60}>
            <h2 className="beyond-heading">
              The parts that <em className="beyond-heading-accent">don&apos;t fit</em> a CV.
            </h2>
          </AnimateIn>

          <AnimateIn delay={90}>
            <div className="beyond-quote">
              <span className="beyond-quote-bar" aria-hidden="true" />
              <p>The work is serious. The rest of it, not always.</p>
            </div>
          </AnimateIn>

          <div className="beyond-grid">
            {/* LEFT - editorial photo */}
            <div className="beyond-photos">
              <AnimateIn className="beyond-photo-anim beyond-photo-slot-mussels">
                <ParallaxLayer speed={0.04}>
                  <figure className="beyond-photo beyond-photo-mussels">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/about/riz-italy-mussels.jpg"
                      alt="Rizwan Mahmood in Italy, holding two bowls of fresh mussels on a rooftop terrace"
                      style={{ objectPosition: "center 20%" }}
                    />
                  </figure>
                  <p className="beyond-photo-caption">
                    Mussels in Italy. Research.
                  </p>
                </ParallaxLayer>
              </AnimateIn>
            </div>

            {/* RIGHT - boxless editorial list */}
            <div className="beyond-list">
              {beyondFacts.map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <AnimateIn key={fact.title} delay={i * 80} className="beyond-row-anim">
                    <div className="beyond-row">
                      <Icon className="beyond-row-icon" size={20} strokeWidth={2} />
                      <div className="beyond-row-content">
                        <h3>{fact.title}</h3>
                        <p>{fact.body}</p>
                        {(fact.extra || (fact.linkText && fact.linkHref)) && (
                          <p className="beyond-row-extra">
                            {fact.extra}
                            {fact.linkText && fact.linkHref && (
                              <a
                                href={fact.linkHref}
                                className="beyond-row-link"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {" "}
                                {fact.linkText}
                              </a>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-credentials {
          margin: 18px 0;
          padding-top: 16px;
          border-top: 1px solid var(--line);
        }
        .about-credentials-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--coral);
          margin: 0 0 8px;
        }
        .about-credentials-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .about-credentials-dot {
          color: #EA6A47;
          font-size: 13px;
        }
        .about-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          color: #22332C;
          padding: 0;
          font-size: 0.95rem;
          font-weight: 500;
          font-variant: small-caps;
          font-family: var(--font-inter-tight), sans-serif;
          letter-spacing: 0.02em;
          cursor: default;
        }
        .about-pill-featured {
          color: #EA6A47;
        }
        .about-pill-icon {
          color: #EA6A47;
          flex-shrink: 0;
        }
        .about-pill-logo {
          display: block;
          height: 40px;
          width: auto;
          max-width: 120px;
          object-fit: contain;
        }
        .about-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #22332C;
          color: var(--cream);
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
        .about-photo-single {
          width: 100%;
          aspect-ratio: 3 / 4;
          max-height: 640px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .about-photo-single img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
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
        .beyond-quote {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 48px;
        }
        .beyond-quote-bar {
          width: 3px;
          height: 30px;
          flex-shrink: 0;
          background: #EA6A47;
          border-radius: 2px;
        }
        .beyond-quote p {
          font-family: var(--font-fraunces), serif;
          font-style: italic;
          font-size: 17px;
          color: rgba(34,51,44,0.6);
          margin: 0;
          text-align: left;
        }
        .beyond-grid {
          display: grid;
          grid-template-columns: 0.9fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .beyond-photos {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }
        .beyond-photo {
          position: relative;
          display: block;
          margin: 0;
          width: 100%;
          height: 580px;
          overflow: hidden;
          border-radius: 120px 24px 24px 24px;
          box-shadow: var(--shadow-lg);
        }
        .beyond-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .beyond-photo-caption {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin: 12px 0 0;
          font-family: var(--font-fraunces), serif;
          font-style: italic;
          font-size: 13px;
          color: rgba(34,51,44,0.5);
        }
        .beyond-caption-dash {
          color: #EA6A47;
          font-style: normal;
          font-weight: 700;
        }
        .beyond-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .beyond-row-anim + .beyond-row-anim {
          border-top: 1px solid var(--line);
        }
        .beyond-row {
          position: relative;
          display: flex;
          gap: 20px;
          padding: 30px 8px;
          transition: padding-left 0.25s ease;
        }
        .beyond-row::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0;
          background: #EA6A47;
          transition: width 0.25s ease;
        }
        .beyond-row:hover {
          padding-left: 20px;
        }
        .beyond-row:hover::before {
          width: 2px;
        }
        .beyond-row-icon {
          flex-shrink: 0;
          color: #EA6A47;
          margin-top: 4px;
          transition: transform 0.25s ease;
        }
        .beyond-row:hover .beyond-row-icon {
          transform: scale(1.15);
        }
        .beyond-row-content h3 {
          font-family: var(--font-fraunces), serif;
          font-size: 1.3rem;
          font-weight: 800;
          color: #22332C;
          margin: 0 0 8px;
          transition: color 0.25s ease;
        }
        .beyond-row:hover .beyond-row-content h3 {
          color: #EA6A47;
        }
        .beyond-row-content p {
          font-family: var(--font-inter-tight), sans-serif;
          font-size: 14.5px;
          color: rgba(34,51,44,0.65);
          line-height: 1.7;
          margin: 0;
        }
        .beyond-row-extra {
          margin-top: 6px !important;
          color: rgba(34,51,44,0.5) !important;
        }
        .beyond-row-link {
          color: #EA6A47;
          font-family: var(--font-geist-mono), monospace;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
        }
        .beyond-row-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .beyond-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
        }
        @media (max-width: 700px) {
          .about-hero-section {
            padding: 64px 0 !important;
          }
          .lessons-section {
            padding: 64px 24px !important;
          }
          .beyond-section {
            padding: 64px 24px !important;
          }
          .beyond-row {
            padding: 24px 4px;
          }
          .beyond-photo {
            height: 420px;
          }
        }
        .lesson-card {
          background: #ffffff;
          border: 1px solid rgba(34,51,44,0.1);
          border-radius: 18px;
          padding: 28px 24px;
          height: 100%;
          transform: rotate(var(--lesson-rotate, 0deg)) translateY(var(--lesson-offset, 0px));
          box-shadow: 0 2px 8px rgba(34,51,44,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .lesson-card:hover {
          background: #fdfaf3;
          transform: rotate(0deg) translateY(calc(var(--lesson-offset, 0px) - 8px));
          box-shadow: 0 18px 32px rgba(34,51,44,0.14);
        }
        .lesson-card-number {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: var(--lesson-accent, #EA6A47);
          opacity: 0.55;
          margin: 0 0 12px;
          display: inline-block;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: left center;
        }
        .lesson-card:hover .lesson-card-number {
          opacity: 1;
          transform: scale(1.5);
        }
        @media (max-width: 860px) {
          .lessons-grid {
            grid-template-columns: 1fr !important;
          }
          .lesson-card {
            transform: none !important;
          }
          .lesson-card:hover {
            transform: translateY(-4px) !important;
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
