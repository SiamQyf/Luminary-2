# Video.js v10 Skin Integration Guide — Luminary Liquid Glass

This guide documents how to integrate the **Luminary Liquid Glass** skin and its **50 bespoke themes** into any modern web application using **Video.js v10**, **React 19**, and **Tailwind CSS v4**.

---

## 1. Overview & Architecture

**Luminary** is built natively on the official next-generation **Video.js v10** ecosystem:
- **Core Engine:** [`@videojs/core`](https://www.npmjs.com/package/@videojs/core) (`^10.3.0`)
- **React Primitives:** [`@videojs/react`](https://www.npmjs.com/package/@videojs/react) (`^10.3.0`)
- **Styling:** Tailwind CSS v4 + GPU-accelerated SVG Displacement Lenses (`<feDisplacementMap>`)
- **Themes:** 50 dynamically switchable themes via `data-theme="<theme-id>"`

---

## 2. Installation

Install Video.js v10 and the required peer dependencies:

```bash
# Core Video.js v10 & React Primitives
npm install @videojs/react @videojs/core react react-dom

# Streaming Provider (Mux HLS / .m3u8) & Class Utilities
npm install @videojs/mux-video cn class-variance-authority

# Optional: YouTube and Google Cast extensions
npm install @videojs/youtube-video @videojs/google-cast
```

---

## 3. File Structure & Assets

Copy the `src/` directory into your project:

```text
your-project/
├── src/
│   ├── skin.css                  # Core liquid glass tokens, drop shadows & cue styling
│   ├── lib/
│   │   └── resolve-class-name.ts # Tailwind class merger helper (cn)
│   ├── styles/                   # Base scaffold & theme tokens
│   └── video/
│       ├── skin.tsx              # <VideoSkin /> container + SVG liquid glass filters
│       ├── controls.tsx          # Responsive control bar layout
│       ├── behaviors/            # Keyboard hotkeys, gestures, and focus managers
│       └── shared/               # Glass buttons, volume pill, seekbar, and SettingsMenu
└── styles/
    └── themes.css                # Optional: 50 theme definitions from preview.css
```

---

## 4. Integration Examples

### Example A: Adaptive Bitrate HLS via Mux (Recommended)

```tsx
import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoSkin } from '@/video/skin';

export function PlayerHLS() {
  return (
    <div className="preview-player" data-theme="water-droplet">
      <VideoPlayer
        title="Mad Max: Fury Road"
        poster="https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/thumbnail.webp"
      >
        <VideoSkin
          title="Mad Max: Fury Road"
          subtitle="Official Teaser Trailer • 1080p HLS"
        >
          <MuxVideo
            src="https://stream.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA.m3u8"
            playsInline
            crossOrigin=""
          >
            {/* Subtitles & Chapters */}
            <track kind="subtitles" label="English" srcLang="en" src="/subtitles.vtt" default />
            <track kind="chapters" label="Chapters" srcLang="en" src="/chapters.vtt" default />
          </MuxVideo>
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}
```

---

### Example B: Standard Progressive MP4 / WebM

```tsx
import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { VideoSkin } from '@/video/skin';

export function PlayerMP4() {
  return (
    <div className="preview-player" data-theme="translucent">
      <VideoPlayer title="Local MP4 Video">
        <VideoSkin
          title="Product Showcase"
          subtitle="4K Progressive Video"
        >
          <video
            src="/media/video.mp4"
            playsInline
            preload="metadata"
          />
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}
```

---

### Example C: Embedded YouTube Backend

```tsx
import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { YouTubeVideo } from '@videojs/youtube-video';
import { VideoSkin } from '@/video/skin';

export function PlayerYouTube() {
  return (
    <div className="preview-player" data-theme="crystal">
      <VideoPlayer title="YouTube Video">
        <VideoSkin title="Cosmic Dawn" subtitle="YouTube Stream">
          <YouTubeVideo
            src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            playsInline
          />
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}
```

---

## 5. Themes & Customization (`data-theme`)

Apply any of the **50 themes** by adding `data-theme="<theme-id>"` to the player's wrapper element.

### Popular Theme IDs:
- `translucent`: Optical Frosted Glass with dual-rim specular highlights
- `water-droplet`: Fluid water caustics, wave sway, liquid blue track & refraction droplet knob
- `glacial-permafrost`: Deep sub-zero crystalline frost needle seekbar
- `crystal`: Scintillating optical quartz with prismatic chromatic aberration
- `deep-abyss`: Deep-sea bioluminescent mesh animation
- `cyber-neon`: High-contrast electric cyan and magenta glows
- `synthwave-80s`: Sunset grid aesthetic with retro gradient fills
- `retro-terminal`: Amber phosphor CRT scanline monitors
- `timber`: Rich grain organic wood-finish dock
- `news-magazine`: Editorial bold typography and crisp clean contrasts

> **Live Switcher:** Viewers can also switch themes dynamically during playback from the integrated **Settings ($\mathbf{\ge}$) $\rightarrow$ Styles** menu without interrupting playback.

---

## 6. `<VideoSkin>` Props & API Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `ReactNode` | `undefined` | Video title displayed in top-left scrim. Fades out after 4s; reappears on hover. |
| `subtitle` | `ReactNode` | `undefined` | Secondary episode or metadata string below the title. |
| `renderPoster` | `RenderProp` | `undefined` | Custom poster image renderer. |
| `renderThumbnail` | `RenderProp` | `undefined` | Hover scrubbing thumbnail preview renderer (sprite sheets or VTT). |
| `children` | `ReactNode` | `required` | Media tag (`<MuxVideo>`, native `<video>`, or `<YouTubeVideo>`). |

---

## 7. Built-in Keyboard Shortcuts & Gestures

| Shortcut / Action | Behavior |
| :--- | :--- |
| `Space` / `K` | Toggle Play / Pause |
| `Left Arrow` / `Right Arrow` | Seek backward / forward 5 seconds |
| `J` / `L` | Seek backward / forward 10 seconds |
| `Up Arrow` / `Down Arrow` | Volume up / down 10% |
| `M` | Toggle Mute |
| `F` | Toggle Fullscreen |
| `C` | Toggle Closed Captions / Subtitles |
| `P` | Toggle Picture-in-Picture (PiP) |
| `0` - `9` | Seek to 0% - 90% of total duration |
| **Double-Click Frame** | Toggle Fullscreen |
| **Double-Tap (Mobile)** | Double tap left/right half to seek $\pm 10\text{s}$ |

---

## 8. Deploying to Production

The project is pre-configured for static hosting:

```bash
# Build the production bundle
npm run build

# Deploy via CLI
npm run deploy vercel     # Deploy to Vercel
npm run deploy netlify    # Deploy to Netlify
```

Alternatively, drag and drop `lol.zip` or `luminary-netlify.zip` onto [app.netlify.com/drop](https://app.netlify.com/drop) for instant deployment.
