"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── data ──────────────────────────────────────────────────────────────────── */

const cases = [
  {
    category: "PROOF",
    title: "Bug Catcher",
    description:
      "Never written a line of code. Built a browser arcade game with live hand-tracking in public. Shipped. Posted. Proved the thesis.",
    stats: [
      { value: "0 → 1", label: "Lines of code background" },
      { value: "48hrs", label: "Time to ship" },
      { value: "12K+", label: "LinkedIn impressions" },
    ],
    quote:
      "If the system works, the background doesn't matter. Build first. Explain later.",
    author: "Rizwan Mahmood",
  },
  {
    category: "AUTOMATION",
    title: "The Content Engine",
    description:
      "Five connected n8n workflows that research, write, illustrate and publish. Runs without me. Has been for months.",
    stats: [
      { value: "5", label: "Connected workflows" },
      { value: "0hrs", label: "Weekly input needed" },
      { value: "52+", label: "Posts published automatically" },
    ],
    quote:
      "The goal was never to automate content. The goal was to buy back the time to think about what to say.",
    author: "Rizwan Mahmood",
  },
  {
    category: "RECEIPT",
    title: "The Bolt Case",
    description:
      "Wrongful termination. Estonian Labour Dispute Committee. I won. Then I published every document.",
    stats: [
      { value: "Won", label: "Verdict" },
      { value: "100%", label: "Documents published" },
      { value: "3", label: "Platforms covered" },
    ],
    quote:
      "Transparency isn't a strategy. It's just what you do when you know you're right.",
    author: "Rizwan Mahmood",
  },
];

/* ─── scroll-reveal hook ─────────────────────────────────────────────────────── */

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
}

/* ─── category pill colours ─────────────────────────────────────────────────── */

const pillColour: Record<string, { bg: string; color: string }> = {
  PROOF:      { bg: "rgba(234,106,71,0.12)", color: "#EA6A47" },
  AUTOMATION: { bg: "rgba(34,51,44,0.10)",   color: "#22332C" },
  RECEIPT:    { bg: "rgba(100,130,100,0.12)", color: "#3A6B4C" },
};

/* ─── CaseCard ───────────────────────────────────────────────────────────────── */

function CaseCard({
  c,
  index,
  isOpen,
  onToggle,
}: {
  c: (typeof cases)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, visible } = useReveal(index * 120);
  const pill = pillColour[c.category] ?? pillColour.PROOF;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E7E0D2",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Card body */}
      <div style={{ padding: 40 }}>

        {/* ── TOP ROW: category pill + LIVE badge ──────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.85rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: pill.bg,
              color: pill.color,
              padding: "0.3rem 0.85rem",
              borderRadius: 99,
            }}
          >
            {c.category}
          </span>
          <span
            style={{
              background: "#22C55E",
              color: "#fff",
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "0.25rem 0.65rem",
              borderRadius: 99,
            }}
          >
            LIVE
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 700,
            color: "#22332C",
            lineHeight: 1.25,
            marginBottom: "0.85rem",
          }}
        >
          {c.title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.975rem",
            color: "#5C5C5C",
            lineHeight: 1.75,
            marginBottom: "2rem",
          }}
        >
          {c.description}
        </p>

        {/* ── STATS ROW ─────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            marginBottom: "2rem",
          }}
        >
          {c.stats.map((s, si) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                paddingRight: si < c.stats.length - 1 ? "1.5rem" : 0,
                marginRight: si < c.stats.length - 1 ? "1.5rem" : 0,
                borderRight: si < c.stats.length - 1 ? "1px solid #E7E0D2" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "#22332C",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "#8A857B",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── QUOTE BLOCK ───────────────────────────────── */}
        <div
          style={{
            borderLeft: "3px solid #EA6A47",
            paddingLeft: "1.25rem",
            marginTop: "2rem",
            marginBottom: "1.75rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "#22332C",
              lineHeight: 1.7,
              marginBottom: "0.5rem",
            }}
          >
            &ldquo;{c.quote}&rdquo;
          </p>
          <span
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              color: "#9A8E7E",
            }}
          >
            — {c.author}
          </span>
        </div>

        {/* ── EXPAND TOGGLE ─────────────────────────────── */}
        <button
          onClick={onToggle}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#EA6A47",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          {isOpen ? "← Back to all" : "Read the full story →"}
        </button>
      </div>

      {/* ── EXPANDED CONTENT ──────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.38s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              borderTop: "1px solid #E7E0D2",
              padding: "2rem 40px 2.5rem",
              background: "#FDFAF5",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.975rem",
                color: "#5C5C5C",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              Full case study coming soon. In the meantime, read about this on
              Rizwan&apos;s Substack.
            </p>
            <a
              href="https://conversationswithriz.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#EA6A47",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Read on Substack →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────────────────────────────── */

export default function CaseStudies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  const headerReveal = useReveal(0);
  const headingReveal = useReveal(80);
  const subReveal = useReveal(160);

  return (
    <main style={{ background: "#F3ECDD", minHeight: "100vh" }}>

      {/* ── PAGE HEADER ────────────────────────────────── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "#F3ECDD" }}>
        <div className="max-w-site">
          <div
            ref={headerReveal.ref}
            style={{
              opacity: headerReveal.visible ? 1 : 0,
              transform: headerReveal.visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#EA6A47",
              }}
            >
              Case Studies
            </span>
          </div>

          <div
            ref={headingReveal.ref}
            style={{
              opacity: headingReveal.visible ? 1 : 0,
              transform: headingReveal.visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 700,
                color: "#22332C",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Real work.
              <br />
              Real results.
            </h1>
          </div>

          <div
            ref={subReveal.ref}
            style={{
              opacity: subReveal.visible ? 1 : 0,
              transform: subReveal.visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.1rem",
                color: "#5C5C5C",
                lineHeight: 1.75,
                maxWidth: 480,
              }}
            >
              Not concepts. Not decks.
              <br />
              Systems that shipped and kept running.
            </p>
          </div>
        </div>
      </section>

      {/* ── CARDS ──────────────────────────────────────── */}
      <section style={{ paddingBottom: 100 }}>
        <div
          className="max-w-site"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {cases.map((c, i) => (
            <CaseCard
              key={c.title}
              c={c}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section style={{ background: "#22332C", padding: "5rem 0" }}>
        <div className="max-w-site" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#fff",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Want to build something like this?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "1rem",
              color: "rgba(243,236,221,0.7)",
              marginBottom: "2rem",
            }}
          >
            Tell me the problem. I&apos;ll tell you if it&apos;s worth automating.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/services/consulting" className="btn-coral">
              Book a call →
            </Link>
            <a
              href="mailto:riz@withsoch.com"
              className="btn-ghost"
              style={{ color: "rgba(243,236,221,0.75)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              riz@withsoch.com
            </a>
          </div>
        </div>
      </section>

      {/* ── MOBILE RESPONSIVE ─────────────────────────── */}
      <style>{`
        @media (max-width: 480px) {
          .stats-row { flex-wrap: wrap; }
          .stats-row > div { min-width: 40%; }
        }
      `}</style>
    </main>
  );
}
