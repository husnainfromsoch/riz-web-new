"use client";
import { useState } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

const allTags = ["All", "AI", "Operations", "Automation", "Strategy"];

const posts = [
  {
    title: "Why your automation keeps breaking",
    date: "Jan 2025",
    readTime: "6 min",
    tag: "Automation",
    excerpt: "The problem is never the tool. It's the process you encoded into the tool. Fix the process first, then automate it.",
    slug: "why-automation-breaks",
  },
  {
    title: "What Careem taught me about scaling ops",
    date: "Dec 2024",
    readTime: "8 min",
    tag: "Operations",
    excerpt: "At 2am in Dubai, watching a system fail in ways nobody predicted, I learned more about operations than any MBA could teach.",
    slug: "careem-scaling-ops",
  },
  {
    title: "The AI adoption playbook I wish existed",
    date: "Nov 2024",
    readTime: "5 min",
    tag: "AI",
    excerpt: "Most AI adoption fails at the same point. Not the technology. Not the budget. The point where someone has to change how they work.",
    slug: "ai-adoption-playbook",
  },
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = posts.filter((p) => {
    const matchesTag = activeTag === "All" || p.tag === activeTag;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <>
      <section style={{ paddingTop: 120, paddingBottom: 60, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>WRITING</p>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "2rem",
              }}
            >
              How I think.
            </h1>
          </AnimateIn>

          {/* Search */}
          <AnimateIn delay={200}>
            <input
              type="text"
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                maxWidth: 480,
                padding: "0.75rem 1rem",
                border: "1px solid var(--line-2)",
                borderRadius: 8,
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.95rem",
                color: "var(--ink)",
                background: "#fff",
                outline: "none",
                marginBottom: "1.25rem",
              }}
            />
          </AnimateIn>

          {/* Tag filters */}
          <AnimateIn delay={250}>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: 99,
                    border: "1px solid",
                    borderColor: activeTag === tag ? "var(--coral)" : "var(--line-2)",
                    background: activeTag === tag ? "rgba(234,106,71,0.08)" : "transparent",
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.75rem",
                    color: activeTag === tag ? "var(--coral)" : "var(--muted)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      <section style={{ padding: "4rem 0 5rem" }}>
        <div className="max-w-site">
          {filtered.length === 0 ? (
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "var(--muted)", fontSize: "1rem" }}>
              No posts found.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
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
                      transition: "box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(34,51,44,0.07)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}
                  >
                    <span className="tag-pill">{p.tag}</span>
                    <h2
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                      }}
                    >
                      {p.title}
                    </h2>
                    <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.875rem", color: "var(--body)", lineHeight: 1.65, flex: 1 }}>
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
          )}
        </div>
      </section>
    </>
  );
}
