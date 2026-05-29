import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";

const BG = "#070b0a", PANEL = "#0b1310", INK = "#e7f4ef", MUTED = "#7a8a86", ACCENT = "#3ec6a8", LINE = "#16271f";
const MONO = 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace';

const Grid: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: BG, backgroundImage: `radial-gradient(ellipse at 50% 0%, #0d1a16 0%, ${BG} 60%), linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`, backgroundSize: "100% 100%, 56px 56px, 56px 56px" }} />
);
const Music: React.FC = () => {
  const { durationInFrames: D } = useVideoConfig();
  return <Audio src={staticFile("music.m4a")} volume={(f) => interpolate(f, [0, 24, D - 30, D], [0, 0.2, 0.2, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />;
};
const fade = (f: number, dur: number) => interpolate(f, [0, 14, dur - 16, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
function useEnter(delay = 0) {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return { opacity: s, y: interpolate(s, [0, 1], [26, 0]) };
}
const Wrap: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: fade(f, dur), alignItems: "center", justifyContent: "center", fontFamily: MONO, padding: "150px 70px 170px" }}>{children}</AbsoluteFill>;
};
const Row: React.FC<{ a: string; b: string; i: number }> = ({ a, b, i }) => {
  const { opacity, y } = useEnter(8 + i * 8);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "26px 34px", background: PANEL, border: `1px solid ${LINE}`, borderLeft: `4px solid ${ACCENT}`, borderRadius: 12, opacity, transform: `translateY(${y}px)` }}>
      <span style={{ color: INK, fontSize: 44, fontWeight: 700 }}>{a}</span>
      <span style={{ color: MUTED, fontSize: 34, textAlign: "right" }}>{b}</span>
    </div>
  );
};

const Hook: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame(); const { fps } = useVideoConfig();
  const pop = spring({ frame: f, fps, config: { damping: 200 } });
  const t = useEnter(16); const v = useEnter(36);
  return (
    <Wrap dur={dur}>
      <Img src={staticFile("hedera-mark.png")} style={{ width: 220, height: 220, opacity: pop, transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])})` }} />
      <div style={{ fontSize: 120, fontWeight: 700, color: INK, marginTop: 40, opacity: t.opacity, transform: `translateY(${t.y}px)` }}>hedera<span style={{ color: ACCENT }}>-mcp</span></div>
      <div style={{ fontSize: 42, color: MUTED, marginTop: 10 }}>Model Context Protocol for Hedera</div>
      <div style={{ marginTop: 70, fontSize: 44, fontStyle: "italic", color: MUTED, textAlign: "center", opacity: v.opacity, transform: `translateY(${v.y}px)` }}>"I built the Hedera MCP<br />I wanted to exist."</div>
    </Wrap>
  );
};
const BuildOnly: React.FC<{ dur: number }> = ({ dur }) => {
  const h = useEnter(2);
  return (
    <Wrap dur={dur}>
      <div style={{ color: ACCENT, fontSize: 38, letterSpacing: 4, textTransform: "uppercase" }}>build-only</div>
      <div style={{ fontSize: 86, fontWeight: 700, color: INK, textAlign: "center", margin: "20px 0 50px", opacity: h.opacity, transform: `translateY(${h.y}px)` }}>It never touches<br />your keys.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
        <Row a="agent asks" b="server builds the tx" i={0} />
        <Row a="you sign" b="your wallet / SDK" i={1} />
        <Row a="on-chain" b="submitted by you" i={2} />
      </div>
    </Wrap>
  );
};
const Proof: React.FC<{ dur: number }> = ({ dur }) => {
  const h = useEnter(2);
  return (
    <Wrap dur={dur}>
      <div style={{ fontSize: 76, fontWeight: 700, color: INK, textAlign: "center", marginBottom: 46, opacity: h.opacity, transform: `translateY(${h.y}px)` }}>Not a demo.<br />I ran it on-chain.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
        <Row a="72/73" b="build + read tools" i={0} />
        <Row a="31/31" b="full lifecycle, on-chain" i={1} />
        <Row a="E2E" b="real Solidity contract" i={2} />
        <Row a="73 + 4" b="tools + MCP resources" i={3} />
      </div>
    </Wrap>
  );
};
const Uses: React.FC<{ dur: number }> = ({ dur }) => {
  const h = useEnter(2);
  return (
    <Wrap dur={dur}>
      <div style={{ fontSize: 60, fontWeight: 700, color: INK, textAlign: "center", marginBottom: 40, opacity: h.opacity, transform: `translateY(${h.y}px)` }}>Things only Hedera<br />makes easy</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
        <Row a="HCS notary" b="timestamp + verify" i={0} />
        <Row a="agent audit trail" b="actions logged on-chain" i={1} />
        <Row a="agent payments" b="tokens + ledger" i={2} />
        <Row a="self-taxing token" b="no contract" i={3} />
      </div>
    </Wrap>
  );
};
const CTA: React.FC<{ dur: number }> = ({ dur }) => {
  const c = useEnter(8); const b = useEnter(28);
  return (
    <Wrap dur={dur}>
      <div style={{ fontSize: 70, fontWeight: 700, color: INK, textAlign: "center" }}>Build on Hedera<br />by asking.</div>
      <div style={{ marginTop: 46, background: PANEL, border: `1px solid ${LINE}`, borderRadius: 14, padding: "30px 38px", opacity: c.opacity, transform: `translateY(${c.y}px)` }}>
        <span style={{ color: ACCENT, fontSize: 40 }}>npx @purplesquirrel/<br />hedera-mcp</span>
      </div>
      <div style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 20, opacity: b.opacity, transform: `translateY(${b.y}px)` }}>
        <span style={{ color: MUTED, fontSize: 38 }}>Built for</span>
        <Img src={staticFile("hedera-logo-white.png")} style={{ height: 52 }} />
      </div>
    </Wrap>
  );
};

export const VerticalCut: React.FC = () => (
  <AbsoluteFill>
    <Grid />
    <Music />
    <Sequence durationInFrames={140}><Hook dur={140} /></Sequence>
    <Sequence from={140} durationInFrames={150}><BuildOnly dur={150} /></Sequence>
    <Sequence from={290} durationInFrames={180}><Proof dur={180} /></Sequence>
    <Sequence from={470} durationInFrames={160}><Uses dur={160} /></Sequence>
    <Sequence from={630} durationInFrames={150}><CTA dur={150} /></Sequence>
  </AbsoluteFill>
);
