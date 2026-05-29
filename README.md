# hedera-mcp-video

Remotion (code-driven) marketing/demo video for [`hedera-mcp`](https://github.com/ExpertVagabond/hedera-mcp) — a 34s, 1920×1080 piece in Matthew Karsten's builder voice, using the official Hedera brand assets.

## Story (Hook → Proof → CTA)
1. **Hook** — hedera-mcp + the real Hedera mark · *"I built the Hedera MCP I wanted to exist."*
2. **Build-only** — agent asks → you sign → on-chain · *"It never touches your keys."*
3. **Coverage** — every Hedera service, 73 tools + 4 resources
4. **Proof** — *"Not a demo. I ran it on-chain."* — 72/73, 31/31, Solidity E2E, live on testnet
5. **Unique use cases** — HCS notary, AI agent audit trail, agent-to-agent payments, self-taxing token
6. **CTA** — `npx @purplesquirrel/hedera-mcp` · Built for Hedera

## Assets
`public/hedera-mark.png` and `public/hedera-logo-white.png` are the official Hedera brand assets (from hedera.com).

## Develop / render
```bash
npm install
npm run studio                 # live preview at localhost:3000
npm run render                 # → out/hedera-mcp.mp4 (h264, crf 18)
# stills: npx remotion still HederaMcp out/frame.png --frame=560
```

Tech: Remotion 4 + React 19. Single composition `HederaMcp` (1020 frames @ 30fps). Animation via `spring`/`interpolate` only.
