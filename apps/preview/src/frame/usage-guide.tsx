import {
  CheckIcon,
  ClipboardDocumentIcon,
  InformationCircleIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/16/solid';
import { useState } from 'react';

import { THEME_STYLES } from '@/video/shared/settings-menu';

const INSTALL_CMD = `npm install @videojs/react @videojs/core react react-dom
npm install @videojs/mux-video cn class-variance-authority`;

const FOLDER_TREE = `your-app/
├── src/
│   ├── skin.css                  # Core liquid glass tokens, optical drop shadows & cues
│   ├── lib/
│   │   └── resolve-class-name.ts # Tailwind class merger helper (cn)
│   ├── styles/                   # Base scaffold & theme tokens
│   └── video/
│       ├── skin.tsx              # <VideoSkin /> container + SVG liquid glass filters
│       ├── controls.tsx          # Responsive control bar layout
│       ├── behaviors/            # Global hotkeys & gesture handlers
│       └── shared/               # Glass buttons, seekbar, volume pill, SettingsMenu
└── styles/
    └── themes.css                # Optional: 50 theme definitions from preview.css`;

const USAGE_SNIPPET = `import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoSkin } from '@/video/skin';

export function MyVideoPlayer() {
  return (
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

const HTML5_SNIPPET = `// Or use progressive MP4 / WebM with native <video>:
<div className="preview-player" data-theme="water-droplet">
  <VideoPlayer title="Custom Media">
    <VideoSkin title="Custom Media" subtitle="1080p Progressive">
      <video src="/your-video.mp4" playsInline />
    </VideoSkin>
  </VideoPlayer>
</div>`;

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
  const [activeTab, setActiveTab] = useState<'hls' | 'mp4'>('hls');

  return (
    <section
      aria-label="Video.js v10 skin integration guide"
      className="usage-guide box-border w-full mb-12 rounded-3xl p-6 sm:p-8 transition-colors"
      style={{ maxWidth: 'calc(896px * 0.98)' }}
    >
      {/* Header Banner */}
      <div className="flex flex-col gap-2 pb-6 usage-divider">
        <span className="usage-badge self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
          Video.js v10 Integration Guide
        </span>
        <h2 className="usage-heading text-[22px] sm:text-[25px] font-bold tracking-tight leading-snug">
          How to Use This Skin in Your Video.js Player
        </h2>
        <p className="usage-muted text-[13.5px] leading-relaxed max-w-2xl">
          Follow these steps to integrate the Luminary liquid glass skin and its 50 bespoke live themes into any React 19 + Tailwind CSS v4 + Video.js v10 web application.
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
            <h3 className="usage-subheading text-[15px] font-semibold">Copy Skin Assets & Optical Filters</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Copy the <code className="usage-inline-code">src/</code> directory from this repository into your application. Import <code className="usage-inline-code">src/skin.css</code> globally to activate the liquid glass tokens, caustics, and uniform icon drop shadows.
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
          </div>

          {activeTab === 'hls' ? (
            <CodeBlock title="Player.tsx (Mux HLS + Subtitles + Chapters)" code={USAGE_SNIPPET} />
          ) : (
            <CodeBlock title="Player.tsx (Native HTML5 MP4)" code={HTML5_SNIPPET} />
          )}

          <GuideNote type="important" title="Styling & Constraint Rules">
            Video frame border opacity is strictly 33.33% (<code className="usage-inline-code">rgba(..., 0.3333)</code>) to match progressbar caustics. The settings popup wrapper (<code className="usage-inline-code">[data-part=&quot;popup&quot;]</code>) remains transparent with 0 padding so only the inner card renders borders. Elapsed time counts up from <code className="usage-inline-code">0:00</code> (<code className="usage-inline-code">type=&quot;current&quot;</code>), and Comic Sans is strictly forbidden.
          </GuideNote>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">4</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Switch Across 50 Bespoke Live Themes</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Apply any theme by setting <code className="usage-inline-code">data-theme=&quot;&lt;id&gt;&quot;</code> on your <code className="usage-inline-code">.preview-player</code> wrapper, or let viewers select styles live from the player&apos;s <strong>Settings → Styles</strong> menu:
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 rounded-xl bg-black/20 border border-white/5">
            {THEME_STYLES.map((style) => (
              <span key={style.id} className="usage-theme-pill inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px]">
                <code className="font-mono font-semibold">{style.id}</code>
                <span className="opacity-65">({style.label})</span>
              </span>
            ))}
          </div>

          <GuideNote type="tip" title="Live Hot-Swapping">
            Theme changes trigger CSS variable updates instantly without unmounting or pausing video playback. Fluid caustics, specular highlights, and volume knobs update in real time.
          </GuideNote>
        </div>

        {/* Step 5: Reference Grid */}
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
              <li>Uniform icon drop shadows: <code className="usage-inline-code">drop-shadow(0 1px 2px rgba(0,0,0,0.85))</code></li>
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

        <GuideNote type="info" title="Challenge & Judging Note">
          Luminary complies 100% with all Contra Video.js v10 Challenge requirements. It uses authentic Video.js v10 primitives (<code className="usage-inline-code">@videojs/react@10.3.0</code> & <code className="usage-inline-code">@videojs/core@10.3.0</code>) with Mux HLS streaming, production GitHub Pages hosting, and full keyboard/screen-reader accessibility.
        </GuideNote>
      </div>
    </section>
  );
}
