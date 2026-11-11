# Agent guide

This project is a Video.js React skin made by `videojs skin create`; `skin.json` records how. The skin is everything in `src/`, starting from `src/video/skin`. `apps/preview/` is a workbench that previews it; change it only when asked, except `apps/preview/src/frame/player` for the media the preview plays. `README.md` describes the rest.

## Core Rules & Styling Guidelines
- **Uniform Icon Drop Shadow**: All control icons across all buttons (play/pause, seek backward/forward, volume/mute, captions, settings, fullscreen, PiP, center controls) and all themes MUST use the exact same uniform drop shadow: `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))`. Never use disparate neon glow blur radiuses, colored icon drop shadows, or remove drop shadows on a per-theme basis.
- **Typography**: NEVER use "Comic Sans" (or Comic Sans MS) anywhere in the UI.
- Use the `videojs-skin` skill when changing the skin. `npx @videojs/cli agents skills` prints how to install it.
- Keep every control keyboard operable, labeled, with a visible focus indicator, and in source order that matches its visual order. Keep the error dialog, hotkeys, and status announcer unless you replace them.
- Run `npm run typecheck` and `npm run build` after changes, and check the skin in the workbench with `npm run dev`. Deploy the workbench with `npm run deploy <vercel|netlify|cloudflare>` only when asked.
