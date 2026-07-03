"use client";
import Link from "next/link";

const contactColumns = [
  { label: "Email", value: "riz@withsoch.com", href: "mailto:riz@withsoch.com" },
  { label: "Calendar", value: "Book a 30-min call", href: "https://calendly.com/riz" },
  { label: "Location", value: "Tallinn · Estonia", href: null },
  { label: "Company", value: "withsoch.com", href: "https://withsoch.com", external: true },
];

const socialLinks = [
  { label: "LINKEDIN", href: "https://linkedin.com/in/rizwanmahmood" },
  { label: "INSTAGRAM", href: "https://instagram.com/rizautomates" },
  { label: "SUBSTACK", href: "https://rizautomates.substack.com" },
];

const navColumns = [
  {
    label: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Case studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Writing", href: "/blog" },
    ],
  },
  {
    label: "Work with me",
    links: [
      { label: "Consulting", href: "/services/consulting" },
      { label: "A system built", href: "/services/projects" },
      { label: "Speaking", href: "/services/speaking" },
      { label: "Learn", href: "/writing" },
    ],
  },
  {
    label: "Builds",
    links: [
      { label: "Bug Catcher", href: "/case-studies" },
      { label: "Content Engine", href: "/case-studies" },
      { label: "The Bolt Case", href: "/case-studies" },
      { label: "All 20 systems →", href: "/case-studies" },
    ],
  },
];

function ContactLink({
  label,
  value,
  href,
  external,
  isLast,
}: {
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        borderRight: isLast ? "none" : "1px solid #DDD3BF",
        padding: isLast ? 0 : "0 32px 0 0",
        marginRight: isLast ? 0 : 32,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
          fontSize: "10px",
          color: "rgba(34,51,44,0.4)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "#22332C",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#EA6A47")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#22332C")}
        >
          {value}
        </a>
      ) : (
        <span style={{ fontSize: 16, fontWeight: 500, color: "#22332C" }}>{value}</span>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
      {/* PART 1 — Contact strip */}
      <div style={{ background: "#F3ECDD" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "80px 60px 48px" }}>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: 11,
              color: "rgba(34,51,44,0.4)",
              letterSpacing: "0.12em",
              marginBottom: 20,
            }}
          >
            ¶ DIRECT LINE
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 7vw, 80px)",
              fontWeight: 900,
              color: "#22332C",
              lineHeight: 1,
              marginBottom: 40,
              background: "linear-gradient(135deg, #22332C 30%, #EA6A47 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "talkGradient 6s ease infinite alternate",
              display: "inline-block",
            }}
          >
            Let&apos;s talk.
          </h2>
          <div style={{ width: "100%", height: 1, background: "#DDD3BF", marginBottom: 36 }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1.5rem 0",
            }}
          >
            {contactColumns.map((c, i) => (
              <ContactLink key={c.label} {...c} isLast={i === contactColumns.length - 1} />
            ))}
          </div>
        </div>
      </div>

      {/* PART 2 — Footer bottom */}
      <div style={{ background: "#22332C", padding: "48px 60px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          {/* Top row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "1.5rem",
              paddingBottom: 40,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 40,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#F3ECDD",
                  fontFamily: "var(--font-fraunces), serif",
                  marginBottom: 6,
                }}
              >
                Rizwan Mahmood.
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(243,236,221,0.45)",
                  fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                  letterSpacing: "0.04em",
                }}
              >
                Operator. Builder. AI systems. Tallinn.
              </p>
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                    fontSize: 11,
                    color: "rgba(243,236,221,0.4)",
                    textDecoration: "none",
                    letterSpacing: "0.08em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#EA6A47")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,236,221,0.4)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row — nav */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 40,
            }}
          >
            {navColumns.map((col) => (
              <div key={col.label}>
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                    fontSize: 10,
                    color: "rgba(243,236,221,0.3)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {col.label}
                </p>
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{
                      fontSize: 14,
                      color: "rgba(243,236,221,0.6)",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: 10,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F3ECDD")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,236,221,0.6)")}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}

            <div>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                  fontSize: 10,
                  color: "rgba(243,236,221,0.3)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Company
              </p>
              <a
                href="https://withsoch.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 14,
                  color: "rgba(243,236,221,0.6)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 10,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F3ECDD")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,236,221,0.6)")}
              >
                Soch → withsoch.com
              </a>
              <a
                href="mailto:riz@withsoch.com"
                style={{
                  fontSize: 14,
                  color: "rgba(243,236,221,0.6)",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: 10,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F3ECDD")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,236,221,0.6)")}
              >
                riz@withsoch.com
              </a>
              <p style={{ fontSize: 14, color: "rgba(243,236,221,0.6)", marginBottom: 10 }}>
                Tallinn · EST
              </p>
              <p style={{ fontSize: 14, color: "rgba(243,236,221,0.6)", marginBottom: 10 }}>
                Anthropic Partner
              </p>
            </div>
          </div>

          {/* Very bottom */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: 11,
                color: "rgba(243,236,221,0.2)",
              }}
            >
              © 2026 Rizwan Mahmood.
            </p>
            <p
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: 11,
                color: "rgba(243,236,221,0.2)",
                fontStyle: "italic",
              }}
            >
              Built on proof. Not persuasion.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
