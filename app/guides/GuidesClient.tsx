"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import GuideCard from "./GuideCard";
import { BookIcon, ChevronDownIcon, SearchIcon } from "./icons";
import type { GuideMeta } from "@/lib/guides";

type SortMode = "newest" | "oldest" | "az" | "za";

function formatDate(raw: string): string {
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

export default function GuidesClient({ guides }: { guides: GuideMeta[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortMode>("newest");
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

  const latest = useMemo(
    () => [...guides].sort((a, b) => (b.date || "").localeCompare(a.date || ""))[0],
    [guides]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matched = guides.filter((g) => {
      const matchesQuery =
        !q || g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q);
      const matchesCategory = category === "All" || g.category === category;
      return matchesQuery && matchesCategory;
    });

    return [...matched].sort((a, b) => {
      switch (sort) {
        case "newest":
          return (b.date || "").localeCompare(a.date || "");
        case "oldest":
          return (a.date || "").localeCompare(b.date || "");
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
      }
    });
  }, [guides, search, category, sort]);

  const filtersActive = search.trim() !== "" || category !== "All";

  function clearFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <>
      <style>{`
        main.flex-1 {
          flex: 0 1 auto;
        }
        .gd-hero {
          padding: 112px 0 64px;
          background: var(--cream);
        }
        .gd-hero-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: clamp(36px, 5vw, 56px);
          letter-spacing: -0.5px;
          line-height: 1.05;
          color: var(--ink);
          margin: 0 0 0.75rem;
        }
        .gd-hero-sub {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1.05rem;
          color: var(--body);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 0 2.25rem;
        }

        .gd-featured-card {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 28px;
          max-width: 780px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 30px;
          text-decoration: none;
          box-shadow: var(--shadow);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .gd-featured-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-3px);
        }
        .gd-featured-thumb {
          position: relative;
          min-height: 160px;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(234,106,71,0.14), rgba(234,106,71,0.04));
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--coral);
          opacity: 0.4;
        }
        .gd-featured-thumb img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
        }
        .gd-featured-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding: 8px 8px 8px 0;
        }
        .gd-featured-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.4rem;
          line-height: 1.3;
          color: var(--ink);
          margin: 0.4rem 0 0.2rem;
        }
        .gd-featured-excerpt {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.9rem;
          color: var(--body);
          line-height: 1.6;
          margin: 0 0 0.4rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gd-featured-meta {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          color: var(--muted);
        }
        .gd-featured-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 0.4rem;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--coral);
          transition: color 0.2s ease, gap 0.2s ease;
        }
        .gd-featured-card:hover .gd-featured-link {
          color: var(--coral-d);
          gap: 9px;
        }

        .gd-filter-bar {
          position: sticky;
          top: 60px;
          z-index: 30;
          background: #fff;
          border-bottom: 1px solid var(--line);
          padding: 20px 0;
        }
        .gd-search-wrap {
          position: relative;
          width: 100%;
          max-width: 480px;
          margin-bottom: 16px;
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

        .gd-filter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .gd-pill-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .gd-pill-row::-webkit-scrollbar { display: none; }
        .gd-pill {
          flex-shrink: 0;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: var(--cream);
          color: var(--body);
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.1s ease-out, color 0.1s ease-out, box-shadow 0.15s ease;
          white-space: nowrap;
        }
        .gd-pill:hover {
          box-shadow: var(--shadow);
        }
        .gd-pill.active {
          background: var(--coral);
          color: #fff;
          font-weight: 700;
        }
        .gd-sort-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .gd-sort-label {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
        }
        .gd-sort-select-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .gd-sort-select {
          appearance: none;
          padding: 8px 32px 8px 12px;
          border: 1px solid var(--line-2);
          border-radius: 8px;
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--ink);
          background: #fff;
          outline: none;
          cursor: pointer;
        }
        .gd-sort-chevron {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          pointer-events: none;
          display: flex;
        }
        .gd-filter-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 12px;
        }
        .gd-results-count {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.75rem;
          color: var(--muted);
        }
        .gd-clear-btn {
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
          padding: 3rem 0 96px;
        }
        .gd-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
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

        @media (max-width: 767px) {
          .gd-hero { padding: 104px 0 64px; }
          .gd-featured-card { display: none; }
          .gd-search-input { padding-right: 16px; }
          .gd-kbd { display: none; }
          .gd-filter-row { flex-direction: column; align-items: flex-start; }
          .gd-sort-wrap { width: 100%; justify-content: space-between; }
        }
      `}</style>

      <ScrollProgressBar />

      <section className="gd-hero">
        <div className="max-w-site">
          <AnimateIn delay={80}>
            <h1 className="gd-hero-title">Guides</h1>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p className="gd-hero-sub">Automation guides for engineers and founders.</p>
          </AnimateIn>

          {latest && (
            <AnimateIn delay={220}>
              <Link href={`/guides/${latest.slug}`} className="gd-featured-card">
                <div className="gd-featured-thumb">
                  {latest.thumbnail ? (
                    <img src={latest.thumbnail} alt="" />
                  ) : (
                    <BookIcon size={36} />
                  )}
                </div>
                <div className="gd-featured-body">
                  <span className="guide-badge">{latest.category}</span>
                  <h2 className="gd-featured-title">{latest.title}</h2>
                  {latest.excerpt && <p className="gd-featured-excerpt">{latest.excerpt}</p>}
                  <span className="gd-featured-meta">
                    {formatDate(latest.date)} · {latest.readingTime} min read
                  </span>
                  <span className="gd-featured-link">Read guide →</span>
                </div>
              </Link>
            </AnimateIn>
          )}
        </div>
      </section>

      <div className="gd-filter-bar">
        <div className="max-w-site">
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

          <div className="gd-filter-row">
            <div className="gd-pill-row">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`gd-pill${category === c ? " active" : ""}`}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="gd-sort-wrap">
              <label htmlFor="gd-sort" className="gd-sort-label">
                Sort by
              </label>
              <div className="gd-sort-select-wrap">
                <select
                  id="gd-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="gd-sort-select"
                >
                  <option value="newest">Most recent</option>
                  <option value="oldest">Oldest first</option>
                  <option value="az">A–Z</option>
                  <option value="za">Z–A</option>
                </select>
                <span className="gd-sort-chevron" aria-hidden="true">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
          </div>

          {filtersActive && (
            <div className="gd-filter-meta">
              <span className="gd-results-count">
                Showing {filtered.length} of {guides.length} guides
              </span>
              <button type="button" className="gd-clear-btn" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
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
                  <GuideCard guide={guide} />
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
