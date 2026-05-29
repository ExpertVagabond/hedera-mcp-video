import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const BG = "#070b0a";
const PANEL = "#0b1310";
const INK = "#e7f4ef";
const MUTED = "#7a8a86";
const ACCENT = "#3ec6a8";
const LINE = "#16271f";
const MONO = 'ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace';

const GridBG: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: BG,
      backgroundImage: `radial-gradient(ellipse at 50% 0%, #0d1a16 0%, ${BG} 60%),
        linear-gradient(${LINE} 1px, transparent 1px),
        linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
      backgroundSize: "100% 100%, 64px 64px, 64px 64px",
    }}
  />
);

// Fade in/hold/out across a scene of `dur` frames.
const sceneFade = (f: number, dur: number) =>
  interpolate(f, [0, 14, dur - 16, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Spring entrance → {opacity, y}
function useEnter(delay = 0) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return { opacity: s, y: interpolate(s, [0, 1], [22, 0]) };
}

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      border: `1px solid ${LINE}`,
      background: PANEL,
      color: ACCENT,
      borderRadius: 6,
      padding: "8px 16px",
      fontSize: 26,
    }}
  >
    {children}
  </span>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ color: ACCENT, fontSize: 26, letterSpacing: 4, textTransform: "uppercase" }}>
    {children}
  </div>
);

const Voice: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const { opacity, y } = useEnter(delay);
  return (
    <div style={{ color: MUTED, fontSize: 32, fontStyle: "italic", opacity, transform: `translateY(${y}px)` }}>
      {children}
    </div>
  );
};

// ---------- Scene 1: Hook ----------
const SceneHook: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: f, fps, config: { damping: 200 } });
  const markScale = interpolate(pop, [0, 1], [0.6, 1]);
  const t1 = useEnter(14);
  const t2 = useEnter(26);
  return (
    <AbsoluteFill style={{ opacity: sceneFade(f, dur), alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <Img
          src={staticFile("hedera-mark.png")}
          style={{ width: 150, height: 150, opacity: pop, transform: `scale(${markScale})` }}
        />
        <div style={{ fontFamily: MONO }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: INK, letterSpacing: -2, opacity: t1.opacity, transform: `translateY(${t1.y}px)` }}>
            hedera<span style={{ color: ACCENT }}>-mcp</span>
          </div>
          <div style={{ fontSize: 34, color: MUTED, opacity: t2.opacity, transform: `translateY(${t2.y}px)` }}>
            Model Context Protocol for Hedera
          </div>
        </div>
      </div>
      <div style={{ marginTop: 54, fontFamily: MONO }}>
        <Voice delay={40}>"I built the Hedera MCP I wanted to exist."</Voice>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 2: Build-only ----------
const Step: React.FC<{ i: number; label: string; sub: string; last?: boolean }> = ({ i, label, sub, last }) => {
  const { opacity, y } = useEnter(20 + i * 16);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, opacity, transform: `translateY(${y}px)` }}>
      <div style={{ background: PANEL, border: `1px solid ${LINE}`, borderRadius: 10, padding: "26px 30px", minWidth: 320 }}>
        <div style={{ color: ACCENT, fontSize: 24 }}>{label}</div>
        <div style={{ color: MUTED, fontSize: 22, marginTop: 6 }}>{sub}</div>
      </div>
      {!last && <div style={{ color: ACCENT, fontSize: 44 }}>→</div>}
    </div>
  );
};

const SceneBuildOnly: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const h = useEnter(2);
  return (
    <AbsoluteFill style={{ opacity: sceneFade(f, dur), alignItems: "center", justifyContent: "center", fontFamily: MONO }}>
      <Eyebrow>build-only · never holds keys</Eyebrow>
      <div style={{ fontSize: 72, fontWeight: 700, color: INK, marginTop: 18, opacity: h.opacity, transform: `translateY(${h.y}px)` }}>
        It never touches your keys.
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 56 }}>
        <Step i={0} label="agent asks" sub="hedera-mcp builds the tx" />
        <Step i={1} label="you sign" sub="your wallet / SDK" />
        <Step i={2} label="on-chain" sub="submitted by you" last />
      </div>
      <div style={{ marginTop: 50 }}>
        <Voice delay={70}>"Reads are free. Writes come back unsigned."</Voice>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 3: Coverage ----------
const services: [string, string][] = [
  ["Account", "8"], ["Token / HTS", "23"], ["Consensus / HCS", "6"], ["Smart Contract", "6"],
  ["File", "4"], ["Schedule", "4"], ["Network", "7"], ["Analytics", "14"],
];
const SvcRow: React.FC<{ name: string; n: string; i: number }> = ({ name, n, i }) => {
  const { opacity, y } = useEnter(10 + i * 7);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: 520, padding: "16px 22px", background: PANEL, border: `1px solid ${LINE}`, borderRadius: 8, opacity, transform: `translateY(${y}px)` }}>
      <span style={{ color: INK, fontSize: 30 }}>{name}</span>
      <span style={{ color: ACCENT, fontSize: 30, fontWeight: 700 }}>{n}</span>
    </div>
  );
};
const SceneCoverage: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const h = useEnter(2);
  const tot = useEnter(70);
  return (
    <AbsoluteFill style={{ opacity: sceneFade(f, dur), alignItems: "center", justifyContent: "center", fontFamily: MONO }}>
      <div style={{ fontSize: 64, fontWeight: 700, color: INK, opacity: h.opacity, transform: `translateY(${h.y}px)` }}>
        Every Hedera service.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 44 }}>
        {services.map(([name, n], i) => <SvcRow key={name} name={name} n={n} i={i} />)}
      </div>
      <div style={{ marginTop: 40, fontSize: 36, color: MUTED, opacity: tot.opacity, transform: `translateY(${tot.y}px)` }}>
        <span style={{ color: ACCENT, fontWeight: 700 }}>73 tools</span> · 4 resources · one server
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 4: Proof ----------
const proof: [string, string][] = [
  ["72/73", "build + read tools"], ["31/31", "full lifecycle, on-chain"],
  ["E2E", "real Solidity contract"], ["live", "verified on testnet"],
];
const MetricCard: React.FC<{ big: string; sub: string; i: number }> = ({ big, sub, i }) => {
  const { opacity, y } = useEnter(12 + i * 12);
  return (
    <div style={{ background: PANEL, border: `1px solid ${LINE}`, borderLeft: `3px solid ${ACCENT}`, borderRadius: 8, padding: "30px 34px", width: 360, opacity, transform: `translateY(${y}px)` }}>
      <div style={{ color: INK, fontSize: 64, fontWeight: 700 }}>{big}</div>
      <div style={{ color: MUTED, fontSize: 26, marginTop: 8 }}>{sub}</div>
    </div>
  );
};
const SceneProof: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const h = useEnter(2);
  return (
    <AbsoluteFill style={{ opacity: sceneFade(f, dur), alignItems: "center", justifyContent: "center", fontFamily: MONO }}>
      <div style={{ fontSize: 68, fontWeight: 700, color: INK, opacity: h.opacity, transform: `translateY(${h.y}px)` }}>
        Not a demo. I ran it on-chain.
      </div>
      <div style={{ display: "flex", gap: 22, marginTop: 50 }}>
        {proof.map(([big, sub], i) => <MetricCard key={big} big={big} sub={sub} i={i} />)}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 5: Use cases ----------
const cases: [string, string][] = [
  ["HCS notary", "hash a doc → consensus-timestamp → verify"],
  ["AI agent audit trail", "every agent action logged & replayable on-chain"],
  ["Agent-to-agent payments", "agents transact in tokens, with a ledger"],
  ["Self-taxing token", "every transfer tolls a treasury — no contract"],
];
const CaseCard: React.FC<{ title: string; sub: string; i: number }> = ({ title, sub, i }) => {
  const { opacity, y } = useEnter(12 + i * 13);
  return (
    <div style={{ background: PANEL, border: `1px solid ${LINE}`, borderRadius: 10, padding: "28px 30px", width: 760, opacity, transform: `translateY(${y}px)` }}>
      <div style={{ color: ACCENT, fontSize: 34, fontWeight: 700 }}>{title}</div>
      <div style={{ color: MUTED, fontSize: 26, marginTop: 8 }}>{sub}</div>
    </div>
  );
};
const SceneUseCases: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const h = useEnter(2);
  return (
    <AbsoluteFill style={{ opacity: sceneFade(f, dur), alignItems: "center", justifyContent: "center", fontFamily: MONO }}>
      <div style={{ fontSize: 58, fontWeight: 700, color: INK, opacity: h.opacity, transform: `translateY(${h.y}px)`, marginBottom: 40 }}>
        Then I built things only Hedera makes easy.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {cases.map(([t, s], i) => <CaseCard key={t} title={t} sub={s} i={i} />)}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Scene 6: CTA ----------
const SceneCTA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const cmd = useEnter(10);
  const gh = useEnter(24);
  const built = useEnter(42);
  return (
    <AbsoluteFill style={{ opacity: sceneFade(f, dur), alignItems: "center", justifyContent: "center", fontFamily: MONO }}>
      <div style={{ fontSize: 56, fontWeight: 700, color: INK }}>Build on Hedera by asking.</div>
      <div style={{ marginTop: 40, background: PANEL, border: `1px solid ${LINE}`, borderRadius: 10, padding: "26px 40px", opacity: cmd.opacity, transform: `translateY(${cmd.y}px)` }}>
        <span style={{ color: MUTED, fontSize: 38 }}>$ </span>
        <span style={{ color: ACCENT, fontSize: 38 }}>npx @purplesquirrel/hedera-mcp</span>
      </div>
      <div style={{ marginTop: 26, color: MUTED, fontSize: 30, opacity: gh.opacity, transform: `translateY(${gh.y}px)` }}>
        github.com/ExpertVagabond/hedera-mcp
      </div>
      <div style={{ marginTop: 70, display: "flex", alignItems: "center", gap: 18, opacity: built.opacity, transform: `translateY(${built.y}px)` }}>
        <span style={{ color: MUTED, fontSize: 30 }}>Built for</span>
        <Img src={staticFile("hedera-logo-white.png")} style={{ height: 40 }} />
      </div>
    </AbsoluteFill>
  );
};

const MusicBed: React.FC = () => {
  const { durationInFrames: D } = useVideoConfig();
  return (
    <Audio
      src={staticFile("music.m4a")}
      volume={(f) =>
        interpolate(f, [0, 24, D - 36, D], [0, 0.2, 0.2, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      }
    />
  );
};

export const HederaMcp: React.FC = () => {
  return (
    <AbsoluteFill>
      <GridBG />
      <MusicBed />
      <Sequence durationInFrames={120}><SceneHook dur={120} /></Sequence>
      <Sequence from={120} durationInFrames={150}><SceneBuildOnly dur={150} /></Sequence>
      <Sequence from={270} durationInFrames={190}><SceneCoverage dur={190} /></Sequence>
      <Sequence from={460} durationInFrames={200}><SceneProof dur={200} /></Sequence>
      <Sequence from={660} durationInFrames={200}><SceneUseCases dur={200} /></Sequence>
      <Sequence from={860} durationInFrames={160}><SceneCTA dur={160} /></Sequence>
    </AbsoluteFill>
  );
};
