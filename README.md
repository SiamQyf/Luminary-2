# Luminary — Liquid Glass Video.js v10 Skin

An advanced, production-grade video skin built natively on **Video.js v10** (`@videojs/react` 10.3.0 & `@videojs/core` 10.3.0), **React 19**, and **Tailwind CSS v4**.

Featuring physical optical glass refraction via SVG displacement lenses, dual-rim specular reflections, and **50 bespoke live themes** (including *Water Droplet*, *Glacial Permafrost*, *Crystal*, *Deep Abyss*, and *Cosmic Nebula*).

---

## Quick Start & Integration

For full integration examples, code snippets, props reference, and theme switching, see the **[Video.js v10 Integration Guide](file:///INTEGRATION_GUIDE.md)** (`INTEGRATION_GUIDE.md`).

```bash
# Install dependencies
npm install @videojs/react @videojs/core react react-dom
npm install @videojs/mux-video cn class-variance-authority

# Start development workbench
npm run dev

# Production build
npm run build
```

---

## Basic Usage

```tsx
import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoSkin } from '@/video/skin';

export function Player() {
  return (
    <div className="preview-player" data-theme="water-droplet">
      <VideoPlayer title="Demo Stream">
        <VideoSkin title="Cosmic Dawn" subtitle="Official Teaser • 1080p HLS">
          <MuxVideo
            src="https://stream.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA.m3u8"
            playsInline
          />
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}
```

---

## Live Themes

Switch between any of the **50 themes** dynamically by setting `data-theme="<theme-id>"` on the container or via the built-in **Settings ($\mathbf{\ge}$) $\rightarrow$ Styles** menu.

Popular themes include:
- `translucent`: Optical Frosted Glass with dual-rim specular highlights
- `water-droplet`: Fluid water caustics, wave sway, liquid blue track & refraction droplet knob
- `glacial-permafrost`: Deep sub-zero crystalline frost needle seekbar
- `crystal`: Scintillating optical quartz with prismatic chromatic aberration
- `deep-abyss`: Deep-sea bioluminescent mesh animation
- `cyber-neon`: High-contrast electric cyan and magenta glows
- `synthwave-80s`: Retro sunset grid aesthetic

---

## Deploy

```bash
npm run deploy vercel     # Deploy to Vercel
npm run deploy netlify    # Deploy to Netlify
```
Or drag and drop `lol.zip` / `luminary-netlify.zip` onto [app.netlify.com/drop](https://app.netlify.com/drop).
