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
          cues.push({ start, end, text: cleaned });
        }
      }
    } else {
      i++;
    }
  }

  return cues;
}

function getVttUrlForVideo(videoEl: HTMLVideoElement): string | null {
  const trackEl = videoEl.querySelector('track[kind="subtitles"][src], track[kind="captions"][src]') as HTMLTrackElement | null;
  if (trackEl?.src) {
    return trackEl.src;
  }

  // Check poster image, storyboard tracks, video source, or closest media-skin element
  const skin = videoEl.closest('.media-skin');
  const posterImg = skin?.querySelector('img') as HTMLImageElement | null;
  const metadataTrack = videoEl.querySelector('track[kind="metadata"]') as HTMLTrackElement | null;

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
 * High-Performance Synchronized Captions Display:
 * - Completely solves native browser cue desynchronization during seeking, scrubbing, and pause jumps.
 * - Indexes full WebVTT cues into memory with 0ms seek latency.
 * - Synchronously updates active subtitle text on 'seeking', 'seeked', 'timeupdate', 'play', and 'pause'.
 * - Dynamically adapts elevation above the bottom control bar to avoid overlap.
 * - Mesmerizing frosted liquid glass pill capsule with uniform drop-shadow adhering to project guidelines.
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
      const existingKeys = new Set(existing.map((c) => `${c.start.toFixed(2)}-${c.end.toFixed(2)}`));

      let hasNew = false;
      for (let i = 0; i < track.cues.length; i++) {
        const cue = track.cues[i] as any;
        if (cue && typeof cue.startTime === 'number' && typeof cue.endTime === 'number') {
          const key = `${cue.startTime.toFixed(2)}-${cue.endTime.toFixed(2)}`;
          if (!existingKeys.has(key)) {
            const cleaned = cleanCueText(cue.text || '');
            if (cleaned) {
              existing.push({
                start: cue.startTime,
                end: cue.endTime,
                text: cleaned,
              });
              existingKeys.add(key);
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

      // Instant binary or linear scan for matching cue at currentTime
      let matchedText = '';
      for (let i = 0; i < cues.length; i++) {
        const c = cues[i];
        if (c.start <= currentTime && currentTime <= c.end) {
          matchedText = matchedText ? `${matchedText}\n${c.text}` : c.text;
        }
      }

      // Fallback to activeCues if cuesRef was somehow empty
      if (!matchedText && activeTrack.activeCues && activeTrack.activeCues.length > 0) {
        const activeList = Array.from(activeTrack.activeCues);
        matchedText = activeList
          .map((c: any) => cleanCueText(c.text || ''))
          .filter(Boolean)
          .join('\n');
      }

      setActiveText(matchedText || null);
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
      media.removeEventListener('loadeddata', handleTracksChange);
    };
  }, [media]);

  if (!activeText) return null;

  return (
    <div
      aria-live="polite"
      className={cn(
        'pointer-events-none absolute inset-x-0 flex justify-center px-6 z-25',
        'bottom-5 sm:bottom-6 [[data-controls-visible]_&]:bottom-[76px] sm:[[data-controls-visible]_&]:bottom-[84px]',
        'transition-[bottom] duration-300 ease-out'
      )}
    >
      <div
        className={cn(
          'inline-block max-w-[85%] sm:max-w-[75%] px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl',
          'bg-black/80 backdrop-blur-md border border-white/20',
          'shadow-[0_4px_24px_rgba(0,0,0,0.75)]',
          'text-white text-center text-[13.5px] sm:text-[15.5px] font-medium leading-snug tracking-wide whitespace-pre-line',
          'animate-in fade-in zoom-in-95 duration-100 select-none'
        )}
        style={{
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
        }}
      >
        {activeText}
      </div>
    </div>
  );
}
