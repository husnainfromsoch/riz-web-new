"use client";
import { useState } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

const allTags = ["All", "Opinion", "Field notes", "Operations", "AI", "Building"];

const posts = [
  {
    date: "2026 · 06",
    tag: "Opinion",
    title: '"Just add AI" is the new "just add blockchain"',
    excerpt: "Bolting AI onto a broken process doesn't fix the process. It just makes the mess faster.",
    slug: "just-add-ai",
  },
  {
    date: "2026 · 05",
    tag: "Field notes",
    title: "I let an automation write for a month. Here's what broke.",
    excerpt: "The pipeline ran beautifully. The thinking behind it didn't.",
    slug: "automation-write-month",
  },
  {
    date: "2026 · 05",
    tag: "Operations",
    title: "The boring part is the part that matters",
    excerpt: "Ten years of scaling ops taught me the unglamorous truth about what actually compounds.",
    slug: "boring-part-matters",
  },
  {
    date: "2026 · 04",
    tag: "AI",
    title: "What Careem taught me about automation at scale",
    excerpt: "We didn't fail because the tools were wrong. We failed because the thinking was.",
    slug: "careem-automation-scale",
  },
  {
    date: "2026 · 03",
    tag: "Building",
    title: "I built a game with no code. Here's what happened.",
    excerpt: "Six weeks. One idea. Zero prior experience. This is what I learned.",
    slug: "built-game-no-code",
  },
  {
    date: "2026 · 02",
    tag: "Opinion",
    title: "Why most AI consultants are selling you nothing",
    excerpt: "The tell is in the first meeting. They talk about tools before they ask about problems.",
    slug: "ai-consultants-selling-nothing",
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
      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 60, background: "var(--cream-2)" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>Writing</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(2.2rem, 4vw, 3rem)",
                lineHeight: 1.2,
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              I think out loud.
            </h1>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.05rem",
                color: "var(--body)",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: 520,
              }}
            >
              Notes on automation, operations, and using AI without losing the plot.
            </p>
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
                display: "block",
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
                    fontSize: "0.72rem",
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

      {/* POSTS */}
      <section style={{ padding: "4rem 0 5rem" }}>
        <div className="max-w-site">
          {filtered.length === 0 ? (
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", color: "var(--muted)", fontSize: "1rem" }}>
              No posts found.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {filtered.map((p, i) => (
                <AnimateIn key={p.slug} delay={i * 80}>
                  <div
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 12,
                      padding: "2rem",
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      height: "100%",
                      boxShadow: "var(--shadow)",
                      transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-lg)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)";
                      (e.currentTarget as HTMLDivElement).style.transform = "none";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: "0.68rem",
                          color: "var(--faint)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {p.date}
                      </span>
                      <span className="tag-pill">{p.tag}</span>
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.4,
                        flex: 1,
                      }}
                    >
                      {p.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.875rem",
                        color: "var(--body)",
                        lineHeight: 1.65,
                      }}
                    >
                      {p.excerpt}
                    </p>
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
