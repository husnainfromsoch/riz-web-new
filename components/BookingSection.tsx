import AnimateIn from "@/components/AnimateIn";

const included = [
  "60-minute deep dive over Zoom",
  "Pre-call questionnaire so I come prepared",
  "Recording sent after the call",
  "Personalised action plan",
  "1 week of async follow-up",
];

const topics = [
  "Implementing AI tools or workflows in your day-to-day",
  "Building an AI side project",
  "Operations and process design",
  "Starting or sharpening a personal brand",
];

const coralDot = (
  <span
    style={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--coral)",
      flexShrink: 0,
      marginTop: "0.45rem",
      display: "inline-block",
    }}
  />
);

export default function BookingSection() {
  return (
    <section
      id="booking"
      style={{ background: "#F3ECDD", borderTop: "1px solid var(--line)" }}
    >
      {/* TOP BANNER */}
      <div style={{ textAlign: "center", padding: "5rem 1.5rem 3rem" }}>
        <AnimateIn>
          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--coral)",
              marginBottom: "1.25rem",
            }}
          >
            Work With Me
          </p>
        </AnimateIn>
        <AnimateIn delay={80}>
          {/* Section label above heading */}
          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--coral)",
              marginBottom: "0.75rem",
            }}
          >
            1:1 Strategy Session
          </p>
          {/* Main heading — DM Sans bold, 56px desktop */}
          <h2
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--ink)",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            Book a{" "}
            <span
              style={{
                background: "#F5C842",
                padding: "2px 8px",
                borderRadius: 4,
                fontStyle: "normal",
              }}
            >
              1:1 strategy
            </span>{" "}
            session.
          </h2>
          {/* Sub-heading */}
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#22332C",
              marginBottom: "1.25rem",
              lineHeight: 1.2,
            }}
          >
            60 minutes, just you and me.
          </p>
        </AnimateIn>
        <AnimateIn delay={160}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "1.05rem",
              color: "var(--body)",
              lineHeight: 1.75,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Personal guidance on AI, operations, or building a system that
            works.
          </p>
        </AnimateIn>
      </div>

      {/* DETAILS CARD */}
      <div className="max-w-site" style={{ paddingBottom: "5rem" }}>
        <AnimateIn delay={220}>
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #E7E0D2",
              overflow: "hidden",
            }}
          >
            {/* Two-column body */}
            <div className="grid md:grid-cols-2">
              {/* Left column */}
              <div
                style={{
                  padding: "2.5rem",
                  borderBottom: "1px solid #E7E0D2",
                }}
                className="md:border-b-0 md:border-r md:border-r-[#E7E0D2]"
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--coral)",
                    marginBottom: "1.25rem",
                  }}
                >
                  What&apos;s Included
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  {included.map((item, i) => (
                    <li
                      key={i}
                      style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}
                    >
                      {coralDot}
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.925rem",
                          color: "var(--body)",
                          lineHeight: 1.65,
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column */}
              <div style={{ padding: "2.5rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--coral)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Bring Your Questions On
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  {topics.map((item, i) => (
                    <li
                      key={i}
                      style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}
                    >
                      {coralDot}
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.925rem",
                          color: "var(--body)",
                          lineHeight: 1.65,
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div
              style={{
                borderTop: "1px solid #E7E0D2",
                padding: "1.75rem 2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1.25rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Investment
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1.1,
                  }}
                >
                  $200 / session
                </p>
              </div>
              <a
                href="https://calendly.com/riz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-coral"
                style={{ flexShrink: 0 }}
              >
                Book on Calendly →
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
