"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type CarouselCard = {
  id: string;
  kind: "video" | "instagram" | "placeholder";
  src?: string;
  instagramId?: string;
  poster?: string;
  tag: string;
  title: string;
  description: string;
};

const carouselCards: CarouselCard[] = [
  {
    id: "card-1",
    kind: "instagram",
    instagramId: "DZx-_OHOqg4",
    tag: "REEL",
    title: "A message to AI influencers",
    description: "Calling out the hype — what actually ships vs what gets posted.",
  },
  {
    id: "card-2",
    kind: "instagram",
    instagramId: "DZr8EPSOkdB",
    tag: "REEL",
    title: "Operator perspective",
    description: "How an operator thinks about building systems. A live breakdown.",
  },
  {
    id: "card-3",
    kind: "instagram",
    instagramId: "DXltD2Ujl5s",
    tag: "REEL",
    title: "Stand-up · The AI bit",
    description: "The bit about AI that landed. Live at the mic in Tallinn.",
  },
  {
    id: "card-4",
    kind: "placeholder",
    poster: "/Photos/riz-lake.jpg",
    tag: "COMING SOON",
    title: "Podcast clips",
    description: "Long-form breakdowns, dropping soon.",
  },
  {
    id: "card-5",
    kind: "placeholder",
    poster: "/Photos/riz-vespa.jpg",
    tag: "COMING SOON",
    title: "Behind the build",
    description: "Raw footage from client builds, dropping soon.",
  },
];

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function VideoCard({
  card,
  isActive,
  onActivate,
  onDeactivate,
  registerVideo,
}: {
  card: CarouselCard;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  registerVideo: (el: HTMLVideoElement | null) => void;
}) {
  function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  }

  return (
    <div className="pc-card" data-card-id={card.id}>
      <div className="pc-video-wrap" onClick={handleToggle}>
        <video
          ref={registerVideo}
          src={card.src}
          poster={card.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="pc-video"
        />
        <div className="pc-gradient" />
        <span className="pc-badge">{card.tag}</span>
        <div className={`pc-play-overlay${isActive ? " pc-play-overlay--active" : ""}`}>
          <div className="pc-play-btn">{isActive ? <PauseIcon /> : <PlayIcon />}</div>
        </div>
        <div className="pc-footer">
          <p className="pc-title">{card.title}</p>
          <p className="pc-desc">{card.description}</p>
        </div>
      </div>
    </div>
  );
}

function InstagramCard({ card }: { card: CarouselCard }) {
  return (
    <div className="pc-card" data-card-id={card.id}>
      <div className="pc-video-wrap pc-video-wrap--ig">
        <iframe
          className="pc-ig-frame"
          src={`https://www.instagram.com/reel/${card.instagramId}/embed/captioned/`}
          title={card.title}
          loading="lazy"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <span className="pc-badge">{card.tag}</span>
      </div>
    </div>
  );
}

function PlaceholderCard({ card }: { card: CarouselCard }) {
  return (
    <div className="pc-card" data-card-id={card.id}>
      <div className="pc-video-wrap pc-video-wrap--placeholder">
        {card.poster && (
          <Image
            src={card.poster}
            alt={card.title}
            fill
            sizes="(max-width: 767px) 78vw, 22vw"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="pc-gradient pc-gradient--placeholder" />
        <span className="pc-badge pc-badge--soon">{card.tag}</span>
        <div className="pc-footer">
          <p className="pc-title">{card.title}</p>
          <p className="pc-desc">{card.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function PersonalityCarousel() {
  const rowRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const activeIdRef = useRef<string | null>(null);
  activeIdRef.current = activeId;

  const registerVideo = useCallback((id: string, el: HTMLVideoElement | null) => {
    if (el) videoRefs.current.set(id, el);
    else videoRefs.current.delete(id);
  }, []);

  const deactivate = useCallback((id: string) => {
    const video = videoRefs.current.get(id);
    if (video) {
      video.muted = true;
      video.pause();
    }
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const activate = useCallback((id: string) => {
    videoRefs.current.forEach((video, videoId) => {
      if (videoId === id) {
        video.muted = false;
        video.play().catch(() => {});
      } else {
        video.muted = true;
      }
    });
    setActiveId(id);
  }, []);

  // Autoplay-muted-on-scroll-into-view + reset unmuted state when a card scrolls away
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wrap = entry.target as HTMLElement;
          const id = wrap.dataset.cardId;
          if (!id) return;
          const video = videoRefs.current.get(id);
          if (!video) return;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
            if (activeIdRef.current === id) {
              video.muted = true;
              setActiveId(null);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    const cards = rowRef.current?.querySelectorAll("[data-card-id]");
    cards?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const updateScrollState = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    setCanScrollLeft(row.scrollLeft > 8);
    setCanScrollRight(row.scrollLeft < row.scrollWidth - row.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const row = rowRef.current;
    if (!row) return;
    row.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      row.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Filled in by the auto-scroll effect below; called by the arrow buttons
  // so a manual nudge pauses the auto-scroll the same way hover/touch does.
  const pauseAutoScrollRef = useRef<() => void>(() => {});
  const resumeAutoScrollRef = useRef<() => void>(() => {});

  function scrollByCard(direction: 1 | -1) {
    const row = rowRef.current;
    if (!row) return;
    pauseAutoScrollRef.current();
    resumeAutoScrollRef.current();
    const card = row.querySelector<HTMLElement>("[data-card-id]");
    const cardWidth = card ? card.getBoundingClientRect().width : 260;
    const gap = 20;
    row.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  }

  // Slow, continuous auto-scroll that pauses on hover/touch/active playback
  // and whenever the user manually scrolls, resuming a moment later.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // scroll-snap-type fights programmatic scrollLeft nudges (it snaps back
    // to the nearest card after every micro-adjustment), so it's only left
    // on while the user is actually interacting with the row.
    const originalSnap = row.style.scrollSnapType;
    const disableSnap = () => {
      row.style.scrollSnapType = "none";
    };
    const restoreSnap = () => {
      row.style.scrollSnapType = originalSnap;
    };

    let paused = false;
    let direction: 1 | -1 = 1;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;
    let rafId: number;

    const pause = () => {
      paused = true;
      restoreSnap();
    };
    const resume = () => {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        paused = false;
        disableSnap();
      }, 2200);
    };

    pauseAutoScrollRef.current = pause;
    resumeAutoScrollRef.current = resume;

    const handleManualScroll = () => {
      pause();
      resume();
    };

    row.addEventListener("pointerenter", pause);
    row.addEventListener("pointerleave", resume);
    row.addEventListener("touchstart", pause, { passive: true });
    row.addEventListener("touchend", resume, { passive: true });
    row.addEventListener("wheel", handleManualScroll, { passive: true });
    row.addEventListener("pointerdown", pause);
    row.addEventListener("pointerup", resume);

    disableSnap();
    const tick = () => {
      if (!paused && activeIdRef.current === null) {
        const maxScroll = row.scrollWidth - row.clientWidth;
        if (maxScroll > 0) {
          if (row.scrollLeft >= maxScroll - 1) direction = -1;
          else if (row.scrollLeft <= 1) direction = 1;
          row.scrollLeft += direction * 0.6;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      restoreSnap();
      row.removeEventListener("pointerenter", pause);
      row.removeEventListener("pointerleave", resume);
      row.removeEventListener("touchstart", pause);
      row.removeEventListener("touchend", resume);
      row.removeEventListener("wheel", handleManualScroll);
      row.removeEventListener("pointerdown", pause);
      row.removeEventListener("pointerup", resume);
    };
  }, []);

  return (
    <div className="pc-wrap">
      <div className="pc-row" ref={rowRef}>
        {carouselCards.map((card) => {
          if (card.kind === "video") {
            return (
              <VideoCard
                key={card.id}
                card={card}
                isActive={activeId === card.id}
                onActivate={() => activate(card.id)}
                onDeactivate={() => deactivate(card.id)}
                registerVideo={(el) => registerVideo(card.id, el)}
              />
            );
          }
          if (card.kind === "instagram") {
            return <InstagramCard key={card.id} card={card} />;
          }
          return <PlaceholderCard key={card.id} card={card} />;
        })}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        className={`pc-arrow pc-arrow-left${canScrollLeft ? "" : " pc-arrow-hidden"}`}
        onClick={() => scrollByCard(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        className={`pc-arrow pc-arrow-right${canScrollRight ? "" : " pc-arrow-hidden"}`}
        onClick={() => scrollByCard(1)}
      >
        ›
      </button>
    </div>
  );
}
