import { CheckIcon, ClipboardDocumentIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

import { THEME_STYLES } from '@/video/shared/settings-menu';

const INSTALL_CMD = `npm install @videojs/react @videojs/core react react-dom
npm install @videojs/mux-video cn class-variance-authority`;

const FOLDER_TREE = `your-app/
├── src/
│   ├── skin.css                  # Tailwind v4 tokens, optical shadows & cue overrides
│   ├── lib/resolve-class-name.ts # Class merger helper
│   ├── styles/                   # base.css & scaffold theme tokens
│   └── video/
│       ├── skin.tsx              # <VideoSkin /> + SVG liquid glass filters
│       ├── controls.tsx          # Bottom control bar layout
│       ├── behaviors/            # Global hotkeys & tap/gesture handlers
│       └── shared/               # Glass buttons, time slider, volume pill, SettingsMenu
└── styles/themes.css             # Optional: .preview-player[data-theme="..."] rules from preview.css`;

const USAGE_SNIPPET = `import '@/skin.css';
import { VideoPlayer } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoSkin } from '@/video/skin';

export function MyVideoPlayer() {
  return (
    <div className="preview-player" data-theme="translucent">
      <VideoPlayer
        poster="https://image.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA/thumbnail.webp"
        title="Big Buck Bunny"
      >
        <VideoSkin
          title="Big Buck Bunny"
          subtitle="Blender Foundation • 1080p HLS"
        >
          <MuxVideo
            src="https://stream.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA.m3u8"
            playsInline
            crossOrigin=""
          >
            <track kind="subtitles" label="English" srcLang="en" src="/subtitles.vtt" />
            <track kind="chapters" label="Chapters" srcLang="en" src="/chapters.vtt" default />
          </MuxVideo>
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
}`;

const HTML5_SNIPPET = `// Or use standard MP4 / WebM with native <video>:
<div className="preview-player" data-theme="cyber-neon">
  <VideoPlayer title="Custom MP4">
    <VideoSkin title="Custom MP4" subtitle="1080p Progressive">
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
      // Fallback ignored if clipboard blocked
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

export function UsageGuide() {
  return (
    <section
      aria-label="Video.js v10 skin integration guide"
      className="usage-guide box-border w-full mb-12 rounded-3xl p-6 sm:p-8 transition-colors"
      style={{ maxWidth: 'calc(896px * 0.98)' }}
    >
      <div className="flex flex-col gap-2 pb-6 usage-divider">
        <span className="usage-badge self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
          Video.js v10 Integration Guide
        </span>
        <h2 className="usage-heading text-[22px] sm:text-[25px] font-bold tracking-tight leading-snug">
          How to Use This Skin in Your Video.js Player
        </h2>
        <p className="usage-muted text-[13.5px] leading-relaxed max-w-2xl">
          Follow these steps to add the Luminary optical Liquid Glass skin and its 13 live themes to any React 19 + Tailwind CSS v4 + Video.js v10 project.
        </p>
      </div>

      <div className="flex flex-col gap-7 pt-6">
        {/* Step 1 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">1</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Install Video.js v10 & Skin Dependencies</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Install <code className="usage-inline-code">@videojs/react</code> and <code className="usage-inline-code">@videojs/core</code>, plus <code className="usage-inline-code">@videojs/mux-video</code> if you stream HLS (<code className="usage-inline-code">.m3u8</code>). Make sure Tailwind CSS v4 (<code className="usage-inline-code">@tailwindcss/vite</code>) is enabled in your Vite config.
          </p>
          <CodeBlock title="Terminal" code={INSTALL_CMD} />
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">2</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Copy the Skin Files & Optional Preset Themes</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Copy <code className="usage-inline-code">src/</code> from this repository into your app. Import <code className="usage-inline-code">src/skin.css</code> globally for the liquid glass tokens and drop-shadow rules. To use all 13 theme presets, also copy the <code className="usage-inline-code">.preview-player[data-theme="..."]</code> CSS rules from <code className="usage-inline-code">apps/preview/src/frame/preview.css</code>.
          </p>
          <CodeBlock title="Project Structure" code={FOLDER_TREE} />
        </div>

        {/* Step 3 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">3</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Render &lt;VideoSkin&gt; Inside &lt;VideoPlayer&gt;</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Wrap your <code className="usage-inline-code">&lt;MuxVideo /&gt;</code> or native <code className="usage-inline-code">&lt;video /&gt;</code> element inside <code className="usage-inline-code">&lt;VideoSkin&gt;</code> and <code className="usage-inline-code">&lt;VideoPlayer&gt;</code>. Controls, SVG displacement lenses, Settings menu, global keyboard shortcuts, and captions wire up automatically.
          </p>
          <CodeBlock title="Player.tsx (HLS + Subtitles + Chapters)" code={USAGE_SNIPPET} />
          <CodeBlock title="Player.tsx (Standard MP4)" code={HTML5_SNIPPET} />
        </div>

        {/* Step 4 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="usage-step-num">4</span>
            <h3 className="usage-subheading text-[15px] font-semibold">Choose or Switch Any of the 13 Themes</h3>
          </div>
          <p className="usage-muted text-[13px] leading-relaxed">
            Set <code className="usage-inline-code">data-theme="&lt;id&gt;"</code> on your <code className="usage-inline-code">.preview-player</code> wrapper (or let viewers switch styles live from the player&apos;s <strong>Settings → Styles</strong> menu without interrupting playback):
          </p>
          <div className="flex flex-wrap gap-2">
            {THEME_STYLES.map((style) => (
              <span key={style.id} className="usage-theme-pill inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px]">
                <code className="font-mono font-semibold">{style.id}</code>
                <span className="opacity-65">({style.label})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Step 5: Reference Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          <div className="usage-ref-card rounded-2xl p-4">
            <h4 className="usage-subheading text-[13px] font-semibold mb-1.5">&lt;VideoSkin&gt; Props</h4>
            <ul className="usage-muted text-[12px] leading-relaxed flex flex-col gap-1 list-none m-0 p-0">
              <li><code className="usage-inline-code">title</code> / <code className="usage-inline-code">subtitle</code> — 4s auto-fading overlay (reappears on hover)</li>
              <li><code className="usage-inline-code">renderPoster</code> — custom poster image renderer</li>
              <li><code className="usage-inline-code">renderThumbnail</code> — timeline hover scrub preview</li>
              <li><code className="usage-inline-code">children</code> — <code className="usage-inline-code">&lt;MuxVideo&gt;</code> or <code className="usage-inline-code">&lt;video&gt;</code></li>
            </ul>
          </div>

          <div className="usage-ref-card rounded-2xl p-4">
            <h4 className="usage-subheading text-[13px] font-semibold mb-1.5">Media & Tracks</h4>
            <ul className="usage-muted text-[12px] leading-relaxed flex flex-col gap-1 list-none m-0 p-0">
              <li>Adaptive bitrate HLS (<code className="usage-inline-code">.m3u8</code>) via <code className="usage-inline-code">MuxVideo</code></li>
              <li>Progressive MP4, WebM, MOV & local Blob URLs</li>
              <li>WebVTT <code className="usage-inline-code">&lt;track kind="subtitles" /&gt;</code></li>
              <li>Multi-audio tracks & <code className="usage-inline-code">chapters</code> track support</li>
            </ul>
          </div>

          <div className="usage-ref-card rounded-2xl p-4">
            <h4 className="usage-subheading text-[13px] font-semibold mb-1.5">Built-In UX</h4>
            <ul className="usage-muted text-[12px] leading-relaxed flex flex-col gap-1 list-none m-0 p-0">
              <li>SVG <code className="usage-inline-code">feDisplacementMap</code> refraction + prism edge split</li>
              <li>Global capture hotkeys (<code className="usage-inline-code">Space</code>, arrows, <code className="usage-inline-code">M/C/F/P/0-9</code>)</li>
              <li>Double-click video frame to toggle fullscreen</li>
              <li>Adaptive Light/Dark contrast (<code className="usage-inline-code">data-color-scheme</code>)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

