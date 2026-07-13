"use client";
import { ComponentType } from "react";
import Link from "next/link";
import CalBookingButton from "@/components/CalModal";
import { useParallax, useScrollFadeOut } from "@/hooks/useParallax";

const PHOTO_URL = "/riz-photo-new.jpg";

// Location pin — used for Tallinn since it's a city, not a brand with a logo.
function TallinnMark() {
  return (
    <svg className="hz-marquee-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-6.35 7-12a7 7 0 1 0-14 0c0 5.65 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// Graduation cap — used for Cambridge since it denotes education, not a company logo.
function CambridgeMark() {
  return (
    <svg className="hz-marquee-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m2 8 10-4 10 4-10 4L2 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 10.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.5 9v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Sparkle — used for "AI Operator" since it's a role, not a product with a logo.
function AiOperatorMark() {
  return (
    <svg className="hz-marquee-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 13.7 9l5.3 1.5-5.3 1.5L12 17.5 10.3 12 5 10.5l5.3-1.5L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19 15.5 19.7 17.5 21.5 18.25 19.7 19 19 21 18.3 19 16.5 18.25 18.3 17.5 19 15.5Z" fill="currentColor" />
    </svg>
  );
}

type MarqueeLabel = {
  label: string;
  img?: string;
  w?: number;
  icon?: ComponentType;
};

const MARQUEE_LABELS: MarqueeLabel[] = [
  { label: "Careem", img: "/logos/careem.png", w: 111 },
  { label: "Bolt", img: "/logos/bolt.png", w: 48 },
  { label: "Wise", img: "/logos/wise.svg", w: 106 },
  { label: "Cambridge", icon: CambridgeMark },
  { label: "Anthropic Partner", img: "/logos/anthropic.svg", w: 28 },
  { label: "Tallinn", icon: TallinnMark },
  { label: "n8n Builder", img: "/logos/n8n.svg", w: 28 },
  { label: "AI Operator", icon: AiOperatorMark },
];

const MARQUEE_ITEMS = [...MARQUEE_LABELS, ...MARQUEE_LABELS];

export default function HeroSection() {
  const dotGridRef = useParallax<HTMLDivElement>(0.1);
  const fadeRef = useScrollFadeOut<HTMLDivElement>(420);

  return (
    <>
      <style>{`
        .hz-root {
          --hz-cream: var(--cream);
          --hz-forest: #22332C;
          --hz-black: #0E0E0D;
          --hz-coral: #EA6A47;
          --hz-amber: #D79A36;
          --hz-muted: #948D7E;
          --hz-line: var(--line);
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
        @media (prefers-reduced-motion: reduce) {
          .hz-marquee-inner { animation: none; }
        }

        .hz-section {
          padding: 0;
          background: var(--hz-cream);
        }
        .hz-wrap {
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .hz-hero { padding: 68px 0 64px; position: relative; }

        .hz-dotgrid-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: -1;
          pointer-events: none;
        }
        .hz-dotgrid {
          position: absolute;
          inset: -80px;
          background-image: radial-gradient(rgba(34,51,44,0.08) 1.5px, transparent 1.5px);
          background-size: 26px 26px;
          opacity: 0.6;
          -webkit-mask-image: linear-gradient(to bottom, black, transparent);
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .hz-eyebrow {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
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
          font-size: clamp(3rem, 5vw, 4.25rem);
          font-weight: 900;
          line-height: 1.05;
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
          color: var(--cream);
          text-decoration: none;
          padding: 0 1.75rem;
          min-height: var(--btn-height);
          border-radius: var(--btn-radius);
          font-size: 15px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
          padding: 0 1.75rem;
          min-height: var(--btn-height);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--btn-radius);
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
          align-items: center;
          gap: 12px;
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
          max-width: 220px;
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
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          width: fit-content;
        }
        .hz-logo-row {
          display: flex;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
        }
        .hz-logo-row img {
          height: 44px;
          width: auto;
          object-fit: contain;
          display: block;
        }

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
          border-radius: 20px;
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

        /* MARQUEE */
        .hz-marquee-section {
          position: relative;
          border-top: 1px solid #E2DACB;
          border-bottom: 1px solid #E2DACB;
          background: var(--hz-cream);
          padding: 20px 0;
          margin-top: 52px;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 64px, #000 calc(100% - 64px), transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, #000 64px, #000 calc(100% - 64px), transparent 100%);
        }
        .hz-marquee-inner {
          display: flex;
          align-items: center;
          gap: 18px;
          white-space: nowrap;
          animation: marqScroll 30s linear infinite;
          width: max-content;
        }
        .hz-marquee-section:hover .hz-marquee-inner {
          animation-play-state: paused;
        }
        .hz-marquee-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 150px;
          height: 96px;
          padding: 20px;
          background: #fff;
          border: 1px solid var(--hz-line);
          border-radius: 18px;
          box-shadow: 0 6px 16px -10px rgba(14,14,13,0.18);
        }
        .hz-marquee-icon {
          height: 28px;
          width: auto;
          max-width: 100%;
          flex-shrink: 0;
          object-fit: contain;
          display: block;
        }
        .hz-marquee-icon-svg {
          height: 28px;
          width: 28px;
          flex-shrink: 0;
          color: var(--hz-forest);
        }

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
            <div className="hz-dotgrid-wrap" aria-hidden="true">
              <div className="hz-dotgrid" ref={dotGridRef} data-parallax />
            </div>

            <div className="hz-eyebrow">Operator · Builder · Tallinn, Estonia</div>

            <div className="hz-grid" ref={fadeRef}>
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
                  <CalBookingButton className="hz-btn-primary">Book a 30-min call →</CalBookingButton>
                  <Link href="/case-studies" className="hz-btn-secondary">See what I&apos;ve built</Link>
                </div>

                <div className="hz-ops-heading">
                  <span className="hz-ops-num">10+</span>
                  <span className="hz-ops-label">
                    <span className="hz-ops-static">years inside </span>
                    <span className="hz-ops-animated">high‑growth operations</span>
                  </span>
                </div>

                <div className="hz-social-strip">
                  <div className="hz-logo-row">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/careem.png" alt="Careem" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/bolt.png" alt="Bolt" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/wise.svg" alt="Wise" />
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
                </div>
              </div>
            </div>

            {/* MARQUEE STRIP — stays inside hero section */}
            <div className="hz-marquee-section">
              <div className="hz-marquee-inner">
                {MARQUEE_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <span className="hz-marquee-item" key={i}>
                      {Icon ? (
                        <Icon />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          className="hz-marquee-icon"
                          src={item.img}
                          alt={item.label}
                          width={item.w}
                          height={28}
                          loading="eager"
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
