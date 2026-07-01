"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PHOTO_URL = "/riz-photo-new.jpg";

const proofs = [
  {
    val: "$3.9M",
    desc: "courier costs saved · Careem",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  },
  {
    val: "92%",
    desc: "straight-through processing · Wise",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  },
  {
    val: "20s",
    desc: "dispatch time · was 3 min · Careem",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
  {
    val: "4",
    desc: "markets scaled across · Bolt",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
  {
    val: "Zero",
    desc: "lines of code — shipped anyway",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  },
  {
    val: "Won",
    desc: "wrongful termination case · Bolt",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  },
];

const MARQUEE_ITEMS = [
  "Careem", "◆", "Bolt", "◆", "Wise", "◆", "Cambridge", "◆",
  "Anthropic Partner", "◆", "Tallinn", "◆", "n8n Builder", "◆", "AI Operator", "◆",
  "Careem", "◆", "Bolt", "◆", "Wise", "◆", "Cambridge", "◆",
  "Anthropic Partner", "◆", "Tallinn", "◆", "n8n Builder", "◆", "AI Operator", "◆",
];

export default function HeroSection() {
  const [proofIdx, setProofIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setProofIdx((prev) => (prev + 1) % proofs.length);
        setFading(false);
      }, 320);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .hz-root {
          --hz-cream: #F3ECDD;
          --hz-forest: #22332C;
          --hz-black: #0E0E0D;
          --hz-coral: #EA6A47;
          --hz-amber: #D79A36;
          --hz-muted: #948D7E;
          --hz-line: #DDD3BF;
        }

        @keyframes nameFlow {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        @keyframes accentFlow {
          0% { background-position: 0%; }
          100% { background-position: 250%; }
        }
        @keyframes marqScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes hzPulse {
          0% { transform: scale(1); opacity: .7; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes shimmerCard {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .hz-section {
          padding: 0;
          background: var(--hz-cream);
        }
        .hz-wrap {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 60px;
          position: relative;
          z-index: 1;
        }

        .hz-hero { padding: 68px 0 64px; }

        .hz-eyebrow {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          color: var(--hz-muted);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 32px;
          margin-bottom: 32px;
        }
        .hz-eyebrow::before {
          content: '';
          width: 20px;
          height: 1.5px;
          background: var(--hz-coral);
          border-radius: 2px;
        }

        .hz-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 52px;
          align-items: stretch;
        }

        /* LEFT */
        .hz-intro {
          font-size: 28px;
          font-weight: 600;
          color: var(--hz-forest);
          margin-bottom: 14px;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-intro-name {
          font-style: italic;
          font-weight: 800;
          background: linear-gradient(110deg, #EA6A47, #D79A36, #E8527A, #EA6A47);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: nameFlow 7s ease-in-out infinite;
        }

        .hz-headline {
          font-size: 62px;
          font-weight: 900;
          line-height: 1.03;
          letter-spacing: -3px;
          margin-bottom: 0;
          color: var(--hz-forest);
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-accent {
          background: linear-gradient(90deg, #9B59B6, #EA6A47, #E8527A, #D79A36, #9B59B6);
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: accentFlow 4.5s linear infinite;
        }

        .hz-rule {
          width: 52px;
          height: 3px;
          background: #EA6A47;
          border-radius: 4px;
          margin: 22px 0 20px;
        }

        .hz-value-prop {
          font-size: 18px;
          line-height: 1.55;
          color: var(--hz-forest);
          max-width: 490px;
          margin-bottom: 28px;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }

        .hz-role-list {
          list-style: none;
          margin-bottom: 32px;
          padding: 0;
        }
        .hz-role-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid var(--hz-line);
          font-size: 16px;
          font-weight: 600;
          transition: color 0.2s;
          color: var(--hz-forest);
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-role-list li:first-child { border-top: 1px solid var(--hz-line); }
        .hz-role-list li:hover { color: #EA6A47; }
        .hz-role-arrow {
          color: #EA6A47;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .hz-role-list li:hover .hz-role-arrow { transform: translateX(4px); }

        .hz-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 26px;
          flex-wrap: wrap;
        }
        .hz-btn-primary {
          background: #0E0E0D;
          color: #F3ECDD;
          text-decoration: none;
          padding: 17px 30px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.22s, transform 0.22s;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-btn-primary:hover {
          background: #EA6A47;
          transform: translateY(-2px);
        }
        .hz-btn-secondary {
          color: var(--hz-forest);
          text-decoration: none;
          padding: 17px 24px;
          border-radius: 100px;
          border: 1.5px solid var(--hz-line);
          font-size: 15px;
          font-weight: 500;
          transition: border-color 0.22s, color 0.22s;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-btn-secondary:hover {
          border-color: #EA6A47;
          color: #EA6A47;
        }

        .hz-ops-heading {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 14px;
        }
        .hz-ops-num {
          font-size: 42px;
          font-weight: 900;
          letter-spacing: -2px;
          color: var(--hz-forest);
          line-height: 1;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-ops-label {
          font-size: 14px;
          font-weight: 600;
          max-width: 180px;
          line-height: 1.35;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-ops-static { color: var(--hz-muted); }
        .hz-ops-animated {
          background: linear-gradient(90deg, #9B59B6, #EA6A47, #E8527A, #D79A36, #9B59B6);
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: accentFlow 4.5s linear infinite;
          display: inline;
        }

        .hz-social-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 18px 12px 12px;
          background: #FFFFFF;
          border: 1px solid var(--hz-line);
          border-radius: 100px;
          box-shadow: 0 2px 10px rgba(34,51,44,0.05);
          width: fit-content;
          flex-wrap: wrap;
        }
        .hz-avatar-stack { display: flex; align-items: center; }
        .hz-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          border: 2.5px solid #F3ECDD;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 800;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          margin-left: -8px;
          flex-shrink: 0;
        }
        .hz-avatar:first-child { margin-left: 0; }
        .hz-av1 { background: #1AAB5B; color: white; z-index: 4; }
        .hz-av2 { background: #34D186; color: #0A3A1F; z-index: 3; }
        .hz-av3 { background: #9FE870; color: #163300; z-index: 2; }
        .hz-av4 { background: #003365; color: white; font-size: 8px; z-index: 1; }

        .hz-proof-text {
          font-size: 13px;
          color: var(--hz-muted);
          line-height: 1.4;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-proof-company {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          color: var(--hz-forest);
          font-size: 13px;
        }
        .hz-cdot {
          width: 6px; height: 6px; border-radius: 50%;
          display: inline-block; flex-shrink: 0;
        }
        .hz-proof-sep { color: var(--hz-line); font-size: 14px; }
        .hz-proof-anthropic {
          font-weight: 700;
          background: linear-gradient(90deg, #9B59B6, #EA6A47, #D79A36);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: accentFlow 4.5s linear infinite;
        }

        /* RIGHT */
        .hz-right-col {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: 100%;
        }

        .hz-photo-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: #0E0E0D;
          height: 100%;
          min-height: 560px;
          box-shadow: 0 28px 72px -16px rgba(14,14,13,0.38);
          transition: transform 0.4s ease;
        }
        .hz-photo-card:hover { transform: translateY(-4px); }
        .hz-photo-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          filter: contrast(1.04) saturate(0.9);
        }
        .hz-photo-card::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 58%;
          background: linear-gradient(to top, rgba(14,14,13,0.95) 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        .hz-avail-badge {
          position: absolute;
          top: 18px; left: 18px;
          z-index: 4;
          background: rgba(243,236,221,0.96);
          backdrop-filter: blur(10px);
          padding: 8px 14px 8px 10px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 600;
          color: #22332C;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #EA6A47;
          position: relative;
          flex-shrink: 0;
        }
        .hz-pulse-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #EA6A47;
          animation: hzPulse 2s ease-out infinite;
        }

        .hz-loc-badge {
          position: absolute;
          top: 18px; right: 18px;
          z-index: 4;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 7px 13px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .hz-proof-ticker {
          position: absolute;
          bottom: 90px;
          left: 16px; right: 16px;
          z-index: 5;
          background: rgba(14,14,13,0.82);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(234,106,71,0.25);
          border-radius: 16px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          overflow: hidden;
        }
        .hz-proof-ticker::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(234,106,71,0.04) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: shimmerCard 3s ease infinite;
          pointer-events: none;
        }

        .hz-proof-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(234,106,71,0.15);
          border: 1.5px solid rgba(234,106,71,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #EA6A47;
          transition: transform 0.4s ease;
        }
        .hz-proof-icon svg { width: 18px; height: 18px; }
        .hz-proof-ticker:hover .hz-proof-icon { transform: scale(1.1) rotate(8deg); }

        .hz-proof-content { flex: 1; min-width: 0; }
        .hz-proof-val {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.6px;
          color: #F3ECDD;
          transition: opacity 0.3s ease, transform 0.3s ease;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-proof-val.hz-fade {
          opacity: 0;
          transform: translateY(5px);
        }
        .hz-proof-desc {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          color: rgba(243,236,221,0.45);
          letter-spacing: 0.3px;
          text-transform: uppercase;
          margin-top: 2px;
          transition: opacity 0.3s ease;
        }
        .hz-proof-desc.hz-fade { opacity: 0; }

        .hz-proof-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
        }
        .hz-proof-dots { display: flex; gap: 4px; }
        .hz-proof-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(243,236,221,0.18);
          transition: background 0.3s, transform 0.3s;
        }
        .hz-proof-dot.hz-active {
          background: #EA6A47;
          transform: scale(1.3);
        }
        .hz-proof-counter {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 9px;
          color: rgba(243,236,221,0.22);
          letter-spacing: 0.5px;
        }

        .hz-photo-nameplate {
          position: absolute;
          bottom: 22px; left: 22px; right: 22px;
          z-index: 3;
        }
        .hz-pname {
          font-size: 25px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 3px;
          font-style: italic;
          background: linear-gradient(110deg, #F3ECDD, #EA6A47, #D79A36, #F3ECDD);
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: nameFlow 7s ease-in-out infinite;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
        }
        .hz-prole {
          font-size: 13px;
          font-weight: 500;
          color: rgba(243,236,221,0.55);
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
        }

        /* MARQUEE */
        .hz-marquee-section {
          border-top: 1px solid var(--hz-line);
          border-bottom: 1px solid var(--hz-line);
          padding: 18px 0;
          margin-top: 52px;
          overflow: hidden;
        }
        .hz-marquee-inner {
          display: flex;
          gap: 48px;
          white-space: nowrap;
          animation: marqScroll 28s linear infinite;
          width: max-content;
        }
        .hz-marquee-inner span {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          color: var(--hz-muted);
          text-transform: uppercase;
        }
        .hz-mdot { color: #EA6A47 !important; }

        @media (max-width: 960px) {
          .hz-wrap { padding-left: 24px; padding-right: 24px; }
          .hz-grid { grid-template-columns: 1fr; gap: 36px; }
          .hz-headline { font-size: 40px; letter-spacing: -1.5px; }
          .hz-photo-card { aspect-ratio: 1; }
        }
      `}</style>

      <div className="hz-root hz-section">
        <div className="hz-wrap">
          <div className="hz-hero">
            <div className="hz-eyebrow">Operator · Builder · Tallinn, Estonia</div>

            <div className="hz-grid">
              {/* LEFT */}
              <div>
                <p className="hz-intro">Hi, I&apos;m <span className="hz-intro-name">Riz</span>.</p>

                <h1 className="hz-headline">
                  I help founders<br />
                  think clearly enough<br />
                  that <span className="hz-accent">automation works.</span>
                </h1>

                <div className="hz-rule" />

                <p className="hz-value-prop">
                  Most founders buy tools before they fix their thinking.{" "}
                  <b>AI scales whatever you feed it</b> — muddled input, muddled output.
                  I come in before the build, not after.
                </p>

                <ul className="hz-role-list">
                  <li><span className="hz-role-arrow">→</span>Consulting &amp; AI advisory — from $160/hr</li>
                  <li><span className="hz-role-arrow">→</span>Automation systems built end-to-end via Soch</li>
                  <li><span className="hz-role-arrow">→</span>Workshops &amp; keynotes on AI in operations</li>
                </ul>

                <div className="hz-cta-row">
                  <Link href="/services/consulting" className="hz-btn-primary">Book a 30-min call →</Link>
                  <Link href="/case-studies" className="hz-btn-secondary">See what I&apos;ve built</Link>
                </div>

                <div className="hz-ops-heading">
                  <span className="hz-ops-num">10+</span>
                  <span className="hz-ops-label">
                    <span className="hz-ops-static">years inside </span>
                    <span className="hz-ops-animated">high-growth operations</span>
                  </span>
                </div>

                <div className="hz-social-strip">
                  <div className="hz-avatar-stack">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div className="hz-avatar hz-av1"><img src="/logos/careem.png" alt="Careem" style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) invert(1)" }} /></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div className="hz-avatar hz-av2"><img src="/logos/bolt.png" alt="Bolt" style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) invert(1)" }} /></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div className="hz-avatar hz-av3"><img src="/logos/wise.png" alt="Wise" style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) invert(1)" }} /></div>
                    <div className="hz-avatar hz-av4">Cam</div>
                  </div>
                  <div className="hz-proof-text">
                    <span className="hz-ops-static">Worked across</span>
                    <span className="hz-proof-company">
                      <span className="hz-cdot" style={{ background: "#1AAB5B" }} />Careem
                    </span>
                    <span className="hz-proof-sep">·</span>
                    <span className="hz-proof-company">
                      <span className="hz-cdot" style={{ background: "#34D186" }} />Bolt
                    </span>
                    <span className="hz-proof-sep">·</span>
                    <span className="hz-proof-company">
                      <span className="hz-cdot" style={{ background: "#9FE870" }} />Wise
                    </span>
                    <span className="hz-proof-sep">·</span>
                    <span className="hz-proof-company">
                      <span className="hz-cdot" style={{ background: "#003365" }} />Cambridge
                    </span>
                    <span className="hz-ops-static">— now building with</span>
                    <span className="hz-proof-anthropic">Anthropic</span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="hz-right-col">
                <div className="hz-photo-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTO_URL} alt="Rizwan Mahmood" />

                  <div className="hz-avail-badge">
                    <span className="hz-pulse-dot" />
                    Available this week
                  </div>

                  <div className="hz-loc-badge">Tallinn · EST</div>

                  <div className="hz-proof-ticker">
                    <div
                      className="hz-proof-icon"
                      dangerouslySetInnerHTML={{ __html: proofs[proofIdx].icon }}
                    />
                    <div className="hz-proof-content">
                      <div className={`hz-proof-val${fading ? " hz-fade" : ""}`}>
                        {proofs[proofIdx].val}
                      </div>
                      <div className={`hz-proof-desc${fading ? " hz-fade" : ""}`}>
                        {proofs[proofIdx].desc}
                      </div>
                    </div>
                    <div className="hz-proof-nav">
                      <div className="hz-proof-dots">
                        {proofs.map((_, i) => (
                          <div
                            key={i}
                            className={`hz-proof-dot${i === proofIdx ? " hz-active" : ""}`}
                          />
                        ))}
                      </div>
                      <div className="hz-proof-counter">{proofIdx + 1} / {proofs.length}</div>
                    </div>
                  </div>

                  <div className="hz-photo-nameplate">
                    <div className="hz-pname">Rizwan Mahmood</div>
                    <div className="hz-prole">Operator &amp; AI Builder</div>
                  </div>
                </div>
              </div>
            </div>

            {/* MARQUEE STRIP — stays inside hero section */}
            <div className="hz-marquee-section">
              <div className="hz-marquee-inner">
                {MARQUEE_ITEMS.map((item, i) => (
                  <span key={i} className={item === "◆" ? "hz-mdot" : ""}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
