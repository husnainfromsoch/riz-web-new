"use client";
import { useState, useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import BookingSection from "@/components/BookingSection";
import HeroSection from "@/components/hero-section";

const PORTRAIT_URL =
  "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3a46d312c6d02c8e46bab1_691d97efffebe375af48ce33_Remove_GMNI-removebg-preview.png";

// ─── PROOF CARDS ────────────────────────────────────────────────────────────

const metricCards = [
  { verb: "Saved",         prefix: "$", target: 3.9,  suffix: "M", isFloat: true,  label: "Courier costs saved · Careem" },
  { verb: "Achieved",      prefix: "",  target: 92,   suffix: "%", isFloat: false, label: "Straight-through processing · Wise" },
  { verb: "Dispatch time", prefix: "",  target: 20,   suffix: "s", isFloat: false, label: "Down from 3 min · Careem" },
  { verb: "Scaled across", prefix: "",  target: 4,    suffix: "",  isFloat: false, label: "Markets scaled across · Bolt" },
];

// ─── WORK CARDS ─────────────────────────────────────────────────────────────

const workCards = [
  {
    badge: "Proof",
    title: "Bug Catcher",
    body: "I'd never written a line of code. So I built a browser arcade game you play with your hands — live hand-tracking, built in public.",
    footer: "SHIPPED · PLAYABLE · POSTED ON LINKEDIN",
    link: "Read the story →",
  },
  {
    badge: "Automation",
    title: "The content engine",
    body: "Five connected n8n workflows that research, write, illustrate and publish — on their own. It runs without me.",
    footer: "LIVE · PUBLISHING WEEKLY",
    link: "See the build →",
  },
  {
    badge: "Receipt",
    title: "The Bolt case",
    body: "I won. Then I published every document. A wrongful-termination case at the Estonian Labour Dispute Committee — turned into a transparent series.",
    footer: "LINKEDIN · SUBSTACK · YOUTUBE",
    link: "Read it →",
  },
];

// ─── BY THE NUMBERS ──────────────────────────────────────────────────────────

const byTheNumbersRows = [
  { num: "01", stat: "$3.9M",      subtitle: "Courier costs saved · Careem",                         company: "Careem" },
  { num: "02", stat: "92%",        subtitle: "Straight-through processing · Wise",                    company: "Wise" },
  { num: "03", stat: "20s",        subtitle: "Dispatch time, down from 3 min · Careem",               company: "Careem" },
  { num: "04", stat: "4 Markets",  subtitle: "Scaled across · Bolt",                                  company: "Bolt" },
  { num: "05", stat: "Zero code",  subtitle: "Shipped a browser game anyway",                         company: "Now" },
  { num: "06", stat: "Won",        subtitle: "Wrongful termination case · Bolt, published every doc", company: "Now" },
];

// ─── VIDEO TILES ─────────────────────────────────────────────────────────────

const videoTiles: { title: string; duration: string; gradient: string; src?: string; poster?: string }[] = [
  { title: "Stand-up · AI bit",   duration: "0:48",  gradient: "linear-gradient(160deg, #1b2e24 0%, #0e1f17 100%)", src: "", poster: "" },
  { title: "Build session",       duration: "3:12",  gradient: "linear-gradient(160deg, #2c1a16 0%, #1c0d0a 100%)", src: "", poster: "" },
  { title: "The podcast",         duration: "28:40", gradient: "linear-gradient(160deg, #191d2c 0%, #0e1220 100%)", src: "", poster: "" },
  { title: "Keynote · Tallinn",   duration: "19:05", gradient: "linear-gradient(160deg, #2c2116 0%, #1c150c 100%)", src: "", poster: "" },
  { title: "n8n breakdown",       duration: "5:30",  gradient: "linear-gradient(160deg, #1b2e24 0%, #0e1f17 100%)", src: "", poster: "" },
  { title: "Stand-up · Urdu set", duration: "1:20",  gradient: "linear-gradient(160deg, #2c1a16 0%, #1c0d0a 100%)", src: "", poster: "" },
  { title: "Reel · the thesis",   duration: "0:59",  gradient: "linear-gradient(160deg, #191d2c 0%, #0e1220 100%)", src: "", poster: "" },
  { title: "Workshop clip",       duration: "4:15",  gradient: "linear-gradient(160deg, #2c2116 0%, #1c150c 100%)", src: "", poster: "" },
];
const allTiles = [...videoTiles, ...videoTiles];

// ─── PROCESS STEPS ──────────────────────────────────────────────────────────

const processSteps = [
  {
    num: "01",
    title: "Get clear",
    body: "Before tools, before n8n, before any of it — what's the actual problem? This is where most projects fail. Not here.",
  },
  {
    num: "02",
    title: "Design the system",
    body: "Map the workflow on paper. Decide what stays human and what doesn't. Architecture before wiring.",
  },
  {
    num: "03",
    title: "Build & test",
    body: "Rapid iteration, you in the loop. I build, you pressure-test, we tighten until it runs without thinking.",
  },
  {
    num: "04",
    title: "Hand it over",
    body: "Documentation, training, no lock-in. You own the machine completely.",
  },
];

// ─── ROUTES ─────────────────────────────────────────────────────────────────

const routes = [
  {
    title: "Consulting & coaching",
    sub: "1:1 advisory and fractional product / ops. From $160/hr.",
    href: "/services/consulting",
    rightLabel: null,
  },
  {
    title: "A system built for you",
    sub: "Custom AI workflow automations. That's what my company does.",
    href: "/services/projects",
    rightLabel: "Soch →",
  },
  {
    title: "Speaking & workshops",
    sub: "Talks and team sessions on AI leverage and the future of work.",
    href: "/services/speaking",
    rightLabel: null,
  },
  {
    title: "Just want to learn?",
    sub: "I write about this every week. Start reading.",
    href: "/blog",
    rightLabel: "Writing →",
  },
];

// ─── BLOG POSTS ─────────────────────────────────────────────────────────────

const blogPosts = [
  {
    meta: "2026 · 06 · Opinion",
    title: '"Just add AI" is the new "just add blockchain"',
    excerpt: "Bolting AI onto a broken process doesn't fix the process. It just makes the mess faster.",
  },
  {
    meta: "2026 · 05 · Field notes",
    title: "I let an automation write for a month. Here's what broke.",
    excerpt: "The pipeline ran beautifully. The thinking behind it didn't. A story about where the human still matters.",
  },
  {
    meta: "2026 · 05 · Operations",
    title: "The boring part is the part that matters",
    excerpt: "Ten years of scaling ops taught me the unglamorous truth about what actually compounds.",
  },
];

// ─── WORKFLOW STEPS (before/after toggle) ───────────────────────────────────

// ─── BEFORE ICONS ──────────────────────────────────────────────
function BaBeforeInbox({ stroke = "#EA6A47" }: { stroke?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11L2 12v3a2 2 0 002 2h16a2 2 0 002-2v-3l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/>
    </svg>
  );
}
function BaBeforeHourglass({ stroke = "#EA6A47" }: { stroke?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 00-.586-1.414L12 12l-4.414 4.414A2 2 0 007 17.828V22M7 2v4.172a2 2 0 00.586 1.414L12 12l4.414-4.414A2 2 0 0017 6.172V2"/>
    </svg>
  );
}
function BaBeforeUser({ stroke = "#EA6A47" }: { stroke?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function BaBeforeWarn({ stroke = "#EA6A47" }: { stroke?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}
// ─── AFTER ICONS ──────────────────────────────────────────────
function BaAfterZap({ stroke = "#EA6A47" }: { stroke?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}
function BaAfterSearch({ stroke = "#EA6A47" }: { stroke?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function BaAfterArrowRight({ stroke = "#EA6A47" }: { stroke?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function BaAfterCheck({ stroke = "#EA6A47" }: { stroke?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

const workflowSteps = [
  {
    iconBefore: "📥", iconAfter: "⚡",
    labelBefore: "Lead arrives",          subBefore: "New prospect",
    badgeBefore: "MANUAL",  badgeBeforeOrange: false,
    labelAfter:  "Lead arrives",          subAfter:  "New prospect",
    badgeAfter:  "LIVE",    badgeAfterPulse: true,
  },
  {
    iconBefore: "⏳", iconAfter: "🔍",
    labelBefore: "Sits in inbox",         subBefore: "3 days later…",
    badgeBefore: "3 DAYS",  badgeBeforeOrange: true,
    labelAfter:  "Instantly enriched",    subAfter:  "Data filled in",
    badgeAfter:  "0.3s",    badgeAfterPulse: false,
  },
  {
    iconBefore: "👤", iconAfter: "🤖",
    labelBefore: "You do it manually",    subBefore: "Hours of work",
    badgeBefore: "YOU",     badgeBeforeOrange: false,
    labelAfter:  "Auto-routed",           subAfter:  "Zero touch",
    badgeAfter:  "AUTO",    badgeAfterPulse: false,
  },
  {
    iconBefore: "🔴", iconAfter: "✅",
    labelBefore: "You're the bottleneck", subBefore: "Everything stops",
    badgeBefore: "STUCK",   badgeBeforeOrange: false,
    labelAfter:  "System runs itself",    subAfter:  "No input needed",
    badgeAfter:  "ALWAYS ON", badgeAfterPulse: false,
  },
];

const beforeIconFns = [BaBeforeInbox, BaBeforeHourglass, BaBeforeUser, BaBeforeWarn];
const afterIconFns = [BaAfterZap, BaAfterSearch, BaAfterArrowRight, BaAfterCheck];

// ─── COMPANY LOGOS ──────────────────────────────────────────────────────────


// ─── PROOF CARD COMPONENT ────────────────────────────────────────────────────

type MetricCard = { verb: string; prefix: string; target: number; suffix: string; isFloat: boolean; label: string };

function ProofCard({ card, index, value, visible }: { card: MetricCard; index: number; value: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const display = card.isFloat
    ? `${card.prefix}${value.toFixed(1)}${card.suffix}`
    : `${card.prefix}${Math.round(value)}${card.suffix}`;
  return (
    <div
      style={{
        background: "#ffffff",
        border: `1px solid ${hovered ? "var(--coral)" : "var(--line)"}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(234,106,71,0.12)" : "none",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ padding: "24px 24px 16px", flex: 1 }}>
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--muted)",
          margin: "0 0 4px",
        }}>
          {card.verb}
        </p>
        <p style={{
          fontFamily: "var(--font-bebas), var(--font-dm-sans), sans-serif",
          fontSize: "clamp(52px, 6vw, 72px)",
          color: "var(--ink)",
          lineHeight: 1,
          letterSpacing: "0.04em",
          margin: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: `opacity .4s ease ${index * 150}ms, transform .4s ease ${index * 150}ms`,
        }}>
          {display}
        </p>
      </div>
      <div style={{
        background: "#EDE8DF",
        borderTop: "1px solid var(--line)",
        padding: "14px 24px",
      }}>
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--ink)",
          margin: 0,
        }}>
          {card.label}
        </p>
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [believeHovered, setBelieveHovered] = useState(false);
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [isAfter, setIsAfter] = useState(false);
  const [toggleAnimating, setToggleAnimating] = useState(false);
  const [hoveredBACard, setHoveredBACard] = useState<number | null>(null);
  const beforeAfterRef = useRef<HTMLElement>(null);
  const beforeAfterTriggeredRef = useRef(false);
  const loopCancelRef = useRef<(() => void) | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodesRef = useRef<GainNode[]>([]);

  const proofSectionRef = useRef<HTMLElement | null>(null);
  const proofTriggeredRef = useRef(false);
  const [proofNums, setProofNums] = useState([0, 0, 0, 0]);
  const [proofVisible, setProofVisible] = useState(false);

  const byTheNumbersRef = useRef<HTMLElement | null>(null);
  const byTheNumbersTriggeredRef = useRef(false);
  const [visibleNumberRows, setVisibleNumberRows] = useState([false, false, false, false, false, false]);
  const [hoveredNumberRow, setHoveredNumberRow] = useState<number | null>(null);
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  const beliefParaRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  function handleAudioClick() {
    if (audioState === 'playing') {
      audioCtxRef.current?.suspend();
      setAudioState('paused');
      return;
    }
    if (audioState === 'paused') {
      audioCtxRef.current?.resume();
      setAudioState('playing');
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx: AudioContext = new Ctx();
    audioCtxRef.current = ctx;
    const freqs = [261.63, 329.63, 392.0, 440.0, 587.33];
    gainNodesRef.current = [];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.6 + i * 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gainNodesRef.current.push(gain);
    });
    setAudioState('playing');
  }

  useEffect(() => {
    const el = proofSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || proofTriggeredRef.current) return;
        proofTriggeredRef.current = true;
        setProofVisible(true);
        const duration = 2000;
        const stagger = 150;
        metricCards.forEach(({ target }, i) => {
          const startDelay = i * stagger;
          const startTime = performance.now() + startDelay;
          function tick(now: number) {
            if (now < startTime) { requestAnimationFrame(tick); return; }
            const p = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setProofNums((prev) => {
              const next = [...prev];
              next[i] = target * eased;
              return next;
            });
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = byTheNumbersRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || byTheNumbersTriggeredRef.current) return;
        byTheNumbersTriggeredRef.current = true;
        byTheNumbersRows.forEach((_, i) => {
          setTimeout(() => {
            setVisibleNumberRows((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, i * 150);
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = beforeAfterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || beforeAfterTriggeredRef.current) return;
        beforeAfterTriggeredRef.current = true;
        observer.disconnect();

        let cancelled = false;
        const timers = new Set<ReturnType<typeof setTimeout>>();

        function schedule(fn: () => void, ms: number) {
          const id = setTimeout(() => { timers.delete(id); fn(); }, ms);
          timers.add(id);
        }

        function runCycle() {
          if (cancelled) return;
          // OFF state — wait 2s then flip ON
          schedule(() => {
            if (cancelled) return;
            setIsAfter(true);
            // ON state — wait 3s then flip OFF
            schedule(() => {
              if (cancelled) return;
              setIsAfter(false);
              // OFF again — wait 2s then loop
              schedule(runCycle, 2000);
            }, 3000);
          }, 2000);
        }

        setToggleAnimating(true);
        setIsAfter(false);
        runCycle();

        loopCancelRef.current = () => {
          cancelled = true;
          timers.forEach((id) => clearTimeout(id));
        };
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (loopCancelRef.current) { loopCancelRef.current(); loopCancelRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const els = beliefParaRefs.current.filter(Boolean) as HTMLParagraphElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 110);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* KEYFRAMES + THESIS GRID + PROOF GRID */}
      <style>{`
        @keyframes vinyl-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin {
          from { transform: translateX(-50%) rotate(0deg); }
          to   { transform: translateX(-50%) rotate(360deg); }
        }
        .proof-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 768px) {
          .proof-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .proof-grid { grid-template-columns: 1fr; }
        }
        .chat-card {
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 48px;
        }
        @media (max-width: 768px) {
          .chat-card {
            flex-direction: column;
            text-align: center;
            gap: 32px;
            padding: 40px 28px;
          }
          .chat-card-photo-col {
            margin-left: 0;
          }
        }
        .thesis-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          align-items: stretch;
          gap: 0;
        }
        .portrait-col {
          display: block;
        }
        .portrait-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .thesis-grid {
            grid-template-columns: 1fr;
          }
          .portrait-col {
            display: block;
            height: 480px;
          }
          .portrait-sticky {
            position: relative;
            height: 100%;
          }
        }
        .by-numbers-grid {
          display: grid;
          grid-template-columns: 35% 65%;
          gap: 0;
          align-items: start;
        }
        @media (max-width: 768px) {
          .by-numbers-grid {
            grid-template-columns: 1fr;
          }
        }
        @keyframes ba-flow {
          0%   { left: -4px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100% + 4px); opacity: 0; }
        }
        .ba-row { display: flex; align-items: stretch; width: 100%; }
        .ba-card { flex: 1; min-width: 0; }
        .ba-arrow-h { display: flex; align-items: center; flex-shrink: 0; width: 44px; }
        .ba-arrow-v { display: none; justify-content: center; align-items: center; }
        @media (max-width: 640px) {
          .ba-row { flex-direction: column; }
          .ba-arrow-h { display: none; }
          .ba-arrow-v { display: flex; padding: 6px 0; }
        }
        @keyframes timelineIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseNode {
          0%, 100% { box-shadow: 0 0 0 5px rgba(234,106,71,0.18); }
          50%       { box-shadow: 0 0 0 11px rgba(234,106,71,0.06); }
        }
        @keyframes ba-dash-pulse {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.9; }
        }
        @keyframes ba-live-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(22,163,74,0.5); }
          50%       { box-shadow: 0 0 0 4px rgba(22,163,74,0); }
        }
        @keyframes ba-card-enter {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hand-wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%           { transform: rotate(-12deg); }
          30%           { transform: rotate(12deg); }
        }
        @keyframes statFlow {
          0%   { background-position: 0% center }
          100% { background-position: 300% center }
        }

        /* ===== BELIEVE SECTION ===== */
        .believe-content-wrap {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 80px;
          align-items: start;
        }
        .believe-eyebrow {
          font-family: 'Geist Mono', var(--font-geist-mono), monospace;
          font-size: 11px; font-weight: 500;
          letter-spacing: 1.2px; text-transform: uppercase;
          color: var(--muted);
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 52px;
        }
        .believe-eyebrow::before {
          content: ''; width: 18px; height: 1.5px;
          background: var(--coral); border-radius: 2px; flex-shrink: 0;
        }
        .believe-section-title {
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 52px; font-weight: 900; letter-spacing: -2.5px;
          line-height: 1.03; margin-bottom: 40px; color: var(--ink);
        }
        .belief-para {
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 20px; line-height: 1.65; color: var(--ink);
          padding-bottom: 24px; margin-bottom: 24px;
          border-bottom: 1px solid var(--line);
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .belief-para.visible { opacity: 1; transform: translateY(0); }
        .belief-para:last-of-type { border-bottom: none; margin-bottom: 0; }
        .belief-para.key-line {
          font-size: 22px; font-weight: 800; letter-spacing: -.3px;
        }
        .coral-word { color: var(--coral); }
        .believe-closing {
          margin-top: 44px; padding-top: 36px;
          border-top: 2px solid var(--ink);
        }
        .believe-closing-main {
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 32px; font-weight: 900; letter-spacing: -1.2px;
          margin-bottom: 8px; color: var(--ink);
        }
        .believe-closing-italic {
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 22px; font-weight: 700; font-style: italic;
          background: linear-gradient(90deg, var(--coral), var(--amber));
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .believe-photo-col {
          position: sticky; top: 40px;
        }
        .believe-photo-container {
          position: relative; cursor: pointer; user-select: none;
        }
        .believe-photo-img {
          width: 100%; border-radius: 24px; display: block;
          filter: contrast(1.04) saturate(0.92);
          transition: filter 0.4s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .believe-photo-container:hover .believe-photo-img {
          filter: contrast(1.04) saturate(0.92) brightness(0.75);
          transform: scale(0.97) translateY(-6px);
        }
        .believe-photo-overlay {
          position: absolute; inset: 0; border-radius: 24px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 16px;
          opacity: 0; transition: opacity 0.35s ease;
          background: rgba(12,12,11,0.15); z-index: 3;
        }
        .believe-photo-nameplate {
          position: absolute; top: 20px; left: 20px; z-index: 4;
          background: rgba(243,236,221,.1); backdrop-filter: blur(8px);
          border: 1px solid rgba(243,236,221,.15);
          padding: 8px 14px; border-radius: 100px;
        }
        .believe-pn-name {
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 13px; font-weight: 700; font-style: italic;
          background: linear-gradient(110deg, #F3ECDD, #EA6A47, #D79A36, #F3ECDD);
          background-size: 250% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: believeNameFlow 7s ease-in-out infinite;
        }
        @keyframes believeNameFlow {
          0%, 100% { background-position: 0%; }
          50% { background-position: 100%; }
        }
        .believe-stat-chip {
          position: absolute; z-index: 5;
          background: #ffffff; border: 1px solid var(--line);
          padding: 10px 14px; border-radius: 14px;
          box-shadow: 0 8px 24px rgba(12,12,11,.1);
          opacity: 0; animation: believeChipIn 0.6s ease forwards;
        }
        @keyframes believeChipIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .believe-chip-val {
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 20px; font-weight: 900; letter-spacing: -0.8px; color: var(--coral);
        }
        .believe-chip-label {
          font-family: 'Geist Mono', var(--font-geist-mono), monospace;
          font-size: 9.5px; font-weight: 500; color: var(--muted);
          text-transform: uppercase; letter-spacing: .3px; margin-top: 2px;
        }
        @media (max-width: 960px) {
          .believe-content-wrap { grid-template-columns: 1fr; gap: 48px; }
          .believe-photo-col { position: static; }
          .believe-section-title { font-size: 36px; }
          .believe-stat-chip { display: none; }
        }
        @keyframes terminalIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .terminal-line {
          opacity: 0;
          animation: terminalIn 0.3s ease forwards;
        }
        .terminal-cursor::after {
          content: "█";
          color: #EA6A47;
          animation: blink 1s step-end infinite;
          margin-left: 4px;
        }
      `}</style>

      {/* SECTION 1 — HERO */}
      <HeroSection />

      {/* SECTION 2 — PROOF */}
      <section
        ref={proofSectionRef}
        style={{ background: "#F5F0E8", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}
      >
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1.5rem" }}>01 · Proof</p>
          </AnimateIn>
          <div className="proof-grid">
            {metricCards.map((card, i) => (
              <ProofCard
                key={i}
                card={card}
                index={i}
                value={proofNums[i]}
                visible={proofVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT I BELIEVE */}
      <section id="what-i-believe" style={{ position: "relative", zIndex: 1, padding: "72px 60px 80px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>

          <div className="believe-eyebrow">02 · What I believe</div>

          <div className="believe-content-wrap">

            {/* LEFT — text */}
            <div>
              <h2 className="believe-section-title">What I actually believe.</h2>

              <div>
                <p className="belief-para" ref={(el) => { beliefParaRefs.current[0] = el; }}>
                  Everyone&apos;s selling AI like it&apos;s a brain you can rent. It isn&apos;t.
                </p>
                <p className="belief-para" ref={(el) => { beliefParaRefs.current[1] = el; }}>
                  AI doesn&apos;t think for you. It thinks <em>like</em> you — faster, and at scale.
                </p>
                <p className="belief-para" ref={(el) => { beliefParaRefs.current[2] = el; }}>
                  Feed it muddled thinking and you get muddled output. Just more of it.
                </p>
                <p className="belief-para key-line" ref={(el) => { beliefParaRefs.current[3] = el; }}>
                  Feed it clarity and it becomes <span className="coral-word">leverage.</span>
                </p>
                <p className="belief-para" ref={(el) => { beliefParaRefs.current[4] = el; }}>
                  So the work was never &quot;add AI.&quot; The work is: get clear on the actual problem, design the system, then let the machine run it.
                </p>
                <p className="belief-para" ref={(el) => { beliefParaRefs.current[5] = el; }}>
                  The teams I watched scale weren&apos;t the ones with the best tools. They were the ones who thought clearly before they built.
                </p>
              </div>

              <div className="believe-closing">
                <div className="believe-closing-main">That&apos;s the whole game.</div>
                <div className="believe-closing-italic">Think first. Then automate.</div>
                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#948D7E" }}>
                    The operator behind the thinking.
                  </span>
                  <Link
                    href="/about"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22332C", color: "#F3ECDD", padding: "16px 32px", borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: "none", width: "fit-content", transition: "background 0.22s, transform 0.22s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#EA6A47"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#22332C"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    Meet Riz →
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT — photo */}
            <div className="believe-photo-col">
              <div
                className="believe-photo-container portrait-wrapper"
                onMouseEnter={() => setBelieveHovered(true)}
                onMouseLeave={() => setBelieveHovered(false)}
                onClick={handleAudioClick}
              >

                <div className="believe-photo-nameplate">
                  <div className="believe-pn-name">Rizwan Mahmood</div>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="believe-photo-img"
                  src="/riz-photo-new.jpg"
                  alt="Rizwan Mahmood"
                />

                {/* Idle pill — hidden by default, appears on hover, disappears once audio starts */}
                {audioState === 'idle' && (
                  <div className="hear-me-pill" style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    border: "1px solid rgba(255,255,255,0.15)",
                    whiteSpace: "nowrap" as const,
                    zIndex: 4,
                    fontFamily: "'Inter Tight', var(--font-inter-tight), sans-serif",
                  }}>
                    ♪ Click to hear me
                  </div>
                )}

                {/* Vinyl — shown when hovered+playing, or any paused state */}
                {audioState !== 'idle' && (audioState === 'paused' || believeHovered) && (
                  <div style={{
                    position: "absolute",
                    bottom: 60,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 130,
                    height: 130,
                    zIndex: 3,
                    animation: audioState === 'playing' ? "spin 3s linear infinite" : "none",
                    pointerEvents: "none" as const,
                  }}>
                    <svg viewBox="0 0 130 130" width="130" height="130">
                      <circle cx="65" cy="65" r="63" fill="#1a1a1a" />
                      <circle cx="65" cy="65" r="56" fill="none" stroke="#2d2d2d" strokeWidth="1.5" />
                      <circle cx="65" cy="65" r="50" fill="none" stroke="#2d2d2d" strokeWidth="1" />
                      <circle cx="65" cy="65" r="44" fill="none" stroke="#2d2d2d" strokeWidth="1" />
                      <circle cx="65" cy="65" r="37" fill="none" stroke="#2d2d2d" strokeWidth="1" />
                      <circle cx="65" cy="65" r="30" fill="none" stroke="#2d2d2d" strokeWidth="1" />
                      <circle cx="65" cy="65" r="23" fill="#EA6A47" />
                      <circle cx="65" cy="65" r="5" fill="#111111" />
                    </svg>
                  </div>
                )}

                {/* Status bar — shown when hovered+playing, or any paused state */}
                {audioState !== 'idle' && (audioState === 'paused' || believeHovered) && (
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: "#ffffff",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    padding: "12px 20px",
                    textAlign: "center" as const,
                    zIndex: 4,
                    pointerEvents: "none" as const,
                  }}>
                    {audioState === 'playing' ? 'NOW PLAYING — CLICK TO PAUSE' : 'PAUSED — CLICK TO RESUME'}
                  </div>
                )}

                <div className="believe-stat-chip" style={{ top: "28%", right: "-22px", animationDelay: ".4s" }}>
                  <div className="believe-chip-val">$3.9M</div>
                  <div className="believe-chip-label">saved · Careem</div>
                </div>
                <div className="believe-stat-chip" style={{ top: "55%", right: "-22px", animationDelay: ".7s" }}>
                  <div className="believe-chip-val">92%</div>
                  <div className="believe-chip-label">automation · Wise</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section
        ref={byTheNumbersRef}
        style={{ background: "#F3ECDD", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "100px 0" }}
      >
        <div className="max-w-site by-numbers-grid">

          {/* LEFT SIDE */}
          <div style={{ paddingRight: "4rem", paddingBottom: "2.5rem", height: "fit-content" }}>
            <p style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "#C17A5A",
              marginBottom: "1.5rem",
            }}>
              Track Record
            </p>
            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 5vw, 3.75rem)",
              lineHeight: 1.08,
              marginBottom: "1.75rem",
            }}>
              <span style={{ color: "#22332C", display: "block" }}>By the</span>
              <span style={{ color: "#EA6A47", fontStyle: "italic", display: "block" }}>numbers.</span>
            </h2>

            {/* Animated career timeline */}
            <div style={{ position: "relative", marginBottom: "2rem" }}>
              <div style={{
                position: "absolute",
                left: 11,
                top: 12,
                bottom: 12,
                width: 2,
                background: "linear-gradient(to bottom, #C17A5A 0%, rgba(193,122,90,0.12) 100%)",
              }} />
              {([
                { company: "Careem", year: "2015" },
                { company: "Wise",   year: "2018" },
                { company: "Bolt",   year: "2021" },
                { company: "Now",    year: "2024", highlight: true },
              ] as { company: string; year: string; highlight?: boolean }[]).map((item, i) => {
                const isActive = activeCompany === item.company;
                const isDefaultHighlight = !!item.highlight && activeCompany === null;
                const showCoral = isActive || isDefaultHighlight;
                return (
                <div
                  key={i}
                  onClick={() => setActiveCompany(activeCompany === item.company ? null : item.company)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    marginBottom: i < 3 ? "1.25rem" : 0,
                    opacity: 0,
                    animation: `timelineIn 0.5s ease forwards ${0.15 + i * 0.12}s`,
                    cursor: "pointer",
                    userSelect: "none" as const,
                  }}
                >
                  <div style={{
                    width: 24, height: 24,
                    borderRadius: "50%",
                    border: `2px solid ${showCoral ? "#EA6A47" : "#C17A5A"}`,
                    background: showCoral ? "#EA6A47" : "#F3ECDD",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                    transition: "background 0.3s ease, border-color 0.3s ease",
                    animation: showCoral ? "pulseNode 2.2s ease-in-out infinite" : "none",
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {({"Careem": "/logos/careem.png", "Bolt": "/logos/bolt.png", "Wise": "/logos/wise.png"} as Record<string, string>)[item.company] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={({"Careem": "/logos/careem.png", "Bolt": "/logos/bolt.png", "Wise": "/logos/wise.png"} as Record<string, string>)[item.company]}
                        alt={item.company}
                        style={{ width: 32, height: 32, objectFit: "contain", filter: "brightness(0) opacity(0.7)", marginRight: 10, verticalAlign: "middle", flexShrink: 0 }}
                      />
                    )}
                    <span style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "0.98rem",
                      fontWeight: 700,
                      fontStyle: showCoral ? "italic" : "normal",
                      color: showCoral ? "#EA6A47" : "#22332C",
                      transition: "color 0.3s ease",
                    }}>{item.company}</span>
                    <span style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.68rem",
                      color: "#B0A898",
                      marginLeft: "0.5rem",
                    }}>{item.year}</span>
                  </div>
                </div>
                );
              })}
            </div>

            <p style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
              fontStyle: "normal",
              color: "#4A5868",
              lineHeight: 1.7,
              maxWidth: 300,
              marginBottom: "1.75rem",
            }}>
              What ten years inside high-growth operations actually adds up to. A track record, not a theory.
            </p>

            <div style={{
              borderLeft: "3px solid #EA6A47",
              paddingLeft: 16,
              maxWidth: 300,
            }}>
              <p style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: 15,
                fontStyle: "normal",
                color: "#4A4A4A",
                lineHeight: 1.65,
                margin: 0,
              }}>
                Ten years. Four companies.<br />
                One consistent result — systems that run without you.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>
            {byTheNumbersRows.map((row, i) => {
              const isRevealed = visibleNumberRows[i];
              const isActiveMatch = activeCompany !== null && row.company === activeCompany;
              const isDimmed = activeCompany !== null && row.company !== activeCompany;
              const rowOpacity = !isRevealed ? 0 : isDimmed ? 0.35 : 1;
              const rowFilter = isDimmed ? "grayscale(30%)" : "none";
              const rowTransform = !isRevealed
                ? "translateY(20px)"
                : isActiveMatch
                ? "translateX(6px)"
                : "translateY(0)";
              const rowTransition = !isRevealed
                ? `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s, background 0.3s ease, border-left-color 0.3s ease, filter 0.3s ease`
                : "opacity 0.35s ease, transform 0.35s ease, background 0.3s ease, border-left-color 0.3s ease, filter 0.3s ease";
              const rowBorderLeft = isActiveMatch
                ? "2px solid #EA6A47"
                : hoveredNumberRow === i
                ? "3px solid #EA6A47"
                : "3px solid transparent";
              const rowBackground = isActiveMatch
                ? "rgba(234,106,71,0.04)"
                : hoveredNumberRow === i
                ? "#F0E8DC"
                : "transparent";
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredNumberRow(i)}
                  onMouseLeave={() => setHoveredNumberRow(null)}
                  style={{
                    padding: "28px 0",
                    borderTop: "1px solid #D8D0C4",
                    borderBottom:
                      i === byTheNumbersRows.length - 1 ? "1px solid #D8D0C4" : "none",
                    borderLeft: rowBorderLeft,
                    paddingLeft: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    cursor: "default",
                    background: rowBackground,
                    position: "relative",
                    opacity: rowOpacity,
                    filter: rowFilter,
                    transform: rowTransform,
                    transition: rowTransition,
                    boxSizing: "border-box" as const,
                  }}
                >
                  {/* Circled number — coral outline only */}
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "1.5px solid #C17A5A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "0.58rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: "#C17A5A",
                      }}
                    >
                      {row.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "56px",
                        fontWeight: 700,
                        lineHeight: 1,
                        margin: "0 0 6px",
                        background:
                          "linear-gradient(90deg, #22332C, #EA6A47, #D79A36, #22332C)",
                        backgroundSize: "300% auto",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "statFlow 4s linear infinite",
                        animationDelay: `${i * 0.4}s`,
                      }}
                    >
                      {row.stat}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.82rem",
                        color: "#22332C",
                        opacity: 0.95,
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {row.subtitle}
                    </p>
                  </div>

                  {/* Arrow — always visible, turns coral on hover */}
                  <div style={{ flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "1.25rem",
                        color: hoveredNumberRow === i ? "#EA6A47" : "#C5BDB4",
                        transition: "color 0.3s ease",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 1.5 — BEFORE / AFTER TOGGLE */}
      <section
        ref={beforeAfterRef}
        style={{ background: "#F3ECDD", padding: "80px 0" }}
      >
        <div className="max-w-site" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <AnimateIn>
            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2rem, 4vw, 52px)",
              color: "#22332C",
              fontWeight: 700,
              marginBottom: "2rem",
              letterSpacing: "0.02em",
              textAlign: "center",
            }}>
              What changes when you work{" "}
              <span style={{ color: "#EA6A47", fontStyle: "italic" }}>with me.</span>
            </h2>
          </AnimateIn>

          {/* Split before/after comparison */}
          <AnimateIn delay={80}>
            <div style={{ width: "100%" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: 0,
                borderRadius: 20,
                overflow: "hidden",
                minHeight: 420,
              }}>

                {/* LEFT — BEFORE */}
                <div style={{
                  background: "rgba(34,51,44,0.04)",
                  border: "1px solid #DDD3BF",
                  borderRadius: "20px 0 0 20px",
                  padding: "40px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                  opacity: isAfter ? 0.3 : 1,
                  transition: "opacity 0.4s ease",
                }}>
                  <div>
                    <p style={{
                      fontFamily: "’Geist Mono’, var(--font-geist-mono), monospace",
                      fontSize: 12,
                      color: "rgba(34,51,44,0.4)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      margin: "0 0 8px",
                    }}>BEFORE</p>
                    <p style={{ fontSize: 22, fontWeight: 700, color: "rgba(34,51,44,0.5)", margin: 0 }}>
                      You&apos;re the bottleneck.
                    </p>
                  </div>
                  {([
                    { num: "01", title: "Lead arrives",       sub: "New prospect" },
                    { num: "02", title: "Sits in inbox",      sub: "3 days later" },
                    { num: "03", title: "You do it manually", sub: "Hours of work" },
                    { num: "04", title: "You’re stuck",  sub: "Everything waits on you" },
                  ] as { num: string; title: string; sub: string }[]).map((step) => (
                    <div key={step.num} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span style={{
                        fontFamily: "’Geist Mono’, var(--font-geist-mono), monospace",
                        fontSize: 11,
                        color: "rgba(34,51,44,0.2)",
                        width: 20,
                        flexShrink: 0,
                      }}>{step.num}</span>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "rgba(34,51,44,0.4)", margin: "0 0 2px" }}>
                          {step.title}
                        </p>
                        <p style={{
                          fontFamily: "’Geist Mono’, var(--font-geist-mono), monospace",
                          fontSize: 12,
                          color: "rgba(34,51,44,0.25)",
                          margin: 0,
                        }}>{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* MIDDLE DIVIDER */}
                <div style={{
                  width: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#F3ECDD",
                  position: "relative",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <span style={{
                      fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                      fontSize: 11,
                      color: "rgba(34,51,44,0.3)",
                      letterSpacing: "0.1em",
                    }}>vs</span>
                    <button
                      onClick={() => {
                        if (loopCancelRef.current) { loopCancelRef.current(); loopCancelRef.current = null; }
                        setToggleAnimating(true);
                        setIsAfter((v) => !v);
                      }}
                      aria-label={isAfter ? "Switch to Before" : "Switch to After"}
                      style={{
                        width: 64,
                        height: 36,
                        borderRadius: 100,
                        background: isAfter ? "#EA6A47" : "rgba(34,51,44,0.15)",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                        transition: "background 0.3s ease",
                        outline: "none",
                      }}
                    >
                      <span style={{
                        position: "absolute",
                        top: 4,
                        left: isAfter ? "calc(100% - 32px)" : 4,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#ffffff",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        transition: "left 0.3s ease",
                        display: "block",
                      }} />
                    </button>
                  </div>
                </div>

                {/* RIGHT — AFTER */}
                <div style={{
                  background: "transparent",
                  border: "1px solid #DDD3BF",
                  borderRadius: "0 20px 20px 0",
                  padding: "40px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  opacity: isAfter ? 1 : 0.3,
                  transition: "opacity 0.4s ease",
                  position: "relative",
                }}>
                  <div style={{ marginBottom: 20 }}>
                    <p style={{
                      fontFamily: "’Geist Mono’, var(--font-geist-mono), monospace",
                      fontSize: 12,
                      color: "#EA6A47",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      margin: "0 0 8px",
                    }}>AFTER</p>
                    <p style={{ fontSize: 22, fontWeight: 700, color: "#22332C", margin: 0 }}>
                      The system runs itself.
                    </p>
                  </div>
                  {([
                    { title: "Lead arrives",           sub: "Triggered instantly",       badge: "LIVE",      icon: "zap" },
                    { title: "Enriched in 0.3s",       sub: "Data filled automatically", badge: "0.3S",      icon: "search" },
                    { title: "Routed to right person",  sub: "Zero touch",               badge: "AUTO",      icon: "arrow" },
                    { title: "System keeps running",    sub: "You’re not involved",      badge: "ALWAYS ON", icon: "check" },
                  ] as { title: string; sub: string; badge: string; icon: string }[]).map((step, i) => (
                    <div key={step.title}>
                      <div style={{
                        background: "#ffffff",
                        border: "1px solid #DDD3BF",
                        borderRadius: 14,
                        padding: "14px 18px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                      }}>
                        <div style={{ flexShrink: 0, marginTop: 2 }}>
                          {step.icon === "zap" && (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                            </svg>
                          )}
                          {step.icon === "search" && (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                          )}
                          {step.icon === "arrow" && (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                          )}
                          {step.icon === "check" && (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <p style={{ fontSize: 16, fontWeight: 700, color: "#22332C", margin: 0 }}>
                              {step.title}
                            </p>
                            <span style={{
                              background: "#22332C",
                              color: "#F3ECDD",
                              fontFamily: "’Geist Mono’, var(--font-geist-mono), monospace",
                              fontSize: 10,
                              borderRadius: 4,
                              padding: "3px 8px",
                              flexShrink: 0,
                            }}>{step.badge}</span>
                          </div>
                          <p style={{
                            fontFamily: "’Geist Mono’, var(--font-geist-mono), monospace",
                            fontSize: 12,
                            color: "#948D7E",
                            margin: 0,
                          }}>{step.sub}</p>
                        </div>
                      </div>
                      {i < 3 && (
                        <div style={{ display: "flex", justifyContent: "center", padding: "5px 0" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 4 — WORK */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>03 · Selected work</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Things I&apos;ve actually shipped.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--muted)",
                marginBottom: "3rem",
              }}
            >
              Not a claim. Evidence. Each one is the thesis in action.
            </p>
          </AnimateIn>

          {/* CARD 1 — Bug Catcher (featured, full width) */}
          <AnimateIn delay={0}>
            <div
              style={{
                background: "#22332C",
                borderRadius: 16,
                padding: "48px 52px 48px",
                display: "grid",
                gridTemplateColumns: "60% 40%",
                gap: 48,
                alignItems: "center",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                transform: hoveredWork === 0 ? "translateY(-4px)" : "none",
                boxShadow: hoveredWork === 0 ? "0 20px 60px rgba(34,51,44,0.25)" : "none",
                cursor: "default",
              }}
              onMouseEnter={() => setHoveredWork(0)}
              onMouseLeave={() => setHoveredWork(null)}
            >
              {/* Left column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span style={{
                  fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#EA6A47",
                }}>
                  {workCards[0].badge}
                </span>
                <h3 style={{
                  fontFamily: "'Inter Tight', var(--font-inter-tight), sans-serif",
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#F3ECDD",
                  lineHeight: 1.1,
                  margin: 0,
                }}>
                  {workCards[0].title}
                </h3>
                <p style={{
                  fontFamily: "'Inter Tight', var(--font-inter-tight), sans-serif",
                  fontSize: 16,
                  color: "rgba(243,236,221,0.7)",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {workCards[0].body}
                </p>
                <p style={{
                  fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                  fontSize: 11,
                  color: "rgba(243,236,221,0.35)",
                  letterSpacing: "0.1em",
                  margin: 0,
                }}>
                  {workCards[0].footer}
                </p>
                <Link
                  href="/case-studies"
                  style={{
                    fontFamily: "'Inter Tight', var(--font-inter-tight), sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#ffffff",
                    textDecoration: "none",
                    background: "#EA6A47",
                    padding: "14px 28px",
                    borderRadius: 100,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.22s ease",
                    width: "fit-content",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#c85535"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#EA6A47"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {workCards[0].link}
                </Link>
              </div>

              {/* Right column — image placeholder + terminal block */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80"
                  alt="Game preview"
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, marginBottom: 12 }}
                />
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "20px 24px",
                  fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                  fontSize: 13,
                  color: "#F3ECDD",
                  opacity: 0.8,
                  lineHeight: 1.9,
                }}>
                  <div className="terminal-line" style={{ animationDelay: "0.2s" }}>&gt; game.init()</div>
                  <div className="terminal-line" style={{ animationDelay: "0.6s" }}>&gt; hand_tracking: ON</div>
                  <div className="terminal-line" style={{ animationDelay: "1.0s" }}>&gt; score: 0</div>
                  <div className="terminal-line terminal-cursor" style={{ animationDelay: "1.4s" }}>&gt; shipped: true ✓</div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* CARDS 2 & 3 — Content Engine + Bolt Case (50/50) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            {workCards.slice(1).map((card, idx) => {
              const i = idx + 1;
              return (
                <AnimateIn key={card.title} delay={i * 120}>
                  <div
                    style={{
                      background: "white",
                      border: "1px solid #DDD3BF",
                      borderRadius: 16,
                      padding: "36px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      height: "100%",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      transform: hoveredWork === i ? "translateY(-4px)" : "none",
                      boxShadow: hoveredWork === i ? "0 12px 40px rgba(34,51,44,0.1)" : "none",
                      cursor: "default",
                    }}
                    onMouseEnter={() => setHoveredWork(i)}
                    onMouseLeave={() => setHoveredWork(null)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={idx === 0
                        ? "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80"
                        : "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80"}
                      alt={idx === 0 ? "Automation workflow" : "Legal documents"}
                      style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10, marginBottom: 20 }}
                    />
                    <span style={{
                      fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: "#EA6A47",
                    }}>
                      {card.badge}
                    </span>
                    <h3 style={{
                      fontFamily: "'Inter Tight', var(--font-inter-tight), sans-serif",
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#22332C",
                      lineHeight: 1.2,
                      margin: 0,
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Inter Tight', var(--font-inter-tight), sans-serif",
                      fontSize: 15,
                      color: "rgba(34,51,44,0.7)",
                      lineHeight: 1.6,
                      flex: 1,
                      margin: 0,
                    }}>
                      {card.body}
                    </p>
                    <p style={{
                      fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                      fontSize: 11,
                      color: "#948D7E",
                      letterSpacing: "0.1em",
                      margin: 0,
                    }}>
                      {card.footer}
                    </p>
                    <Link
                      href="/case-studies"
                      style={{
                        fontFamily: "'Inter Tight', var(--font-inter-tight), sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#F3ECDD",
                        textDecoration: "none",
                        background: "#22332C",
                        padding: "14px 28px",
                        borderRadius: 100,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        transition: "all 0.22s ease",
                        width: "fit-content",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#EA6A47"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#22332C"; e.currentTarget.style.transform = "translateY(0)"; }}
                    >
                      {card.link}
                    </Link>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — ON CAMERA */}
      <section style={{ padding: "5rem 0", overflow: "hidden" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>04 · On camera</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Where systems meet personality.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--muted)",
                marginBottom: "2.5rem",
              }}
            >
              I don&apos;t just build the machines — I talk about them. Stand-up, breakdowns, the podcast. There&apos;s a human behind the automations.
            </p>
          </AnimateIn>
        </div>

        {/* Marquee */}
        <div className="marquee-wrap" style={{ overflow: "hidden" }}>
          <div className="marquee-track">
            {allTiles.map((tile, i) => (
              <div
                key={i}
                className="group"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector("video");
                  if (video && video.src) video.play().catch(() => {});
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector("video");
                  if (video) { video.pause(); video.currentTime = 0; }
                }}
                style={{
                  width: 230,
                  height: 330,
                  borderRadius: 12,
                  background: tile.gradient,
                  flexShrink: 0,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Shimmer fallback — visible on hover when no video src is set */}
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.09) 50%, transparent 80%)",
                    backgroundSize: "200% 100%",
                    animation: "card-shimmer 1.8s linear infinite",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* Video — fades in on hover and plays; covers shimmer when src is present */}
                <video
                  muted
                  loop
                  playsInline
                  src={tile.src || undefined}
                  poster={tile.poster || undefined}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />

                {/* Play button */}
                <div
                  style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", zIndex: 2,
                  }}
                >
                  <span style={{ color: "#fff", fontSize: "1rem", marginLeft: 3 }}>▶</span>
                </div>

                {/* Bottom label */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    padding: "1.5rem 1rem 0.75rem",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {tile.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {tile.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROCESS */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>05 · How I think</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Clarity is step zero.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--muted)",
                marginBottom: "3rem",
                maxWidth: 520,
              }}
            >
              Most &apos;automation&apos; projects fail before a single tool is opened. This is the order that doesn&apos;t.
            </p>
          </AnimateIn>

          {/* Steps row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-4"
          >
            {processSteps.map((step, i) => (
              <AnimateIn key={step.num} delay={i * 120}>
                <div style={{ position: "relative" }}>
                  {/* Arrow connector (desktop) */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="hidden md:block"
                      style={{
                        position: "absolute",
                        right: -20,
                        top: "1.25rem",
                        color: "var(--faint)",
                        fontSize: "1.1rem",
                        fontWeight: 300,
                        zIndex: 1,
                      }}
                    >
                      →
                    </div>
                  )}
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid var(--line)",
                      borderRadius: 12,
                      padding: "1.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "1.8rem",
                        fontWeight: 600,
                        color: "var(--coral)",
                        opacity: 0.4,
                        display: "block",
                        marginBottom: "0.75rem",
                        lineHeight: 1,
                      }}
                    >
                      {step.num}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "1.1rem",
                        color: "var(--ink)",
                        fontWeight: 700,
                        marginBottom: "0.65rem",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.875rem",
                        color: "var(--body)",
                        lineHeight: 1.7,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                  {/* Arrow (mobile) */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="flex md:hidden justify-center"
                      style={{ padding: "0.75rem 0", color: "var(--faint)", fontSize: "1rem" }}
                    >
                      ↓
                    </div>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — ROUTES */}
      <section style={{ padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>06 · Working with me</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "2.5rem",
              }}
            >
              How people work with me.
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  width: 8, height: 8, borderRadius: 1,
                  background: "var(--amber)", flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Switch — pick a branch
              </span>
            </div>
          </AnimateIn>

          <div className="flex flex-col">
            {routes.map((route, i) => (
              <AnimateIn key={route.title} delay={200 + i * 80}>
                <Link
                  href={route.href}
                  style={{ textDecoration: "none" }}
                  onMouseEnter={() => setHoveredRoute(i)}
                  onMouseLeave={() => setHoveredRoute(null)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.5rem 1rem 1.5rem 1.5rem",
                      borderLeft: "2px solid",
                      borderLeftColor: hoveredRoute === i ? "var(--coral)" : "var(--line)",
                      borderBottom: "1px solid var(--line)",
                      transition: "all 0.2s var(--ease)",
                      transform: hoveredRoute === i ? "translateX(6px)" : "none",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "1.1rem",
                          color: "var(--ink)",
                          fontWeight: 600,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {route.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.875rem",
                          color: "var(--muted)",
                        }}
                      >
                        {route.sub}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                      {route.rightLabel && (
                        <span
                          style={{
                            fontFamily: "var(--font-dm-mono), monospace",
                            fontSize: "0.72rem",
                            color: "var(--coral)",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {route.rightLabel}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: hoveredRoute === i ? "var(--coral)" : "var(--muted)",
                          transition: "color 0.2s ease",
                        }}
                      >
                        Details →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION — HAVE A CHAT */}
      <section style={{ background: "#F3ECDD", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <div className="chat-card">
              {/* Left col — circular photo + badge */}
              <div className="chat-card-photo-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PORTRAIT_URL}
                  alt="Rizwan Mahmood"
                  style={{
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    border: "4px solid #ffffff",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                    display: "block",
                  }}
                />
                {/* Available badge */}
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 100,
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    marginTop: 16,
                  }}
                >
                  <span style={{ position: "relative", width: 10, height: 10, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="ping-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22C55E", opacity: 0.5 }} />
                    <span style={{ position: "relative", width: 10, height: 10, borderRadius: "50%", background: "#22C55E", display: "block" }} />
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)" }}>
                    Available this week
                  </span>
                </div>
              </div>

              {/* Right col — content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1 }}>
                {/* Pill label */}
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#22332C",
                      color: "#ffffff",
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      borderRadius: 100,
                      padding: "6px 14px",
                    }}
                  >
                    Direct Line
                  </span>
                </div>

                {/* Heading */}
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    color: "#22332C",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  Have a chat{" "}
                  <span style={{ color: "#EA6A47", fontStyle: "italic" }}>with me?</span>
                </h2>

                {/* Subtext */}
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1rem",
                    color: "#4A4A4A",
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: 440,
                  }}
                >
                  Thirty minutes. No deck, no pitch. Just the problem on your desk and the operator who has solved it before.
                </p>

                {/* Buttons */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
                  <Link href="/services/consulting" className="chat-btn-primary">
                    Book a call →
                  </Link>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-btn-secondary"
                  >
                    Ask Claude about Riz →
                  </a>
                </div>
              </div>
            </div>

            {/* Caption */}
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.8rem",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: "1.5rem",
                letterSpacing: "0.04em",
                fontStyle: "italic",
              }}
            >
              Rizwan Mahmood · Operator and AI Builder
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 8 — WRITING */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <p className="section-eyebrow" style={{ marginBottom: "1rem" }}>07 · Writing</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "var(--ink)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              I think out loud.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--muted)",
                marginBottom: "3rem",
              }}
            >
              Notes on automation, operations, and using AI without losing the plot. New stuff most weeks.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-5">
            {blogPosts.map((post, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    height: "100%",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "0.68rem",
                      color: "var(--faint)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {post.meta}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.4,
                      flex: 1,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      color: "var(--body)",
                      lineHeight: 1.65,
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <Link
                    href="/blog"
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--coral)",
                      textDecoration: "none",
                    }}
                  >
                    Read →
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={400}>
            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <Link href="/blog" className="btn-ghost">Read everything →</Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 9 — BOOKING */}
      <BookingSection />
    </>
  );
}
