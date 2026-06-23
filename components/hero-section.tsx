"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NODES = [
  { icon: "📥", name: "New Lead",        org: "HubSpot", type: "Trigger" },
  { icon: "🔍", name: "Enrich Profile",  org: "Apify",   type: "Action" },
  { icon: "🧠", name: "Score & Qualify", org: "Claude",  type: "AI Step" },
  { icon: "⚡", name: "Route to Sales",  org: "Slack",   type: "Notification" },
];

const BAR_HEIGHTS = [40, 55, 48, 70, 52, 88, 72];

const PROGRESS_ROWS = [
  { icon: "📥", label: "Lead routing",   pct: 82 },
  { icon: "📄", label: "Doc processing", pct: 91 },
  { icon: "📊", label: "Reporting",      pct: 76 },
  { icon: "✉️",  label: "Outreach",       pct: 68 },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [activeNode,     setActiveNode]     = useState<number | null>(null);
  const [doneNodes,      setDoneNodes]      = useState<Set<number>>(new Set());
  const [activeConn,     setActiveConn]     = useState<number | null>(null);
  const [runCount,       setRunCount]       = useState(1);
  const [barIndex,       setBarIndex]       = useState(6);

  // Hero stats
  const [hStat1, setHStat1] = useState(0.0);
  const [hStat2, setHStat2] = useState(0);
  const [hStat3, setHStat3] = useState(0);

  // Card-2 stats
  const [c2s1, setC2s1] = useState(0);
  const [c2s2, setC2s2] = useState(0);
  const [c2s3, setC2s3] = useState(0);

  const [barsIn, setBarsIn] = useState(false);

  // ─── Workflow loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    let canceled = false;
    let node = 0;

    function step() {
      if (canceled) return;
      setActiveNode(node);
      setActiveConn(node > 0 ? node - 1 : null);

      const t = setTimeout(() => {
        if (canceled) return;
        const done = node;
        setDoneNodes(prev => { const s = new Set(prev); s.add(done); return s; });
        setActiveNode(null);
        setActiveConn(null);
        node++;

        if (node < 4) {
          setTimeout(step, 0);
        } else {
          setTimeout(() => {
            if (canceled) return;
            setDoneNodes(new Set());
            setRunCount(prev => prev + 1);
            setBarIndex(prev => (prev + 3) % 7);
            node = 0;
            step();
          }, 1200);
        }
      }, 700);

      return () => clearTimeout(t);
    }

    const init = setTimeout(step, 2500);
    return () => { canceled = true; clearTimeout(init); };
  }, []);

  // ─── Hero stats count-up ───────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      const dur = 1500;
      const t0 = performance.now();
      function tick(now: number) {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - (1 - p) ** 3;
        setHStat1(parseFloat((3.9 * e).toFixed(1)));
        setHStat2(Math.round(92 * e));
        setHStat3(Math.round(45 * e));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // ─── Card-2 stats count-up ─────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      const dur = 1200;
      const t0 = performance.now();
      function tick(now: number) {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - (1 - p) ** 3;
        setC2s1(Math.round(23 * e));
        setC2s2(Math.round(847 * e));
        setC2s3(Math.round(99 * e));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  // ─── Bar animation trigger ─────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setBarsIn(true), 2600);
    return () => clearTimeout(t);
  }, []);

  // ─── Helpers ───────────────────────────────────────────────────────────────
  function nodeBorder(i: number) {
    if (activeNode === i) return "var(--coral)";
    if (doneNodes.has(i)) return "#BBF7D0";
    return "#ECEAE6";
  }
  function nodeBg(i: number) {
    if (activeNode === i) return "#FFF8F6";
    if (doneNodes.has(i)) return "#F0FDF4";
    return "#FAFAF9";
  }
  function nodeShadow(i: number) {
    return activeNode === i ? "0 0 0 3px rgba(234,106,71,.15)" : "none";
  }
  function nodeStatus(i: number) {
    if (activeNode === i) return "⏳";
    if (doneNodes.has(i)) return "✅";
    return "";
  }

  return (
    <>
      {/* ── STYLES ── */}
      <style>{`
        /* hero grid */
        .nh {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 58px);
          background: var(--paper);
          position: relative;
        }
        .nh::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(28,28,28,.03) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
          z-index: 0;
        }

        /* columns */
        .nh-left {
          padding: 72px 64px 72px 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .nh-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          position: relative;
          z-index: 1;
        }

        /* meta tag */
        .nh-meta {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .18em;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 20px;
          opacity: 0;
          animation: nhFade .6s ease forwards .1s;
        }
        .nh-meta::before {
          content: '';
          display: block;
          width: 16px;
          height: 2px;
          background: var(--coral);
          flex-shrink: 0;
        }

        /* h1 */
        .nh-h1 {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(68px, 8.5vw, 112px);
          line-height: .94;
          color: var(--ink);
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
        }
        .nh-word {
          display: block;
          opacity: 0;
          animation: nhWord .55s cubic-bezier(.36,.07,.19,.97) forwards;
        }
        .nh-word.c { color: var(--coral); }

        /* subtext */
        .nh-sub {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 15px;
          line-height: 1.68;
          color: var(--ink2);
          max-width: 380px;
          margin: 0 0 32px;
          opacity: 0;
          animation: nhFade .6s ease forwards 1.6s;
        }
        .nh-sub strong { font-weight: 600; color: var(--ink); }

        /* ctas */
        .nh-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0;
          animation: nhFade .6s ease forwards 1.8s;
        }
        .nh-btn-ink {
          background: var(--ink);
          color: #fff;
          padding: 13px 26px;
          border-radius: 7px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          transition: background .2s ease;
          border: none;
          cursor: pointer;
        }
        .nh-btn-ink:hover { background: var(--coral); }
        .nh-btn-outline {
          background: transparent;
          color: var(--ink);
          padding: 13px 26px;
          border-radius: 7px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 14px;
          font-weight: 500;
          border: 1.5px solid var(--line);
          transition: border-color .2s ease;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
        .nh-btn-outline:hover { border-color: var(--ink); }

        /* stats row */
        .nh-stats {
          margin-top: 48px;
          padding-top: 22px;
          border-top: 1px solid var(--line);
          display: flex;
          opacity: 0;
          animation: nhFade .6s ease forwards 2s;
        }
        .nh-stat { flex: 1; }
        .nh-stat:not(:last-child) {
          border-right: 1px solid var(--line);
          padding-right: 20px;
          margin-right: 20px;
        }
        .nh-stat-num {
          font-family: var(--font-bebas), sans-serif;
          font-size: 32px;
          color: var(--ink);
          line-height: 1;
          display: block;
          margin-bottom: 4px;
        }
        .nh-stat-suf { font-size: 18px; color: var(--coral); }
        .nh-stat-lbl {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: var(--muted);
          display: block;
        }

        /* cards stage */
        .cs {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 500px;
        }
        .cf {
          position: absolute;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,.1), 0 2px 8px rgba(0,0,0,.06);
          overflow: hidden;
        }
        .cf1 {
          width: 97%; left: 1.5%; top: 0; z-index: 3;
          opacity: 0;
          animation: cfIn1 .5s ease forwards 2.2s;
        }
        .cf2 {
          width: 91%; left: 0; bottom: 24px; z-index: 2;
          opacity: 0;
          animation: cfIn2 .5s ease forwards 2.4s;
        }
        .cf3 {
          width: 86%; right: 0; bottom: 0; z-index: 1;
          opacity: 0;
          animation: cfIn3 .5s ease forwards 2.6s;
        }

        /* card chrome */
        .cch {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 12px;
          border-bottom: 1px solid #F0EDE7;
        }
        .ccd {
          width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
        }
        .ccl {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px;
          color: #8A857B;
          letter-spacing: .07em;
          flex: 1;
          margin-left: 2px;
        }
        .ccpill {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8px;
          padding: 2px 7px;
          border-radius: 99px;
          background: #DCFCE7;
          color: #16A34A;
          letter-spacing: .05em;
          font-weight: 500;
        }

        /* workflow nodes */
        .wn {
          display: flex;
          align-items: center;
          border-radius: 10px;
          padding: 9px 12px;
          border-width: 1.5px;
          border-style: solid;
          margin: 0 12px;
          transition: border-color .25s, background .25s, box-shadow .25s;
        }
        .wn-ico { font-size: 13px; margin-right: 8px; flex-shrink: 0; }
        .wn-nm {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: var(--ink);
          flex: 1;
        }
        .wn-org {
          font-size: 9px;
          color: var(--muted);
          font-family: var(--font-dm-sans), sans-serif;
          margin-left: 3px;
        }
        .wn-type {
          font-family: var(--font-dm-mono), monospace;
          font-size: 7px;
          color: var(--faint);
          margin-right: 6px;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
        .wn-st { font-size: 11px; width: 16px; text-align: center; flex-shrink: 0; }

        /* connector */
        .wconn {
          width: 2px;
          height: 14px;
          background: #E8E5DF;
          margin: 0 auto;
          position: relative;
        }
        .wdot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--coral);
          animation: dotGo 400ms linear infinite;
          top: -2px;
        }

        /* card 1 footer */
        .c1ft {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 12px;
          border-top: 1px solid #F0EDE7;
          margin-top: 4px;
        }
        .c1lp {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8px;
          color: var(--coral);
          display: flex;
          align-items: center;
          gap: 4px;
          letter-spacing: .05em;
        }
        .spin { display: inline-block; animation: spinIt 1.5s linear infinite; }
        .c1rc {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8px;
          color: var(--muted);
        }

        /* card 2 stats */
        .c2st {
          display: flex;
          border-bottom: 1px solid #F0EDE7;
        }
        .c2stile {
          flex: 1;
          padding: 9px 10px;
          text-align: center;
        }
        .c2stile:not(:last-child) { border-right: 1px solid #F0EDE7; }
        .c2num {
          font-family: var(--font-bebas), sans-serif;
          font-size: 22px;
          color: var(--ink);
          line-height: 1;
          display: block;
        }
        .c2lbl {
          font-family: var(--font-dm-mono), monospace;
          font-size: 7px;
          text-transform: uppercase;
          letter-spacing: .07em;
          color: var(--muted);
          display: block;
          margin-top: 2px;
        }
        .bars {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 28px;
          padding: 0 10px 10px;
        }
        .bar { flex: 1; border-radius: 2px 2px 0 0; transition: background .3s; }

        /* card 3 progress */
        .pr {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
        }
        .pr-ico { font-size: 11px; width: 14px; flex-shrink: 0; text-align: center; }
        .pr-lbl {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 9px;
          color: var(--ink);
          width: 82px;
          flex-shrink: 0;
        }
        .pr-track {
          flex: 1;
          height: 4px;
          background: #F0EDE7;
          border-radius: 99px;
          overflow: hidden;
        }
        .pr-fill {
          height: 100%;
          background: var(--coral);
          border-radius: 99px;
          width: 0;
          transition: width 1s ease;
        }
        .pr-pct {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8px;
          color: var(--muted);
          width: 22px;
          text-align: right;
          flex-shrink: 0;
        }

        /* keyframes */
        @keyframes nhFade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nhWord {
          0%   { opacity: 0; transform: translateY(-32px); }
          70%  { transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cfIn1 {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cfIn2 {
          from { opacity: 0; transform: rotate(-2.5deg) translateY(28px); }
          to   { opacity: 1; transform: rotate(-2.5deg) translateY(8px); }
        }
        @keyframes cfIn3 {
          from { opacity: 0; transform: rotate(4deg) translateY(40px); }
          to   { opacity: 1; transform: rotate(4deg) translateY(20px); }
        }
        @keyframes dotGo {
          0%   { top: -2px; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { top: 12px; opacity: 0; }
        }
        @keyframes spinIt {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* responsive */
        @media (max-width: 960px) {
          .nh { grid-template-columns: 1fr; }
          .nh-left { padding: 56px 24px 36px; }
          .nh-right { padding: 0 24px 56px; min-height: 460px; }
        }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section className="nh">

        {/* LEFT */}
        <div className="nh-left">

          {/* 1. Meta tag */}
          <p className="nh-meta">Operator · Builder · Tallinn</p>

          {/* 2. H1 */}
          <h1 className="nh-h1">
            <span className="nh-word"   style={{ animationDelay: "300ms" }}>AI</span>
            <span className="nh-word"   style={{ animationDelay: "420ms" }}>DOESN&apos;T</span>
            <span className="nh-word"   style={{ animationDelay: "540ms" }}>FIX BAD</span>
            <span className="nh-word"   style={{ animationDelay: "680ms" }}>THINKING.</span>
            <span className="nh-word c" style={{ animationDelay: "860ms" }}>IT SCALES IT.</span>
          </h1>

          {/* 3. Subtext */}
          <p className="nh-sub">
            I help founders think clearly enough that automation actually works —
            then I build the systems that prove it.
            <br /><br />
            Ten years in ops.{" "}
            <strong>Careem</strong>. <strong>Bolt</strong>. <strong>Wise</strong>.
            {" "}Cambridge. Tallinn.
          </p>

          {/* 4. CTAs */}
          <div className="nh-ctas">
            <Link href="/services" className="nh-btn-ink">
              See what I&apos;ve built →
            </Link>
            <button
              className="nh-btn-outline"
              onClick={() =>
                document.getElementById("what-i-believe")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Read how I think
            </button>
          </div>

          {/* 5. Stats */}
          <div className="nh-stats">
            <div className="nh-stat">
              <span className="nh-stat-num">
                ${hStat1.toFixed(1)}<span className="nh-stat-suf">M</span>
              </span>
              <span className="nh-stat-lbl">saved · Careem</span>
            </div>
            <div className="nh-stat">
              <span className="nh-stat-num">
                {hStat2}<span className="nh-stat-suf">%</span>
              </span>
              <span className="nh-stat-lbl">STP · Wise</span>
            </div>
            <div className="nh-stat">
              <span className="nh-stat-num">{hStat3}</span>
              <span className="nh-stat-lbl">markets · Bolt</span>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="nh-right">
          <div className="cs">

            {/* ─── CARD 3 (back, z-index 1) ─── */}
            <div className="cf cf3">
              <div className="cch">
                <div className="ccd" style={{ background: "#FF5F56" }} />
                <div className="ccd" style={{ background: "#FFBD2E" }} />
                <div className="ccd" style={{ background: "#27C93F" }} />
                <span className="ccl">Speed Gains</span>
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{
                  fontFamily: "var(--font-dm-sans),sans-serif",
                  fontSize: 9,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 9,
                }}>
                  Time saved per process
                </p>
                {PROGRESS_ROWS.map((row, i) => (
                  <div key={i} className="pr">
                    <span className="pr-ico">{row.icon}</span>
                    <span className="pr-lbl">{row.label}</span>
                    <div className="pr-track">
                      <div
                        className="pr-fill"
                        style={{
                          width: barsIn ? `${row.pct}%` : "0%",
                          transitionDelay: `${i * 120}ms`,
                        }}
                      />
                    </div>
                    <span className="pr-pct">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── CARD 2 (mid, z-index 2) ─── */}
            <div className="cf cf2">
              <div className="cch">
                <div className="ccd" style={{ background: "#FF5F56" }} />
                <div className="ccd" style={{ background: "#FFBD2E" }} />
                <div className="ccd" style={{ background: "#27C93F" }} />
                <span className="ccl">This Week</span>
                <span className="ccpill">13 active</span>
              </div>
              <div className="c2st">
                <div className="c2stile">
                  <span className="c2num">{c2s1}h</span>
                  <span className="c2lbl">HRS SAVED</span>
                </div>
                <div className="c2stile">
                  <span className="c2num">{c2s2}</span>
                  <span className="c2lbl">RUNS FIRED</span>
                </div>
                <div className="c2stile">
                  <span className="c2num">{c2s3}%</span>
                  <span className="c2lbl">SUCCESS</span>
                </div>
              </div>
              <div className="bars">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className="bar"
                    style={{
                      height: `${h}%`,
                      background: i === barIndex ? "var(--coral)" : "var(--line)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ─── CARD 1 (front, z-index 3) ─── */}
            <div className="cf cf1">
              <div className="cch">
                <div className="ccd" style={{ background: "#FF5F56" }} />
                <div className="ccd" style={{ background: "#FFBD2E" }} />
                <div className="ccd" style={{ background: "#27C93F" }} />
                <span className="ccl">Lead Enrichment Pipeline</span>
                <span className="ccpill">Live</span>
              </div>

              <div style={{ padding: "10px 0 4px" }}>
                {NODES.map((node, i) => (
                  <div key={i}>
                    {i > 0 && (
                      <div className="wconn">
                        {activeConn === i - 1 && <div className="wdot" />}
                      </div>
                    )}
                    <div
                      className="wn"
                      style={{
                        borderColor: nodeBorder(i),
                        background:  nodeBg(i),
                        boxShadow:   nodeShadow(i),
                      }}
                    >
                      <span className="wn-ico">{node.icon}</span>
                      <div style={{ flex: 1 }}>
                        <span className="wn-nm">{node.name}</span>
                        <span className="wn-org">· {node.org}</span>
                      </div>
                      <span className="wn-type">{node.type}</span>
                      <span className="wn-st">{nodeStatus(i)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="c1ft">
                <span className="c1lp">
                  <span className="spin">↻</span>
                  Looping
                </span>
                <span className="c1rc">Run #{runCount}</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ── VERSION TAG ── */}
      <style>{`
        .version-tag {
          position: fixed;
          bottom: 20px;
          left: 20px;
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          color: var(--muted);
          background: var(--cream);
          border: 1px solid var(--line);
          padding: 6px 12px;
          border-radius: 999px;
          letter-spacing: .08em;
          z-index: 200;
          pointer-events: none;
        }
      `}</style>
      <div className="version-tag">v2.1 · Operator&apos;s Board</div>
    </>
  );
}
