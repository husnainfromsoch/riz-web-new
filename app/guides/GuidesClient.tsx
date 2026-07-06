"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
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
  const [sort, setSort] = useState<SortMode>("newest");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const matched = guides.filter((g) => g.title.toLowerCase().includes(q));

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
  }, [guides, search, sort]);

  return (
    <section style={{ padding: "4rem 0 5rem" }}>
      <div className="max-w-site">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.9rem",
            marginBottom: "2.5rem",
          }}
        >
          <input
            type="text"
            placeholder="Search guides…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 320px",
              maxWidth: 480,
              padding: "0.75rem 1rem",
              border: "1px solid var(--line-2)",
              borderRadius: 8,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.95rem",
              color: "var(--ink)",
              background: "#fff",
              outline: "none",
              boxShadow: "var(--shadow)",
            }}
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            style={{
              padding: "0.75rem 1rem",
              border: "1px solid var(--line-2)",
              borderRadius: 8,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "var(--ink)",
              background: "#fff",
              outline: "none",
              boxShadow: "var(--shadow)",
            }}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">Title A-Z</option>
            <option value="za">Title Z-A</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              color: "var(--muted)",
              fontSize: "1rem",
            }}
          >
            No guides found.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filtered.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <article
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    background: "#fff",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "var(--shadow)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "var(--shadow-lg)";
                    el.style.transform = "translateY(-3px)";
                    el.style.borderColor = "var(--coral)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "var(--shadow)";
                    el.style.transform = "none";
                    el.style.borderColor = "var(--line)";
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      overflow: "hidden",
                      background: "var(--cream)",
                      flexShrink: 0,
                    }}
                  >
                    {guide.thumbnail ? (
                      <img
                        src={guide.thumbnail}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontSize: "0.7rem",
                          letterSpacing: "0.08em",
                          color: "var(--faint)",
                        }}
                      >
                        GUIDE
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                      flex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: "0.68rem",
                        color: "var(--faint)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {formatDate(guide.date)}
                    </span>

                    <h2
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "1.05rem",
                        fontWeight: 900,
                        color: "var(--ink)",
                        lineHeight: 1.35,
                        flex: 1,
                        margin: 0,
                      }}
                    >
                      {guide.title}
                    </h2>

                    {guide.excerpt && (
                      <p
                        style={{
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontSize: "0.875rem",
                          color: "var(--body)",
                          lineHeight: 1.65,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {guide.excerpt}
                      </p>
                    )}

                    <span
                      style={{
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        color: "var(--coral)",
                        marginTop: "0.25rem",
                      }}
                    >
                      Read Guide →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
