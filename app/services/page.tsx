import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

/* ─── shared micro-styles ─────────────────────────── */
const eyebrowStyle = (color: string): React.CSSProperties => ({
  fontFamily: "var(--font-dm-mono), monospace",
  fontSize: "0.72rem",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color,
  marginBottom: "0.75rem",
});

const sublineStyle = (color: string): React.CSSProperties => ({
  fontFamily: "var(--font-playfair), serif",
  fontStyle: "italic",
  fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)",
  color,
  lineHeight: 1.25,
  marginBottom: "1.25rem",
});

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), sans-serif",
  fontSize: "1.025rem",
  color: "var(--body)",
  lineHeight: 1.78,
  maxWidth: 480,
  marginBottom: "1.75rem",
};

const checkBullet = (color: string, text: string) => (
  <li
    key={text}
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "0.7rem",
      marginBottom: "0.6rem",
      fontFamily: "var(--font-dm-sans), sans-serif",
      fontSize: "0.975rem",
      color: "var(--body)",
      lineHeight: 1.55,
    }}
  >
    <span style={{ color, fontWeight: 700, flexShrink: 0, marginTop: "0.05rem" }}>✓</span>
    <span>{text}</span>
  </li>
);

const sectionDivider = (
  <div style={{ borderTop: "1px solid #E7E0D2", marginTop: 0 }} />
);

/* ─── mockup: Clarity Session booking widget ─────── */
const ConsultingMockup = () => (
  <div
    style={{
      border: "1px solid var(--line)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "var(--shadow-lg)",
      maxWidth: 420,
      marginLeft: "auto",
    }}
  >
    {/* coral header */}
    <div
      style={{
        background: "var(--coral)",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: "1.1rem",
          color: "#fff",
        }}
      >
        ◎
      </div>
      <div>
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 600,
            fontSize: "0.975rem",
            color: "#fff",
          }}
        >
          Clarity Session
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.73rem",
            color: "rgba(255,255,255,0.72)",
            marginTop: "0.15rem",
          }}
        >
          60 min · From $160
        </p>
      </div>
    </div>

    {/* body */}
    <div style={{ padding: "1.5rem", background: "#fff" }}>
      <p
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "0.65rem",
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "0.85rem",
        }}
      >
        Available this week
      </p>

      {[
        { time: "Mon · 9:00 AM", selected: false },
        { time: "Tue · 2:00 PM", selected: true },
        { time: "Thu · 11:00 AM", selected: false },
      ].map((slot) => (
        <div
          key={slot.time}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.65rem 0.9rem",
            borderRadius: 8,
            marginBottom: "0.5rem",
            background: slot.selected ? "var(--coral)" : "var(--cream-2)",
            border: slot.selected ? "none" : "1px solid var(--line)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: slot.selected ? "#fff" : "var(--muted)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.875rem",
              color: slot.selected ? "#fff" : "var(--body)",
              flex: 1,
            }}
          >
            {slot.time}
          </span>
          {slot.selected && (
            <span
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Selected
            </span>
          )}
        </div>
      ))}

      <div
        style={{
          marginTop: "1rem",
          background: "var(--ink)",
          borderRadius: 8,
          padding: "0.8rem",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "#fff",
          }}
        >
          Book this slot →
        </span>
      </div>
    </div>
  </div>
);

/* ─── mockup: workflow diagram (dark card) ───────── */
const wfNode = (
  icon: string,
  label: string,
  accentBg: string,
  accentBorder: string,
  textColor: string,
  iconColor: string
) => (
  <div
    style={{
      background: accentBg,
      border: `1px solid ${accentBorder}`,
      borderRadius: 6,
      padding: "0.35rem 0.6rem",
      display: "flex",
      alignItems: "center",
      gap: "0.35rem",
      flexShrink: 0,
    }}
  >
    <span style={{ fontSize: "0.72rem", color: iconColor }}>{icon}</span>
    <span
      style={{
        fontFamily: "var(--font-dm-mono), monospace",
        fontSize: "0.65rem",
        color: textColor,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  </div>
);

const wfArrow = (
  <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.8rem", flexShrink: 0 }}>
    →
  </span>
);

const ProjectsMockup = () => (
  <div
    style={{
      background: "var(--ink)",
      borderRadius: 14,
      padding: "1.75rem",
      boxShadow: "var(--shadow-lg)",
      maxWidth: 420,
      marginLeft: "auto",
    }}
  >
    {/* header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "0.68rem",
          color: "var(--coral)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Active Workflow
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.75rem",
          color: "#4ade80",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#4ade80",
            display: "inline-block",
          }}
        />
        Live
      </span>
    </div>

    {/* row 1 */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        marginBottom: "0.6rem",
      }}
    >
      {wfNode("▶", "New Lead", "rgba(234,106,71,0.22)", "rgba(234,106,71,0.4)", "rgba(255,255,255,0.9)", "var(--coral)")}
      {wfArrow}
      {wfNode("⋯", "Tag Filter", "rgba(255,255,255,0.07)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.72)", "rgba(255,255,255,0.35)")}
      {wfArrow}
      {wfNode("✉", "Notify", "rgba(255,255,255,0.07)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.72)", "rgba(255,255,255,0.35)")}
    </div>

    {/* connector + row 2 */}
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
      <div
        style={{
          width: 28,
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          paddingTop: "0.1rem",
        }}
      >
        <div
          style={{
            width: 1,
            height: 22,
            background: "rgba(255,255,255,0.14)",
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        {wfNode("⟳", "Enrich", "rgba(215,154,54,0.18)", "rgba(215,154,54,0.35)", "rgba(255,255,255,0.85)", "#D79A36")}
        {wfArrow}
        {wfNode("□", "CRM Save", "rgba(255,255,255,0.07)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.72)", "rgba(255,255,255,0.35)")}
      </div>
    </div>

    {/* tech stack */}
    <div
      style={{
        marginTop: "1.5rem",
        paddingTop: "1rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      {["n8n", "Claude", "Airtable", "Slack"].map((t) => (
        <span
          key={t}
          style={{
            padding: "0.2rem 0.6rem",
            borderRadius: 99,
            background: "rgba(255,255,255,0.06)",
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.67rem",
            color: "rgba(255,255,255,0.38)",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* ─── mockup: workshop event card ────────────────── */
const WorkshopsMockup = () => (
  <div
    style={{
      border: "1px solid var(--line)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "var(--shadow-lg)",
      maxWidth: 420,
      marginLeft: "auto",
    }}
  >
    {/* amber header */}
    <div style={{ background: "#D79A36", padding: "1.75rem 1.5rem" }}>
      <span
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "0.68rem",
          color: "rgba(34,51,44,0.55)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        Live Workshop
      </span>
      <h4
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "var(--ink)",
          lineHeight: 1.2,
          marginTop: "0.4rem",
          marginBottom: "0.3rem",
        }}
      >
        AI Leverage for Ops Teams
      </h4>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.85rem",
          color: "rgba(34,51,44,0.6)",
        }}
      >
        In-person or remote
      </p>
    </div>

    {/* body */}
    <div style={{ padding: "1.5rem", background: "#fff" }}>
      {[
        { icon: "⏱", label: "Duration", value: "Half-day or full-day" },
        { icon: "◎", label: "Format", value: "Interactive sessions" },
        { icon: "◈", label: "Audience", value: "Teams up to 30 people" },
      ].map((row) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            marginBottom: "0.9rem",
          }}
        >
          <span
            style={{
              color: "#D79A36",
              flexShrink: 0,
              fontSize: "1rem",
              marginTop: "0.1rem",
            }}
          >
            {row.icon}
          </span>
          <div>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.63rem",
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.1rem",
              }}
            >
              {row.label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "var(--ink)",
                lineHeight: 1.4,
              }}
            >
              {row.value}
            </p>
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: "0.5rem",
          background: "#D79A36",
          borderRadius: 8,
          padding: "0.8rem",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "var(--ink)",
          }}
        >
          Enquire about a session →
        </span>
      </div>
    </div>
  </div>
);

/* ─── page ────────────────────────────────────────── */
export default function Services() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: "#fff", paddingTop: 120, paddingBottom: 100 }}>
        <div className="max-w-site">
          <div
            style={{
              display: "flex",
              gap: "3rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* left: text + pills */}
            <div style={{ flex: "3 1 300px" }}>
              <AnimateIn>
                <h1
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                    lineHeight: 1.12,
                    color: "var(--ink)",
                    fontWeight: 700,
                    marginBottom: "1.25rem",
                    maxWidth: 560,
                  }}
                >
                  Every way to work with Riz.
                </h1>
              </AnimateIn>
              <AnimateIn delay={100}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1.1rem",
                    color: "var(--body)",
                    lineHeight: 1.72,
                    maxWidth: 480,
                    marginBottom: "2rem",
                  }}
                >
                  Each service is built around one goal: getting your operations
                  clear enough that AI actually works for you.
                </p>
              </AnimateIn>
              <AnimateIn delay={200}>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {[
                    { label: "Consulting", href: "#consulting", active: true },
                    { label: "Projects", href: "#projects", active: false },
                    { label: "Workshops", href: "#workshops", active: false },
                  ].map((pill) => (
                    <a
                      key={pill.href}
                      href={pill.href}
                      style={{
                        display: "inline-block",
                        padding: "0.45rem 1.1rem",
                        borderRadius: 99,
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        textDecoration: "none",
                        background: pill.active ? "var(--coral)" : "transparent",
                        color: pill.active ? "#fff" : "var(--muted)",
                        border: pill.active
                          ? "none"
                          : "1px solid var(--line-2)",
                      }}
                    >
                      {pill.label}
                    </a>
                  ))}
                </div>
              </AnimateIn>
            </div>

            {/* right: hub diagram SVG */}
            <div
              style={{
                flex: "2 1 280px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AnimateIn delay={300}>
                <svg
                  viewBox="0 0 420 320"
                  style={{ width: "100%", maxWidth: 460, height: "auto" }}
                >
                  {/* dashed spokes */}
                  <line
                    x1="210" y1="175" x2="210" y2="45"
                    stroke="#E7E0D2" strokeWidth="1.5" strokeDasharray="5 4"
                  />
                  <line
                    x1="210" y1="175" x2="323" y2="243"
                    stroke="#E7E0D2" strokeWidth="1.5" strokeDasharray="5 4"
                  />
                  <line
                    x1="210" y1="175" x2="97" y2="243"
                    stroke="#E7E0D2" strokeWidth="1.5" strokeDasharray="5 4"
                  />

                  {/* outer glow ring */}
                  <circle cx="210" cy="175" r="90" fill="none" stroke="#F3ECDD" strokeWidth="20" />

                  {/* center circle */}
                  <circle cx="210" cy="175" r="72" fill="#22332C" />
                  <text x="210" y="161" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="rgba(255,255,255,0.55)" letterSpacing="0.03em">The clearest</text>
                  <text x="210" y="176" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="rgba(255,255,255,0.55)">ops in</text>
                  <text x="210" y="191" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="rgba(255,255,255,0.55)">your space</text>

                  {/* consulting node — coral, top */}
                  <circle cx="210" cy="45" r="38" fill="#EA6A47" />
                  <text x="210" y="45" textAnchor="middle" dominantBaseline="central" fontFamily="Playfair Display, serif" fontSize="20" fontWeight="700" fill="#fff">01</text>
                  <text x="210" y="97" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8.5" fontWeight="500" fill="var(--muted)" letterSpacing="0.1em">CONSULTING</text>

                  {/* projects node — ink, bottom-right */}
                  <circle cx="323" cy="243" r="38" fill="#22332C" stroke="#E7E0D2" strokeWidth="1.5" />
                  <text x="323" y="243" textAnchor="middle" dominantBaseline="central" fontFamily="Playfair Display, serif" fontSize="20" fontWeight="700" fill="#fff">02</text>
                  <text x="323" y="295" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8.5" fontWeight="500" fill="var(--muted)" letterSpacing="0.1em">PROJECTS</text>

                  {/* workshops node — amber, bottom-left */}
                  <circle cx="97" cy="243" r="38" fill="#D79A36" />
                  <text x="97" y="243" textAnchor="middle" dominantBaseline="central" fontFamily="Playfair Display, serif" fontSize="20" fontWeight="700" fill="#fff">03</text>
                  <text x="97" y="295" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8.5" fontWeight="500" fill="var(--muted)" letterSpacing="0.1em">WORKSHOPS</text>
                </svg>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {sectionDivider}

      {/* CONSULTING ── id for anchor */}
      <section
        id="consulting"
        style={{
          background: "#fff",
          padding: "100px 0",
          scrollMarginTop: 68,
        }}
      >
        <div className="max-w-site">
          <div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* left: text */}
            <div style={{ flex: "1 1 280px" }}>
              <AnimateIn>
                <p style={eyebrowStyle("var(--coral)")}>Consulting</p>
                <p style={sublineStyle("var(--coral)")}>Clarity before you build.</p>
              </AnimateIn>
              <AnimateIn delay={100}>
                <p style={bodyStyle}>
                  Most founders automate broken processes. I fix the thinking
                  first. 1:1 advisory, fractional ops, and strategic clarity
                  sessions. From $160/hr.
                </p>
              </AnimateIn>
              <AnimateIn delay={180}>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem" }}>
                  {[
                    "Ops and process diagnosis",
                    "AI readiness assessment",
                    "Fractional advisory",
                  ].map((b) => checkBullet("var(--coral)", b))}
                </ul>
              </AnimateIn>
              <AnimateIn delay={260}>
                <Link href="/services/consulting" className="btn-coral">
                  Book a call →
                </Link>
              </AnimateIn>
            </div>

            {/* right: booking widget mockup */}
            <div style={{ flex: "1 1 280px" }}>
              <AnimateIn delay={150}>
                <ConsultingMockup />
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* coral divider after consulting */}
      <div style={{ borderTop: "1.5px solid var(--coral)", opacity: 0.35 }} />

      {/* PROJECTS */}
      <section
        id="projects"
        style={{
          background: "var(--cream)",
          padding: "100px 0",
          scrollMarginTop: 68,
        }}
      >
        <div className="max-w-site">
          <div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* left: text */}
            <div style={{ flex: "1 1 280px" }}>
              <AnimateIn>
                <p style={eyebrowStyle("var(--ink)")}>Projects</p>
                <p style={sublineStyle("var(--ink)")}>Systems that ship.</p>
              </AnimateIn>
              <AnimateIn delay={100}>
                <p style={bodyStyle}>
                  I build automations, agents, and internal tools. Through my
                  company Soch, we take it from idea to deployed.
                </p>
              </AnimateIn>
              <AnimateIn delay={180}>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem" }}>
                  {[
                    "n8n workflow automations",
                    "AI agents and internal tools",
                    "End-to-end build and handover",
                  ].map((b) => checkBullet("var(--ink)", b))}
                </ul>
              </AnimateIn>
              <AnimateIn delay={260}>
                <a
                  href="https://withsoch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "0.75rem 1.75rem",
                    borderRadius: 6,
                    background: "var(--ink)",
                    color: "#fff",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}
                >
                  See Soch →
                </a>
              </AnimateIn>
            </div>

            {/* right: workflow diagram mockup */}
            <div style={{ flex: "1 1 280px" }}>
              <AnimateIn delay={150}>
                <ProjectsMockup />
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {sectionDivider}

      {/* WORKSHOPS */}
      <section
        id="workshops"
        style={{
          background: "#fff",
          padding: "100px 0",
          scrollMarginTop: 68,
        }}
      >
        <div className="max-w-site">
          <div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* left: text */}
            <div style={{ flex: "1 1 280px" }}>
              <AnimateIn>
                <p style={eyebrowStyle("#D79A36")}>Workshops</p>
                <p style={sublineStyle("#D79A36")}>Your team, upskilled.</p>
              </AnimateIn>
              <AnimateIn delay={100}>
                <p style={bodyStyle}>
                  Talks and sessions on AI leverage and the future of work.
                  In-person or remote.
                </p>
              </AnimateIn>
              <AnimateIn delay={180}>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem" }}>
                  {[
                    "Keynotes and conference talks",
                    "Team AI workshops",
                    "Executive education sessions",
                  ].map((b) => checkBullet("#D79A36", b))}
                </ul>
              </AnimateIn>
              <AnimateIn delay={260}>
                <Link
                  href="/services/consulting"
                  style={{
                    display: "inline-block",
                    padding: "0.75rem 1.75rem",
                    borderRadius: 6,
                    background: "#D79A36",
                    color: "var(--ink)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                  }}
                >
                  Enquire →
                </Link>
              </AnimateIn>
            </div>

            {/* right: workshop event card mockup */}
            <div style={{ flex: "1 1 280px" }}>
              <AnimateIn delay={150}>
                <WorkshopsMockup />
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {sectionDivider}

      {/* BOTTOM CTA */}
      <section
        style={{
          background: "var(--ink)",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <div className="max-w-site">
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "#fff",
                fontWeight: 700,
                marginBottom: "0.85rem",
              }}
            >
              Not sure which fits?
            </h2>
          </AnimateIn>
          <AnimateIn delay={80}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.05rem",
                color: "var(--cream)",
                lineHeight: 1.7,
                marginBottom: "2.25rem",
              }}
            >
              Tell me what you&apos;re working on.
            </p>
          </AnimateIn>
          <AnimateIn delay={160}>
            <Link href="/services/consulting" className="btn-coral">
              Book a call →
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
