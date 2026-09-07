// A short, bright "pop" played when someone clicks a booking CTA.
// Synthesised rather than shipped as an audio file so it costs nothing to
// load and can never 404. Same shape as playToggleSound() in app/page.tsx:
// one lazily-created AudioContext, created inside the click gesture so the
// browser's autoplay policy allows it, and a try/catch so audio trouble can
// never interfere with the booking flow.

let popCtx: AudioContext | null = null;

export function playPopSound() {
  if (typeof window === "undefined") return;

  // Non-essential feedback — stay silent for anyone who asked for less motion.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    if (!popCtx) popCtx = new AudioCtx();
    const ctx = popCtx;
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    // Body of the pop: fast rise, fast decay.
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.06);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);

    // A little sparkle over the top so it reads as a pop, not a beep.
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(1320, now + 0.01);
    shimmerGain.gain.setValueAtTime(0.05, now + 0.01);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    shimmer.start(now + 0.01);
    shimmer.stop(now + 0.11);
  } catch {
    // Fail silently - e.g. Web Audio unsupported or blocked before user gesture.
  }
}
