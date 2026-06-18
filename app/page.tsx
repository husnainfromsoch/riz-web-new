"use client";
import { useState } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

const flowNodes = [
  { label: "New lead form submitted", type: "trigger" },
  { label: "Qualify via AI", type: "process" },
  { label: "Route to CRM", type: "process" },
  { label: "Send personalised email", type: "process" },
  { label: "Slack alert → founder", type: "output" },
];

const proofNames = ["Careem", "Bolt", "Wise", "Cambridge", "ACCA"];

const services = [
  {
    icon: "🧠",
    title: "Clarity before you automate",
    body: "Most automation fails because the thinking underneath it is broken. I fix the thinking first.",
    link: "/services/consulting",
    cta: "Explore consulting →",
  },
  {
    icon: "⚙️",
    title: "Systems that actually ship",
    body: "I build the automations, agents, and internal tools that founders keep asking their team to build but never do.",
    link: "/services/projects",
    cta: "See projects →",
  },
  {
    icon: "🎙️",
    title: "On stages and in rooms",
    body: "I speak on AI operations, automation strategy, and what actually changes when you give smart people powerful tools.",
    link: "/services/speaking",
    cta: "Speaking info →",
  },
];

const caseStudies = [
  {
    client: "Fintech Scale-up",
    tag: "Automation · Fintech",
    stat: "70% ops reduction in 3 months",
  },
  {
    client: "E-commerce Brand",
    tag: "Consulting · E-commerce",
    stat: "Full ops redesign in 4 weeks",
  },
];

const posts = [
  {
    title: "Why your automation keeps breaking",
    date: "Jan 2025",
    readTime: "6 min",
    tag: "Automation",
    excerpt: "The problem is never the tool. It's the process you encoded into the tool.",
    slug: "why-automation-breaks",
  },
  {
    title: "What Careem taught me about scaling ops",
    date: "Dec 2024",
    readTime: "8 min",
    tag: "Operations",
    excerpt: "At 2am in Dubai, watching a system fail in ways nobody predicted...",
    slug: "careem-scaling-ops",
  },
  {
    title: "The AI adoption playbook I wish existed",
    date: "Nov 2024",
    readTime: "5 min",
    tag: "AI",
    excerpt: "Most AI adoption fails at the same point. Not the technology.",
    slug: "ai-adoption-playbook",
  },
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
          setTimeout(() => { setActive(null); setRunning(false); }, 800);
        }
      }, i * 600);
    });
  };

  return (
    <div
      style={{
        background: "var(--cream-2)",
        border: "1px solid var(--line)",
        borderRadius: 16,
        padding: "1.75rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, var(--line-2) 1px, transparent 1px)",
          backgroundSize: "20px 20px", opacity: 0.6,
        }}
      />
      <div style={{ position: "relative" }}>
        <p
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--muted)",
            marginBottom: "1.25rem",
          }}
        >
          Automation flow
        </p>
        <div className="flex flex-col gap-2">
          {flowNodes.map((node, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.65rem 0.9rem",
                borderRadius: 8,
                border: "1px solid",
                borderColor: active === i ? "var(--coral)" : "var(--line)",
                background: active === i ? "rgba(234,106,71,0.06)" : "#fff",
                transition: "all 0.3s ease",
              }}
            >
              <span
                style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: active === i ? "var(--coral)" : "var(--faint)",
                  transition: "background 0.3s ease",
                  boxShadow: active === i ? "0 0 0 3px rgba(234,106,71,0.2)" : "none",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.85rem",
                  color: active === i ? "var(--ink)" : "var(--body)",
                  fontWeight: active === i ? 600 : 400,
                  transition: "all 0.3s ease",
                }}
              >
                {node.label}
              </span>
              {i === 0 && (
                <span className="tag-pill" style={{ marginLeft: "auto", fontSize: "0.65rem" }}>
                  trigger
                </span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={run}
          className="btn-coral"
          style={{ marginTop: "1.25rem", width: "100%", textAlign: "center", opacity: running ? 0.6 : 1 }}
        >
          {running ? "Running…" : "▶ Run flow"}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80 }}>
        <div className="max-w-site">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <AnimateIn>
                <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>
                  OPERATOR · BUILDER · TALLINN
                </p>
              </AnimateIn>
              <AnimateIn delay={100}>
                <h1
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    marginBottom: "1.25rem",
                    fontWeight: 700,
                  }}
                >
                  AI doesn&apos;t fix bad thinking.{" "}
                  <em style={{ color: "var(--coral)", fontStyle: "italic" }}>It scales it.</em>
                </h1>
              </AnimateIn>
              <AnimateIn delay={200}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.1rem",
                    color: "var(--body)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                    maxWidth: 460,
                  }}
                >
                  I help founders think clearly enough that automation actually works — and I build the systems that prove it.
                </p>
              </AnimateIn>
              <AnimateIn delay={300}>
                <div className="flex flex-wrap gap-3">
                  <Link href="/case-studies" className="btn-coral">See the work →</Link>
                  <Link href="/services" className="btn-ghost">How I work</Link>
                </div>
              </AnimateIn>
            </div>
            <AnimateIn delay={200}>
              <FlowCard />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-site" style={{ padding: "1.5rem 1.5rem" }}>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {proofNames.map((name) => (
              <span
                key={name}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "var(--muted)",
                  letterSpacing: "0.04em",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                marginBottom: "2.5rem",
                fontWeight: 700,
              }}
            >
              What I do.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimateIn key={s.title} delay={i * 150}>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "2rem",
                    background: "#fff",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(34,51,44,0.08)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "none";
                  }}
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{s.icon}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.15rem",
                      color: "var(--ink)",
                      marginBottom: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.7, flex: 1 }}>
                    {s.body}
                  </p>
                  <Link
                    href={s.link}
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--coral)",
                      textDecoration: "none",
                      marginTop: "1.25rem",
                    }}
                  >
                    {s.cta}
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY PREVIEW */}
      <section style={{ padding: "5rem 0", background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                marginBottom: "2.5rem",
                fontWeight: 700,
              }}
            >
              Work that shipped.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((c, i) => (
              <AnimateIn key={c.client} delay={i * 150}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <span className="tag-pill">{c.tag}</span>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>
                    {c.client}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--coral)",
                      lineHeight: 1.2,
                    }}
                  >
                    {c.stat}
                  </p>
                  <Link
                    href="/case-studies"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      textDecoration: "none",
                    }}
                  >
                    Read case study →
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* WRITING PREVIEW */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                marginBottom: "2.5rem",
                fontWeight: 700,
              }}
            >
              How I think.
            </h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <AnimateIn key={p.slug} delay={i * 150}>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "1.75rem",
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    height: "100%",
                  }}
                >
                  <span className="tag-pill">{p.tag}</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.4,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.875rem", color: "var(--body)", lineHeight: 1.6, flex: 1 }}>
                    {p.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                    }}
                  >
                    <span>{p.date}</span>
                    <span>·</span>
                    <span>{p.readTime} read</span>
                  </div>
                  <Link
                    href={`/blog/${p.slug}`}
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
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "5rem 0" }}>
        <div className="max-w-site text-center">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                color: "#fff",
                marginBottom: "1rem",
                fontWeight: 700,
              }}
            >
              Let&apos;s build something that actually works.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--faint)",
                marginBottom: "2rem",
                lineHeight: 1.7,
              }}
            >
              Available for consulting, builds, and select speaking engagements.
            </p>
          </AnimateIn>
          <AnimateIn delay={250}>
            <Link href="/about" className="btn-coral">Work with me →</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
