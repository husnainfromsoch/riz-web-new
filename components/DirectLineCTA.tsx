import Link from "next/link";
import CalBookingButton from "@/components/CalModal";

type DirectLineCTAProps = {
  heading?: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
};

export default function DirectLineCTA({
  heading = (
    <>
      Have a chat{" "}
      <span className="chat-hayat-heading-accent">with me?</span>
    </>
  ),
  description = "Thirty minutes. No deck, no pitch. Just the problem on your desk and the operator who has solved it before.",
  primaryLabel,
  primaryHref,
  secondaryLabel = "Ask Claude about Riz →",
  secondaryHref = "https://claude.ai",
  secondaryExternal = true,
}: DirectLineCTAProps) {
  return (
    <>
      <style>{`
        .chat-hayat-card {
          background: linear-gradient(135deg, #F5E6D3 0%, #EDD5C0 30%, #E8D0D8 65%, #DCC8E0 100%);
          border-radius: 24px;
          padding: 52px 48px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 52px;
          align-items: center;
        }
        .chat-hayat-photo-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .chat-hayat-photo {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center 15%;
          border: 4px solid #ffffff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          display: block;
        }
        .chat-hayat-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border-radius: 100px;
          padding: 6px 14px;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #22332C;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          white-space: nowrap;
        }
        .chat-hayat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22C55E;
          flex-shrink: 0;
        }
        .chat-hayat-heading {
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 40px;
          font-weight: 900;
          color: #22332C;
          line-height: 1.2;
          margin: 0 0 16px;
        }
        .chat-hayat-heading-accent {
          color: #EA6A47;
          font-style: italic;
        }
        .chat-hayat-desc {
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 16px;
          color: rgba(34,51,44,0.7);
          line-height: 1.7;
          margin: 0 0 28px;
          max-width: 440px;
        }
        .chat-hayat-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .chat-hayat-btn-primary {
          display: inline-flex;
          align-items: center;
          background: #22332C;
          color: #F3ECDD;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.25s ease;
        }
        .chat-hayat-btn-primary:hover {
          background: #EA6A47;
        }
        button.chat-hayat-btn-primary {
          border: none;
          cursor: pointer;
        }
        .chat-hayat-btn-secondary {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          color: #22332C;
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 100px;
          border: none;
          text-decoration: none;
          transition: background 0.25s ease;
        }
        .chat-hayat-btn-secondary:hover {
          background: rgba(255,255,255,0.8);
        }
        .chat-hayat-credit {
          font-family: var(--font-inter-tight), 'Inter Tight', sans-serif;
          font-size: 13px;
          color: rgba(34,51,44,0.7);
          font-style: italic;
          margin: 20px 0 0;
        }
        @media (max-width: 768px) {
          .chat-hayat-card {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            gap: 32px;
            padding: 40px 28px;
          }
          .chat-hayat-buttons {
            justify-content: center;
          }
          .chat-hayat-desc {
            max-width: none;
          }
        }
      `}</style>

      <div className="chat-hayat-card">
        {/* Left col — photo + badge */}
        <div className="chat-hayat-photo-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/riz-photo-new.jpg"
            alt="Rizwan Mahmood"
            className="chat-hayat-photo"
          />
          <div className="chat-hayat-badge">
            <span className="chat-hayat-dot" />
            Available this week
          </div>
        </div>

        {/* Right col — content */}
        <div>
          <h2 className="chat-hayat-heading">{heading}</h2>

          <p className="chat-hayat-desc">{description}</p>

          <div className="chat-hayat-buttons">
            {primaryHref ? (
              <a href={primaryHref} className="chat-hayat-btn-primary">
                {primaryLabel}
              </a>
            ) : (
              <CalBookingButton className="chat-hayat-btn-primary">
                {primaryLabel ?? "Book a call →"}
              </CalBookingButton>
            )}
            {secondaryExternal ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-hayat-btn-secondary"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link href={secondaryHref} className="chat-hayat-btn-secondary">
                {secondaryLabel}
              </Link>
            )}
          </div>

          <p className="chat-hayat-credit">
            Rizwan Mahmood · Operator and AI Builder
          </p>
        </div>
      </div>
    </>
  );
}
