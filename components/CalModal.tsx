"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CAL_LINK = "https://cal.com/consult-with-riz/work";

export default function CalBookingButton({
  children,
  className,
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onClick?.();
          setOpen(true);
        }}
        className={className}
        style={style}
      >
        {children}
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="cal-modal-backdrop" onClick={() => setOpen(false)}>
            <div className="cal-modal-panel" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="cal-modal-close"
                onClick={() => setOpen(false)}
                aria-label="Close booking dialog"
              >
                ×
              </button>
              <iframe
                src={`${CAL_LINK}?embed=true&theme=light`}
                title="Book a call with Riz"
                className="cal-modal-iframe"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
