"use client";
import { useState } from "react";

/* ── geometry constants ──────────────────────────────────────────── */
const CX = 210;          // SVG center x
const CY = 180;          // SVG center y
const CR = 72;           // center circle radius
const OR = 130;          // orbit radius (center-to-node-center)
const NR = 44;           // node circle radius

// Node positions in the initial SVG viewport
// Consulting  –90° (top),  Projects +30° (bottom-right),  Workshops +150° (bottom-left)
const NODES = [
  { id: "consulting", cx: 210,                                          cy: CY - OR,       fill: "#EA6A47", num: "01", label: "CONSULTING" },
  { id: "projects",   cx: Math.round(CX + OR * Math.cos(Math.PI / 6)), cy: Math.round(CY + OR * Math.sin(Math.PI / 6)),  fill: "#22332C", num: "02", label: "PROJECTS"   },
  { id: "workshops",  cx: Math.round(CX + OR * Math.cos(5 * Math.PI / 6)), cy: Math.round(CY + OR * Math.sin(5 * Math.PI / 6)), fill: "#EA6A47", num: "03", label: "WORKSHOPS"  },
] as const;
// → consulting (210, 50)   projects (323, 245)   workshops (97, 245)

/* ── component ───────────────────────────────────────────────────── */
export default function ServicesHubDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const paused = hovered !== null;

  const orbitStyle = {
    transformOrigin: `${CX}px ${CY}px`,
    animation: "svc-orbit 12s linear infinite",
    animationPlayState: paused ? "paused" : "running",
  } as React.CSSProperties;

  const counterStyle = (ncx: number, ncy: number) => ({
    transformOrigin: `${ncx}px ${ncy}px`,
    animation: "svc-counter 12s linear infinite",
    animationPlayState: paused ? "paused" : "running",
  } as React.CSSProperties);

  return (
    <svg
      viewBox="0 0 420 360"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
    >
      {/* ── spokes (inside orbit group so they track the nodes) ───── */}
      <g style={orbitStyle}>
        {NODES.map((n) => (
          <line
            key={`spoke-${n.id}`}
            x1={CX} y1={CY} x2={n.cx} y2={n.cy}
            stroke="#E7E0D2" strokeWidth="1.5" strokeDasharray="5 4"
          />
        ))}
      </g>

      {/* ── glow ring (static, sits on top of spokes) ─────────────── */}
      <circle cx={CX} cy={CY} r={CR + 20} fill="none" stroke="#F3ECDD" strokeWidth="22" />

      {/* ── center circle — pulse only, does NOT rotate ───────────── */}
      <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: "svc-pulse 3s ease-in-out infinite" } as React.CSSProperties}>
        <circle cx={CX} cy={CY} r={CR} fill="#22332C" />
        <text x={CX} y={CY - 14} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="rgba(255,255,255,0.55)" letterSpacing="0.03em">The clearest</text>
        <text x={CX} y={CY + 1}  textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="rgba(255,255,255,0.55)">ops in</text>
        <text x={CX} y={CY + 16} textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="10.5" fill="rgba(255,255,255,0.55)">your space</text>
      </g>

      {/* ── orbiting nodes ────────────────────────────────────────── */}
      <g style={orbitStyle}>
        {NODES.map((n) => {
          const isHovered = hovered === n.id;
          return (
            <g key={n.id}>
              {/*
               * Counter-rotation group: rotates -θ around the node's INITIAL
               * SVG position.  Combined with the parent's +θ orbit, this keeps
               * all text inside the circle perfectly upright at every angle.
               */}
              <g style={counterStyle(n.cx, n.cy)}>
                {/* Scale wrapper — only scales the active hovered node */}
                <g
                  style={{
                    transformOrigin: `${n.cx}px ${n.cy}px`,
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                    transition: "transform 0.2s ease",
                    cursor: "pointer",
                  } as React.CSSProperties}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* circle */}
                  <circle cx={n.cx} cy={n.cy} r={NR} fill={n.fill} />

                  {/* number — Playfair, centered in circle */}
                  <text
                    x={n.cx} y={n.cy - 8}
                    textAnchor="middle" dominantBaseline="auto"
                    fontFamily="Playfair Display, serif"
                    fontSize="20" fontWeight="700" fill="#fff"
                    style={{ pointerEvents: "none" } as React.CSSProperties}
                  >
                    {n.num}
                  </text>

                  {/* label — DM Mono, below number, stays inside circle */}
                  <text
                    x={n.cx} y={n.cy + 13}
                    textAnchor="middle" dominantBaseline="auto"
                    fontFamily="DM Mono, monospace"
                    fontSize="7.5" fill="rgba(255,255,255,0.78)" letterSpacing="0.1em"
                    style={{ pointerEvents: "none" } as React.CSSProperties}
                  >
                    {n.label}
                  </text>

                  {/* native browser tooltip */}
                  <title>{n.label}</title>
                </g>
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
