"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="max-w-site flex items-center justify-between" style={{ height: 68 }}>
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Riz
          </span>
          <span
            className="animate-pulse-dot"
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--coral)",
              display: "inline-block",
              marginTop: 2,
            }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 500,
                fontSize: "0.95rem",
                color: "var(--body)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--body)")}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/services/consulting"
            className="btn-coral"
            style={{ padding: "0.55rem 1.25rem", fontSize: "0.875rem" }}
          >
            Book a call
          </Link>
        </nav>

        <button
          className="flex md:hidden flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            style={{
              display: "block", width: 22, height: 2,
              background: "var(--ink)", borderRadius: 2,
              transition: "transform 0.2s",
              transform: open ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block", width: 22, height: 2,
              background: "var(--ink)", borderRadius: 2,
              opacity: open ? 0 : 1, transition: "opacity 0.2s",
            }}
          />
          <span
            style={{
              display: "block", width: 22, height: 2,
              background: "var(--ink)", borderRadius: 2,
              transition: "transform 0.2s",
              transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 360 : 0,
          transition: "max-height 0.3s ease",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderTop: open ? "1px solid var(--line)" : "none",
        }}
      >
        <div className="max-w-site flex flex-col gap-2 py-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 500,
                fontSize: "1.05rem",
                color: "var(--body)",
                textDecoration: "none",
                padding: "0.5rem 0",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/services/consulting"
            className="btn-coral"
            onClick={() => setOpen(false)}
            style={{ marginTop: "0.5rem", textAlign: "center" }}
          >
            Book a call
          </Link>
        </div>
      </div>
    </header>
  );
}
