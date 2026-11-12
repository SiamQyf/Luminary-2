/** @jsxImportSource react */

import { useMedia, usePlayer } from '@videojs/react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/resolve-class-name';

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
        key={activeText}
        data-part="caption-pill"
        className={cn(
          'inline-block max-w-[94%] sm:max-w-[84%] md:max-w-[72%]',
          'px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2',
          'rounded-[7px] sm:rounded-[9px] md:rounded-[11px]',
          'backdrop-blur-[12px] backdrop-saturate-[160%] backdrop-contrast-[105%]',
          'text-white text-center font-sans font-medium',
          'text-[11.5px] sm:text-[13px] md:text-[14.5px] lg:text-[16px] tracking-[0.01em]',
          'select-none transition-all duration-120 animate-in fade-in zoom-in-[0.98]'
        )}
        style={{
          background: 'var(--media-caption-bg, rgba(8, 10, 15, 0.72))',
          border: '1px solid var(--media-caption-border, rgba(255, 255, 255, 0.15))',
          boxShadow:
            'var(--media-caption-shadow, 0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 0 rgba(0, 0, 0, 0.35))',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.95), 0 0 8px rgba(0, 0, 0, 0.65)',
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
        }}
      >
        {formatCueContent(activeText)}
      </div>
    </div>
  );
}
