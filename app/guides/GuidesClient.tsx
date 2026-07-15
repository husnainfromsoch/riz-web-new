"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { ArrowIcon, SearchIcon } from "./icons";
import type { GuideMeta } from "@/lib/guides";

function GridCard({ guide }: { guide: GuideMeta }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="gd-gcard-link">
      <article className="gd-gcard">
        <div className="gd-gcard-tags">
          <span className="gd-pill gd-pill-topic">{guide.category}</span>
          <span className="gd-pill gd-pill-tool">{guide.tool}</span>
        </div>
        <h3 className="gd-gcard-title">{guide.title}</h3>
        <span className="gd-gcard-read">
          Read guide <ArrowIcon size={12} />
        </span>
      </article>
    </Link>
  );
}

export default function GuidesClient({ guides }: { guides: GuideMeta[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [tool, setTool] = useState("All tools");
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

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(guides.map((g) => g.category))).sort()],
    [guides]
  );

  const tools = useMemo(
    () => ["All tools", ...Array.from(new Set(guides.map((g) => g.tool))).sort()],
    [guides]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return guides
      .filter((g) => {
        const matchesQuery =
          !q || g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q);
        const matchesCategory = category === "All" || g.category === category;
        const matchesTool = tool === "All tools" || g.tool === tool;
        return matchesQuery && matchesCategory && matchesTool;
      })
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }, [guides, search, category, tool]);

  const filtersActive = search.trim() !== "" || category !== "All" || tool !== "All tools";

  const latest = useMemo(
    () =>
      guides.length
        ? [...guides].sort((a, b) => (b.date || "").localeCompare(a.date || ""))[0]
        : null,
    [guides]
  );

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setTool("All tools");
  }

  return (
    <>
      <style>{`
        main.flex-1 {
          flex: 0 1 auto;
        }
        .gd-hero {
          padding: 112px 0 0;
          background: var(--cream);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .gd-hero .max-w-site {
          position: relative;
          z-index: 1;
        }
        .gd-hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          color: var(--coral);
        }
        .gd-doodle {
          position: absolute;
        }
        .gd-doodle-arrow { top: 128px; left: 6%; opacity: 0.13; transform: rotate(-12deg); }
        .gd-doodle-sparkle { top: 96px; right: 8%; opacity: 0.14; }
        .gd-doodle-sparkle-sm { top: 210px; right: 26%; opacity: 0.1; transform: scale(0.6) rotate(20deg); }
        .gd-doodle-squiggle { bottom: 26px; left: 18%; opacity: 0.12; }
        .gd-doodle-circle { top: 170px; right: 3%; opacity: 0.1; transform: rotate(8deg); }
        .gd-doodle-loop { top: 60px; left: 30%; opacity: 0.09; }
        .gd-hero-watermark {
          position: absolute;
          left: -30px;
          bottom: -78px;
          font-family: var(--font-caveat), 'Caveat', cursive;
          font-size: clamp(140px, 16vw, 230px);
          line-height: 1;
          color: var(--coral);
          opacity: 0.055;
          transform: rotate(-5deg);
          white-space: nowrap;
          user-select: none;
        }
        .gd-hero-accent {
          font-family: var(--font-caveat), 'Caveat', cursive;
          font-size: clamp(1.4rem, 2.5vw, 1.75rem);
          color: var(--coral);
          display: block;
          margin-bottom: 0.25rem;
          transform: rotate(-2deg);
        }
        .gd-hero-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 700;
          font-size: clamp(38px, 5.5vw, 60px);
          letter-spacing: -0.5px;
          line-height: 1.05;
          color: var(--ink);
          margin: 0 0 1rem;
        }
        .gd-hero-em {
          position: relative;
          color: var(--coral);
          white-space: nowrap;
        }
        .gd-hero-em svg {
          position: absolute;
          left: 0;
          bottom: -0.18em;
          width: 100%;
          height: 0.28em;
          overflow: visible;
        }
        .gd-hero-sub {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1.05rem;
          color: var(--body);
          line-height: 1.7;
          max-width: 560px;
          margin: 0 auto 1.75rem;
        }
        .gd-search-wrap {
          position: relative;
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
        }
        .gd-search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          display: flex;
          pointer-events: none;
        }
        .gd-search-input {
          width: 100%;
          height: 48px;
          padding: 0 84px 0 48px;
          border: 1px solid var(--line-2);
          border-radius: 12px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.95rem;
          color: var(--ink);
          background: #fff;
          outline: none;
          box-shadow: var(--shadow);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .gd-search-input::placeholder { color: var(--muted); }
        .gd-search-input:focus {
          border-color: var(--coral);
          box-shadow: 0 0 0 4px rgba(234,106,71,0.12);
        }
        .gd-kbd {
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

        .gd-filters {
          background: var(--cream);
          padding: 44px 0 36px;
          text-align: center;
        }
        .gd-filter-row {
          margin-top: 32px;
        }
        .gd-filter-row:first-child {
          margin-top: 0;
        }
        .gd-filter-script {
          font-family: var(--font-caveat), 'Caveat', cursive;
          font-size: 1.3rem;
          color: var(--coral);
          display: block;
          margin-bottom: 10px;
          transform: rotate(-1.5deg);
        }
        .gd-filter-pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        .gd-filter-pill {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--ink);
          background: #fff;
          border: 1px solid var(--line-2);
          border-radius: 999px;
          padding: 9px 20px;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .gd-filter-pill:hover {
          border-color: var(--coral);
          color: var(--coral);
          transform: translateY(-1px);
        }
        .gd-filter-pill.is-active {
          background: var(--coral);
          border-color: var(--coral);
          color: #fff;
        }
        .gd-filter-pill.is-active:hover {
          color: #fff;
          background: var(--coral-d);
          border-color: var(--coral-d);
        }
        .gd-results-count {
          display: inline-block;
          margin-top: 32px;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          color: var(--body);
        }
        .gd-clear-btn {
          margin-left: 12px;
          background: none;
          border: 1px solid var(--line-2);
          border-radius: 8px;
          padding: 5px 12px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--body);
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .gd-clear-btn:hover {
          border-color: var(--ink);
          color: var(--ink);
        }

        .gd-grid-section {
          padding: 56px 0 96px;
          min-height: calc(100vh - 120px);
          box-sizing: border-box;
        }
        .gd-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .gd-gcard-link {
          display: block;
          height: 100%;
          text-decoration: none;
        }
        .gd-gcard {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 1.75rem;
          transition: box-shadow 0.25s var(--ease), transform 0.25s var(--ease), border-color 0.25s var(--ease);
        }
        .gd-gcard:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-3px);
          border-color: var(--line-2);
        }
        .gd-gcard-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 1rem;
        }
        .gd-gcard-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 700;
          font-size: 1.25rem;
          line-height: 1.35;
          color: var(--ink);
          margin: 0 0 1.5rem;
          flex: 1;
        }
        .gd-gcard-read {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--coral);
          transition: color 0.2s ease, gap 0.2s ease;
        }
        .gd-gcard:hover .gd-gcard-read {
          color: var(--coral-d);
          gap: 9px;
        }

        .gd-float-wrap {
          position: absolute;
          right: 24px;
          top: 30px;
          width: 240px;
          z-index: 2;
        }
        .gd-float-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.6rem;
          text-align: left;
          text-decoration: none;
          background: #fff;
          border: 1px solid var(--line-2);
          border-radius: 16px;
          padding: 1.25rem 1.35rem;
          box-shadow: var(--shadow-lg);
          transform: rotate(4deg);
          transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
        }
        .gd-float-card:hover {
          transform: rotate(1deg) translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .gd-float-label {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
          background: var(--coral);
          border-radius: 999px;
          padding: 4px 10px;
        }
        .gd-float-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 700;
          font-size: 1.05rem;
          line-height: 1.35;
          color: var(--ink);
          margin: 0;
        }
        .gd-float-date {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
        }
        .gd-float-card .gd-gcard-read { font-size: 12px; }
        .gd-float-card:hover .gd-gcard-read {
          color: var(--coral-d);
          gap: 9px;
        }
        .gd-float-left {
          position: absolute;
          left: 32px;
          top: 48px;
          width: 210px;
          z-index: 2;
          text-align: center;
          pointer-events: none;
        }
        .gd-deck {
          position: relative;
          width: 170px;
          height: 128px;
          margin: 0 auto;
        }
        .gd-deck-card {
          position: absolute;
          inset: 0;
          background: #fff;
          border: 1px solid var(--line-2);
          border-radius: 14px;
          box-shadow: var(--shadow);
        }
        .gd-deck-card:nth-child(1) { transform: rotate(-8deg) translate(-8px, 6px); opacity: 0.55; }
        .gd-deck-card:nth-child(2) { transform: rotate(5deg) translate(7px, 2px); opacity: 0.75; }
        .gd-deck-card:nth-child(3) {
          transform: rotate(-2deg);
          box-shadow: var(--shadow-lg);
          padding: 1rem 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 9px;
        }
        .gd-deck-pill {
          width: 52px;
          height: 12px;
          border-radius: 999px;
          background: var(--coral);
          opacity: 0.75;
        }
        .gd-deck-line {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: var(--line-2);
        }
        .gd-deck-line.is-short { width: 62%; }
        .gd-deck-label {
          display: inline-block;
          margin-top: 18px;
          font-family: var(--font-caveat), 'Caveat', cursive;
          font-size: 1.25rem;
          color: var(--body);
          transform: rotate(-3deg);
        }
        @media (max-width: 1280px) {
          .gd-float-wrap, .gd-float-left { display: none; }
        }

        .gd-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          padding: 4rem 1rem;
          max-width: 440px;
          margin: 0 auto;
        }
        .gd-empty-icon { color: var(--coral); opacity: 0.45; }
        .gd-empty-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.4rem;
          color: var(--ink);
          margin: 0;
        }
        .gd-empty-body {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.95rem;
          color: var(--body);
          line-height: 1.6;
          margin: 0 0 0.5rem;
        }

        @media (max-width: 1024px) {
          .gd-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 1024px) and (min-width: 768px) {
          .gd-doodle-loop, .gd-doodle-sparkle-sm, .gd-doodle-circle { display: none; }
        }
        @media (max-width: 767px) {
          .gd-hero { padding: 104px 0 0; }
          .gd-filters { padding-top: 36px; }
          .gd-doodle { display: none; }
          .gd-hero-watermark { font-size: 120px; bottom: -44px; opacity: 0.05; }
          .gd-search-input { padding-right: 16px; }
          .gd-kbd { display: none; }
        }
        @media (max-width: 640px) {
          .gd-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <ScrollProgressBar />

      <section className="gd-hero">
        <div className="gd-hero-bg" aria-hidden="true">
          <span className="gd-hero-watermark">guides</span>
          <svg className="gd-doodle gd-doodle-arrow" width="72" height="60" viewBox="0 0 72 60" fill="none">
            <path d="M6 6 C 18 34, 40 48, 64 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 54 L 64 50 L 56 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="gd-doodle gd-doodle-sparkle" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M22 4 C 23 14, 26 19, 40 22 C 26 25, 23 30, 22 40 C 21 30, 18 25, 4 22 C 18 19, 21 14, 22 4 Z" fill="currentColor" />
          </svg>
          <svg className="gd-doodle gd-doodle-sparkle-sm" width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M22 4 C 23 14, 26 19, 40 22 C 26 25, 23 30, 22 40 C 21 30, 18 25, 4 22 C 18 19, 21 14, 22 4 Z" fill="currentColor" />
          </svg>
          <svg className="gd-doodle gd-doodle-squiggle" width="110" height="18" viewBox="0 0 110 18" fill="none">
            <path d="M3 12 Q 14 3, 25 10 T 47 9 T 69 10 T 91 8 T 107 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <svg className="gd-doodle gd-doodle-circle" width="64" height="46" viewBox="0 0 64 46" fill="none">
            <path d="M33 5 C 12 4, 3 12, 4 23 C 5 36, 22 42, 38 40 C 54 38, 62 29, 59 18 C 56 8, 42 3, 28 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <svg className="gd-doodle gd-doodle-loop" width="70" height="34" viewBox="0 0 70 34" fill="none">
            <path d="M4 26 C 14 6, 26 4, 28 14 C 30 24, 18 28, 22 18 C 27 6, 48 4, 66 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="max-w-site">
          <AnimateIn delay={40}>
            <span className="gd-hero-accent">the whole library</span>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h1 className="gd-hero-title">
              All the{" "}
              <span className="gd-hero-em">
                guides
                <svg viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M2 9 Q 28 3, 52 7 T 98 5"
                    fill="none"
                    stroke="var(--coral)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                </svg>
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p className="gd-hero-sub">
              Practical automation guides for engineers and founders — pick a topic, pick a tool,
              and dig in.
            </p>
          </AnimateIn>
          <AnimateIn delay={340} className="gd-float-left">
            <div aria-hidden="true">
              <div className="gd-deck">
                <div className="gd-deck-card" />
                <div className="gd-deck-card" />
                <div className="gd-deck-card">
                  <span className="gd-deck-pill" />
                  <span className="gd-deck-line" />
                  <span className="gd-deck-line" />
                  <span className="gd-deck-line is-short" />
                </div>
              </div>
              <span className="gd-deck-label">the whole pile ↓</span>
            </div>
          </AnimateIn>
          {latest && (
            <AnimateIn delay={300} className="gd-float-wrap">
              <Link href={`/guides/${latest.slug}`} className="gd-float-card">
                <span className="gd-float-label">Latest guide</span>
                <h2 className="gd-float-title">{latest.title}</h2>
                {latest.date && <span className="gd-float-date">{latest.date}</span>}
                <span className="gd-gcard-read">
                  Read guide <ArrowIcon size={12} />
                </span>
              </Link>
            </AnimateIn>
          )}
          <AnimateIn delay={220}>
            <div className="gd-search-wrap">
              <span className="gd-search-icon">
                <SearchIcon />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search guides…"
                aria-label="Search guides"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="gd-search-input"
              />
              <span className="gd-kbd">{kbdLabel}</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      <div className="gd-filters">
        <div className="max-w-site">
          <div className="gd-filter-row">
            <span className="gd-filter-script">filter by topic</span>
            <div className="gd-filter-pills" role="group" aria-label="Filter by topic">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`gd-filter-pill${category === c ? " is-active" : ""}`}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="gd-filter-row">
            <span className="gd-filter-script">filter by AI tool</span>
            <div className="gd-filter-pills" role="group" aria-label="Filter by AI tool">
              {tools.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`gd-filter-pill${tool === t ? " is-active" : ""}`}
                  aria-pressed={tool === t}
                  onClick={() => setTool(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <span className="gd-results-count">
            Showing {filtered.length} of {guides.length} guides
            {filtersActive && (
              <button type="button" className="gd-clear-btn" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </span>
        </div>
      </div>

      <section className="gd-grid-section">
        <div className="max-w-site">
          {filtered.length === 0 ? (
            <div className="gd-empty">
              <span className="gd-empty-icon">
                <SearchIcon size={40} />
              </span>
              <h2 className="gd-empty-title">No guides match that filter</h2>
              <p className="gd-empty-body">
                Try changing your search or clearing filters to explore all guides.
              </p>
              <button type="button" className="btn-ghost" onClick={clearFilters}>
                View all guides
              </button>
            </div>
          ) : (
            <div className="gd-grid">
              {filtered.map((guide, i) => (
                <AnimateIn key={guide.slug} delay={Math.min(i, 6) * 60}>
                  <GridCard guide={guide} />
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
