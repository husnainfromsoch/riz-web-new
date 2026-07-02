"use client";
import { useState } from "react";
import Link from "next/link";

/* ─── data ──────────────────────────────────────────────────────────────────── */

const INDUSTRIES = [
  "All",
  "Real Estate",
  "Professional Services",
  "Healthcare",
  "E-commerce",
  "Technology",
  "Recruitment",
  "Financial Services",
  "Hospitality",
  "Marketing",
  "Education",
  "Logistics",
];

const caseRows = [
  {
    num: "01",
    tag: "REAL ESTATE · SALES",
    title: "AI Lead Qualification & Agent Routing",
    result: "8 min first contact · 34% conversion rate",
    industry: "Real Estate",
  },
  {
    num: "02",
    tag: "LAW FIRM · OPERATIONS",
    title: "Client Intake Automation & Case Routing",
    result: "12 min response · 3 hrs/day saved",
    industry: "Professional Services",
  },
  {
    num: "03",
    tag: "HEALTHCARE · OPERATIONS",
    title: "Appointment Reminder & Slot Recovery",
    result: "50% fewer no-shows · 73% slots refilled",
    industry: "Healthcare",
  },
  {
    num: "04",
    tag: "E-COMMERCE · SUPPORT",
    title: "AI Support Triage & Auto-Resolution",
    result: "67% auto-resolved · 18 min response",
    industry: "E-commerce",
  },
  {
    num: "05",
    tag: "B2B SAAS · SALES",
    title: "Trial-to-Paid Conversion Workflow",
    result: "2.1× conversion · 9% → 19%",
    industry: "Technology",
  },
  {
    num: "06",
    tag: "RECRUITMENT · HR",
    title: "CV Screening & Candidate Ranking",
    result: "Same-day shortlist · 75% less time",
    industry: "Recruitment",
  },
  {
    num: "07",
    tag: "INSURANCE · SALES",
    title: "Lead Qualification & Personalised Nurture",
    result: "100% follow-up · 22% conversion",
    industry: "Financial Services",
  },
  {
    num: "08",
    tag: "HOSPITALITY · GUEST EXPERIENCE",
    title: "Reservation Upsell & Guest Feedback Loop",
    result: "14% upsell conversion · 31% feedback rate",
    industry: "Hospitality",
  },
  {
    num: "09",
    tag: "MARKETING AGENCY · OPERATIONS",
    title: "Automated Monthly Client Reporting",
    result: "89% time reduction · on time every month",
    industry: "Marketing",
  },
  {
    num: "10",
    tag: "EDUCATION · STUDENT SUCCESS",
    title: "Student Engagement & Completion",
    result: "Drop-off 42% → 28% · 5 hrs/week saved",
    industry: "Education",
  },
  {
    num: "11",
    tag: "PROPERTY MANAGEMENT · OPERATIONS",
    title: "Maintenance Request Triage & Dispatch",
    result: "<4 hr urgent dispatch · 12 hrs/week saved",
    industry: "Real Estate",
  },
  {
    num: "12",
    tag: "ACCOUNTING · FINANCE",
    title: "Accounts Payable Automation",
    result: "77% time reduction · same-day processing",
    industry: "Financial Services",
  },
  {
    num: "13",
    tag: "HEALTH COACHING · SALES",
    title: "Discovery Call Booking & Pre-Call Prep",
    result: "52% conversion · 6 more coaching hrs/week",
    industry: "Healthcare",
  },
  {
    num: "14",
    tag: "B2B SAAS · CUSTOMER SUCCESS",
    title: "Churn Risk Detection & Intervention",
    result: "65% churn reduction · weekly health scores",
    industry: "Technology",
  },
  {
    num: "15",
    tag: "FINTECH · OPERATIONS",
    title: "Transaction Anomaly Detection & Alerts",
    result: "<25 min merchant alert · 50% fewer false positives",
    industry: "Financial Services",
  },
  {
    num: "16",
    tag: "CONTENT · MARKETING",
    title: "Content Repurposing Pipeline",
    result: "4× output · $800/month saved · same day",
    industry: "Marketing",
  },
  {
    num: "17",
    tag: "MENTAL HEALTH · OPERATIONS",
    title: "Patient Intake & Therapist Matching",
    result: "<20 min response · 2 hrs/day saved",
    industry: "Healthcare",
  },
  {
    num: "18",
    tag: "E-COMMERCE · MARKETING",
    title: "AI Personalised Abandoned Cart Recovery",
    result: "6.4% recovery rate · was 2.1%",
    industry: "E-commerce",
  },
  {
    num: "19",
    tag: "LOGISTICS · OPERATIONS",
    title: "Proactive Shipment Delay Communication",
    result: "82% fewer WISMO tickets · 100% proactive",
    industry: "Logistics",
  },
  {
    num: "20",
    tag: "CONSULTING · BUSINESS DEV",
    title: "Automated Proposal Generation",
    result: "76% time reduction · same-day delivery",
    industry: "Professional Services",
  },
];

/* ─── page ───────────────────────────────────────────────────────────────────── */

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleRows =
    activeFilter === "All"
      ? caseRows
      : caseRows.filter((row) => row.industry === activeFilter);

  return (
    <main style={{ background: "white" }}>
      <style>{`
        .proof-row {
          display: grid;
          grid-template-columns: 60px 180px 1fr 1fr auto;
          gap: 24px;
          align-items: center;
          padding: 28px 0;
          border-bottom: 1px solid #DDD3BF;
          transition: background 0.2s ease, padding-left 0.2s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .proof-row:hover {
          background: rgba(234,106,71,0.02);
          padding-left: 8px;
        }
        .proof-row-num {
          font-family: 'Geist Mono', var(--font-geist-mono), monospace;
          font-size: 12px;
          color: #EA6A47;
          letter-spacing: 0.1em;
        }
        .proof-row-tag {
          font-family: 'Geist Mono', var(--font-geist-mono), monospace;
          font-size: 11px;
          color: rgba(34,51,44,0.45);
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-transform: uppercase;
        }
        .proof-row-title {
          font-size: 20px;
          font-weight: 800;
          color: #22332C;
          font-family: var(--font-fraunces), serif;
        }
        .proof-row-result {
          font-size: 14px;
          color: rgba(34,51,44,0.6);
          line-height: 1.5;
        }
        .proof-row-arrow {
          color: #948D7E;
          font-size: 16px;
          transition: color 0.2s ease, transform 0.2s ease;
          justify-self: end;
        }
        .proof-row:hover .proof-row-arrow {
          color: #EA6A47;
          transform: translate(2px, -2px);
        }
        .filter-pill {
          background: white;
          border: 1.5px solid #DDD3BF;
          color: #22332C;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .filter-pill.active {
          background: #22332C;
          color: #F3ECDD;
          border-color: #22332C;
        }
        @media (max-width: 640px) {
          .proof-row {
            grid-template-columns: 32px 1fr auto;
            row-gap: 6px;
          }
          .proof-row-tag,
          .proof-row-result {
            grid-column: 1 / -1;
          }
        }
      `}</style>

      <section style={{ background: "white", padding: "80px 0" }}>
        <div className="max-w-site">
          <h1
            style={{
              fontFamily: "inherit",
              fontSize: 48,
              fontWeight: 900,
              color: "#22332C",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            20 systems. Real problems.
            <br />
            Real outcomes.
          </h1>
          <p
            style={{
              fontFamily: "inherit",
              fontSize: 16,
              color: "rgba(34,51,44,0.7)",
              lineHeight: 1.7,
              marginBottom: 52,
            }}
          >
            Across 12 industries. Every one shipped.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 32 }}>
            {INDUSTRIES.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`filter-pill${activeFilter === industry ? " active" : ""}`}
              >
                {industry}
              </button>
            ))}
          </div>

          <div style={{ width: "100%", height: 1, background: "#DDD3BF" }} />

          {visibleRows.map((row) => (
            <Link key={row.num} href="/case-studies" className="proof-row">
              <span className="proof-row-num">{row.num}</span>
              <span className="proof-row-tag">{row.tag}</span>
              <span className="proof-row-title">{row.title}</span>
              <span className="proof-row-result">{row.result}</span>
              <span className="proof-row-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
