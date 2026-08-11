"use client";
import { useState, useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import BookingSection from "@/components/BookingSection";
import HeroSection from "@/components/hero-section";
import TestimonialsSection from "@/components/Testimonials";
import CalBookingButton from "@/components/CalModal";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import PersonalityCarousel from "@/components/PersonalityCarousel";
import { type SubstackPost, FALLBACK_POSTS } from "@/lib/substack";

function formatRowDate(pubDate: string): string {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return "";
  return `${parsed.getFullYear()} · ${String(parsed.getMonth() + 1).padStart(2, "0")}`;
}

const PORTRAIT_URL =
  "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3a46d312c6d02c8e46bab1_691d97efffebe375af48ce33_Remove_GMNI-removebg-preview.png";

// ─── ASK-AN-AI POPUP (identical prompt/options/behavior as components/DirectLineCTA.tsx) ──
const AI_PROMPT =
  "I'm about to talk with Rizwan Mahmood, an operator and AI builder who's worked at Careem, Bolt, and Wise, and now runs the AI studio Soch. Help me think through what to ask him and where he might genuinely be useful.";

const ENCODED_AI_PROMPT = encodeURIComponent(AI_PROMPT);

function AskAiChatGPTIcon() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="#0D0D0D" aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 5.7332A4.485 4.485 0 0 1 4.7213 3.7823v5.6772a.7664.7664 0 0 0 .3879.6765l5.8428 3.3685-2.02 1.1685a.0757.0757 0 0 1-.071 0l-4.8455-2.7935A4.504 4.504 0 0 1 2.35 5.7332zm16.5963 3.8558L13.0932 6.2151l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8404 2.7935a4.4992 4.4992 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 6.8449V4.5125a.0662.0662 0 0 1 .0284-.0615l4.8404-2.7899a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0623a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.4599a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" />
    </svg>
  );
}

function AskAiClaudeIcon() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="none" aria-hidden="true">
      <g stroke="#D97757" strokeWidth={2.2} strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="22" />
        <line x1="2" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="22" y2="12" />
        <line x1="4.9" y1="4.9" x2="9.2" y2="9.2" />
        <line x1="14.8" y1="14.8" x2="19.1" y2="19.1" />
        <line x1="19.1" y1="4.9" x2="14.8" y2="9.2" />
        <line x1="9.2" y1="14.8" x2="4.9" y2="19.1" />
      </g>
    </svg>
  );
}

function AskAiPerplexityIcon() {
  return (
    <svg viewBox="0 0 24 24" width={26} height={26} fill="#1F1F1F" aria-hidden="true">
      <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.0765 0v7.0896H1.6026v10.3976h2.4739v6.3542l6.7591-6.4471v6.4471h1.1554v-6.5372l6.6521 6.5372v-6.4471h2.4739V7.0896zM13.7331 2.6199v4.4697l-3.4763 3.0011V5.9497l3.4763-3.3298zm-8.4212.0177L8.7 5.9603v4.1354L5.3119 7.1618V2.6376zM2.7579 8.2449h1.9989v6.5518l-1.9989-1.7212V8.2449zm1.1958 8.3218l3.7592 3.2371v2.6903l-3.7592-3.5772v-2.3502zm4.9146 4.1697v-5.6524l-3.7395-3.2202V9.5807l4.895 4.2255v6.9302zm1.1554-6.9433l4.895-4.2223v3.4693l-3.7592 3.2192v5.6533l-1.1358.923v-6.9425zm8.6541 2.6905l-3.7592 3.5772v-2.6906l3.7592-3.2367v2.3501zM21.2421 13.078l-1.9989 1.7212V8.2449h1.9989v4.8331z" />
    </svg>
  );
}

const ASK_AI_OPTIONS = [
  {
    name: "ChatGPT",
    href: `https://chat.openai.com/?q=${ENCODED_AI_PROMPT}`,
    icon: <AskAiChatGPTIcon />,
  },
  {
    name: "Claude",
    href: `https://claude.ai/new?q=${ENCODED_AI_PROMPT}`,
    icon: <AskAiClaudeIcon />,
  },
  {
    name: "Perplexity",
    href: `https://www.perplexity.ai/search?q=${ENCODED_AI_PROMPT}`,
    icon: <AskAiPerplexityIcon />,
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


// ─── ROUTE CARD ICONS (matches "How I think" icon style) ────────────────────

const routeIconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "#EA6A47",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function RouteBuildIcon() {
  return (
    <svg {...routeIconProps}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function RouteMicIcon() {
  return (
    <svg {...routeIconProps}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

function RouteBookIcon() {
  return (
    <svg {...routeIconProps}>
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H10a2 2 0 0 1 2 2v16a1.5 1.5 0 0 0-1.5-1.5H2z" />
      <path d="M22 4.5A2.5 2.5 0 0 0 19.5 2H14a2 2 0 0 0-2 2v16a1.5 1.5 0 0 1 1.5-1.5H22z" />
    </svg>
  );
}

// ─── CLICKABLE CARD (whole card navigates, inner links/buttons still work) ──

function ClickableCard({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div
      className={className}
      role="link"
      tabIndex={0}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("a, button")) return;
        router.push(href);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(href);
      }}
    >
      {children}
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<SubstackPost[]>(FALLBACK_POSTS);

  useEffect(() => {
    fetch("/api/writing-posts")
      .then((res) => (res.ok ? res.json() : null))
      .then((posts: SubstackPost[] | null) => {
        if (posts && posts.length > 0) setBlogPosts(posts);
      })
      .catch(() => {});
  }, []);

  const [aiPickerOpen, setAiPickerOpen] = useState(false);
  const aiWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aiPickerOpen) return;

    function handlePointerDown(e: MouseEvent) {
      if (aiWrapRef.current && !aiWrapRef.current.contains(e.target as Node)) {
        setAiPickerOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAiPickerOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [aiPickerOpen]);

  const [believeHovered, setBelieveHovered] = useState(false);
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [isAfter, setIsAfter] = useState(false);
  const [hoveredBACard, setHoveredBACard] = useState<number | null>(null);
  const beforeAfterRef = useRef<HTMLElement>(null);
  const portraitAudioRef = useRef<HTMLAudioElement | null>(null);
  const toggleClickAudioCtxRef = useRef<AudioContext | null>(null);
  const audioFadeRafRef = useRef<number | null>(null);

  const byTheNumbersRef = useRef<HTMLElement | null>(null);
  const byTheNumbersTriggeredRef = useRef(false);
  const [visibleNumberRows, setVisibleNumberRows] = useState([false, false, false, false, false, false]);
  const [hoveredNumberRow, setHoveredNumberRow] = useState<number | null>(null);
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  const beliefParaRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const PORTRAIT_AUDIO_VOLUME = 0.5;
  const PORTRAIT_FADE_IN_MS = 1000;
  const PORTRAIT_FADE_OUT_MS = 500;

  function fadePortraitAudio(audio: HTMLAudioElement, to: number, duration: number, onDone?: () => void) {
    if (audioFadeRafRef.current !== null) {
      cancelAnimationFrame(audioFadeRafRef.current);
      audioFadeRafRef.current = null;
    }
    const from = audio.volume;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      audio.volume = from + (to - from) * t;
      if (t < 1) {
        audioFadeRafRef.current = requestAnimationFrame(step);
      } else {
        audioFadeRafRef.current = null;
        onDone?.();
      }
    };
    audioFadeRafRef.current = requestAnimationFrame(step);
  }

  function handleAudioClick() {
    if (!portraitAudioRef.current) {
      const audio = new Audio("/audio/portrait-track.mp3");
      audio.loop = true;
      audio.volume = 0;
      audio.addEventListener("error", () => {
        setAudioState("idle");
      });
      portraitAudioRef.current = audio;
    }
    const audio = portraitAudioRef.current;

    if (audioState === "playing") {
      fadePortraitAudio(audio, 0, PORTRAIT_FADE_OUT_MS, () => audio.pause());
      setAudioState("paused");
      return;
    }

    audio
      .play()
      .then(() => {
        fadePortraitAudio(audio, PORTRAIT_AUDIO_VOLUME, PORTRAIT_FADE_IN_MS);
        setAudioState("playing");
      })
      .catch(() => {
        // Fail silently - e.g. file missing or playback blocked.
      });
  }

  useEffect(() => {
    function handleVisibilityChange() {
      const audio = portraitAudioRef.current;
      if (document.hidden && audio && !audio.paused) {
        fadePortraitAudio(audio, 0, PORTRAIT_FADE_OUT_MS, () => audio.pause());
        setAudioState("idle");
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (audioFadeRafRef.current !== null) {
        cancelAnimationFrame(audioFadeRafRef.current);
      }
      if (portraitAudioRef.current) {
        portraitAudioRef.current.pause();
        portraitAudioRef.current = null;
      }
    };
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

  // Toggle now only changes state on manual click (see playToggleSound + button onClick below) —
  // the auto-toggling demo animation has been removed entirely.
  function playToggleSound() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!toggleClickAudioCtxRef.current) {
        toggleClickAudioCtxRef.current = new AudioCtx();
      }
      const ctx = toggleClickAudioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Fail silently - e.g. Web Audio unsupported or blocked before user gesture.
    }
  }

  useEffect(() => {
    const els = beliefParaRefs.current.filter(Boolean) as HTMLSpanElement[];
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
        .personality-subhead {
          font-size: 1.2rem;
          line-height: 1.7;
          color: #4A524A;
          max-width: 60ch;
        }
        /* Above 1200px the section container is capped at 1120px of usable
           width (--maxw: 1200px minus 40px padding each side). At that fixed
           width the sentence needs a ~13% smaller font to hold a single line,
           so drop the max-width cap and nudge the size down just there. */
        @media (min-width: 1200px) {
          .personality-subhead {
            font-size: 1.05rem;
            max-width: none;
            white-space: nowrap;
          }
        }
        /* ===== ROUTES - "How people work with me" ===== */
        .route-hero-v2 {
          position: relative;
          overflow: hidden;
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 48px 52px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .route-hero-v2:hover {
          transform: translateY(-2px);
          box-shadow: 0 24px 60px rgba(34,51,44,0.14);
        }
        .route-hero-texture {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(34,51,44,0.05) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
          pointer-events: none;
          z-index: 0;
        }
        .route-hero-glow {
          position: absolute;
          top: 50%;
          right: -10%;
          width: 420px;
          height: 420px;
          transform: translateY(-50%);
          background: radial-gradient(circle, rgba(234,106,71,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .route-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
        }
        .route-authority-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
          margin-top: 24px;
        }
        .route-authority-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(34,51,44,0.72);
          letter-spacing: 0.02em;
        }
        .route-authority-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(234,106,71,0.16);
          color: #EA6A47;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .route-price-block {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          text-align: right;
        }
        .route-price-from {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: rgba(34,51,44,0.5);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .route-price-value {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 6px;
        }
        .route-price-amount {
          font-family: var(--font-fraunces), serif;
          font-size: 44px;
          font-weight: 800;
          color: #22332C;
          line-height: 1;
        }
        .route-price-suffix {
          font-family: var(--font-geist-mono), monospace;
          font-size: 14px;
          color: rgba(34,51,44,0.5);
        }
        .route-trust-line {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 10.5px;
          color: rgba(34,51,44,0.45);
          letter-spacing: 0.02em;
          margin-top: 4px;
        }
        .route-hero-btn {
          display: inline-block;
          background: #EA6A47;
          color: #ffffff;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.22s;
        }
        .route-hero-btn:hover {
          background: #c85535;
          transform: translateY(-2px);
        }
        .route-tag-chip {
          display: inline-flex;
          width: fit-content;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          border-radius: 4px;
        }
        .route-tag-chip--ink {
          background: rgba(34,51,44,0.06);
          color: #22332C;
        }
        .route-tag-chip--coral {
          background: rgba(234,106,71,0.12);
          color: #EA6A47;
        }
        .route-cards-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 28px;
        }
        .route-card-v2 {
          position: relative;
          background: #ffffff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .route-card-v2:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 36px rgba(34,51,44,0.1);
          border-color: #22332C;
        }
        .route-card-v2:hover .route-card-title {
          color: #EA6A47;
        }
        .route-card-icon {
          position: absolute;
          top: 28px;
          right: 28px;
        }
        .route-card-title {
          font-family: var(--font-fraunces), serif;
          font-size: 20px;
          font-weight: 800;
          color: #22332C;
          padding-right: 30px;
          transition: color 0.25s ease;
        }
        .route-authority-line {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(34,51,44,0.72);
          letter-spacing: 0.02em;
        }
        .route-card-buttons {
          display: flex;
          gap: 8px;
          margin-top: 4px;
          position: relative;
          z-index: 1;
        }
        .route-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #22332C;
          color: var(--cream);
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.22s ease;
        }
        .route-btn-primary:hover {
          background: #EA6A47;
        }
        .route-btn-arrow {
          display: inline-block;
          transition: transform 0.22s ease;
        }
        .route-btn-primary:hover .route-btn-arrow {
          transform: translateX(3px);
        }
        .route-btn-ghost {
          display: inline-flex;
          align-items: center;
          background: transparent;
          border: 1px solid var(--line);
          color: #22332C;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .route-btn-ghost:hover {
          border-color: #22332C;
          background: rgba(34,51,44,0.04);
        }
        .route-footnote {
          margin-top: 24px;
          text-align: center;
          font-family: var(--font-dm-sans), sans-serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 500;
          color: rgba(34,51,44,0.72);
        }
        .route-footnote a {
          color: #EA6A47;
          text-decoration: none;
        }
        .route-footnote a:hover {
          text-decoration: underline;
        }
        @media (max-width: 860px) {
          .route-hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .route-price-block {
            align-items: flex-start;
            text-align: left;
          }
          .route-hero-glow {
            right: -30%;
          }
        }
        @media (max-width: 768px) {
          .route-cards-row {
            grid-template-columns: 1fr;
          }
        }
        /* ===== MERGED HERO - "Have a chat with me?" + Consulting & coaching ===== */
        .merged-hero {
          padding: 32px 52px 24px;
        }
        .merged-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: auto 1fr auto;
          grid-template-areas:
            "photo text  price"
            "photo cta   price"
            "proof proof proof";
          gap: 32px;
          align-items: start;
        }
        .merged-hero-photo-col {
          grid-area: photo;
          align-self: start;
          margin-top: 4px;
        }
        .merged-hero-text {
          grid-area: text;
        }
        .merged-hero-photo {
          width: 128px;
          height: 128px;
          min-width: 128px;
          min-height: 128px;
          border-radius: 50%;
          object-fit: cover;
          object-position: top center;
          border: 5px solid #ffffff;
          box-shadow: 0 10px 24px rgba(34,51,44,0.2);
          display: block;
        }
        .merged-hero-heading {
          font-family: var(--font-fraunces), serif;
          font-size: 34px;
          font-weight: 900;
          color: #22332C;
          line-height: 1.1;
          margin: 14px 0 0;
        }
        .merged-hero-heading-accent {
          font-style: italic;
          color: #EA6A47;
        }
        .merged-hero-desc {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 15px;
          color: rgba(34,51,44,0.65);
          line-height: 1.7;
          max-width: 460px;
          margin: 8px 0 0;
        }
        .merged-hero-price {
          grid-area: price;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 6px;
          text-align: right;
          height: 100%;
        }
        .merged-cta-row {
          grid-area: cta;
          display: flex;
          align-items: center;
          gap: 28px;
          width: fit-content;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }
        .merged-ladder-ai {
          display: inline-flex;
          align-items: center;
          gap: 14px;
        }
        .merged-door-btn {
          font-size: 14px;
          padding: 12px 22px;
        }
        .merged-ai-popover {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .merged-ai-popover-link {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(34,51,44,0.18), 0 2px 6px rgba(34,51,44,0.1);
          text-decoration: none;
          animation: mergedAiPopoverIn 150ms ease-out backwards;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .merged-ai-popover-link:hover,
        .merged-ai-popover-link:focus-visible {
          transform: scale(1.1);
          box-shadow: 0 12px 26px rgba(34,51,44,0.24), 0 4px 10px rgba(34,51,44,0.14);
        }
        .merged-ai-popover-link svg {
          width: 26px;
          height: 26px;
        }
        @keyframes mergedAiPopoverIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .merged-ai-popover-label {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #22332C;
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 100px;
          box-shadow: 0 4px 12px rgba(34,51,44,0.14);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.18s ease;
        }
        .merged-ai-popover-link:hover .merged-ai-popover-label,
        .merged-ai-popover-link:focus-visible .merged-ai-popover-label {
          opacity: 1;
        }
        .merged-proof {
          grid-area: proof;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }
        @media (max-width: 640px) {
          .merged-hero {
            padding: 28px 24px 20px;
          }
          .merged-hero-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "photo"
              "text"
              "price"
              "cta"
              "proof";
            justify-items: center;
            text-align: center;
          }
          .merged-hero-desc {
            max-width: none;
          }
          .merged-hero-price {
            align-items: center;
            justify-content: flex-start;
            text-align: center;
            height: auto;
            margin-top: 14px;
            padding-top: 14px;
            border-top: 1px solid var(--line);
          }
          .merged-cta-row {
            flex-wrap: wrap;
            justify-content: center;
            width: auto;
            margin-top: 0;
            padding-top: 0;
            border-top: none;
          }
          .merged-ladder-ai {
            flex-wrap: wrap;
            justify-content: center;
          }
          .merged-ai-popover {
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
          }
          @keyframes mergedAiPopoverIn {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .merged-proof {
            justify-content: center;
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
        /* Before/After comparison stacks vertically on mobile - the
           three-column grid cannot shrink below its content width and
           was the root cause of horizontal page overflow. */
        @media (max-width: 767px) {
          .ba-compare-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .ba-panel-before {
            border-radius: 20px 20px 0 0 !important;
            padding: 28px 20px !important;
          }
          .ba-panel-after {
            border-radius: 0 0 20px 20px !important;
            padding: 28px 20px !important;
          }
          .ba-divider {
            width: 100% !important;
            padding: 18px 0;
          }
          .ba-divider > div {
            flex-direction: row !important;
          }
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
          /* stretch (not start): the photo column must span the full section
             height or position: sticky on the photo has no room to travel */
          align-items: stretch;
        }
        .believe-section-title {
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 52px; font-weight: 900; letter-spacing: -2.5px;
          line-height: 1.03; margin-bottom: 40px; color: var(--ink);
        }
        .belief-para-merged {
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 20px; line-height: 1.65; color: var(--ink);
        }
        .belief-sentence {
          display: inline-block;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .belief-sentence.visible { opacity: 1; transform: translateY(0); }
        .belief-sentence.key-line {
          font-family: var(--font-fraunces), serif;
          font-size: 22px; font-weight: 800; letter-spacing: -.3px;
        }
        .coral-word { color: var(--coral); }
        .believe-closing {
          background: transparent;
          border-top: 1px solid var(--line);
          padding-top: 48px;
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }
        .believe-closing-main {
          font-family: var(--font-fraunces), serif;
          font-size: 28px; font-weight: 900;
          color: #22332C;
        }
        .believe-closing-italic {
          font-family: var(--font-montserrat), sans-serif;
          font-size: 18px; font-weight: 700; font-style: normal;
          color: #EA6A47;
          margin-bottom: 16px;
        }
        .believe-closing-cta {
          background: #22332C; color: var(--cream);
          padding: 12px 24px; border-radius: 100px;
          font-size: 14px; font-weight: 600;
          text-decoration: none; white-space: nowrap;
          display: inline-flex; align-items: center; gap: 8px;
          width: fit-content;
          transition: all 0.22s ease;
        }
        .believe-closing-cta:hover {
          background: #EA6A47;
          transform: translateY(-2px);
        }
        .believe-photo-col {
          position: relative;
        }
        .believe-photo-container {
          position: sticky; top: 112px;
          cursor: pointer; user-select: none;
        }
        .believe-photo-frame {
          position: relative; overflow: hidden; border-radius: 16px;
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
          background: linear-gradient(110deg, var(--cream), #EA6A47, #D79A36, var(--cream));
          background-size: 250% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: believeNameFlow 7s ease-in-out infinite;
        }
        @keyframes believeNameFlow {
          0%, 100% { background-position: 0%; }
          50% { background-position: 100%; }
        }
        .believe-section-pad {
          padding: 112px 0;
        }
        @media (max-width: 767px) {
          .believe-section-pad { padding-top: 64px; padding-bottom: 64px; }
        }
        @media (max-width: 960px) {
          .believe-content-wrap { grid-template-columns: 1fr; gap: 48px; }
          .believe-photo-col { position: static; }
          /* single-column stacking: photo stays in flow, no sticky */
          .believe-photo-container { position: relative; top: auto; }
          .believe-section-title { font-size: 36px; }
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

        /* ===== SELECTED WORK - SYSTEM ROWS ===== */
        .work-rows-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .work-rows-list::before {
          content: '';
          position: absolute;
          left: 21px;
          top: 30px;
          bottom: 30px;
          width: 2px;
          background: linear-gradient(to bottom, rgba(193,122,90,0.4) 0%, rgba(193,122,90,0.05) 100%);
          z-index: 0;
        }
        .work-row {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 24px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 22px 26px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .work-row:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 36px rgba(34,51,44,0.10);
          border-color: #EA6A47;
        }
        .work-row-badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #C17A5A;
          background: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          color: #C17A5A;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }
        .work-row:hover .work-row-badge {
          background: #EA6A47;
          border-color: #EA6A47;
          color: #fff;
        }
        .work-row-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1 1 42%;
          min-width: 0;
        }
        .work-row-tag {
          display: inline-flex;
          width: fit-content;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #EA6A47;
          background: rgba(234,106,71,0.08);
          padding: 3px 10px;
          border-radius: 100px;
        }
        .work-row-title {
          font-family: var(--font-fraunces), serif;
          font-size: 19px;
          font-weight: 800;
          color: #22332C;
          line-height: 1.3;
        }
        .work-row-result {
          font-family: inherit;
          font-size: 14px;
          color: rgba(34,51,44,0.62);
          line-height: 1.5;
          flex: 1 1 30%;
          min-width: 0;
        }
        .work-row-arrow {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #948D7E;
          font-size: 15px;
          transition: all 0.25s ease;
        }
        .work-row:hover .work-row-arrow {
          background: #EA6A47;
          border-color: #EA6A47;
          color: #fff;
          transform: translate(2px, -2px);
        }
        .work-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
          background: #22332C;
          color: var(--cream);
          font-family: 'Inter Tight', var(--font-inter-tight), sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 12px 26px;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.22s ease, transform 0.22s ease;
        }
        .work-view-all:hover {
          background: #EA6A47;
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .work-rows-list::before {
            display: none;
          }
          .work-row {
            position: relative;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            padding: 20px 20px 24px;
          }
          .work-row-arrow {
            position: absolute;
            top: 20px;
            right: 20px;
          }
        }
      `}</style>

      {/* SECTION 1 - HERO */}
      <HeroSection />

      {/* SECTION 3 - WHAT I BELIEVE */}
      <section id="what-i-believe" className="believe-section-pad" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-w-site">

          <div className="believe-content-wrap">

            {/* LEFT - text */}
            <div>
              <h2 className="believe-section-title">What I actually believe.</h2>

              <div>
                <p className="belief-para-merged">
                  <span className="belief-sentence" ref={(el) => { beliefParaRefs.current[0] = el; }}>
                    Everyone&apos;s selling AI like it&apos;s a brain you can rent. It isn&apos;t.{" "}
                  </span>
                  <span className="belief-sentence" ref={(el) => { beliefParaRefs.current[1] = el; }}>
                    AI doesn&apos;t think for you. It thinks <em>like</em> you, faster and at scale.{" "}
                  </span>
                  <span className="belief-sentence" ref={(el) => { beliefParaRefs.current[2] = el; }}>
                    Feed it muddled thinking and you get muddled output. Just more of it.{" "}
                  </span>
                  <span className="belief-sentence key-line" ref={(el) => { beliefParaRefs.current[3] = el; }}>
                    Feed it clarity and it becomes <span className="coral-word">leverage.</span>{" "}
                  </span>
                  <span className="belief-sentence" ref={(el) => { beliefParaRefs.current[4] = el; }}>
                    So the work was never &quot;add AI.&quot; The work is: get clear on the actual problem, design the system, then let the machine run it.{" "}
                  </span>
                  <span className="belief-sentence" ref={(el) => { beliefParaRefs.current[5] = el; }}>
                    The teams I watched scale weren&apos;t the ones with the best tools. They were the ones who thought clearly before they built.
                  </span>
                </p>
              </div>

              <div className="believe-closing">
                <div className="believe-closing-main">That&apos;s the whole game.</div>
                <div className="believe-closing-italic">Think first. Then automate.</div>
                <Link href="/about" className="believe-closing-cta">
                  About Riz →
                </Link>
              </div>
            </div>

            {/* RIGHT - photo */}
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

                <div className="believe-photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="believe-photo-img"
                    src="/Photos/riz-restaurant.jpg"
                    alt="Rizwan Mahmood"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      borderRadius: 16,
                    }}
                  />
                </div>

                {/* Equalizer badge - always visible while playing, independent of hover, so it reads as "sound is on" */}
                {audioState === 'playing' && (
                  <div className="portrait-eq-badge" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                )}

                {/* Idle pill - hidden by default, appears on hover, disappears once audio starts */}
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

                {/* Vinyl - shown when hovered+playing, or any paused state */}
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

                {/* Status bar - shown when hovered+playing, or any paused state */}
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
                    {audioState === 'playing' ? 'NOW PLAYING · CLICK TO PAUSE' : 'PAUSED · CLICK TO RESUME'}
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section
        ref={byTheNumbersRef}
        className="section-pad"
        style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
      >
        <div className="max-w-site by-numbers-grid">

          {/* LEFT SIDE */}
          <div style={{ paddingRight: "4rem", paddingBottom: "2.5rem", height: "fit-content" }}>
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
                const logoSrc = ({"Careem": "/logos/careem.png", "Bolt": "/logos/bolt.png", "Wise": "/logos/wise.svg"} as Record<string, string>)[item.company];
                return (
                <div
                  key={i}
                  onClick={() => setActiveCompany(activeCompany === item.company ? null : item.company)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    marginBottom: i < 3 ? "1.5rem" : 0,
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
                    background: showCoral ? "#EA6A47" : "var(--cream)",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                    transition: "background 0.3s ease, border-color 0.3s ease",
                    animation: showCoral ? "pulseNode 2.2s ease-in-out infinite" : "none",
                  }} />
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
                    {logoSrc && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoSrc}
                        alt={item.company}
                        style={{ height: 52, maxWidth: 120, width: "auto", objectFit: "contain", flexShrink: 0, marginRight: "0.7rem" }}
                      />
                    )}
                    <span style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: "0.74rem",
                      fontWeight: 500,
                      color: "#5C5750",
                      marginLeft: "0.45rem",
                    }}>{item.year}</span>
                  </div>
                </div>
                );
              })}
            </div>

            <p style={{
              fontFamily: "var(--font-fraunces), serif",
              fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
              fontStyle: "normal",
              color: "#4A5868",
              lineHeight: 1.7,
              maxWidth: 300,
              marginBottom: "1.75rem",
            }}>
              What ten years inside high-growth operations actually adds up to. A track record, not a theory.
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div>
            {activeCompany !== null && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid #D8D0C4",
                  animation: "timelineIn 0.3s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.8rem",
                    color: "#5C5750",
                  }}
                >
                  Showing stats for{" "}
                  <b style={{ color: "#22332C" }}>{activeCompany}</b>
                </span>
                <button
                  onClick={() => setActiveCompany(null)}
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.78rem",
                    color: "#EA6A47",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  × Clear filter
                </button>
              </div>
            )}
            {(() => {
              const lastVisibleIndex = byTheNumbersRows.reduce(
                (acc, r, idx) =>
                  activeCompany === null || r.company === activeCompany ? idx : acc,
                -1
              );
              return byTheNumbersRows.map((row, i) => {
                const isRevealed = visibleNumberRows[i];
                const isVisible = activeCompany === null || row.company === activeCompany;
                const rowOpacity = !isRevealed ? 0 : isVisible ? 1 : 0;
                const rowTransform = !isRevealed ? "translateY(20px)" : "translateY(0)";
                const rowTransition = !isRevealed
                  ? `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`
                  : "opacity 0.3s ease";
                const rowBorderLeft = activeCompany !== null
                  ? "2px solid #EA6A47"
                  : hoveredNumberRow === i
                  ? "3px solid #EA6A47"
                  : "3px solid transparent";
                const rowBackground = activeCompany !== null
                  ? "rgba(234,106,71,0.04)"
                  : hoveredNumberRow === i
                  ? "#F0E8DC"
                  : "transparent";
                return (
                  <div
                    key={i}
                    style={{
                      overflow: "hidden",
                      maxHeight: isVisible ? 300 : 0,
                      transition: "max-height 0.4s ease",
                    }}
                  >
                    <div
                      onMouseEnter={() => setHoveredNumberRow(i)}
                      onMouseLeave={() => setHoveredNumberRow(null)}
                      style={{
                        paddingTop: isVisible ? "28px" : "0px",
                        paddingBottom: isVisible ? "28px" : "0px",
                        paddingLeft: "20px",
                        paddingRight: 0,
                        borderTop: isVisible ? "1px solid #D8D0C4" : "0px solid transparent",
                        borderBottom:
                          i === lastVisibleIndex && isVisible ? "1px solid #D8D0C4" : "none",
                        borderLeft: rowBorderLeft,
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        cursor: "default",
                        background: rowBackground,
                        position: "relative",
                        opacity: rowOpacity,
                        transform: rowTransform,
                        transition: `${rowTransition}, padding-top 0.4s ease, padding-bottom 0.4s ease, border-color 0.3s ease, background 0.3s ease, border-left-color 0.3s ease`,
                        boxSizing: "border-box" as const,
                      }}
                    >
                      {/* Circled number - coral outline only */}
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
                            display: "inline-block",
                            fontFamily: "var(--font-playfair), serif",
                            fontSize: "56px",
                            fontWeight: 700,
                            lineHeight: 1,
                            margin: "0 0 6px",
                            color: "var(--coral)",
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

                      {/* Arrow - always visible, turns coral on hover */}
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
                  </div>
                );
              });
            })()}
          </div>

        </div>
      </section>

      {/* SECTION 1.5 - BEFORE / AFTER TOGGLE */}
      <section
        ref={beforeAfterRef}
        className="section-pad"
        style={{ background: "#ffffff" }}
      >
        <div className="max-w-site" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <AnimateIn>
            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2rem, 4vw, 52px)",
              color: "#22332C",
              fontWeight: 700,
              marginBottom: "0.75rem",
              letterSpacing: "0.02em",
              textAlign: "center",
            }}>
              You&apos;re the bottleneck.{" "}
              <span style={{ color: "#EA6A47", fontStyle: "italic" }}>Or the system is.</span>
            </h2>
            <p style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: 16,
              color: "rgba(34,51,44,0.6)",
              textAlign: "center",
              marginBottom: "2rem",
            }}>
              Flip the switch. Watch the same lead move through both.
            </p>
          </AnimateIn>

          {/* Split before/after comparison */}
          <AnimateIn delay={80}>
            <div style={{ width: "100%" }}>
              <div className="ba-compare-grid" style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)",
                gap: 0,
                borderRadius: 20,
                overflow: "hidden",
                minHeight: 420,
              }}>

                {/* LEFT - BEFORE */}
                <div className="ba-panel-before" style={{
                  background: "rgba(34,51,44,0.025)",
                  border: "1px solid var(--line)",
                  borderRadius: "20px 0 0 20px",
                  padding: "40px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  opacity: isAfter ? 0.3 : 1,
                  transition: "opacity 0.4s ease",
                }}>
                  <div style={{ marginBottom: 20 }}>
                    <p className="meta-label" style={{ margin: "0 0 8px" }}>BEFORE</p>
                    <p style={{ fontSize: 22, fontWeight: 700, color: "#22332C", opacity: 1, margin: 0 }}>
                      You&apos;re the bottleneck.
                    </p>
                  </div>
                  {workflowSteps.map((step, i) => {
                    const BeforeIcon = beforeIconFns[i];
                    const isStuck = i === 3;
                    return (
                      <div key={step.labelBefore}>
                        <div style={{
                          background: isStuck ? "rgba(34,51,44,0.07)" : "#ffffff",
                          border: "1px solid var(--line)",
                          borderLeft: isStuck ? "3px solid #22332C" : "1px solid var(--line)",
                          borderRadius: 14,
                          padding: "14px 18px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 14,
                          opacity: 1,
                        }}>
                          <div style={{
                            flexShrink: 0,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isStuck ? "rgba(34,51,44,0.14)" : "rgba(34,51,44,0.06)",
                          }}>
                            <BeforeIcon stroke={isStuck ? "#22332C" : "rgba(34,51,44,0.55)"} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                              <p style={{ fontSize: 16, fontWeight: 700, color: "#22332C", opacity: 1, margin: 0 }}>
                                {step.labelBefore}
                              </p>
                              <span style={{
                                background: "#22332C",
                                color: "var(--cream)",
                                opacity: 1,
                                fontFamily: "var(--font-montserrat), sans-serif",
                                fontSize: 10,
                                borderRadius: 4,
                                padding: "3px 8px",
                                flexShrink: 0,
                              }}>{step.badgeBefore}</span>
                            </div>
                            <p style={{
                              fontFamily: "var(--font-montserrat), sans-serif",
                              fontSize: 12,
                              color: "rgba(34,51,44,0.6)",
                              opacity: 1,
                              margin: 0,
                            }}>{step.subBefore}</p>
                          </div>
                        </div>
                        {i < 3 && (
                          <div style={{ display: "flex", justifyContent: "center", padding: "5px 0" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(34,51,44,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* MIDDLE DIVIDER */}
                <div className="ba-divider" style={{
                  width: 104,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  position: "relative",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: isAfter ? "rgba(34,51,44,0.35)" : "#22332C",
                      transition: "color 0.3s ease",
                    }}>MANUAL</span>
                    <button
                      onClick={() => {
                        playToggleSound();
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
                    <span style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: isAfter ? "#EA6A47" : "rgba(34,51,44,0.35)",
                      transition: "color 0.3s ease",
                    }}>AUTOMATED</span>
                  </div>
                </div>

                {/* RIGHT - AFTER */}
                <div className="ba-panel-after" style={{
                  background: "rgba(234,106,71,0.035)",
                  border: "1px solid var(--line)",
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
                    <p className="meta-label" style={{ margin: "0 0 8px" }}>AFTER</p>
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
                        background: "rgba(234,106,71,0.06)",
                        border: "1px solid var(--line)",
                        borderLeft: "3px solid #EA6A47",
                        borderRadius: 14,
                        padding: "14px 18px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                      }}>
                        <div style={{
                          flexShrink: 0,
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(234,106,71,0.14)",
                        }}>
                          {step.icon === "zap" && (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                            </svg>
                          )}
                          {step.icon === "search" && (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                          )}
                          {step.icon === "arrow" && (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                            </svg>
                          )}
                          {step.icon === "check" && (
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA6A47" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                            <p style={{ fontSize: 16, fontWeight: 700, color: "#22332C", margin: 0 }}>
                              {step.title}
                            </p>
                            <span style={{
                              background: "#22332C",
                              color: "var(--cream)",
                              fontFamily: "var(--font-montserrat), sans-serif",
                              fontSize: 10,
                              borderRadius: 4,
                              padding: "3px 8px",
                              flexShrink: 0,
                            }}>{step.badge}</span>
                          </div>
                          <p style={{
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: 12,
                            color: "rgba(34,51,44,0.6)",
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

      {/* SECTION 4B - FEATURED CASE STUDIES (expandable preview) */}
      <FeaturedCaseStudies />

      {/* SECTION 5 - PERSONALITY (video carousel) */}
      <section
        className="section-pad"
        style={{
          background: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle, rgba(30,36,31,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div className="max-w-site" style={{ marginBottom: "48px" }}>
          <AnimateIn>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "48px",
                fontWeight: 900,
                color: "#1E241F",
                marginBottom: "12px",
              }}
            >
              Where systems meet personality.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p className="personality-subhead">
              I don&apos;t just build the machines. I talk about them too. Stand-up, breakdowns, the podcast. There&apos;s a human behind the automations.
            </p>
          </AnimateIn>
        </div>

        <PersonalityCarousel />

        {/* CTA strip below carousel */}
        <div className="max-w-site" style={{ marginTop: "48px", textAlign: "center" }}>
          <a
            href="https://www.instagram.com/etz.riz/"
            target="_blank"
            rel="noopener noreferrer"
            className="oc-ig-cta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            More on Instagram
            <span className="oc-ig-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* SECTION 6 - ROUTES */}
      <section id="how-people-work-with-me" className="section-pad" style={{ background: "var(--paper)" }}>
        <div className="max-w-site">
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: 48,
                color: "#22332C",
                fontWeight: 900,
                marginBottom: 56,
              }}
            >
              How people work with me.
            </h2>
          </AnimateIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* ROW 1 - Consulting & "Have a chat with me?" merged hero */}
            <AnimateIn delay={200}>
              <div className="route-hero-v2 merged-hero">
                <div className="route-hero-texture" aria-hidden="true" />
                <div className="route-hero-glow" aria-hidden="true" />

                <div className="merged-hero-grid">
                  {/* Portrait */}
                  <div className="merged-hero-photo-col">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/riz-photo-new.jpg"
                      alt="Rizwan Mahmood"
                      className="merged-hero-photo"
                    />
                  </div>

                  {/* Eyebrow, headline, description */}
                  <div className="merged-hero-text">
                    <span className="route-tag-chip route-tag-chip--coral" style={{ marginBottom: 16 }}>
                      1:1 ADVISORY
                    </span>
                    <h3 className="merged-hero-heading">
                      Have a chat <span className="merged-hero-heading-accent">with me?</span>
                    </h3>
                    <p className="merged-hero-desc">
                      1:1 advisory and fractional ops for owners and the small teams around them. I come in, we get clear, we build the system.
                    </p>
                  </div>

                  {/* Price block - right side, stacked vertically */}
                  <div className="merged-hero-price">
                    <span className="route-price-from">From</span>
                    <span className="route-price-value">
                      <span className="route-price-amount">$140</span>
                      <span className="route-price-suffix">/hr</span>
                    </span>
                    <span className="route-trust-line">30-min intro call · no obligation</span>
                  </div>

                  {/* CTAs - left, under headline/description */}
                  <div className="merged-cta-row">
                    <CalBookingButton className="route-hero-btn">Book a call →</CalBookingButton>

                    <div className="merged-ladder-ai" ref={aiWrapRef}>
                      <button
                        type="button"
                        className="route-btn-ghost merged-door-btn"
                        onClick={() => setAiPickerOpen((open) => !open)}
                        aria-expanded={aiPickerOpen}
                        aria-haspopup="menu"
                      >
                        Ask an AI about Riz →
                      </button>

                      {aiPickerOpen && (
                        <div className="merged-ai-popover" role="menu">
                          {ASK_AI_OPTIONS.map((opt, i) => (
                            <a
                              key={opt.name}
                              href={opt.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="merged-ai-popover-link"
                              style={{ animationDelay: `${i * 50}ms` }}
                              aria-label={`Ask ${opt.name} about Riz`}
                              role="menuitem"
                            >
                              {opt.icon}
                              <span className="merged-ai-popover-label" aria-hidden="true">{opt.name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Proof strip */}
                  <div className="route-authority-row merged-proof">
                    <span className="route-authority-chip">
                      <span className="route-authority-icon">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
                        </svg>
                      </span>
                      10+ yrs ops · Careem · Bolt · Wise
                    </span>
                    <span className="route-authority-chip">
                      <span className="route-authority-icon">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z" />
                        </svg>
                      </span>
                      4 continents
                    </span>
                    <span className="route-authority-chip">
                      <span className="route-authority-icon">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      Anthropic Partner
                    </span>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* ROW 2 - 3 columns */}
            <div className="route-cards-row">
              {/* CARD A - A system built for you */}
              <AnimateIn delay={280}>
                <ClickableCard href="/services/projects" className="route-card-v2">
                  <span className="route-card-icon"><RouteBuildIcon /></span>
                  <span className="route-tag-chip route-tag-chip--ink">FULL BUILD</span>
                  <p className="route-card-title">A system built for you</p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: 14,
                      color: "rgba(34,51,44,0.72)",
                      lineHeight: 1.65,
                      flexGrow: 1,
                    }}
                  >
                    Custom AI automations, end-to-end. That&apos;s what Soch does.
                  </p>
                  <p className="route-authority-line">Delivered via Soch · withsoch.com</p>
                  <div className="route-card-buttons">
                    <Link
                      href="https://withsoch.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="route-btn-primary"
                    >
                      See Soch <span className="route-btn-arrow">↗</span>
                    </Link>
                    <Link href="/services/projects" className="route-btn-ghost">
                      Details
                    </Link>
                  </div>
                </ClickableCard>
              </AnimateIn>

              {/* CARD B - Speaking & workshops */}
              <AnimateIn delay={360}>
                <ClickableCard href="/services/speaking" className="route-card-v2">
                  <span className="route-card-icon"><RouteMicIcon /></span>
                  <span className="route-tag-chip route-tag-chip--ink">LIVE & IN-PERSON</span>
                  <p className="route-card-title">Speaking & workshops</p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: 14,
                      color: "rgba(34,51,44,0.72)",
                      lineHeight: 1.65,
                      flexGrow: 1,
                    }}
                  >
                    Talks and workshops on AI leverage and operator thinking. Four continents so far.
                  </p>
                  <p className="route-authority-line">Careem · Bolt · Wise alumni speaker</p>
                  <div className="route-card-buttons">
                    <Link href="/services/speaking" className="route-btn-primary">
                      Details <span className="route-btn-arrow">→</span>
                    </Link>
                  </div>
                </ClickableCard>
              </AnimateIn>

              {/* CARD C - Just want to learn? */}
              <AnimateIn delay={440}>
                <ClickableCard href="/blog" className="route-card-v2">
                  <span className="route-card-icon"><RouteBookIcon /></span>
                  <span className="route-tag-chip route-tag-chip--coral">FREE</span>
                  <p className="route-card-title">Just want to learn?</p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: 14,
                      color: "rgba(34,51,44,0.72)",
                      lineHeight: 1.65,
                      flexGrow: 1,
                    }}
                  >
                    I write about automation and AI every week. Notes from the actual work, not theory.
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontStyle: "italic",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#EA6A47",
                    }}
                  >
                    Free. Always.
                  </p>
                  <div className="route-card-buttons">
                    <Link href="/blog" className="route-btn-primary">
                      Start reading <span className="route-btn-arrow">→</span>
                    </Link>
                  </div>
                </ClickableCard>
              </AnimateIn>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7 - TESTIMONIALS */}
      <TestimonialsSection
        heading={
          <>
            Don&apos;t take <span style={{ color: "var(--coral)", fontStyle: "italic" }}>my word</span> for it.
          </>
        }
      />

      {/* SECTION 8 - WRITING */}
      <section className="section-pad" style={{ background: "#FFFFFF", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-site">
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
              I think{" "}
              <span style={{ color: "var(--coral)", fontStyle: "italic" }}>out loud.</span>
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
              Notes on automation, operations, and using AI without losing the plot. New stuff most weeks.
            </p>
          </AnimateIn>

          <div className="writing-list">
            {blogPosts.slice(0, 3).map((post, i) => (
              <AnimateIn key={post.link} delay={i * 80} className="writing-row-animate">
                <a href={post.link} target="_blank" rel="noopener noreferrer" className="writing-row">
                  <span className="writing-row-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="writing-row-meta">
                    <span className="writing-row-date">{formatRowDate(post.pubDate)}</span>
                    {post.categories[0] && <span className="writing-row-chip">{post.categories[0]}</span>}
                  </span>
                  <span className="writing-row-body">
                    <span className="writing-row-title">
                      {post.title}
                      <span className="writing-row-title-mark">*</span>
                    </span>
                    <span className="writing-row-excerpt">{post.excerpt}</span>
                  </span>
                  <span className="writing-row-cta">Read →</span>
                </a>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={400}>
            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <Link href="/blog" className="btn-ghost">
                Read everything <span className="writing-cta-arrow">→</span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 9 - BOOKING */}
      <BookingSection />
    </>
  );
}
