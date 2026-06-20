"use client";
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const cases = [
  {
    tag: "Proof",
    title: "Bug Catcher",
    body: "I'd never written code. In 2024, I decided that was no longer an excuse. Built a browser arcade game you control with your hands — live hand-tracking, no controller, no install. Shipped in public on LinkedIn. 20k+ impressions on the launch post. The point wasn't the game. It was the proof.",
    results: ["20k+ impressions", "Built in public", "Zero prior code"],
  },
  {
    tag: "Automation",
    title: "The content engine",
    body: "Five connected n8n workflows. Research → draft → illustrate → format → publish. The whole pipeline runs without me. I set the brief on Monday. By Thursday, there's a post. By Friday, it's live.",
    results: ["5 workflows", "Weekly publishing", "Zero human steps"],
  },
  {
    tag: "Receipt",
    title: "The Bolt case",
    body: "I was wrongfully terminated by Bolt. I took them to the Estonian Labour Dispute Committee. I won. Then I published every document — the claim, the hearing notes, the decision — on LinkedIn, Substack, and YouTube. Transparency as a strategy.",
    results: ["Case won", "All documents public", "LinkedIn · Substack · YouTube"],
  },
];

function AccordionItem({
  c,
  i,
  isOpen,
  onToggle,
}: {
  c: (typeof cases)[0];
  i: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const num = String(i + 1).padStart(2, "0");
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderLeft: "4px solid #EA6A47",
        boxShadow: hovered || isOpen
          ? "0 8px 32px rgba(0,0,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s ease",
        position: "relative",
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          padding: "1.625rem 2rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#EA6A47",
            letterSpacing: "0.06em",
            flexShrink: 0,
            minWidth: "2rem",
          }}
        >
          {num}
        </span>

        {/* Title */}
        <span
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)",
            fontWeight: 700,
            color: "var(--ink)",
            flex: 1,
            lineHeight: 1.3,
          }}
        >
          {c.title}
        </span>

        {/* Category tag — coral pill */}
        <span
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#EA6A47",
            padding: "0.3rem 0.85rem",
            borderRadius: 9999,
            flexShrink: 0,
          }}
        >
          {c.tag}
        </span>

        {/* Toggle icon */}
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#EA6A47",
            lineHeight: 1,
            flexShrink: 0,
            transition: "transform 0.3s ease",
            width: "2rem",
            textAlign: "center",
            transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? "×" : "+"}
        </span>
      </button>

      {/* Expandable body — grid trick for smooth height animation */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              borderTop: "1px solid rgba(234,106,71,0.15)",
              padding: "2rem",
              background: "#F3ECDD",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--body)",
                lineHeight: 1.85,
                marginBottom: "1.5rem",
                maxWidth: 600,
              }}
            >
              {c.body}
            </p>

            {/* Result tags */}
            <div className="flex flex-wrap gap-2" style={{ marginBottom: "1.75rem" }}>
              {c.results.map((r) => (
                <span
                  key={r}
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "#EA6A47",
                    background: "transparent",
                    padding: "0.3rem 0.8rem",
                    border: "1.5px solid #EA6A47",
                    borderRadius: 4,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {r}
                </span>
              ))}
            </div>

            {/* Read the story */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#EA6A47",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                letterSpacing: "0.01em",
              }}
            >
              Read the story →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <>
      {/* HERO — dark forest green */}
      <section
        data-hero="dark"
        style={{
          paddingTop: 120,
          paddingBottom: 120,
          background: "#22332C",
        }}
      >
        <div className="max-w-site">
          <AnimateIn>
            <p
              className="section-eyebrow"
              style={{ marginBottom: "1rem", color: "rgba(243,236,221,0.6)" }}
            >
              Work
            </p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                color: "#ffffff",
                fontWeight: 700,
                marginBottom: "1.25rem",
              }}
            >
              Things I&apos;ve shipped.
            </h1>
          </AnimateIn>
          <AnimateIn delay={180}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.1rem",
                color: "rgba(243,236,221,0.75)",
                lineHeight: 1.7,
                maxWidth: 540,
              }}
            >
              Three projects. Different shapes. Same thesis underneath.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ACCORDION LIST */}
      <section style={{ padding: "5rem 0", background: "var(--cream)" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <AnimateIn>
            <div
              style={{
                border: "1px solid rgba(234,106,71,0.18)",
                overflow: "hidden",
              }}
            >
              {cases.map((c, i) => (
                <div key={c.title}>
                  <AccordionItem
                    c={c}
                    i={i}
                    isOpen={openIndex === i}
                    onToggle={() => handleToggle(i)}
                  />
                  {i < cases.length - 1 && (
                    <div style={{ height: 1, background: "#EA6A47", opacity: 0.35 }} />
                  )}
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "5rem 0" }}>
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
              Want to build something like this?
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--faint)",
                marginBottom: "2rem",
              }}
            >
              Tell me the problem. I&apos;ll tell you if it&apos;s worth automating.
            </p>
          </AnimateIn>
          <AnimateIn delay={200}>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/services/consulting" className="btn-coral">Book a call →</Link>
              <a
                href="mailto:riz@withsoch.com"
                className="btn-ghost"
                style={{ color: "var(--faint)", borderColor: "rgba(255,255,255,0.2)" }}
              >
                riz@withsoch.com
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
