"use client";
import { useState, useEffect, useRef } from "react";
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
    readTime: "4 min read",
  },
  {
    date: "2026 · 05",
    tag: "Field notes",
    title: "I let an automation write for a month. Here's what broke.",
    excerpt: "The pipeline ran beautifully. The thinking behind it didn't.",
    slug: "automation-write-month",
    readTime: "6 min read",
  },
  {
    date: "2026 · 05",
    tag: "Operations",
    title: "The boring part is the part that matters",
    excerpt: "Ten years of scaling ops taught me the unglamorous truth about what actually compounds.",
    slug: "boring-part-matters",
    readTime: "5 min read",
  },
  {
    date: "2026 · 04",
    tag: "AI",
    title: "What Careem taught me about automation at scale",
    excerpt: "We didn't fail because the tools were wrong. We failed because the thinking was.",
    slug: "careem-automation-scale",
    readTime: "7 min read",
  },
  {
    date: "2026 · 03",
    tag: "Building",
    title: "I built a game with no code. Here's what happened.",
    excerpt: "Six weeks. One idea. Zero prior experience. This is what I learned.",
    slug: "built-game-no-code",
    readTime: "8 min read",
  },
  {
    date: "2026 · 02",
    tag: "Opinion",
    title: "Why most AI consultants are selling you nothing",
    excerpt: "The tell is in the first meeting. They talk about tools before they ask about problems.",
    slug: "ai-consultants-selling-nothing",
    readTime: "4 min read",
  },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function SquiggleUnderline() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.getBoundingClientRect();
    const timer = setTimeout(() => {
      path.style.transition = "stroke-dashoffset 0.8s ease-out";
      path.style.strokeDashoffset = "0";
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg viewBox="0 0 200 16" preserveAspectRatio="none" className="writing-squiggle" aria-hidden="true">
      <path
        ref={pathRef}
        d="M2 10 Q 26 2, 50 9 T 100 8 T 150 10 T 198 6"
        fill="none"
        stroke="var(--coral)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [kbdLabel, setKbdLabel] = useState("Ctrl K");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)) {
      setKbdLabel("⌘K");
    }
  }, []);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const filtered = posts.filter((p) => {
    const matchesTag = activeTag === "All" || p.tag === activeTag;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const latest = posts[0];

  return (
    <>
      <style>{`
        .writing-hero {
          padding-top: 120px;
          padding-bottom: 60px;
          background: var(--cream-2);
          overflow: hidden;
        }
        .writing-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 64px;
          align-items: center;
        }
        .writing-hero-title {
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: clamp(3.5rem, 7vw, 6rem);
          line-height: 1.02;
          font-weight: 900;
          color: var(--ink);
          margin: 0 0 1.1rem;
        }
        .writing-hero-accent {
          position: relative;
          display: inline-block;
          font-family: var(--font-fraunces), serif;
          font-style: italic;
          color: var(--coral);
        }
        .writing-squiggle {
          position: absolute;
          left: -2px;
          right: -2px;
          bottom: -0.16em;
          width: calc(100% + 4px);
          height: 0.2em;
          pointer-events: none;
        }
        .writing-hero-sub {
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 1.15rem;
          color: var(--body);
          line-height: 1.7;
          max-width: 48ch;
          margin: 0 0 2.25rem;
        }
        .writing-search-wrap {
          position: relative;
          width: 100%;
          max-width: 480px;
          margin-bottom: 1.5rem;
        }
        .writing-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          display: flex;
          pointer-events: none;
        }
        .writing-search-input {
          width: 100%;
          height: 56px;
          padding: 0 84px 0 48px;
          border: 1px solid var(--line-2);
          border-radius: 12px;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 0.95rem;
          color: var(--ink);
          background: #fff;
          outline: none;
          box-shadow: var(--shadow);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .writing-search-input::placeholder { color: var(--muted); }
        .writing-search-input:focus {
          border-color: var(--coral);
          box-shadow: 0 0 0 4px rgba(232,96,60,0.12);
        }
        .writing-kbd {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          border: 1px solid var(--line-2);
          border-radius: 6px;
          padding: 4px 8px;
          pointer-events: none;
          background: var(--cream-2);
        }
        .writing-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .writing-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 0.45rem 1rem;
          border-radius: 99px;
          border: 1px solid var(--line-2);
          background: transparent;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.75rem;
          color: var(--body);
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .writing-pill:hover {
          border-color: var(--ink2);
          background: #fff;
          transform: translateY(-1px);
        }
        .writing-pill-active,
        .writing-pill-active:hover {
          background: var(--coral);
          border-color: var(--coral);
          color: #fff;
          transform: none;
        }
        .writing-pill-count {
          font-weight: 400;
          opacity: 0.7;
        }
        .writing-pill-active .writing-pill-count { opacity: 0.85; }

        .writing-hero-right {
          position: relative;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .writing-hero-decor {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .writing-hero-quote {
          position: absolute;
          top: -40px;
          right: 10%;
          font-family: var(--font-fraunces), serif;
          font-size: 220px;
          line-height: 1;
          color: var(--coral);
          opacity: 0.07;
          user-select: none;
        }
        .writing-hero-dots {
          position: absolute;
          bottom: -20px;
          left: -10px;
          width: 140px;
          height: 140px;
          background-image: radial-gradient(var(--line-2) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.8;
        }
        .writing-featured-card {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          max-width: 320px;
          background: #fff;
          border: 1px solid var(--line-2);
          border-radius: 18px;
          padding: 1.75rem;
          box-shadow: var(--shadow-lg);
          text-decoration: none;
          transform: rotate(-1deg);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .writing-featured-card:hover {
          transform: rotate(0deg) translateY(-4px);
          box-shadow: 0 24px 56px rgba(34,51,44,0.16);
        }
        .writing-featured-tag {
          display: inline-block;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--coral);
          margin-bottom: 0.75rem;
        }
        .writing-featured-title {
          font-family: var(--font-fraunces), serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.35;
          margin: 0 0 1rem;
        }
        .writing-featured-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 0.8rem;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }
        .writing-featured-dot { opacity: 0.5; }
        .writing-featured-arrow {
          display: inline-flex;
          color: var(--coral);
          margin-top: 0.25rem;
        }

        .writing-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 2.5rem;
        }
        .writing-divider-label {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }
        .writing-divider-rule {
          flex: 1;
          height: 1px;
          background: var(--line);
          position: relative;
        }
        .writing-divider-rule::before {
          content: "";
          position: absolute;
          left: 0;
          top: -1px;
          width: 48px;
          height: 3px;
          background: var(--coral);
        }

        @media (max-width: 1024px) {
          .writing-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .writing-hero-right {
            min-height: 0;
            justify-content: flex-start;
          }
          .writing-featured-card {
            max-width: 100%;
            transform: none;
          }
          .writing-featured-card:hover {
            transform: translateY(-4px);
          }
          .writing-hero-quote { display: none; }
        }
        @media (max-width: 640px) {
          .writing-kbd { display: none; }
          .writing-search-input { padding-right: 16px; }
        }
      `}</style>

      {/* HERO */}
      <section className="writing-hero">
        <div className="max-w-site">
          <div className="writing-hero-grid">
            <div className="writing-hero-left">
              <AnimateIn>
                <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>Writing</p>
              </AnimateIn>
              <AnimateIn delay={90}>
                <h1 className="writing-hero-title">
                  I think{" "}
                  <span className="writing-hero-accent">
                    out loud
                    <SquiggleUnderline />
                  </span>
                  .
                </h1>
              </AnimateIn>
              <AnimateIn delay={180}>
                <p className="writing-hero-sub">
                  Notes on automation, operations, and using AI without losing the plot.
                </p>
              </AnimateIn>

              <AnimateIn delay={270}>
                <div className="writing-search-wrap">
                  <span className="writing-search-icon">
                    <SearchIcon />
                  </span>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search posts…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="writing-search-input"
                  />
                  <span className="writing-kbd">{kbdLabel}</span>
                </div>
              </AnimateIn>

              <AnimateIn delay={360}>
                <div className="writing-pills">
                  {allTags.map((tag) => {
                    const count = tag === "All" ? posts.length : posts.filter((p) => p.tag === tag).length;
                    const active = activeTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`writing-pill ${active ? "writing-pill-active" : ""}`}
                      >
                        {tag}
                        <span className="writing-pill-count">· {count}</span>
                      </button>
                    );
                  })}
                </div>
              </AnimateIn>
            </div>

            <div className="writing-hero-right">
              <div className="writing-hero-decor" aria-hidden="true">
                <span className="writing-hero-quote">&ldquo;</span>
                <div className="writing-hero-dots" />
              </div>
              <AnimateIn delay={220}>
                <Link href={`/blog/${latest.slug}`} className="writing-featured-card">
                  <span className="writing-featured-tag">LATEST</span>
                  <h2 className="writing-featured-title">{latest.title}</h2>
                  <div className="writing-featured-meta">
                    <span>{latest.tag}</span>
                    <span className="writing-featured-dot">•</span>
                    <span>{latest.readTime}</span>
                  </div>
                  <span className="writing-featured-arrow">
                    <ArrowIcon />
                  </span>
                </Link>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-site">
        <div className="writing-divider">
          <span className="writing-divider-label">Latest posts</span>
          <span className="writing-divider-rule" />
        </div>
      </div>

      {/* POSTS */}
      <section style={{ padding: "3rem 0 5rem" }}>
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
