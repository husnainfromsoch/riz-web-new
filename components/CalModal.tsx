"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "https://cal.com/consult-with-riz/consultingcall";
const CAL_NAMESPACE = "consultingcall";

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
  useEffect(() => {
    let cancelled = false;

    (async function initCal() {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        if (cancelled) return;
        cal("ui", {
          theme: "auto",
          styles: { branding: { brandColor: "#000000" } },
        });
      } catch {
        // If the embed script fails to load, the plain <a> href still works.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Stop the native anchor from navigating/opening a new tab on its own.
    // Cal's embed script uses a delegated click listener (not the anchor's
    // default action) to open the popup, so preventDefault() here doesn't
    // interfere with it — only the native href navigation is suppressed.
    e.preventDefault();

    onClick?.();

    // Timeout-based fallback: if the popup never signals readiness,
    // clear any stuck overlay and fall back to opening a new tab.
    const timer = setTimeout(() => {
      const overlay = document.querySelector("[data-cal-namespace], .cal-embed, #cal-embed-container");
      if (overlay && !document.querySelector("[data-cal-link] iframe")) {
        overlay.remove();
      }
      window.open(CAL_LINK, "_blank", "noopener,noreferrer");
    }, 4500);

    getCalApi({ namespace: CAL_NAMESPACE })
      .then((cal) => {
        cal("on", {
          action: "linkReady",
          callback: () => clearTimeout(timer),
        });
      })
      .catch(() => {
        clearTimeout(timer);
      });
  };

  return (
    <a
      href={CAL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-cal-link={CAL_LINK.replace("https://cal.com/", "")}
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-config={JSON.stringify({ layout: "month_view" })}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
