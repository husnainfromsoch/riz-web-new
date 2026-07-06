"use client";
import { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AnimateIn from "@/components/AnimateIn";
import BookingSection from "@/components/BookingSection";
import HeroSection from "@/components/hero-section";
import DirectLineCTA from "@/components/DirectLineCTA";
import TestimonialsSection from "@/components/Testimonials";
import CalBookingButton from "@/components/CalModal";
import { type SubstackPost, FALLBACK_POSTS } from "@/lib/substack";

function formatRowDate(pubDate: string): string {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return "";
  return `${parsed.getFullYear()} · ${String(parsed.getMonth() + 1).padStart(2, "0")}`;
}

const PORTRAIT_URL =
  "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3a46d312c6d02c8e46bab1_691d97efffebe375af48ce33_Remove_GMNI-removebg-preview.png";

// ─── PROOF CARDS ────────────────────────────────────────────────────────────

const metricCards = [
  { verb: "Saved",         prefix: "$", target: 3.9,  suffix: "M", isFloat: true,  label: "Courier costs saved · Careem" },
  { verb: "Achieved",      prefix: "",  target: 92,   suffix: "%", isFloat: false, label: "Straight-through processing · Wise" },
  { verb: "Dispatch time", prefix: "",  target: 20,   suffix: "s", isFloat: false, label: "Down from 3 min · Careem" },
  { verb: "Scaled across", prefix: "",  target: 4,    suffix: "",  isFloat: false, label: "Markets scaled across · Bolt" },
];

// ─── SELECTED WORK ROWS ─────────────────────────────────────────────────────

const selectedWorkRows = [
  {
    id: "cs-01",
    num: "01",
    tag: "REAL ESTATE · SALES",
    title: "AI Lead Qualification & Agent Routing",
    result: "8 min first contact · 34% lead-to-appointment rate",
  },
  {
    id: "cs-02",
    num: "02",
    tag: "LAW FIRM · OPERATIONS",
    title: "Client Intake Automation & Case Routing",
    result: "12 min response · 3 hrs/day saved · 100% urgent flagged",
  },
  {
    id: "cs-04",
    num: "03",
    tag: "E-COMMERCE · SUPPORT",
    title: "AI Support Triage & Auto-Resolution",
    result: "67% tickets auto-resolved · 18 min first response",
  },
  {
    id: "cs-05",
    num: "04",
    tag: "B2B SAAS · SALES",
    title: "Trial-to-Paid Conversion Workflow",
    result: "2.1× conversion · 9% → 19% · 28 hrs/week saved",
  },
  {
    id: "cs-09",
    num: "05",
    tag: "MARKETING AGENCY · OPS",
    title: "Automated Monthly Client Reporting",
    result: "89% time reduction · delivered 1st of every month",
  },
  {
    id: "cs-06",
    num: "06",
    tag: "RECRUITMENT · HR",
    title: "CV Screening & Candidate Ranking",
    result: "Same-day shortlist · 75% less screening time",
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

// ─── ON CAMERA CARDS ─────────────────────────────────────────────────────────

const onCameraCards: {
  num: string;
  href: string;
  thumb: string;
  alt?: string;
  title: string;
  description: string;
}[] = [
  {
    num: "01",
    href: "https://www.instagram.com/reels/DZx-_OHOqg4/",
    thumb: "/images/on-camera/ai-influencers-thumb.jpeg",
    alt: "Riz on camera — a message to all AI influencers",
    title: "A message to AI influencers",
    description: "Calling out the hype — what actually ships vs what gets posted.",
  },
  {
    num: "02",
    href: "https://www.instagram.com/reel/DZr8EPSOkdB/",
    thumb: "/Photos/riz-lake.jpg",
    title: "Operator perspective",
    description: "How an operator thinks about building systems. A live breakdown.",
  },
  {
    num: "03",
    href: "https://www.instagram.com/reel/DXltD2Ujl5s/",
    thumb: "/Photos/riz-vespa.jpg",
    title: "Stand-up · The AI bit",
    description: "The bit about AI that landed. Live at the mic in Tallinn.",
  },
];

// ─── ON CAMERA GRID (scroll-triggered entrance) ─────────────────────────────

function OnCameraGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="oc-grid" ref={gridRef}>
      {onCameraCards.map((card, i) => (
        <a
          key={card.href}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`oc-card${inView ? " oc-inview" : ""}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="oc-thumb">
            <Image
              src={card.thumb}
              alt={card.alt ?? card.title}
              fill
              sizes="(max-width: 767px) 85vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />

            <div className="oc-thumb-gradient" />

            <span className="oc-chip oc-chip-num">{card.num}</span>
            <span className="oc-chip oc-chip-platform">INSTAGRAM</span>

            <div className="oc-play">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Bottom info */}
          <div className="oc-footer">
            <div className="oc-footer-top">
              <span className="oc-reel-tag">REEL</span>
              <span className="oc-watch">
                Watch on Instagram <span className="oc-watch-arrow">↗</span>
              </span>
            </div>

            <p className="oc-card-title">{card.title}</p>
            <p className="oc-card-desc">{card.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

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
  const [labelDesc, labelCompany] = card.label.split("·").map((s) => s.trim());
  return (
    <div
      style={{
        background: "#ffffff",
        border: `1px solid ${hovered ? "#EA6A47" : "#DDD3BF"}`,
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered ? "0 8px 32px rgba(234,106,71,0.1)" : "none",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p style={{
        fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
        fontSize: 10,
        color: "rgba(34,51,44,0.4)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        margin: 0,
      }}>
        {card.verb}
      </p>
      <p style={{
        fontSize: 52,
        fontWeight: 900,
        color: "#22332C",
        lineHeight: 1,
        margin: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity .4s ease ${index * 150}ms, transform .4s ease ${index * 150}ms`,
        backgroundImage: "linear-gradient(135deg, #22332C 0%, #EA6A47 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `numGradient 4s ease infinite alternate ${index * 0.5}s`,
      }}>
        {display}
      </p>
      <div style={{ width: 32, height: 2, background: "#EA6A47", borderRadius: 2, margin: "4px 0" }} />
      <p style={{
        fontSize: 13,
        fontWeight: 500,
        color: "rgba(34,51,44,0.7)",
        lineHeight: 1.4,
        margin: 0,
      }}>
        {labelDesc}
        {labelCompany ? <> · <span style={{ color: "#EA6A47", fontWeight: 600 }}>{labelCompany}</span></> : null}
      </p>
    </div>
  );
}

// ─── HOW I THINK — ANIMATED CHART ───────────────────────────────────────────

const CHART_LINE_PATH = "M60,180 L300,150 L600,110 L900,70 L1140,30";
const CHART_AREA_PATH = "M60,180 L300,150 L600,110 L900,70 L1140,30 L1140,220 L60,220 Z";
const CHART_DOTS = [
  { cx: 300, cy: 150, label: "01" },
  { cx: 600, cy: 110, label: "02" },
  { cx: 900, cy: 70, label: "03" },
  { cx: 1140, cy: 30, label: "04" },
];

function HowThinkChart({ activeStep }: { activeStep: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !inView) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 1.8s ease-out";
    path.style.strokeDashoffset = "0";
  }, [inView]);

  return (
    <div ref={containerRef} style={{ height: 240, position: "relative", marginBottom: 0 }}>
      <svg viewBox="0 0 1200 240" width="100%" height="240" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="thinkAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(234,106,71,0.22)" />
            <stop offset="100%" stopColor="rgba(234,106,71,0)" />
          </linearGradient>
        </defs>
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1={0} y1={y} x2={1200} y2={y} stroke="rgba(30,36,31,0.07)" strokeWidth={1} />
        ))}
        {[300, 600, 900].map((x) => (
          <line key={x} x1={x} y1={0} x2={x} y2={200} stroke="rgba(30,36,31,0.07)" strokeWidth={1} strokeDasharray="4,4" />
        ))}
        <text x={0} y={16} fontFamily="var(--font-geist-mono), monospace" fontSize={12} fill="rgba(58,64,58,0.55)">
          Clarity &amp; leverage, compounding →
        </text>
        <text x={60} y={228} textAnchor="start" fontFamily="var(--font-geist-mono), monospace" fontSize={13} fill="rgba(58,64,58,0.6)">
          Vague idea
        </text>
        <text x={1140} y={228} textAnchor="end" fontFamily="var(--font-geist-mono), monospace" fontSize={13} fill="rgba(58,64,58,0.6)">
          Running system
        </text>
        <path d={CHART_AREA_PATH} fill="url(#thinkAreaGradient)" stroke="none" />
        <path ref={pathRef} d={CHART_LINE_PATH} fill="none" stroke="#EA6A47" strokeWidth={3} strokeLinecap="round" />
      </svg>
      {/* Milestone dots rendered as real HTML circles (not SVG) so they stay
          perfectly round even though the chart above is stretched via
          preserveAspectRatio="none" on narrow viewports. */}
      {CHART_DOTS.map((d, i) => {
        const isActive = activeStep === i;
        const delayFrac = (d.cx - 60) / (1140 - 60);
        const popDelay = inView ? 200 + delayFrac * 1500 : 0;
        return (
          <div
            key={d.label}
            className={`think-chart-dot${isActive ? " active" : ""}`}
            style={{
              left: `${(d.cx / 1200) * 100}%`,
              top: `${(d.cy / 240) * 100}%`,
              opacity: inView ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.4})`,
              transitionDelay: `${popDelay}ms`,
            }}
          >
            {d.label}
          </div>
        );
      })}
    </div>
  );
}

function StepIcon({ index }: { index: number }) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "#EA6A47",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { transition: "stroke 0.3s" },
  };
  switch (index) {
    case 0:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 1:
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case 2:
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
  }
}

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

  const [believeHovered, setBelieveHovered] = useState(false);
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [isAfter, setIsAfter] = useState(false);
  const [toggleAnimating, setToggleAnimating] = useState(false);
  const [hoveredBACard, setHoveredBACard] = useState<number | null>(null);
  const beforeAfterRef = useRef<HTMLElement>(null);
  const beforeAfterTriggeredRef = useRef(false);
  const loopCancelRef = useRef<(() => void) | null>(null);
  const portraitAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioFadeRafRef = useRef<number | null>(null);

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

  const [activeThinkStep, setActiveThinkStep] = useState(0);
  const thinkChartContainerRef = useRef<HTMLDivElement>(null);

  function handleThinkCardActivate(i: number) {
    setActiveThinkStep(i);
    if (typeof window !== "undefined" && window.innerWidth <= 640 && thinkChartContainerRef.current) {
      thinkChartContainerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

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
        // Fail silently — e.g. file missing or playback blocked.
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
        /* ===== ROUTES — "How people work with me" ===== */
        .route-hero-v2 {
          position: relative;
          overflow: hidden;
          background: #F1EBDE;
          border: 1px solid #E2DACB;
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
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: rgba(34,51,44,0.6);
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
          font-family: var(--font-geist-mono), monospace;
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
          font-family: var(--font-geist-mono), monospace;
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
          gap: 16px;
        }
        .route-card-v2 {
          position: relative;
          background: #ffffff;
          border: 1px solid #E2DACB;
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
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          color: rgba(34,51,44,0.4);
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
          color: #F3ECDD;
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
          border: 1px solid #DDD3BF;
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
          font-family: var(--font-fraunces), serif;
          font-style: italic;
          font-size: 14px;
          color: rgba(34,51,44,0.45);
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
        @keyframes numGradient {
          0%   { background-position: 0% center }
          100% { background-position: 200% center }
        }

        /* ===== BELIEVE SECTION ===== */
        .believe-content-wrap {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 80px;
          align-items: start;
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
          font-family: var(--font-fraunces), serif;
          font-size: 22px; font-weight: 800; letter-spacing: -.3px;
        }
        .coral-word { color: var(--coral); }
        .believe-closing {
          background: transparent;
          border-top: 1px solid #DDD3BF;
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
          font-family: var(--font-fraunces), serif;
          font-size: 18px; font-weight: 700; font-style: italic;
          color: #EA6A47;
          margin-bottom: 16px;
        }
        .believe-closing-eyebrow {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px; letter-spacing: 0.1em;
          color: rgba(34,51,44,0.6);
          margin-bottom: 20px;
        }
        .believe-closing-cta {
          background: #22332C; color: #F3ECDD;
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

        /* ===== SELECTED WORK — SYSTEM ROWS ===== */
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
          border: 1px solid #DDD3BF;
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
          font-family: 'Geist Mono', var(--font-geist-mono), monospace;
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
          font-family: 'Geist Mono', var(--font-geist-mono), monospace;
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
          border: 1.5px solid #DDD3BF;
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
          color: #F3ECDD;
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

      {/* SECTION 1 — HERO */}
      <HeroSection />

      {/* SECTION 2 — PROOF */}
      <section
        ref={proofSectionRef}
        style={{ background: "#F5F0E8", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}
      >
        <div className="max-w-site">
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
      <section id="what-i-believe" style={{ position: "relative", zIndex: 1, padding: "56px 60px 80px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>

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
                <div className="believe-closing-eyebrow" style={{ textTransform: "uppercase" }}>
                  The operator behind the thinking.
                </div>
                <Link href="/about" className="believe-closing-cta">
                  Meet Riz →
                </Link>
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

                {/* Equalizer badge — always visible while playing, independent of hover, so it reads as "sound is on" */}
                {audioState === 'playing' && (
                  <div className="portrait-eq-badge" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                )}

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
                        display: "inline-block",
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
        style={{ background: "#ffffff", padding: "80px 0" }}
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
                  background: "#ffffff",
                  border: "1px solid #DDD3BF",
                  borderRadius: "20px 0 0 20px",
                  padding: "40px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  opacity: isAfter ? 0.3 : 1,
                  transition: "opacity 0.4s ease",
                }}>
                  <div style={{ marginBottom: 20 }}>
                    <p style={{
                      fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                      fontSize: 12,
                      color: "rgba(34,51,44,0.6)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      margin: "0 0 8px",
                    }}>BEFORE</p>
                    <p style={{ fontSize: 22, fontWeight: 700, color: "#22332C", opacity: 1, margin: 0 }}>
                      You&apos;re the bottleneck.
                    </p>
                  </div>
                  {workflowSteps.map((step, i) => {
                    const BeforeIcon = beforeIconFns[i];
                    return (
                      <div key={step.labelBefore}>
                        <div style={{
                          background: "#ffffff",
                          border: "1px solid #DDD3BF",
                          borderRadius: 14,
                          padding: "14px 18px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 14,
                          opacity: 1,
                        }}>
                          <div style={{ flexShrink: 0, marginTop: 2 }}>
                            <BeforeIcon stroke="#EA6A47" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <p style={{ fontSize: 16, fontWeight: 700, color: "#22332C", opacity: 1, margin: 0 }}>
                                {step.labelBefore}
                              </p>
                              <span style={{
                                background: "#22332C",
                                color: "#F3ECDD",
                                opacity: 1,
                                fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                                fontSize: 10,
                                borderRadius: 4,
                                padding: "3px 8px",
                                flexShrink: 0,
                              }}>{step.badgeBefore}</span>
                            </div>
                            <p style={{
                              fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                              fontSize: 12,
                              color: "rgba(34,51,44,0.6)",
                              opacity: 1,
                              margin: 0,
                            }}>{step.subBefore}</p>
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
                    );
                  })}
                </div>

                {/* MIDDLE DIVIDER */}
                <div style={{
                  width: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  position: "relative",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <span style={{
                      fontFamily: "'Geist Mono', var(--font-geist-mono), monospace",
                      fontSize: 11,
                      color: "rgba(34,51,44,0.5)",
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

      {/* SECTION 4 — SELECTED WORK */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "80px 0" }}>
        <div className="max-w-site">
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "inherit",
                fontSize: 48,
                color: "#22332C",
                fontWeight: 900,
                marginBottom: "0.75rem",
              }}
            >
              Things I&apos;ve actually shipped.
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p
              style={{
                fontFamily: "inherit",
                fontSize: 16,
                color: "rgba(34,51,44,0.72)",
                fontWeight: 400,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Not a claim. Evidence. Each one is the thesis in action.
            </p>
            <p
              style={{
                fontFamily: "inherit",
                fontSize: 16,
                color: "rgba(34,51,44,0.72)",
                fontWeight: 400,
                lineHeight: 1.7,
                marginTop: 4,
                marginBottom: 52,
              }}
            >
              Six systems. Real outcomes. No fluff.
            </p>
          </AnimateIn>

          <div className="work-rows-list">
            {selectedWorkRows.map((row, i) => (
              <AnimateIn key={row.num} delay={i * 80}>
                <Link href={`/case-studies?case=${row.id}`} className="work-row">
                  <span className="work-row-badge">{row.num}</span>
                  <span className="work-row-body">
                    <span className="work-row-tag">{row.tag}</span>
                    <span className="work-row-title">{row.title}</span>
                  </span>
                  <span className="work-row-result">{row.result}</span>
                  <span className="work-row-arrow">↗</span>
                </Link>
              </AnimateIn>
            ))}
          </div>

          <Link href="/case-studies" className="work-view-all">
            View all 20 case studies
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* SECTION 5 — ON CAMERA */}
      <section
        style={{
          background: "#FFFFFF",
          padding: "100px 0",
          backgroundImage:
            "radial-gradient(circle, rgba(30,36,31,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div className="max-w-site">
          {/* Heading area */}
          <div style={{ marginBottom: "60px" }}>
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
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: 1.7,
                  color: "#4A524A",
                  maxWidth: "60ch",
                }}
              >
                I don&apos;t just build the machines — I talk about them. Stand-up, breakdowns, the podcast. There&apos;s a human behind the automations.
              </p>
            </AnimateIn>
          </div>

          <OnCameraGrid />

          {/* CTA strip below grid */}
          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <a
              href="https://www.instagram.com/rizautomates"
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
        </div>
      </section>

      {/* SECTION 6 — PROCESS */}
      <section
        className="think-section"
        style={{
          background: "#F5EFE3",
          position: "relative",
          overflow: "hidden",
          backgroundImage:
            "radial-gradient(circle, rgba(30,36,31,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          boxShadow: "inset 0 1px 0 rgba(30,36,31,0.06)",
        }}
      >
        {/* Floating accent */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(234,106,71,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div className="max-w-site" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 680, marginBottom: 60 }}>
            <AnimateIn delay={80}>
              <h2
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontSize: 64,
                  color: "#1E241F",
                  fontWeight: 900,
                  lineHeight: 1.0,
                  marginBottom: 16,
                }}
              >
                Clarity is{" "}
                <span
                  style={{
                    color: "#EA6A47",
                    fontStyle: "italic",
                    fontFamily: "var(--font-fraunces), serif",
                  }}
                >
                  step zero
                </span>
                .
              </h2>
            </AnimateIn>
            <AnimateIn delay={150}>
              <p
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: 16,
                  color: "#3A403A",
                  lineHeight: 1.7,
                  maxWidth: 480,
                }}
              >
                Most &apos;automation&apos; projects fail before a single tool is opened. This is the order that doesn&apos;t.
              </p>
            </AnimateIn>
          </div>

          {/* Animated chart */}
          <AnimateIn delay={220}>
            <div
              ref={thinkChartContainerRef}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2DACB",
                borderRadius: 20,
                padding: "40px 40px 0",
                marginBottom: 0,
              }}
            >
              <HowThinkChart activeStep={activeThinkStep} />
            </div>
          </AnimateIn>

          {/* Steps */}
          <div className="think-cards-grid" style={{ marginTop: 48 }}>
            {processSteps.map((step, i) => {
              const isActive = activeThinkStep === i;
              return (
                <AnimateIn key={step.num} delay={i * 80} className="think-card-animate">
                  <div
                    className={`think-card${isActive ? " active" : ""}`}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => handleThinkCardActivate(i)}
                    onClick={() => handleThinkCardActivate(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleThinkCardActivate(i);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 20,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontSize: 12,
                          color: "#EA6A47",
                          letterSpacing: "0.1em",
                          fontWeight: 700,
                          display: "block",
                        }}
                      >
                        {step.num}
                      </span>
                      <StepIcon index={i} />
                    </div>
                    <h3
                      className="think-card-title"
                      style={{
                        fontFamily: "var(--font-fraunces), serif",
                        fontSize: 20,
                        fontWeight: 800,
                        marginBottom: 12,
                        lineHeight: 1.2,
                        color: "#1E241F",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#3A403A",
                        lineHeight: 1.6,
                        fontFamily: "inherit",
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>

          {/* Closing line */}
          <AnimateIn delay={480}>
            <p
              style={{
                marginTop: 56,
                padding: "32px 0 0",
                borderTop: "1px solid #E2DACB",
                textAlign: "left",
                fontSize: 18,
                fontStyle: "italic",
                color: "#1E241F",
                fontFamily: "var(--font-fraunces), serif",
              }}
            >
              In that order. Every time
              <span style={{ color: "#EA6A47", fontStyle: "normal" }}>.</span>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 7 — ROUTES */}
      <section style={{ background: "#FFFFFF", padding: "100px 0" }}>
        <div className="max-w-site">
          <AnimateIn delay={80}>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: 48,
                color: "#22332C",
                fontWeight: 900,
                marginBottom: 16,
              }}
            >
              How people work with me.
            </h2>
          </AnimateIn>

          <AnimateIn delay={130}>
            <p
              style={{
                fontFamily: "inherit",
                fontSize: 16,
                color: "rgba(34,51,44,0.6)",
                letterSpacing: "0.04em",
                marginBottom: 56,
              }}
            >
              Four ways in. Pick the one that fits.
            </p>
          </AnimateIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* ROW 1 — Consulting featured */}
            <AnimateIn delay={200}>
              <div className="route-hero-v2">
                <div className="route-hero-texture" aria-hidden="true" />
                <div className="route-hero-glow" aria-hidden="true" />

                <div className="route-hero-grid">
                  {/* LEFT — tag, title, description, authority row */}
                  <div>
                    <span className="route-tag-chip route-tag-chip--coral" style={{ marginBottom: 16 }}>
                      1:1 ADVISORY
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-fraunces), serif",
                        fontSize: 32,
                        fontWeight: 800,
                        color: "#22332C",
                        marginBottom: 10,
                      }}
                    >
                      Consulting & coaching
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: 15,
                        color: "rgba(34,51,44,0.65)",
                        lineHeight: 1.7,
                        maxWidth: 520,
                      }}
                    >
                      1:1 advisory and fractional product / ops for early-stage teams. I come in, we get clear, we build the system.
                    </p>

                    <div className="route-authority-row">
                      <span className="route-authority-chip">
                        <span className="route-authority-icon">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z" />
                          </svg>
                        </span>
                        10+ yrs ops — Careem · Bolt · Wise
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

                  {/* RIGHT — pricing block */}
                  <div className="route-price-block">
                    <span className="route-price-from">From</span>
                    <span className="route-price-value">
                      <span className="route-price-amount">$160</span>
                      <span className="route-price-suffix">/hr</span>
                    </span>
                    <CalBookingButton className="route-hero-btn">Book a call</CalBookingButton>
                    <span className="route-trust-line">30-min intro call · no obligation</span>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* ROW 2 — 3 columns */}
            <div className="route-cards-row">
              {/* CARD A — A system built for you */}
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
                  <p className="route-authority-line">Delivered via Soch — withsoch.com</p>
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

              {/* CARD B — Speaking & workshops */}
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

              {/* CARD C — Just want to learn? */}
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

          <p className="route-footnote">
            Heavy build work → <a href="https://withsoch.com" target="_blank" rel="noopener noreferrer">Soch</a>. This site is the person and the thinking.
          </p>
        </div>
      </section>

      {/* SECTION 8 — TESTIMONIALS */}
      <TestimonialsSection
        heading={
          <>
            Don&apos;t take <span style={{ color: "var(--coral)", fontStyle: "italic" }}>my word</span> for it.
          </>
        }
      />

      {/* SECTION — HAVE A CHAT */}
      <section style={{ background: "#F3ECDD", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
        <div className="max-w-site">
          <AnimateIn>
            <DirectLineCTA />
          </AnimateIn>
        </div>
      </section>

      {/* SECTION 9 — WRITING */}
      <section style={{ background: "#FFFFFF", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "5rem 0" }}>
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

      {/* SECTION 10 — BOOKING */}
      <BookingSection />
    </>
  );
}
