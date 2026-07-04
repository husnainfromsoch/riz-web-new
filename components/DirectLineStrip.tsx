"use client";
import CalBookingButton from "@/components/CalModal";

const columns = [
  {
    label: "EMAIL",
    value: "riz@withsoch.com",
    href: "mailto:riz@withsoch.com",
  },
  {
    label: "CALENDAR",
    value: "Book a 30-min call",
  },
  {
    label: "LOCATION",
    value: "Tallinn · EST",
  },
  {
    label: "COMPANY",
    value: "withsoch.com",
    href: "https://withsoch.com",
    external: true,
  },
];

export default function DirectLineStrip() {
  return (
    <>
      <style>{`
        .dl-strip {
          background: #F1EBDE;
          border-top: 1px solid #E2DACB;
          padding: 56px 0;
        }
        .dl-strip-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .dl-strip-col {
          display: block;
          text-decoration: none;
          -webkit-tap-highlight-color: rgba(234,106,71,0.15);
        }
        .dl-strip-label {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #EA6A47;
          margin: 0 0 8px;
        }
        .dl-strip-value {
          font-family: var(--font-fraunces), serif;
          font-size: 1.1rem;
          color: #22332C;
          margin: 0;
          transition: color 0.2s ease;
        }
        a.dl-strip-col:hover .dl-strip-value,
        button.dl-strip-col:hover .dl-strip-value {
          color: #EA6A47;
        }
        button.dl-strip-col {
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          cursor: pointer;
          width: 100%;
        }
        @media (max-width: 768px) {
          .dl-strip-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px 20px;
          }
        }
        @media (max-width: 480px) {
          .dl-strip-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

      <div className="dl-strip">
        <div className="max-w-site">
          <div className="dl-strip-grid">
            {columns.map((col) => {
              if (col.label === "CALENDAR") {
                return (
                  <CalBookingButton key={col.label} className="dl-strip-col">
                    <p className="dl-strip-label">{col.label}</p>
                    <p className="dl-strip-value">{col.value}</p>
                  </CalBookingButton>
                );
              }
              return (
                <a
                  key={col.label}
                  href={col.href}
                  target={col.external ? "_blank" : undefined}
                  rel={col.external ? "noopener noreferrer" : undefined}
                  className="dl-strip-col"
                >
                  <p className="dl-strip-label">{col.label}</p>
                  <p className="dl-strip-value">{col.value}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
