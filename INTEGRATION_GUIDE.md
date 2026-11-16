# 🌌 Luminary — Video.js v10 Skin Integration Guide
> **The Next-Gen Liquid Optical Glass Skin with 50 Live Bespoke Themes**  
> *Crafted for the Contra Video.js v10 Skins Challenge • 100% Native Video.js v10 Architecture*

---

## 📖 Executive Summary
**Luminary** translates real-world optical glass physics and fluid light caustics into an uncompromising web skin for **Video.js v10**. Built natively on React 19 and Tailwind CSS v4, it features GPU-accelerated SVG displacement refraction (`<feDisplacementMap>`), 3-pass chromatic aberration, uniform control icon drop shadows, and 50 live switchable themes across luxury glass, retro hardware, cyberpunk neon, and minimal editorial aesthetics.

> [!NOTE]
> **Video.js v10 Headless Architecture**  
> Video.js v10 is fundamentally redesigned as a headless state machine and reactive UI primitive library (`@videojs/react` and `@videojs/core`). Luminary directly subscribes to player state via reactive hooks (`usePlayer`), completely eliminating legacy v7/v8 global constructors (`videojs()`) and jQuery-style DOM queries.

---

## 1. Quick Installation

Install Video.js v10 and the modern reactive media primitives:

```bash
# 1. Core Video.js v10 & React 19 Ecosystem
npm install @videojs/react @videojs/core react react-dom

# 2. Adaptive Bitrate HLS Streamer (Mux Video) & Styling Helpers
npm install @videojs/mux-video cn class-variance-authority

# 3. Optional: YouTube & Remote Playback Extensions
npm install @videojs/youtube-video @videojs/google-cast
```

> [!TIP]
> **Tailwind CSS v4 Zero-Config**  
> Luminary is fully compatible with Tailwind CSS v4. Simply ensure `@import "tailwindcss";` is present at the top of your global CSS. No legacy `tailwind.config.js` or complex PostCSS pipelines are required.

---

## 2. Directory & Asset Setup

Copy the `src/` directory from this repository into your application:

```text
your-project/
├── src/
│   ├── skin.css                  # Core liquid glass tokens, optical drop shadows & cues
│   ├── lib/
│   │   └── resolve-class-name.ts # Tailwind class merger utility (cn)
│   ├── styles/                   # Base scaffold & theme tokens
│   └── video/
│       ├── skin.tsx              # <VideoSkin /> container + SVG liquid glass filters
│       ├── controls.tsx          # Responsive control bar layout & lock handlers
│       ├── behaviors/            # Global hotkeys, tap gestures & focus managers
│       └── shared/               # Glass buttons, volume pill, seekbar & SettingsMenu
└── styles/
    └── themes.css                # Optional: 50 theme definitions from preview.css
```

---

## 3. How to Use: Implementation Examples

### Option A: Adaptive HLS Streaming via Mux (Recommended)
This is the premier setup for production media, streaming high-definition adaptive HLS (`.m3u8`) with zero dropped frames.

```tsx
import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoSkin } from '@/video/skin';

export function PlayerHLS() {
  return (
    <div className="preview-player" data-theme="translucent">
      <VideoPlayer
        title="Mad Max: Fury Road"
        poster="https://image.mux.com/JX01bG8eB4uaoV3OpDuK602rBfvdSgrMObjwuUOBn4JrQ/thumbnail.webp"
      >
        <VideoSkin
          title="Mad Max: Fury Road"
          subtitle="Official Teaser Trailer • 1080p HLS"
        >
          <MuxVideo
            src="https://stream.mux.com/JX01bG8eB4uaoV3OpDuK602rBfvdSgrMObjwuUOBn4JrQ.m3u8"
            playsInline
            crossOrigin=""
          >
            {/* Subtitles & Chapters */}
            <track kind="subtitles" label="English" srcLang="en" src="/subtitles.vtt" default />
            <track kind="chapters" label="Chapters" srcLang="en" src="/chapters.vtt" />
          </MuxVideo>
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}
```

---

### Option B: Progressive MP4 / WebM with Native `<video>`
For local files, offline playback, or standard progressive HTTP downloads:

```tsx
import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { VideoSkin } from '@/video/skin';

export function PlayerMP4() {
  return (
    <div className="preview-player" data-theme="water-droplet">
      <VideoPlayer title="Cosmic Dawn" poster="/poster.webp">
        <VideoSkin title="Cosmic Dawn" subtitle="4K Progressive Video">
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            playsInline
            controls={false}
          />
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}
```

---

## 4. Design Guidelines & Constraints

> [!IMPORTANT]
> **Strict Styling & Integrity Rules**  
> 1. **Frame Border Opacity:** Video frame border opacity is strictly 33.33% (`rgba(..., 0.3333)`), harmonized across all 50 themes.
> 2. **Single-Card Settings Menu:** The popover container (`[data-part="popup"]` / `div[popover]`) must remain transparent with 0 padding and no border, so only the inner card (`[role="menu"]`) renders background and border.
> 3. **Elapsed Time Display:** Video progress timestamp counts up from 0 (`type="current"`, e.g. `0:00`), never negative remaining time.
> 4. **Disappearing Title:** Video title appears on start for 4 seconds, smoothly fades out, and reappears on pointer hover.
> 5. **Uniform Icon Drop Shadows:** Dark/translucent themes use the uniform standard drop shadow `drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))`.
> 6. **Typography:** Comic Sans is strictly forbidden under all circumstances.

---

## 5. Live Theme Switching (50 Bespoke Themes)

Luminary includes 50 hand-crafted themes. You can set them statically via `data-theme="<id>"` on `.preview-player` or allow viewers to hot-swap themes live via **Settings → Styles**:

```html
<!-- Example: Activate Glacier theme -->
<div className="preview-player" data-theme="glacial-permafrost">
```

### Theme Catalog Highlights

| Category | Theme IDs | Visual Atmosphere |
| :--- | :--- | :--- |
| **Liquid & Optical** | `translucent`, `water-droplet`, `crystal`, `deep-abyss`, `glacial-permafrost` | Optical refraction, caustics, prismatic glass, ice gem thumbs |
| **Retro & Skeuomorphic** | `vintage-synth`, `podcast-studio`, `gamepad`, `retro-terminal`, `vinyl-turntable` | Machined hardware, audio console waveforms, amber VFD, vinyl grooves |
| **Cyber & Sci-Fi** | `cyber-neon`, `cyberpunk-2077`, `synthwave-80s`, `cosmic-nebula`, `tactical-hud` | High-luma neon, scanlines, stardust aurora, military telemetry HUD |
| **Editorial & Minimal** | `news-magazine`, `swiss-intl`, `bauhaus`, `scholarly-journal`, `minimal-editorial` | High-contrast typography, crisp borders, grid layouts, zero shadow |
| **Organic & Natural** | `forest-dew`, `sakura-blossom`, `sunset-mirage`, `matcha-zen`, `bioluminescent` | Emerald caustics, soft rose water, warm dusk gradients, bamboo serenity |

> [!TIP]
> **Zero-Interruption Theme Hot-Swapping**  
> Switching themes alters only CSS variables and SVG filter definitions. The underlying video stream never pauses, stutters, or flushes its playback buffer during a style switch.

---

## 6. Component API & Props Reference

### `<VideoSkin>` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `ReactNode` | Reactive player title | Title text; displays on video start for 4s, fades, and reappears on hover |
| `subtitle` | `ReactNode` | `undefined` | Secondary episode or resolution subtitle text |
| `renderPoster` | `ComponentProps<typeof Poster>['render']` | Built-in glass poster | Custom poster image renderer |
| `renderThumbnail`| `ComponentProps<typeof Slider.Thumbnail>['render']` | Default hover card | Hover scrubbing thumbnail preview handler |
| `children` | `ReactNode` | Required | `<MuxVideo>` or native `<video>` element |
| `className` | `string` | `undefined` | Additional utility classes applied to `.media-skin` |

---

## 7. Keyboard Navigation & Accessibility

Luminary provides full compliance with WCAG 2.1 AA accessibility standards:

| Key Command | Action |
| :--- | :--- |
| <kbd>Space</kbd> / <kbd>K</kbd> | Toggle Play / Pause |
| <kbd>←</kbd> / <kbd>→</kbd> | Seek backward / forward 10 seconds |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Increase / decrease volume by 5% |
| <kbd>M</kbd> | Toggle Audio Mute / Unmute |
| <kbd>F</kbd> | Toggle Fullscreen mode |
| <kbd>P</kbd> | Toggle Picture-in-Picture (PiP) |
| <kbd>C</kbd> | Toggle Closed Captions / Subtitles |
| <kbd>0</kbd> – <kbd>9</kbd> | Seek to 0% – 90% of total video duration |

> [!NOTE]
> **Motion Sensitivity (`prefers-reduced-motion`)**  
> When the user has enabled reduced motion in their operating system, Luminary instantly disables heavy caustic animations, wave oscillations, and continuous chromatic drift while maintaining crisp, fully accessible video controls.
