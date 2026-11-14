/** @jsxImportSource react */

import { useMedia, usePlayer } from '@videojs/react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/resolve-class-name';
import type { CaptionDesignId } from './settings-menu';

interface ParsedCue {
  start: number;
  end: number;
  text: string;
}

const KNOWN_SUBTITLE_MAP: Record<string, string> = {
  // Big Buck Bunny
  'VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA': '/big-buck-bunny-subtitles.vtt',
  // Elephants Dream
  'Sc89iWAyNkhJ3P1rQ02nrEdCFTnfT01CZ2KmaEcxXfB008': '/elephants-dream-subtitles.vtt',
  // Mad Max: Fury Road
  'JX01bG8eB4uaoV3OpDuK602rBfvdSgrMObjwuUOBn4JrQ': '/mad-max-subtitles.vtt',
  // View From A Blue Moon
  'lyrKpPcGfqyzeI00jZAfW6MvP6GNPrkML': '/view-from-blue-moon-subtitles.vtt',
  // Cosmic Dawn
  '83EzHOvVzVN01AsrD01BCpiH02Pj3S8mfzBOu101w2nHC5s': '/cosmic-dawn-subtitles.vtt',
};

/**
 * Clean WebVTT cue tags (e.g. <v Name>, <b>, <i>, <c.color>, timestamps <00:01.000>)
 * and HTML entities (&amp;, &quot;, &#39;, &lt;, &gt;)
 */
function cleanCueText(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/<\/?[^>]+(>|$)/g, '') // remove HTML / WebVTT tags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * Parse WebVTT timestamp (HH:MM:SS.mmm or MM:SS.mmm) into seconds
 */
function parseTimestamp(timestamp: string): number {
  if (!timestamp) return 0;
  const parts = timestamp.trim().split(':');
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (parts.length === 3) {
    hours = parseFloat(parts[0]) || 0;
    minutes = parseFloat(parts[1]) || 0;
    seconds = parseFloat(parts[2]) || 0;
  } else if (parts.length === 2) {
    minutes = parseFloat(parts[0]) || 0;
    seconds = parseFloat(parts[1]) || 0;
  }
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Parse a full WebVTT string into structured ParsedCue list
 */
function parseWebVTT(vttText: string): ParsedCue[] {
  const cues: ParsedCue[] = [];
  const lines = vttText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.includes('-->')) {
      const [startStr, ...rest] = line.split('-->');
      const endStr = rest.join('-->').trim().split(/\s+/)[0];
      const start = parseTimestamp(startStr);
      const end = parseTimestamp(endStr);

      i++;
      const textLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== '') {
        textLines.push(lines[i].trim());
        i++;
      }

      if (!isNaN(start) && !isNaN(end) && textLines.length > 0) {
        const cleaned = cleanCueText(textLines.join('\n'));
        if (cleaned) {
          // Merge / deduplicate identical consecutive or overlapping cues
          const prev = cues[cues.length - 1];
          if (
            prev &&
            prev.text.trim().toLowerCase() === cleaned.trim().toLowerCase() &&
            Math.abs(prev.start - start) < 1.0
          ) {
            prev.end = Math.max(prev.end, end);
          } else {
            cues.push({ start, end, text: cleaned });
          }
        }
      }
    } else {
      i++;
    }
  }

  return cues;
}

function getVttUrlForVideo(videoEl: HTMLVideoElement): string | null {
  const hostEl = ((videoEl as unknown as { target?: HTMLElement })?.target ?? videoEl) as HTMLElement | null;
  const trackEl =
    typeof hostEl?.querySelector === 'function'
      ? (hostEl.querySelector('track[kind="subtitles"][src], track[kind="captions"][src]') as HTMLTrackElement | null)
      : null;
  if (trackEl?.src) {
    return trackEl.src;
  }

  // Check poster image, storyboard tracks, video source, or closest media-skin element
  const skin = typeof hostEl?.closest === 'function' ? hostEl.closest('.media-skin') : null;
  const posterImg = skin?.querySelector('img') as HTMLImageElement | null;
  const metadataTrack =
    typeof hostEl?.querySelector === 'function'
      ? (hostEl.querySelector('track[kind="metadata"]') as HTMLTrackElement | null)
      : null;

  const searchSources = [
    videoEl.currentSrc,
    videoEl.src,
    posterImg?.src,
    metadataTrack?.src,
  ]
    .filter(Boolean)
    .join(' ');

  for (const [id, url] of Object.entries(KNOWN_SUBTITLE_MAP)) {
    if (searchSources.includes(id)) {
      return url;
    }
  }

  return null;
}

function getActiveSubtitleTrack(media: HTMLVideoElement): TextTrack | null {
  const tracks = Array.from(media.textTracks || []);
  return (
    tracks.find(
      (t) => (t.kind === 'subtitles' || t.kind === 'captions') && (t.mode === 'showing' || t.mode === 'hidden')
    ) || null
  );
}

/**
 * Format subtitle cue text:
 * - Detects sound effects / music cues (e.g. "[Music]", "[Applause]", "♪ ... ♪")
 * - Formats lines cleanly for optimal compact typography & contrast without bloated empty space
 */
function formatCueContent(text: string) {
  const isSoundOrMusic =
    /^\s*\[(.*?)\]\s*$/.test(text) ||
    /^\s*♪(.*?)♪\s*$/.test(text) ||
    text.toLowerCase().includes('music') ||
    text.includes('♪');

  if (isSoundOrMusic) {
    const cleanSound = text.replace(/^[\[♪\s]+|[\]♪\s]+$/g, '').trim();
    return (
      <span className="inline-flex items-center justify-center gap-1 italic tracking-wide text-white/95 leading-tight">
        <span className="text-[10px] sm:text-[11px] opacity-75 font-normal select-none">♪</span>
        <span>{cleanSound || text}</span>
        <span className="text-[10px] sm:text-[11px] opacity-75 font-normal select-none">♪</span>
      </span>
    );
  }

  const rawLines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  // Deduplicate consecutive or identical lines so captions never repeat within a single pill
  const seenLines = new Set<string>();
  const lines: string[] = [];
  for (const l of rawLines) {
    const norm = l.toLowerCase();
    if (!seenLines.has(norm)) {
      seenLines.add(norm);
      lines.push(l);
    }
  }

  if (lines.length > 1) {
    return (
      <span className="flex flex-col items-center gap-0.5">
        {lines.map((line, idx) => (
          <span key={idx} className="block leading-[1.3] text-center">
            {line}
          </span>
        ))}
      </span>
    );
  }

  return <span className="leading-[1.3] text-center">{lines[0] || text}</span>;
}

export interface CaptionStyleConfig {
  pillClass: string;
  style: React.CSSProperties;
}

export const CAPTION_STYLE_CONFIGS: Record<CaptionDesignId, CaptionStyleConfig> = {
  'glass-pill': {
    pillClass: 'rounded-full px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 backdrop-blur-[14px] backdrop-saturate-[160%] text-white font-sans font-medium',
    style: {
      background: 'rgba(8, 10, 15, 0.72)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.35)',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.95), 0 0 8px rgba(0, 0, 0, 0.65)',
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    },
  },
  'cinema-classic': {
    pillClass: 'rounded-[4px] px-3.5 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 text-white font-sans font-semibold tracking-wide',
    style: {
      background: 'rgba(0, 0, 0, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.85)',
      textShadow: 'none',
      filter: 'none',
    },
  },
  'retro-yellow': {
    pillClass: 'rounded-[6px] px-3.5 py-1.5 sm:px-4.5 sm:py-2 md:px-5 md:py-2.5 font-sans font-semibold tracking-normal backdrop-blur-[4px]',
    style: {
      background: 'rgba(10, 10, 14, 0.90)',
      color: '#ffe600',
      border: '1px solid rgba(254, 240, 138, 0.3)',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.8)',
      textShadow: '0 1px 2px #000000, 0 0 4px rgba(0, 0, 0, 0.9)',
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    },
  },
  'neon-cyber': {
    pillClass: 'rounded-[8px] px-4 py-1.5 sm:px-5 sm:py-2 md:px-5.5 md:py-2.5 font-mono font-medium tracking-[0.04em] backdrop-blur-[10px]',
    style: {
      background: 'rgba(3, 7, 18, 0.88)',
      color: '#e0faff',
      border: '1.5px solid #00f0ff',
      boxShadow: '0 0 16px rgba(0, 240, 255, 0.45), inset 0 0 10px rgba(0, 240, 255, 0.22)',
      textShadow: '0 0 8px rgba(0, 240, 255, 0.9), 0 1px 3px rgba(0, 0, 0, 0.95)',
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    },
  },
  'minimalist': {
    pillClass: 'rounded-none px-2 py-0.5 sm:px-3 sm:py-1 font-sans font-bold tracking-tight',
    style: {
      background: 'transparent',
      color: '#ffffff',
      border: 'none',
      boxShadow: 'none',
      backdropFilter: 'none',
      WebkitBackdropFilter: 'none',
      textShadow: '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 2px 4px rgba(0, 0, 0, 0.95)',
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    },
  },
  'obsidian-gold': {
    pillClass: 'rounded-[7px] sm:rounded-[9px] px-3.5 py-1.5 sm:px-4.5 sm:py-2 md:px-5 md:py-2.5 font-serif font-medium tracking-[0.02em] backdrop-blur-[12px]',
    style: {
      background: 'linear-gradient(180deg, rgba(24, 20, 16, 0.94) 0%, rgba(12, 10, 8, 0.98) 100%)',
      color: '#fef3c7',
      border: '1px solid rgba(245, 158, 11, 0.45)',
      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(254, 240, 138, 0.25), 0 0 12px rgba(245, 158, 11, 0.2)',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.95), 0 0 8px rgba(245, 158, 11, 0.4)',
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    },
  },
  'retro-terminal': {
    pillClass: 'rounded-[3px] px-3.5 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 font-mono font-bold tracking-[0.05em] backdrop-blur-[6px]',
    style: {
      background: 'rgba(4, 18, 8, 0.92)',
      color: '#4ade80',
      border: '1px solid rgba(74, 222, 128, 0.45)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.85), inset 0 0 8px rgba(34, 197, 94, 0.2)',
      textShadow: '0 0 8px rgba(74, 222, 128, 0.85), 0 1px 2px rgba(0, 0, 0, 0.95)',
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    },
  },
  'synthwave-sunset': {
    pillClass: 'rounded-[8px] px-4 py-1.5 sm:px-5 sm:py-2 md:px-5.5 md:py-2.5 font-sans font-bold tracking-[0.03em] backdrop-blur-[12px]',
    style: {
      background: 'linear-gradient(135deg, rgba(20, 10, 35, 0.92) 0%, rgba(10, 5, 20, 0.96) 100%)',
      color: '#fdf4ff',
      border: '1.5px solid #f43f5e',
      boxShadow: '0 0 18px rgba(244, 63, 94, 0.45), inset 0 0 10px rgba(168, 85, 247, 0.25)',
      textShadow: '0 0 8px rgba(244, 63, 94, 0.9), 0 0 16px rgba(168, 85, 247, 0.5)',
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    },
  },
  'comic-pop': {
    pillClass: 'rounded-[8px] px-3.5 py-1.5 sm:px-4.5 sm:py-2 md:px-5.5 md:py-2 font-sans font-black tracking-tight',
    style: {
      background: '#fffdf5',
      color: '#09090b',
      border: '2px solid #09090b',
      boxShadow: '3px 3px 0px #09090b, 0 4px 12px rgba(0, 0, 0, 0.4)',
      textShadow: 'none',
      filter: 'none',
    },
  },
  'pure-frosted': {
    pillClass: 'rounded-full px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 backdrop-blur-[24px] backdrop-saturate-[200%] backdrop-brightness-[120%] text-white font-sans font-semibold',
    style: {
      background: 'rgba(255, 255, 255, 0.14)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.35)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.85)',
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    },
  },
};

/**
 * Universal High-Performance Captions Display (Adaptive All-Screen Design):
 * - Fits all device aspect ratios & screen sizes (mobile portrait, mobile landscape, tablet, desktop, fullscreen).
 * - Compact text-fitted liquid-glass capsule that never obscures the video scene or dominates the canvas.
 * - Sits gracefully in the lower third with responsive, lightweight bottom elevation.
 * - Indexes full WebVTT cues into memory with 0ms seek latency.
 * - Uniform drop-shadow strictly adhering to project guidelines: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85)).
 */
export function CaptionsDisplay() {
  const media = useMedia() as HTMLVideoElement | null;
  const isControlsVisible = usePlayer((state: any) => state?.controlsVisible ?? true);
  const [activeText, setActiveText] = useState<string | null>(null);
  const cuesRef = useRef<ParsedCue[]>([]);
  const fetchedUrlRef = useRef<string | null>(null);

  const [captionStyle, setCaptionStyle] = useState<CaptionDesignId>(() => {
    if (typeof window !== 'undefined') {
      const domStyle = document.documentElement.dataset.captionStyle;
      if (domStyle && domStyle in CAPTION_STYLE_CONFIGS) return domStyle as CaptionDesignId;
      const stored = sessionStorage.getItem('luminary-caption-style') || localStorage.getItem('luminary-caption-style');
      if (stored && stored in CAPTION_STYLE_CONFIGS) return stored as CaptionDesignId;
    }
    return 'glass-pill';
  });

  useEffect(() => {
    const handleStyleChange = (e: any) => {
      const nextStyle = e.detail?.style || e.data?.style;
      if (nextStyle && nextStyle in CAPTION_STYLE_CONFIGS) {
        setCaptionStyle(nextStyle as CaptionDesignId);
      }
    };

    window.addEventListener('luminary-caption-style-change', handleStyleChange as EventListener);
    window.addEventListener('message', handleStyleChange);
    return () => {
      window.removeEventListener('luminary-caption-style-change', handleStyleChange as EventListener);
      window.removeEventListener('message', handleStyleChange);
    };
  }, []);

  useEffect(() => {
    if (!media) return;

    let isSubscribed = true;

    // Load full VTT file if available for zero-latency seeking
    const loadFullVTT = async () => {
      const vttUrl = getVttUrlForVideo(media);
      if (!vttUrl || vttUrl === fetchedUrlRef.current) return;
      fetchedUrlRef.current = vttUrl;

      try {
        const res = await fetch(vttUrl);
        if (!res.ok) return;
        const text = await res.text();
        if (!isSubscribed) return;

        const parsed = parseWebVTT(text);
        if (parsed.length > 0) {
          cuesRef.current = parsed;
          updateActiveCue();
        }
      } catch {
        // Silently fall back to native track cues
      }
    };

    const parseCuesFromNativeTrack = (track: TextTrack) => {
      if (!track.cues || track.cues.length === 0) return;
      const existing = cuesRef.current;

      let hasNew = false;
      for (let i = 0; i < track.cues.length; i++) {
        const cue = track.cues[i] as any;
        if (cue && typeof cue.startTime === 'number' && typeof cue.endTime === 'number') {
          const cleaned = cleanCueText(cue.text || '');
          if (cleaned) {
            // Check if already in existing by text and overlapping time (within 0.8s)
            const exists = existing.some(
              (c) =>
                c.text.trim().toLowerCase() === cleaned.trim().toLowerCase() &&
                Math.abs(c.start - cue.startTime) < 0.8
            );
            if (!exists) {
              existing.push({
                start: cue.startTime,
                end: cue.endTime,
                text: cleaned,
              });
              hasNew = true;
            }
          }
        }
      }

      if (hasNew) {
        existing.sort((a, b) => a.start - b.start);
      }
    };

    const updateActiveCue = () => {
      if (!media) return;
      const activeTrack = getActiveSubtitleTrack(media);
      if (!activeTrack) {
        setActiveText(null);
        return;
      }

      // Check native cues in case new ones were attached
      parseCuesFromNativeTrack(activeTrack);

      const currentTime = media.currentTime;
      const cues = cuesRef.current;

      // Scan for matching cues at currentTime with strict deduplication
      const matchedTexts: string[] = [];
      const seenTexts = new Set<string>();

      for (let i = 0; i < cues.length; i++) {
        const c = cues[i];
        if (c.start <= currentTime && currentTime <= c.end) {
          const normalized = c.text.trim().toLowerCase();
          if (!seenTexts.has(normalized)) {
            seenTexts.add(normalized);
            matchedTexts.push(c.text);
          }
        }
      }

      // Fallback to activeCues if cuesRef was somehow empty
      if (matchedTexts.length === 0 && activeTrack.activeCues && activeTrack.activeCues.length > 0) {
        const activeList = Array.from(activeTrack.activeCues);
        for (const cue of activeList as any[]) {
          const cleaned = cleanCueText(cue?.text || '');
          if (cleaned) {
            const normalized = cleaned.trim().toLowerCase();
            if (!seenTexts.has(normalized)) {
              seenTexts.add(normalized);
              matchedTexts.push(cleaned);
            }
          }
        }
      }

      const finalText = matchedTexts.join('\n');
      setActiveText(finalText || null);
    };

    const handleTracksChange = () => {
      loadFullVTT();
      const active = getActiveSubtitleTrack(media);
      if (active) {
        parseCuesFromNativeTrack(active);
        active.oncuechange = () => {
          parseCuesFromNativeTrack(active);
          updateActiveCue();
        };
      }
      updateActiveCue();
    };

    // Initial load & sync
    loadFullVTT();
    handleTracksChange();

    const textTracks = media.textTracks;
    if (textTracks) {
      textTracks.addEventListener('change', handleTracksChange);
      textTracks.addEventListener('addtrack', handleTracksChange);
      textTracks.addEventListener('removetrack', handleTracksChange);
    }

    // Critical seek & time events for instant catch-up
    const onSeeking = () => updateActiveCue();
    const onSeeked = () => updateActiveCue();
    const onTimeUpdate = () => updateActiveCue();

    media.addEventListener('seeking', onSeeking);
    media.addEventListener('seeked', onSeeked);
    media.addEventListener('timeupdate', onTimeUpdate);
    media.addEventListener('play', updateActiveCue);
    media.addEventListener('pause', updateActiveCue);
    media.addEventListener('ratechange', updateActiveCue);
    media.addEventListener('loadeddata', handleTracksChange);
    media.addEventListener('loadstart', () => {
      fetchedUrlRef.current = null;
      cuesRef.current = [];
      handleTracksChange();
    });

    return () => {
      isSubscribed = false;
      if (textTracks) {
        textTracks.removeEventListener('change', handleTracksChange);
        textTracks.removeEventListener('addtrack', handleTracksChange);
        textTracks.removeEventListener('removetrack', handleTracksChange);
      }
      media.removeEventListener('seeking', onSeeking);
      media.removeEventListener('seeked', onSeeked);
      media.removeEventListener('timeupdate', onTimeUpdate);
      media.removeEventListener('play', updateActiveCue);
      media.removeEventListener('pause', updateActiveCue);
      media.removeEventListener('ratechange', updateActiveCue);
      media.removeEventListener('loadeddata', handleTracksChange);
    };
  }, [media]);

  if (!activeText) return null;

  const activeConfig = CAPTION_STYLE_CONFIGS[captionStyle] || CAPTION_STYLE_CONFIGS['glass-pill'];

  return (
    <div
      aria-live="polite"
      className={cn(
        'pointer-events-none absolute inset-x-0 flex justify-center px-3 sm:px-6 z-25',
        // Responsive snug bottom elevation: stays close to lower edge, never jumping into video center
        'bottom-2 sm:bottom-3 md:bottom-5',
        '[[data-controls-visible]_&]:bottom-[40px] sm:[[data-controls-visible]_&]:bottom-[54px] md:[[data-controls-visible]_&]:bottom-[72px]',
        'transition-[bottom] duration-200 ease-out'
      )}
    >
      <div
        key={`${captionStyle}-${activeText}`}
        data-part="caption-pill"
        data-caption-style={captionStyle}
        className={cn(
          'inline-block max-w-[94%] sm:max-w-[84%] md:max-w-[72%]',
          'text-center select-none transition-all duration-120 animate-in fade-in zoom-in-[0.98]',
          'text-[11.5px] sm:text-[13px] md:text-[14.5px] lg:text-[16px]',
          activeConfig.pillClass
        )}
        style={activeConfig.style}
      >
        {formatCueContent(activeText)}
      </div>
    </div>
  );
}
