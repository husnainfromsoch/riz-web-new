"use client";
import Link from "next/link";

const explore = [
  { label: "Services", href: "/services" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
];

const work = [
  { label: "Consulting", href: "/services/consulting" },
  { label: "Projects", href: "/services/projects" },
  { label: "Speaking", href: "/services/speaking" },
  { label: "Soch ↗", href: "https://withsoch.com", external: true },
];

const elsewhere = [
  { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/riz", external: true },
  { label: "YouTube ↗", href: "https://www.youtube.com/@VibeWithRiz", external: true },
  { label: "Instagram ↗", href: "https://www.instagram.com/etz.riz/", external: true },
  { label: "Substack ↗", href: "https://conversationswithriz.substack.com/", external: true },
];

function FooterLink({ label, href, external }: { label: string; href: string; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "0.875rem",
        color: "var(--faint)",
        textDecoration: "none",
        display: "block",
        transition: "color 0.15s",
        paddingBottom: "0.35rem",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--faint)")}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--cream)", borderTop: "1px solid var(--line)" }}>
      <div className="max-w-site" style={{ paddingTop: "4rem", paddingBottom: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "3rem",
            paddingBottom: "3rem",
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 700,
                  fontSize: "1.4rem",
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
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "var(--muted)",
                lineHeight: 1.65,
                maxWidth: 220,
              }}
            >
              Operator and builder in Tallinn. I help founders think clearly enough that automation actually works.
            </p>
          </div>

          {/* Col 2 — Explore */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              Explore
            </p>
            {explore.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--body)",
                  textDecoration: "none",
                  display: "block",
                  paddingBottom: "0.35rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--body)")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3 — Work with me */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              Work with me
            </p>
            {work.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--body)",
                  textDecoration: "none",
                  display: "block",
                  paddingBottom: "0.35rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--body)")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 4 — Elsewhere */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              Elsewhere
            </p>
            {elsewhere.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--body)",
                  textDecoration: "none",
                  display: "block",
                  paddingBottom: "0.35rem",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--body)")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "1.25rem",
            paddingBottom: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "var(--coral)", fontSize: "0.6rem" }}>●</span>
            <a
              href="mailto:riz@withsoch.com"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.78rem",
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              riz@withsoch.com
            </a>
          </div>
          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.72rem",
              color: "var(--faint)",
              letterSpacing: "0.04em",
            }}
          >
            Tallinn · Built from the brief · 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
