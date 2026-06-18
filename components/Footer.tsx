"use client";
import Link from "next/link";

const links = [
  { label: "Work", href: "/case-studies" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--cream)" }}>
      <div className="max-w-site" style={{ padding: "3rem 1.5rem 2rem" }}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#fff",
                marginBottom: "0.4rem",
              }}
            >
              Riz
            </div>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.78rem",
                color: "var(--faint)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Operator · Builder · Tallinn
            </p>
          </div>

          {/* Nav + copyright */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <nav className="flex flex-wrap gap-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    color: "var(--faint)",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--faint)")}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.8rem", color: "var(--muted)" }}>
              © 2025 Rizwan Mahmood
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "2rem",
            paddingTop: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.72rem",
              color: "var(--muted)",
              letterSpacing: "0.06em",
            }}
          >
            Tallinn, Estonia
          </p>
        </div>
      </div>
    </footer>
  );
}
