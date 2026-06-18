"use client";
import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

const cases = [
  {
    tag: "Automation · Fintech",
    title: "Cutting manual ops by 70% for a fintech scale-up",
    stats: ["70% ops reduction", "3 months"],
    detail:
      "A Series B fintech processing 40,000+ transactions daily was drowning in manual reconciliation. We mapped the full ops flow, identified 12 automation opportunities, and built 6 of them. The result: two team members freed from full-time manual work, error rate dropped by 82%, and the ops team finally had headroom to think.",
    outcome: "The team lead said it was the first time in two years she'd left work before 7pm on a Friday.",
  },
  {
    tag: "Consulting · E-commerce",
    title: "Rebuilding the thinking before rebuilding the stack",
    stats: ["4 week engagement", "Full ops redesign"],
    detail:
      "A D2C brand had spent £200k on automation tools that were making things slower. We spent four weeks doing the one thing nobody had done: understanding what was actually happening. No code. No tools. Just mapping, questioning, and redesigning the workflow logic.",
    outcome: "The CTO cancelled three vendor contracts and saved £80k/year. The new process ran on tools they already owned.",
  },
  {
    tag: "Speaking · Leadership",
    title: "AI literacy for a 200-person ops team",
    stats: ["200 attendees", "4.9/5 rating"],
    detail:
      "A logistics company needed their operations team to understand AI — not as a threat, not as magic, but as a practical tool. Three workshops over two days. Real examples. No hype. By the end, the team had identified 40+ automation opportunities themselves.",
    outcome: "Three months later, they'd shipped 8 of them. Without external help.",
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
          transition: "box-shadow 0.2s",
        }}
      >
        <div style={{ padding: "2rem" }}>
          <span className="tag-pill" style={{ marginBottom: "1rem", display: "inline-block" }}>{c.tag}</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "1.3rem",
              color: "var(--ink)",
              fontWeight: 700,
              marginBottom: "1.25rem",
              lineHeight: 1.3,
            }}
          >
            {c.title}
          </h2>
          <div className="flex flex-wrap gap-3" style={{ marginBottom: "1.5rem" }}>
            {c.stats.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--coral)",
                  background: "rgba(234,106,71,0.06)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: 6,
                  border: "1px solid rgba(234,106,71,0.15)",
                }}
              >
                {s}
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
            {open ? "Hide details ↑" : "Read case study ↓"}
          </button>
        </div>

        {open && (
          <div
            style={{
              borderTop: "1px solid var(--line)",
              padding: "2rem",
              background: "var(--cream-2)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.95rem",
                color: "var(--body)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              {c.detail}
            </p>
            <div
              style={{
                borderLeft: "3px solid var(--coral)",
                paddingLeft: "1rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "var(--ink)",
                  lineHeight: 1.7,
                }}
              >
                {c.outcome}
              </p>
            </div>
          </div>
        )}
      </div>
    </AnimateIn>
  );
}

export default function CaseStudies() {
  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>CASE STUDIES</p>
          </AnimateIn>
          <AnimateIn delay={100}>
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
              Work that shipped.
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.1rem",
                color: "var(--body)",
                lineHeight: 1.7,
                maxWidth: 540,
              }}
            >
              Selected engagements across consulting, build, and operations.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site flex flex-col gap-6">
          {cases.map((c, i) => (
            <CaseCard key={c.title} c={c} i={i} />
          ))}
        </div>
      </section>

      <section style={{ background: "var(--ink)", padding: "4rem 0" }}>
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
              Want results like these?
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <Link href="/services" className="btn-coral">See how I work →</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
