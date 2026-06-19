"use client";
import { useEffect, useState } from "react";

const items = [
  { label: "Consulting", id: "consulting" },
  { label: "Projects", id: "projects" },
  { label: "Workshops", id: "workshops" },
];

export default function ServicesStickyNav() {
  const [active, setActive] = useState("consulting");

  useEffect(() => {
    const onScroll = () => {
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActive(items[i].id);
          return;
        }
      }
      setActive("consulting");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{ position: "sticky", top: 100 }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.125rem" }}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{
                display: "block",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: active === item.id ? 600 : 400,
                fontSize: "0.875rem",
                color: active === item.id ? "var(--coral)" : "var(--muted)",
                textDecoration: "none",
                padding: "0.6rem 0.75rem",
                borderLeft: `2px solid ${active === item.id ? "var(--coral)" : "var(--line)"}`,
                transition: "color 0.2s ease, border-color 0.2s ease",
                letterSpacing: "0.01em",
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
