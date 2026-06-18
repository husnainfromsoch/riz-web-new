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

function CaseCard({ c, i }: { c: typeof cases[0]; i: number }) {
  const [open, setOpen] = useState(false);

  return (
    <AnimateIn delay={i * 150}>
      <div
        style={{
          border: "1px solid var(--line)",
          borderRadius: 16,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "var(--shadow)",
          transition: "box-shadow 0.2s ease",
        }}
      >
        <div style={{ padding: "2.25rem" }}>
          {/* Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
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
              {c.tag}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
              color: "var(--ink)",
              fontWeight: 700,
              marginBottom: "1.25rem",
              lineHeight: 1.25,
            }}
          >
            {c.title}
          </h2>

          {/* Results */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: "1.5rem" }}>
            {c.results.map((r) => (
              <span
                key={r}
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  color: "var(--coral)",
                  background: "rgba(234,106,71,0.07)",
                  padding: "0.3rem 0.8rem",
                  borderRadius: 6,
                  border: "1px solid rgba(234,106,71,0.15)",
                  letterSpacing: "0.04em",
                }}
              >
                {r}
              </span>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--ink)",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            {open ? "Hide details ↑" : "Read the story ↓"}
          </button>
        </div>

        {open && (
          <div
            style={{
              borderTop: "1px solid var(--line)",
              padding: "2.25rem",
              background: "var(--cream-2)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--body)",
                lineHeight: 1.85,
              }}
            >
              {c.body}
            </p>
          </div>
        )}
      </div>
    </AnimateIn>
  );
}

export default function CaseStudies() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>Work</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                color: "var(--ink)",
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
                color: "var(--body)",
                lineHeight: 1.7,
                maxWidth: 540,
              }}
            >
              Three projects. Different shapes. Same thesis underneath.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* CASE STUDY CARDS */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site flex flex-col gap-5">
          {cases.map((c, i) => (
            <CaseCard key={c.title} c={c} i={i} />
          ))}
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
              <a href="mailto:riz@withsoch.com" className="btn-ghost" style={{ color: "var(--faint)", borderColor: "rgba(255,255,255,0.2)" }}>riz@withsoch.com</a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
