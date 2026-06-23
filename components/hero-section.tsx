"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type TLineType = "output" | "prompt" | "system" | "highlight" | "success" | "amber" | "gap";
type KBLine = { type: TLineType; text?: string };
type RenderedLine = { id: number; type: TLineType; text: string };

// ─── KNOWLEDGE BASE ───────────────────────────────────────────────────────────

const KB: Record<string, KBLine[]> = {
  whoami: [
    { type: "output", text: "Riz. Operator, builder, occasional comedian." },
    { type: "output", text: "Ten years running operations across four continents." },
    { type: "output", text: "Cambridge. ACCA. Careem → Bolt → Wise → own thing." },
    { type: "output", text: "Based in Tallinn. Working globally." },
    { type: "gap" },
    { type: "output", text: "The short version: I fix the thinking, then I build the system." },
    { type: "amber", text: "→ try: work, wins, soch, pricing, why" },
  ],
  work: [
    { type: "amber", text: "Career timeline:" },
    { type: "output", text: "2024–now  Soch · Co-founder · Tallinn" },
    { type: "output", text: "2022–2024 Wise · Senior Ops Manager · London" },
    { type: "output", text: "2020–2022 Bolt · Product Operations · Tallinn" },
    { type: "output", text: "2018–2020 Careem · Ops Lead · Dubai" },
    { type: "output", text: "2016–2018 Motive Technologies · Operations" },
    { type: "gap" },
    { type: "output", text: "Cambridge certificate in 2019. ACCA qualified." },
    { type: "amber", text: "→ drill in: bolt, wise, careem, soch" },
  ],
  bolt: [
    { type: "amber", text: "Bolt (2020–2022):" },
    { type: "output", text: "Product Ops. Dispatch latency: 3 min → 20 sec." },
    { type: "output", text: "Courier cost reduction: $3.9M annually." },
    { type: "output", text: "Wrongful termination. Fought it. Won. Published everything." },
    { type: "success", text: "→ put it on my LinkedIn headline. On purpose." },
  ],
  wise: [
    { type: "amber", text: "Wise (2022–2024):" },
    { type: "output", text: "92% straight-through matching on transfers." },
    { type: "output", text: "Built the ops infrastructure for MENA expansion." },
    { type: "output", text: "Left to start Soch. No regrets." },
  ],
  careem: [
    { type: "amber", text: "Careem (2018–2020):" },
    { type: "output", text: "Ops Lead across 4 countries." },
    { type: "output", text: "Pre-Uber acquisition. Saw what scale actually looks like." },
    { type: "output", text: "First time I realized ops is just thinking at speed." },
  ],
  soch: [
    { type: "amber", text: "Soch — my company:" },
    { type: "output", text: "We build AI workflow systems for founders and ops teams." },
    { type: "output", text: "n8n automations, AI agents, internal tools." },
    { type: "output", text: "Co-founded with Umair Shahzad." },
    { type: "highlight", text: "→ withsoch.com" },
  ],
  wins: [
    { type: "amber", text: "Things worth mentioning:" },
    { type: "output", text: "✓ Bug Catcher — browser game built with zero prior code." },
    { type: "output", text: "  Hand-tracking, no controller, shipped on LinkedIn." },
    { type: "output", text: "  20k+ impressions on launch post." },
    { type: "gap" },
    { type: "output", text: "✓ Bolt case — wrongful termination. Won." },
    { type: "output", text: "  Published every document. Became a case study in ops credibility." },
    { type: "gap" },
    { type: "output", text: "✓ Anthropic Claude Partner Network. Not applied, selected." },
    { type: "amber", text: "→ see: bolt, soch" },
  ],
  pricing: [
    { type: "amber", text: "How to work with me:" },
    { type: "output", text: "Consulting / Advisory — from $160/hr." },
    { type: "output", text: "Projects (system builds) — scoped fixed price via Soch." },
    { type: "output", text: "Speaking / Workshops — ask." },
    { type: "output", text: "Learn — just read the Substack. It's free." },
    { type: "gap" },
    { type: "highlight", text: "→ cal.com/riz — book a 30min scoping call" },
  ],
  stack: [
    { type: "amber", text: "Tools I actually use:" },
    { type: "output", text: "Automation  n8n, Make, Zapier" },
    { type: "output", text: "AI          Anthropic API, OpenAI, Gemini" },
    { type: "output", text: "Data        Airtable, Google Sheets, Supabase" },
    { type: "output", text: "Comms       Slack, ClickUp" },
    { type: "output", text: "Web         Next.js, Webflow, Framer" },
    { type: "gap" },
    { type: "output", text: "Not a developer. Never claimed to be." },
    { type: "success", text: "Build with the best tool for the job. Full stop." },
  ],
  why: [
    { type: "output", text: "Why do this at all?" },
    { type: "gap" },
    { type: "output", text: 'Because most "automation" doesn\'t fail at the tech level.' },
    { type: "output", text: "It fails because the thinking underneath it is broken." },
    { type: "gap" },
    { type: "output", text: "AI scales what you already do." },
    { type: "highlight", text: "If you think clearly, AI is leverage." },
    { type: "highlight", text: "If you don't, AI is a faster way to make more mistakes." },
    { type: "gap" },
    { type: "output", text: "I fix the thinking first. Then we build." },
  ],
  contact: [
    { type: "amber", text: "Get in touch:" },
    { type: "highlight", text: "→ riz@withsoch.com" },
    { type: "highlight", text: "→ cal.com/riz (book a call)" },
    { type: "output", text: "→ linkedin.com/in/riz" },
    { type: "output", text: "→ conversationswithriz.substack.com" },
    { type: "output", text: "→ youtube.com/@VibeWithRiz" },
  ],
  education: [
    { type: "amber", text: "Education:" },
    { type: "output", text: "Cambridge Certificate in Finance — 2019." },
    { type: "output", text: "ACCA qualified." },
    { type: "output", text: "Real education: ten years in the room where decisions get made." },
  ],
  help: [
    { type: "amber", text: "Available commands:" },
    { type: "output", text: "whoami     — who is Riz" },
    { type: "output", text: "work       — career timeline" },
    { type: "output", text: "bolt       — the Bolt chapter" },
    { type: "output", text: "wise       — the Wise chapter" },
    { type: "output", text: "careem     — the Careem chapter" },
    { type: "output", text: "soch       — the company" },
    { type: "output", text: "wins       — things worth mentioning" },
    { type: "output", text: "pricing    — how to work together" },
    { type: "output", text: "stack      — tools I use" },
    { type: "output", text: "why        — why any of this" },
    { type: "output", text: "education  — Cambridge, ACCA" },
    { type: "output", text: "contact    — get in touch" },
    { type: "output", text: "clear      — reset terminal" },
  ],
};

const ALIASES: Record<string, string> = {
  "who are you": "whoami", "who is riz": "whoami", "about you": "whoami", "tell me about yourself": "whoami",
  "experience": "work", "career": "work", "background": "work", "timeline": "work",
  "what have you built": "wins", "achievements": "wins", "projects": "wins", "case studies": "wins",
  "how much": "pricing", "rates": "pricing", "cost": "pricing", "hire": "pricing", "services": "pricing",
  "tools": "stack", "tech": "stack", "technology": "stack",
  "motivation": "why", "philosophy": "why", "point of view": "why", "pov": "why",
  "company": "soch", "withsoch": "soch",
  "email": "contact", "social": "contact", "reach out": "contact", "book": "contact", "calendly": "contact",
  "cambridge": "education", "acca": "education", "university": "education",
  "?": "help", "commands": "help", "ls": "help",
};

const BOOT_LINES: KBLine[] = [
  { type: "system", text: "── riz.sh v1.0 ──────────────────────────────" },
  { type: "system", text: "loading knowledge base..." },
  { type: "gap" },
];

const QUICK_CHIPS = ["whoami", "work", "wins", "pricing", "stack", "why"];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function addLine(type: TLineType, text: string) {
    const id = idRef.current++;
    setLines(prev => [...prev, { id, type, text }]);
  }

  function typeLines(kbLines: KBLine[], startDelay = 0): number {
    let delay = startDelay;
    let increment = 30;
    kbLines.forEach(line => {
      delay += increment;
      increment += 10;
      const t = setTimeout(() => {
        addLine(line.type, line.text ?? "");
      }, delay);
      timersRef.current.push(t);
    });
    return delay;
  }

  useEffect(() => {
    const bootEnd = typeLines(BOOT_LINES, 0);
    const t1 = setTimeout(() => {
      const whoamiEnd = typeLines(KB.whoami, 0);
      const t2 = setTimeout(() => {
        addLine("gap", "");
        addLine("system", "Type a command or question. Tab to autocomplete.");
        inputRef.current?.focus();
      }, whoamiEnd + 400);
      timersRef.current.push(t2);
    }, Math.max(bootEnd, 400));
    timersRef.current.push(t1);
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setCmdHistory(prev => [cmd, ...prev]);
    setHistIdx(-1);
    addLine("prompt", cmd);
    if (cmd === "clear") {
      setLines([]);
      setInputValue("");
      return;
    }
    const resolved =
      KB[cmd] ??
      KB[ALIASES[cmd]] ??
      KB[ALIASES[Object.keys(ALIASES).find(k => cmd.includes(k)) ?? ""] ?? ""] ??
      null;
    if (resolved) {
      typeLines(resolved);
    } else {
      addLine("output", "Unknown command. Try: help");
      addLine("amber", "→ hint: whoami, work, wins, pricing, why");
    }
    setInputValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      if (next >= 0) { setHistIdx(next); setInputValue(cmdHistory[next] ?? ""); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInputValue(""); }
      else { setHistIdx(next); setInputValue(cmdHistory[next] ?? ""); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(KB).find(c => c.startsWith(inputValue));
      if (match) setInputValue(match);
    }
  }

  return (
    <>
      <style>{`
        /* ── HERO LAYOUT ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          gap: 0;
        }

        /* ── LEFT COLUMN ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 100px 72px 80px 80px;
          background: #fff;
        }
        .hero-kicker {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--coral);
          margin-bottom: 28px;
          margin: 0 0 28px 0;
        }
        .hero-h1 {
          font-family: var(--font-playfair), serif;
          font-size: clamp(40px, 4.5vw, 58px);
          font-weight: 700;
          line-height: 1.1;
          color: var(--ink);
          margin: 0 0 24px 0;
        }
        .hero-h1 em { font-style: italic; color: var(--coral); display: block; }
        .hero-sub {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 17px;
          line-height: 1.7;
          color: var(--body);
          max-width: 460px;
          margin: 0 0 40px 0;
        }
        .hero-sub strong { color: var(--ink); font-weight: 500; }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero-btn-primary {
          background: var(--coral);
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .hero-btn-primary:hover { background: var(--coral-d); }
        .hero-btn-ghost {
          background: transparent;
          color: var(--ink);
          border: 1.5px solid var(--line);
          padding: 14px 28px;
          border-radius: 8px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .hero-btn-ghost:hover { border-color: var(--ink); }

        /* ── RIGHT COLUMN ── */
        .hero-right {
          background: #131f18;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 56px 80px;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }
        .hero-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        /* subtle coral gradient glow bottom */
        .hero-right::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 240px;
          background: linear-gradient(to top, rgba(234,106,71,0.06), transparent);
          pointer-events: none;
        }

        /* ── TERMINAL ── */
        .t-wrap {
          background: #1C2B25;
          border-radius: 14px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.07),
            0 24px 64px rgba(0,0,0,0.45),
            0 8px 24px rgba(0,0,0,0.3);
          width: 100%;
          max-width: 520px;
          position: relative;
          z-index: 1;
        }
        .t-chrome {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 13px 18px;
          background: rgba(0,0,0,0.2);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .t-chrome-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
        .t-chrome-title {
          flex: 1;
          text-align: center;
          font-family: var(--font-dm-mono), monospace;
          font-size: 12px;
          color: #4a6658;
          letter-spacing: 0.08em;
        }
        .t-body {
          padding: 20px 24px 14px;
          height: 440px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          scroll-behavior: smooth;
        }
        .t-body::-webkit-scrollbar { width: 3px; }
        .t-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        /* Line types */
        .t-line {
          font-family: var(--font-dm-mono), monospace;
          font-size: 13px;
          line-height: 1.65;
          color: #bdd0ca;
          white-space: pre-wrap;
          word-break: break-word;
          min-height: 1px;
        }
        .t-line.prompt::before { content: '> '; color: #EA6A47; font-weight: 500; }
        .t-line.system  { color: #4a6658; font-style: italic; }
        .t-line.output  { color: #bdd0ca; padding-left: 14px; }
        .t-line.highlight { color: #EA6A47; padding-left: 14px; }
        .t-line.success { color: #5DB887; padding-left: 14px; }
        .t-line.amber   { color: #D79A36; padding-left: 14px; }
        .t-line.gap     { height: 10px; display: block; }

        /* Chips row */
        .t-chips {
          padding: 10px 24px 12px;
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .t-chip {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 5px;
          padding: 5px 12px;
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          color: #4a6658;
          cursor: pointer;
          transition: all 0.15s;
          letter-spacing: 0.04em;
        }
        .t-chip:hover {
          background: rgba(234,106,71,0.15);
          border-color: rgba(234,106,71,0.5);
          color: #EA6A47;
        }

        /* Input row */
        .t-input-row {
          display: flex;
          align-items: center;
          padding: 11px 24px 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
          gap: 0;
        }
        .t-prompt-sym {
          color: #EA6A47;
          font-family: var(--font-dm-mono), monospace;
          font-size: 13px;
          margin-right: 10px;
          user-select: none;
          flex-shrink: 0;
        }
        .t-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #bdd0ca;
          font-family: var(--font-dm-mono), monospace;
          font-size: 13px;
          caret-color: #EA6A47;
        }
        .t-input::placeholder { color: #2e4840; }

        /* ── VERSION TAG ── */
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
          letter-spacing: 0.08em;
          z-index: 200;
          pointer-events: none;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-left { padding: 100px 28px 60px; }
          .hero-right { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-grid">

        {/* LEFT */}
        <div className="hero-left">
          <p className="hero-kicker">Operator · Builder · Tallinn</p>

          <h1 className="hero-h1">
            AI doesn&apos;t fix bad thinking.
            <em>It scales it.</em>
          </h1>

          <p className="hero-sub">
            I&apos;m Riz. Ten years in ops at{" "}
            <strong>Careem, Bolt and Wise</strong>.{" "}
            Cambridge. ACCA. Wrongful termination win. Anthropic Partner.
            <br /><br />
            Now I help founders think clearly enough that automation actually works.
          </p>

          <div className="hero-btns">
            <Link href="/services" className="hero-btn-primary">
              See what I&apos;ve built →
            </Link>
            <button
              className="hero-btn-ghost"
              onClick={() =>
                document.getElementById("what-i-believe")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Read how I think →
            </button>
          </div>
        </div>

        {/* RIGHT — TERMINAL PANEL */}
        <div className="hero-right">
          <div className="t-wrap">

            {/* Window chrome */}
            <div className="t-chrome">
              <div className="t-chrome-dot" style={{ background: "#FF5F56" }} />
              <div className="t-chrome-dot" style={{ background: "#FFBD2E" }} />
              <div className="t-chrome-dot" style={{ background: "#27C93F" }} />
              <span className="t-chrome-title">riz.sh — ask me anything</span>
            </div>

            {/* Terminal body */}
            <div ref={bodyRef} className="t-body">
              {lines.map(line => (
                <div key={line.id} className={`t-line ${line.type}`}>
                  {line.type !== "gap" ? line.text : null}
                </div>
              ))}
            </div>

            {/* Quick chips */}
            <div className="t-chips">
              {QUICK_CHIPS.map(chip => (
                <button key={chip} className="t-chip" onClick={() => runCommand(chip)}>
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="t-input-row">
              <span className="t-prompt-sym">&gt;</span>
              <input
                ref={inputRef}
                className="t-input"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command or question..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── VERSION TAG ── */}
      <div className="version-tag">v2.1 · Operator&apos;s Board</div>
    </>
  );
}
