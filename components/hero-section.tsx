"use client";
import Link from "next/link";

const credentials = ["Cambridge", "Careem", "Bolt", "Wise", "Anthropic Partner"];

export default function HeroSection() {
  function handleReadClick(e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById("what-i-believe");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      data-hero="dark"
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "#1a2820",
      }}
    >
      <style>{`
        @keyframes hero-bob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        .hero-scroll-arrow {
          animation: hero-bob 2s ease-in-out infinite;
        }
      `}</style>

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/8328048/8328048-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.65) 100%)",
          zIndex: 1,
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          padding: "0 1.5rem",
          maxWidth: 700,
          width: "100%",
        }}
      >
        {/* Kicker */}
        <p
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
            margin: 0,
          }}
        >
          OPERATOR · BUILDER · TALLINN
        </p>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            lineHeight: 1.1,
            fontWeight: 900,
            color: "#fff",
            margin: 0,
          }}
        >
          AI doesn&apos;t fix bad thinking.
          <em style={{ color: "#EA6A47", fontStyle: "italic", display: "block" }}>
            It scales it.
          </em>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.9)",
            maxWidth: 640,
            margin: 0,
          }}
        >
          I&apos;m Riz. Ten years running operations at Careem, Bolt and Wise. Now I help
          founders think clearly enough that automation actually works.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/case-studies"
            style={{
              background: "#EA6A47",
              color: "#fff",
              padding: "14px 32px",
              borderRadius: 6,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 500,
              fontSize: "0.95rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            See what I&apos;ve built →
          </Link>
          <button
            onClick={handleReadClick}
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.4)",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: 6,
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 500,
              fontSize: "0.95rem",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            Read how I think →
          </button>
        </div>

        {/* Credential chips */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {credentials.map((c) => (
            <span
              key={c}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(6px)",
                borderRadius: 999,
                padding: "0.35rem 0.9rem",
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.75)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          scroll
        </span>
        <span className="hero-scroll-arrow" style={{ color: "rgba(255,255,255,0.35)", fontSize: "1rem", lineHeight: 1 }}>
          ↓
        </span>
      </div>
    </section>
  );
}
