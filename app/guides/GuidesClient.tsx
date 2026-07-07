"use client";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import {
  ArrowIcon,
  BookIcon,
  BoltIcon,
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  CodeIcon,
  SearchIcon,
  SparkleIcon,
} from "./icons";
import type { GuideMeta } from "@/lib/guides";

type SortMode = "newest" | "oldest" | "az" | "za";

type CategoryTheme = {
  gradient: string;
  blobA: string;
  blobB: string;
  Icon: (props: { size?: number; className?: string }) => ReactElement;
};

const CATEGORY_THEME: Record<string, CategoryTheme> = {
  AI: {
    gradient: "linear-gradient(135deg, #FF9A6B 0%, #EA6A47 45%, #B93A1E 100%)",
    blobA: "rgba(255,255,255,0.32)",
    blobB: "rgba(185,58,30,0.45)",
    Icon: SparkleIcon,
  },
  Automation: {
    gradient: "linear-gradient(135deg, #64E6CE 0%, #1E9A87 45%, #0C5F53 100%)",
    blobA: "rgba(255,255,255,0.28)",
    blobB: "rgba(12,95,83,0.5)",
    Icon: BoltIcon,
  },
  "Web Dev": {
    gradient: "linear-gradient(135deg, #93A4FF 0%, #5A6DE6 45%, #31399C 100%)",
    blobA: "rgba(255,255,255,0.28)",
    blobB: "rgba(49,57,156,0.5)",
    Icon: CodeIcon,
  },
};

const DEFAULT_THEME: CategoryTheme = {
  gradient: "linear-gradient(135deg, rgba(34,51,44,0.4), rgba(34,51,44,0.14))",
  blobA: "rgba(255,255,255,0.25)",
  blobB: "rgba(34,51,44,0.35)",
  Icon: BookIcon,
};

function getTheme(category: string): CategoryTheme {
  return CATEGORY_THEME[category] || DEFAULT_THEME;
}

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

function FeaturedCard({ guide }: { guide: GuideMeta }) {
  const theme = getTheme(guide.category);
  const { Icon } = theme;
  return (
    <Link href={`/guides/${guide.slug}`} className="gd-featured">
      <div className="gd-featured-media" style={{ background: theme.gradient }}>
        <span className="gd-featured-blob gd-featured-blob-a" style={{ background: theme.blobA }} />
        <span className="gd-featured-blob gd-featured-blob-b" style={{ background: theme.blobB }} />
        <Icon size={168} className="gd-featured-watermark" />
      </div>
      <div className="gd-featured-body">
        <span className="guide-badge gd-featured-badge">{guide.category}</span>
        <h2 className="gd-featured-title">{guide.title}</h2>
        {guide.excerpt && <p className="gd-featured-excerpt">{guide.excerpt}</p>}
        <span className="gd-featured-meta">
          <CalendarIcon size={13} /> {formatDate(guide.date)}
          <span className="gd-featured-dot">·</span>
          <ClockIcon size={13} /> {guide.readingTime} min read
        </span>
        <span className="gd-featured-cta">
          Read guide <ArrowIcon size={15} />
        </span>
      </div>
    </Link>
  );
}

function GridCard({ guide }: { guide: GuideMeta }) {
  const theme = getTheme(guide.category);
  const { Icon } = theme;
  return (
    <Link href={`/guides/${guide.slug}`} className="gd-gcard-link">
      <article className="gd-gcard">
        <div className="gd-gcard-media" style={{ background: theme.gradient }}>
          <span className="gd-gcard-blob" style={{ background: theme.blobB }} />
          <Icon size={64} className="gd-gcard-watermark" />
          <span className="guide-badge gd-gcard-badge">{guide.category}</span>
        </div>
        <div className="gd-gcard-body">
          <h3 className="gd-gcard-title">{guide.title}</h3>
          {guide.excerpt && <p className="gd-gcard-excerpt">{guide.excerpt}</p>}
          <span className="gd-gcard-meta">
            <CalendarIcon size={12} /> {formatDate(guide.date)}
            <span className="gd-gcard-dot">·</span>
            <ClockIcon size={12} /> {guide.readingTime} min read
          </span>
          <span className="gd-gcard-read">
            Read guide <ArrowIcon size={12} />
          </span>
        </div>
      </article>
    </Link>
  );
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

  const featured = filtersActive ? null : latest;
  const gridGuides = filtersActive
    ? filtered
    : filtered.filter((g) => g.slug !== featured?.slug);

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
          margin: 0;
        }

        .gd-featured-section {
          padding: 56px 0 60px;
          background: #fff;
        }

        .gd-featured {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 40px;
          align-items: stretch;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--radius-card);
          padding: 24px;
          text-decoration: none;
          box-shadow: var(--shadow);
          transition: box-shadow 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .gd-featured:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        .gd-featured-media {
          position: relative;
          min-height: 280px;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }
        .gd-featured-blob {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          filter: blur(50px);
        }
        .gd-featured-blob-a { top: -60px; left: -50px; }
        .gd-featured-blob-b { bottom: -70px; right: -40px; }
        .gd-featured-watermark {
          position: relative;
          color: #fff;
          opacity: 0.22;
          margin: 24px;
          transition: transform 0.4s var(--ease), opacity 0.4s var(--ease);
        }
        .gd-featured:hover .gd-featured-watermark {
          transform: translate(-8px, -8px) rotate(4deg) scale(1.04);
          opacity: 0.3;
        }
        .gd-featured-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 10px;
          padding: 12px 16px 12px 4px;
        }
        .gd-featured-badge {
          font-size: 0.82rem;
          padding: 6px 16px;
        }
        .gd-featured-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 700;
          font-size: clamp(26px, 2.6vw, 38px);
          line-height: 1.18;
          letter-spacing: -0.3px;
          color: var(--ink);
          margin: 0.3rem 0 0.1rem;
        }
        .gd-featured-excerpt {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 1rem;
          color: var(--body);
          line-height: 1.65;
          margin: 0 0 0.2rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gd-featured-meta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          color: var(--muted);
        }
        .gd-featured-dot { opacity: 0.6; margin: 0 2px; }
        .gd-featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 0.6rem;
          padding: 12px 22px;
          border-radius: var(--radius-chip);
          background: var(--coral);
          color: #fff;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          transition: background 0.2s ease, gap 0.2s ease, transform 0.2s ease;
        }
        .gd-featured:hover .gd-featured-cta {
          background: var(--coral-d);
          gap: 11px;
          transform: translateX(2px);
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
          padding: 48px 0 96px;
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
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--radius-card);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: box-shadow 0.25s var(--ease), transform 0.25s var(--ease), border-color 0.25s var(--ease);
        }
        .gd-gcard:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-3px);
          border-color: var(--line-2);
        }
        .gd-gcard-media {
          position: relative;
          height: 140px;
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }
        .gd-gcard-blob {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          bottom: -40px;
          right: -30px;
          filter: blur(30px);
        }
        .gd-gcard-watermark {
          position: relative;
          color: #fff;
          opacity: 0.25;
          margin: 14px;
          transition: transform 0.3s var(--ease);
        }
        .gd-gcard:hover .gd-gcard-watermark {
          transform: translate(-4px, -4px) rotate(4deg);
        }
        .gd-gcard-badge {
          position: absolute;
          top: 10px;
          left: 10px;
        }
        .gd-gcard-body {
          padding: var(--card-pad);
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .gd-gcard-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.1rem;
          line-height: 1.35;
          color: var(--ink);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gd-gcard-excerpt {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 13px;
          line-height: 1.6;
          color: var(--body);
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gd-gcard-meta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.72rem;
          color: var(--faint);
          letter-spacing: 0.04em;
        }
        .gd-gcard-dot { opacity: 0.6; margin: 0 1px; }
        .gd-gcard-read {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-end;
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

        .gd-grid-soon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
          padding: 3rem 1rem;
          border: 1px dashed var(--line-2);
          border-radius: var(--radius-card);
          color: var(--muted);
        }
        .gd-grid-soon-icon { color: var(--faint); }
        .gd-grid-soon-text {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 0.9rem;
          color: var(--muted);
          margin: 0;
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

        @media (max-width: 767px) {
          .gd-hero { padding: 104px 0 64px; }
          .gd-featured-section { padding: 40px 0 40px; }
          .gd-featured { grid-template-columns: 1fr; gap: 20px; padding: 16px; }
          .gd-featured-media { min-height: 200px; }
          .gd-featured-body { padding: 4px; }
          .gd-search-input { padding-right: 16px; }
          .gd-kbd { display: none; }
          .gd-filter-row { flex-direction: column; align-items: flex-start; }
          .gd-sort-wrap { width: 100%; justify-content: space-between; }
        }

        @media (max-width: 640px) {
          .gd-grid { grid-template-columns: 1fr; }
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
        </div>
      </section>

      {featured && (
        <section className="gd-featured-section">
          <div className="max-w-site">
            <AnimateIn delay={100}>
              <FeaturedCard guide={featured} />
            </AnimateIn>
          </div>
        </section>
      )}

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
          {filtersActive && filtered.length === 0 ? (
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
          ) : gridGuides.length === 0 ? (
            <div className="gd-grid-soon">
              <span className="gd-grid-soon-icon">
                <BookIcon size={28} />
              </span>
              <p className="gd-grid-soon-text">More guides coming soon.</p>
            </div>
          ) : (
            <div className="gd-grid">
              {gridGuides.map((guide, i) => (
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
