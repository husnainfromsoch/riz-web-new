"use client";
import { ComponentType } from "react";
import Link from "next/link";
import CalBookingButton from "@/components/CalModal";
import { useParallax, useScrollFadeOut } from "@/hooks/useParallax";

const PHOTO_URL = "/riz-photo-new.jpg";

// Sparkle used for "AI Operator" since it's a role, not a product with a logo.
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
  { label: "Anthropic", img: "/logos/anthropic.png", w: 111 },
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
        .hz-marquee-text {
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--hz-forest);
          white-space: nowrap;
        }

        .hz-trust-row { display: contents; }

        @media (max-width: 960px) {
          .hz-wrap { padding-left: 24px; padding-right: 24px; }
          .hz-grid { grid-template-columns: 1fr; gap: 36px; }
          .hz-headline { font-size: clamp(30px, 8.5vw, 40px); letter-spacing: -1.5px; }
          /* min-height must be killed here: with aspect-ratio it transfers
             a 560px min-width and blows the grid track past the viewport */
          .hz-photo-card { aspect-ratio: 4 / 5; min-height: 0; height: auto; }
        }

        @media (max-width: 640px) {
          .hz-hero { padding: 44px 0 48px; }
          .hz-eyebrow { margin-top: 16px; margin-bottom: 24px; }
          .hz-intro { font-size: clamp(20px, 5.8vw, 24px); margin-bottom: 10px; }
          .hz-value-prop { font-size: 16px; margin-bottom: 24px; }
          .hz-role-list { margin-bottom: 24px; }
          .hz-role-list li { font-size: 15px; padding: 11px 0; }
          .hz-cta-row { margin-bottom: 24px; }
          .hz-btn-primary, .hz-btn-secondary { flex: 1 1 auto; }
          .hz-trust-row {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px 24px;
          }
          .hz-ops-num { font-size: 32px; letter-spacing: -1.5px; }
          .hz-ops-label { font-size: 13px; max-width: 190px; }
          .hz-logo-row { gap: 16px; flex-wrap: nowrap; }
          .hz-logo-row img { height: 28px; }
          .hz-marquee-section {
            margin-top: 36px;
            padding: 16px 0;
            -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);
            mask-image: linear-gradient(90deg, transparent 0, #000 32px, #000 calc(100% - 32px), transparent 100%);
          }
          .hz-marquee-inner { gap: 14px; }
          .hz-marquee-item { width: 122px; height: 78px; padding: 16px; border-radius: 14px; }
          .hz-marquee-icon { height: 24px; }
          .hz-marquee-icon-svg { height: 24px; width: 24px; }
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
                  I help owners<br />
                  think clearly enough<br />
                  that <span className="hz-accent">automation works.</span>
                </h1>

                <div className="hz-rule" />

                <p className="hz-value-prop">
                  Most owners buy tools before they fix how the work actually runs.{" "}
                  <b>AI scales whatever you feed it</b>: messy input, messy output.
                  I come in before the build, not after it breaks.
                </p>

                <ul className="hz-role-list">
                  <li><span className="hz-role-arrow">→</span>Consulting and AI advisory, from $160/hr</li>
                  <li><span className="hz-role-arrow">→</span>Automation systems built and shipped through Soch</li>
                  <li><span className="hz-role-arrow">→</span>Workshops and keynotes on AI in operations</li>
                </ul>

                <div className="hz-cta-row">
                  <CalBookingButton className="hz-btn-primary">Book a 30-min call →</CalBookingButton>
                  <Link href="/case-studies" className="hz-btn-secondary">See what I&apos;ve built</Link>
                </div>

                <div className="hz-trust-row">
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

            {/* MARQUEE STRIP: stays inside hero section */}
            <div className="hz-marquee-section">
              <div className="hz-marquee-inner">
                {MARQUEE_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <span className="hz-marquee-item" key={i}>
                      {Icon ? (
                        <Icon />
                      ) : item.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          className="hz-marquee-icon"
                          src={item.img}
                          alt={item.label}
                          width={item.w}
                          height={28}
                          loading="eager"
                        />
                      ) : (
                        <span className="hz-marquee-text">{item.label}</span>
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
