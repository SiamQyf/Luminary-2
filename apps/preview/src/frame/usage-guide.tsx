import {
  CheckIcon,
  ClipboardDocumentIcon,
  InformationCircleIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  SwatchIcon,
} from '@heroicons/react/16/solid';
import { useState } from 'react';

import { THEME_STYLES } from '@/video/shared/settings-menu';

const INSTALL_CMD = `npm install @videojs/react @videojs/core react react-dom
npm install @videojs/mux-video cn class-variance-authority`;

const FOLDER_TREE = `your-app/
├── src/
│   ├── skin.css                  # Core liquid glass tokens, caustics, 52 themes & resets
│   ├── lib/
│   │   └── resolve-class-name.ts # Tailwind class merger helper (cn)
│   ├── styles/                   # Base scaffold & theme tokens
│   └── video/
│       ├── skin.tsx              # <VideoSkin /> container + SVG liquid glass filters
│       ├── controls.tsx          # Responsive control bar (Expanded & Simple layouts)
│       ├── behaviors/            # Global hotkeys & gesture handlers
│       └── shared/               # Glass buttons, volume pill, seekbar, SettingsMenu
└── public/
    ├── _headers                  # Netlify CORS & WebVTT MIME headers
    └── _redirects                # SPA fallback rewrites (/preview -> /preview.html)`;

const USAGE_SNIPPET = `import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoSkin } from '@/video/skin';

export function MyVideoPlayer() {
  return (
    {/* Set data-theme to any of the 52 themes, or mix elements freely */}
    <div className="preview-player" data-theme="translucent">
      <VideoPlayer
        poster="https://image.mux.com/JX01bG8eB4uaoV3OpDuK602rBfvdSgrMObjwuUOBn4JrQ/thumbnail.webp"
        title="Mad Max: Fury Road"
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
            <track kind="subtitles" label="English" srcLang="en" src="/subtitles.vtt" default />
            <track kind="chapters" label="Chapters" srcLang="en" src="/chapters.vtt" />
          </MuxVideo>
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}`;

const HTML5_SNIPPET = `// Progressive MP4 / WebM with native <video>:
<div className="preview-player" data-theme="basic">
  <VideoPlayer title="Custom Media">
    <VideoSkin title="Custom Media" subtitle="1080p Progressive">
      <video src="/your-video.mp4" playsInline />
    </VideoSkin>
  </VideoPlayer>
</div>`;

const MIX_THEMES_SNIPPET = `/* Mix & Match Theme Elements Example:
   Combine Podcast Studio seekbar audio waveform with Basic flat buttons
   and Cyber Neon electric cyan glow accents! */

.my-custom-player {
  /* 1. Base theme foundation */
  @apply preview-player;
}

/* 2. Borrow Podcast Studio DAW seekbar */
.my-custom-player [data-part="seek-track"] {
  height: 8px !important;
  background: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.15) 0px,
    rgba(255, 255, 255, 0.15) 2px,
    transparent 2px,
    transparent 5px
  ) !important;
}

/* 3. Borrow Basic flat button style (zero background, crisp white glyphs) */
.my-custom-player .group\\/liquid-btn {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

/* 4. Borrow Cyber Neon cyan interactive accent */
.my-custom-player .group\\/liquid-btn:hover svg {
  color: #00f0ff !important;
  filter: drop-shadow(0 0 8px rgba(0, 240, 255, 0.8)) !important;
}`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="usage-copy-btn inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer"
      aria-label="Copy code snippet"
    >
      {copied ? (
        <>
          <CheckIcon className="size-3.5 text-emerald-400" aria-hidden="true" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <ClipboardDocumentIcon className="size-3.5" aria-hidden="true" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="usage-code-box overflow-hidden rounded-xl">
      <div className="usage-code-header flex items-center justify-between px-3.5 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">{title}</span>
        <CopyButton text={code} />
      </div>
      <pre className="usage-code-pre m-0 overflow-x-auto px-4 py-3 text-[12px] leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

type NoteType = 'info' | 'tip' | 'important';

function GuideNote({
  type = 'info',
  title,
  children,
}: {
  type?: NoteType;
  title: string;
  children: React.ReactNode;
}) {
  const isTip = type === 'tip';
  const isImportant = type === 'important';

  const Icon = isTip
    ? LightBulbIcon
    : isImportant
    ? ExclamationTriangleIcon
    : InformationCircleIcon;

  const noteClass = isTip
    ? 'usage-note-tip'
    : isImportant
    ? 'usage-note-important'
    : 'usage-note-info';

  const badgeText = isTip ? 'TIP' : isImportant ? 'IMPORTANT' : 'NOTE';

  return (
    <aside className={`usage-note ${noteClass}`} role="note">
      <Icon className="size-4 shrink-0 mt-0.5 opacity-90" aria-hidden="true" />
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold tracking-wider uppercase opacity-80">
            [{badgeText}]
          </span>
          <strong className="text-[12.5px] font-semibold">{title}</strong>
        </div>
        <div className="text-[12px] leading-relaxed opacity-95">{children}</div>
      </div>
    </aside>
  );
}

export function UsageGuide() {
  const [activeTab, setActiveTab] = useState<'hls' | 'mp4' | 'mix'>('hls');

  return (
    <section
      aria-label="Video.js v10 skin integration and customization guide"
      className="usage-guide box-border w-full mb-12 rounded-3xl p-6 sm:p-8 transition-colors"
      style={{ maxWidth: 'calc(896px * 0.98)' }}
    >
      {/* Header Banner */}
      <div className="flex flex-col gap-2 pb-6 usage-divider">
        <span className="usage-badge self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
          Video.js v10 Integration & Customization Guide
        </span>
        <h2 className="usage-heading text-[22px] sm:text-[25px] font-bold tracking-tight leading-snug">
          How to Use, Customize & Mix Themes in Your Video.js Player
        </h2>
        <p className="usage-muted text-[13.5px] leading-relaxed max-w-2xl">
          Integrate the Luminary player skin with its 52 bespoke live themes into any React 19 + Tailwind CSS v4 + Video.js v10 web application, or mix and match theme elements freely to forge your own unique aesthetic.
        </p>
      </div>

      <div className="flex flex-col gap-7 pt-6">
        {/* Step 1 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">1</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Install Video.js v10 & Skin Primitives</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Install <code className="usage-inline-code">@videojs/react</code> and <code className="usage-inline-code">@videojs/core</code> (v10.3+), plus <code className="usage-inline-code">@videojs/mux-video</code> for adaptive bitrate HLS (<code className="usage-inline-code">.m3u8</code>).
          </p>
          <CodeBlock title="Terminal Installation" code={INSTALL_CMD} />

          <GuideNote type="info" title="Headless Architecture">
            Video.js v10 is built from the ground up as a headless state machine. All controls subscribe reactively via React hooks (<code className="usage-inline-code">usePlayer</code>), eliminating the need for legacy v7/v8 global constructors or jQuery-style DOM mutations.
          </GuideNote>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">2</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Copy Skin Assets & Optical Styles</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Copy the <code className="usage-inline-code">src/</code> directory from this repository into your application. Import <code className="usage-inline-code">src/skin.css</code> globally to activate the liquid glass tokens, caustics, 52 modular themes, and precision control layout.
          </p>
          <CodeBlock title="File Organization" code={FOLDER_TREE} />

          <GuideNote type="tip" title="Tailwind CSS v4 Zero-Config">
            Luminary is optimized for Tailwind CSS v4. Simply include <code className="usage-inline-code">@import &quot;tailwindcss&quot;;</code> in your CSS file; no legacy <code className="usage-inline-code">tailwind.config.js</code> or PostCSS plugins are required.
          </GuideNote>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">3</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Render &lt;VideoSkin&gt; Inside &lt;VideoPlayer&gt;</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Wrap your media element (<code className="usage-inline-code">&lt;MuxVideo /&gt;</code> or native <code className="usage-inline-code">&lt;video /&gt;</code>) inside <code className="usage-inline-code">&lt;VideoSkin&gt;</code> and <code className="usage-inline-code">&lt;VideoPlayer&gt;</code>. SVG refraction filters, volume pills, time sliders, and keyboard behaviors initialize automatically.
          </p>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setActiveTab('hls')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                activeTab === 'hls'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              HLS via Mux (.m3u8)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mp4')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                activeTab === 'mp4'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              Native Progressive (MP4/WebM)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mix')}
              className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                activeTab === 'mix'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-white/5 text-zinc-400 hover:text-white border border-transparent'
              }`}
            >
              Mix & Match Themes
            </button>
          </div>

          {activeTab === 'hls' ? (
            <CodeBlock title="Player.tsx (Mux HLS + Subtitles + Chapters)" code={USAGE_SNIPPET} />
          ) : activeTab === 'mp4' ? (
            <CodeBlock title="Player.tsx (Native HTML5 MP4)" code={HTML5_SNIPPET} />
          ) : (
            <CodeBlock title="custom-mix.css (Mix Theme Elements)" code={MIX_THEMES_SNIPPET} />
          )}

          <GuideNote type="important" title="Styling & Constraint Rules">
            Video frame border opacity is strictly 33.33% (<code className="usage-inline-code">rgba(..., 0.3333)</code>). The settings popup container (<code className="usage-inline-code">[data-part=&quot;popup&quot;]</code>) remains transparent with 0 padding so only the inner card renders background and borders. Elapsed time counts up from <code className="usage-inline-code">0:00</code> (<code className="usage-inline-code">type=&quot;current&quot;</code>), all control icons have zero drop shadows (<code className="usage-inline-code">filter: none</code>), and Comic Sans is strictly forbidden.
          </GuideNote>
        </div>

        {/* Step 4: Mix & Match Theme Elements */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">4</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Customize & Mix Among Theme Elements</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Every theme is built with atomic, decoupled CSS tokens. Developers can freely mix and match individual elements across all 52 styles:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="usage-ref-card rounded-2xl p-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-sky-400">
                <SwatchIcon className="size-4 shrink-0" />
                <h4 className="text-[13px] font-semibold text-white">Seekbar Tracks & Waveforms</h4>
              </div>
              <p className="text-[12px] usage-muted leading-relaxed">
                Combine the <strong>Podcast Studio</strong> live DAW streaming audio waveform, <strong>Linear Ticks</strong> calibration rulers, <strong>Pencil Sketch</strong> hand-drawn strokes, or <strong>Liquid Mercury</strong> metallic sheens with any theme palette.
              </p>
            </div>

            <div className="usage-ref-card rounded-2xl p-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-purple-400">
                <SparklesIcon className="size-4 shrink-0" />
                <h4 className="text-[13px] font-semibold text-white">Button Surfaces & Caustics</h4>
              </div>
              <p className="text-[12px] usage-muted leading-relaxed">
                Choose between <strong>Translucent Glass</strong> refractive backdrops, <strong>Basic</strong> flat zero-background buttons, <strong>Classic Dark</strong> obsidian solids, or <strong>Water Droplet</strong> fluid surface tension highlights.
              </p>
            </div>

            <div className="usage-ref-card rounded-2xl p-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <SwatchIcon className="size-4 shrink-0" />
                <h4 className="text-[13px] font-semibold text-white">Volume Knobs & Sliders</h4>
              </div>
              <p className="text-[12px] usage-muted leading-relaxed">
                All volume sliders feature visual 2px horn spacing (<code className="usage-inline-code">-left-[3.5px] ml-0</code>) and edge-clamped thumbs. Swap between <strong>Vinyl Grooves</strong> turntable needles, <strong>Gamepad</strong> directional thumbs, or <strong>Crystal</strong> prismatic thumbs.
              </p>
            </div>

            <div className="usage-ref-card rounded-2xl p-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-amber-400">
                <SparklesIcon className="size-4 shrink-0" />
                <h4 className="text-[13px] font-semibold text-white">1.05× Precision Control Icons</h4>
              </div>
              <p className="text-[12px] usage-muted leading-relaxed">
                Volume horn, subtitle caption, and screencast icons are pre-calibrated to be <strong>1.05× larger</strong> across all 52 themes for optimal optical balance with the center Play and settings gear buttons.
              </p>
            </div>
          </div>
        </div>

        {/* Step 5: All 52 Live Themes */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">5</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Switch Across 52 Bespoke Live Themes</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Apply any theme by setting <code className="usage-inline-code">data-theme=&quot;&lt;id&gt;&quot;</code> on your <code className="usage-inline-code">.preview-player</code> wrapper, or let viewers select styles live from the player&apos;s <strong>Settings → Styles</strong> menu:
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-56 overflow-y-auto p-2.5 rounded-xl bg-black/20 border border-white/5">
            {THEME_STYLES.map((style, idx) => (
              <span key={style.id} className="usage-theme-pill inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px]">
                <span className="opacity-40 font-mono text-[10px]">#{idx + 1}</span>
                <code className="font-mono font-semibold">{style.id}</code>
                <span className="opacity-65">({style.label})</span>
              </span>
            ))}
          </div>

          <GuideNote type="tip" title="Live Hot-Swapping">
            Theme changes trigger CSS variable updates instantly without unmounting or pausing video playback. Fluid caustics, specular highlights, and volume knobs update in real time.
          </GuideNote>
        </div>

        {/* Step 6: Reference Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <div className="usage-ref-card rounded-2xl p-4">
            <h4 className="usage-subheading text-[13px] font-semibold mb-1.5">&lt;VideoSkin&gt; API</h4>
            <ul className="usage-muted text-[12px] leading-relaxed flex flex-col gap-1.5 list-none m-0 p-0">
              <li><code className="usage-inline-code">title</code> / <code className="usage-inline-code">subtitle</code> — 4s auto-fade title overlay</li>
              <li><code className="usage-inline-code">renderPoster</code> — custom poster image callback</li>
              <li><code className="usage-inline-code">renderThumbnail</code> — timeline hover thumbnail scrubber</li>
              <li><code className="usage-inline-code">children</code> — <code className="usage-inline-code">&lt;MuxVideo&gt;</code> or <code className="usage-inline-code">&lt;video&gt;</code></li>
            </ul>
          </div>

          <div className="usage-ref-card rounded-2xl p-4">
            <h4 className="usage-subheading text-[13px] font-semibold mb-1.5">Accessibility & Polish</h4>
            <ul className="usage-muted text-[12px] leading-relaxed flex flex-col gap-1.5 list-none m-0 p-0">
              <li>Flat icons: Zero drop shadows (<code className="usage-inline-code">filter: none</code>)</li>
              <li>Pre-calibrated for bright & dark footage</li>
              <li>Visible high-contrast keyboard focus rings</li>
              <li><code className="usage-inline-code">prefers-reduced-motion</code> calm-down safeguards</li>
            </ul>
          </div>

          <div className="usage-ref-card rounded-2xl p-4">
            <h4 className="usage-subheading text-[13px] font-semibold mb-1.5">Keyboard Shortcuts</h4>
            <ul className="usage-muted text-[12px] leading-relaxed flex flex-col gap-1.5 list-none m-0 p-0">
              <li><kbd className="usage-inline-code font-bold">Space</kbd> / <kbd className="usage-inline-code font-bold">K</kbd> — Play & Pause</li>
              <li><kbd className="usage-inline-code font-bold">←</kbd> / <kbd className="usage-inline-code font-bold">→</kbd> — Seek ±10 seconds</li>
              <li><kbd className="usage-inline-code font-bold">↑</kbd> / <kbd className="usage-inline-code font-bold">↓</kbd> — Volume ±5%</li>
              <li><kbd className="usage-inline-code font-bold">M</kbd> — Mute • <kbd className="usage-inline-code font-bold">F</kbd> — Fullscreen • <kbd className="usage-inline-code font-bold">P</kbd> — PiP</li>
            </ul>
          </div>
        </div>

        <GuideNote type="info" title="Netlify & Vercel Ready">
          Luminary is 100% production-ready for Netlify and Vercel. Includes SPA routing rewrites (<code className="usage-inline-code">/preview → /preview.html</code>) and permissive CORS headers for <code className="usage-inline-code">.vtt</code> subtitle and chapter files.
        </GuideNote>
      </div>
    </section>
  );
}
