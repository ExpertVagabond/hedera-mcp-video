import React from "react";
import {
  AbsoluteFill, Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";

const BG = "#070b0a", PANEL = "#0b1310", INK = "#e7f4ef", MUTED = "#7a8a86", ACCENT = "#3ec6a8", LINE = "#16271f";
const MONO = 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace';

export type ShortProps = { title: string; sub: string; result: string };

function useEnter(delay = 0) {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return { opacity: s, y: interpolate(s, [0, 1], [26, 0]) };
}

export const UseCaseShort: React.FC<ShortProps> = ({ title, sub, result }) => {
  const f = useCurrentFrame();
  const { durationInFrames: D } = useVideoConfig();
  const top = useEnter(4), t = useEnter(12), s = useEnter(22), r = useEnter(34), cta = useEnter(48);
  const out = interpolate(f, [D - 14, D], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ fontFamily: MONO, opacity: out }}>
      <AbsoluteFill style={{ backgroundColor: BG, backgroundImage: `radial-gradient(ellipse at 50% 0%, #0d1a16 0%, ${BG} 60%), linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`, backgroundSize: "100% 100%, 56px 56px, 56px 56px" }} />
      <Audio src={staticFile("music.m4a")} volume={(fr) => interpolate(fr, [0, 16, D - 20, D], [0, 0.18, 0.18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "150px 80px 180px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: top.opacity, transform: `translateY(${top.y}px)` }}>
          <Img src={staticFile("hedera-mark.png")} style={{ width: 64, height: 64 }} />
          <span style={{ color: MUTED, fontSize: 38 }}>hedera<span style={{ color: ACCENT }}>-mcp</span></span>
        </div>
        <div style={{ color: ACCENT, fontSize: 30, letterSpacing: 4, textTransform: "uppercase", marginTop: 90, opacity: t.opacity }}>use case</div>
        <div style={{ fontSize: 92, fontWeight: 700, color: INK, textAlign: "center", marginTop: 16, lineHeight: 1.05, whiteSpace: "pre-line", opacity: t.opacity, transform: `translateY(${t.y}px)` }}>{title}</div>
        <div style={{ fontSize: 44, color: MUTED, textAlign: "center", marginTop: 28, opacity: s.opacity, transform: `translateY(${s.y}px)` }}>{sub}</div>
        <div style={{ marginTop: 70, background: PANEL, border: `1px solid ${LINE}`, borderLeft: `4px solid ${ACCENT}`, borderRadius: 14, padding: "28px 36px", opacity: r.opacity, transform: `translateY(${r.y}px)` }}>
          <span style={{ color: ACCENT, fontSize: 40 }}>✓ </span>
          <span style={{ color: INK, fontSize: 40 }}>{result}</span>
        </div>
        <div style={{ position: "absolute", bottom: 150, color: MUTED, fontSize: 34, opacity: cta.opacity }}>npx @purplesquirrel/hedera-mcp</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SHORTS: Record<string, ShortProps> = {
  notary: { title: "HCS Notary", sub: "proof-of-existence in one call", result: "doc hash → consensus timestamp, tamper-evident" },
  audit: { title: "Agent\nAudit Trail", sub: "verifiable AI accountability", result: "every agent action logged & replayable on-chain" },
  payments: { title: "Agent-to-Agent\nPayments", sub: "metered agentic commerce", result: "agents transact in tokens, with a ledger" },
  tax: { title: "Self-Taxing\nToken", sub: "protocol-native fees", result: "every transfer tolls a treasury — no contract" },
};
