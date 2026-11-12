import { useEffect } from 'react';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoPlayer } from '@videojs/react/video';

import { VideoSkin } from '@/video/skin';

import type { PlaybackProps } from '../shell/params';
import { SANDBOX_VIDEOS } from './video-input';

function findPlaybackMedia(): HTMLMediaElement | null {
  const directVideo = document.querySelector('video');
  if (directVideo) return directVideo;
  for (const element of document.querySelectorAll('*')) {
    if (element.localName.startsWith('media-')) continue;
    if ('paused' in element && 'play' in element && typeof (element as any).play === 'function') {
      return element as HTMLMediaElement;
    }
  }
  return null;
}

// Default media: Mad Max: Fury Road (Official Teaser Trailer • HLS)
export const DEFAULT_SRC = 'https://stream.mux.com/JX01bG8eB4uaoV3OpDuK602rBfvdSgrMObjwuUOBn4JrQ.m3u8';
export const DEFAULT_POSTER = 'https://image.mux.com/JX01bG8eB4uaoV3OpDuK602rBfvdSgrMObjwuUOBn4JrQ/thumbnail.webp';
const COSMIC_DAWN_CHAPTERS = './cosmic-dawn-chapters.vtt';

export const SUBTITLE_TRACKS: Record<string, string> = {
  // Big Buck Bunny
  'https://stream.mux.com/VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA.m3u8': '/big-buck-bunny-subtitles.vtt',
  // Elephants Dream
  'https://stream.mux.com/Sc89iWAyNkhJ3P1rQ02nrEdCFTnfT01CZ2KmaEcxXfB008.m3u8': '/elephants-dream-subtitles.vtt',
  // Mad Max: Fury Road
  'https://stream.mux.com/JX01bG8eB4uaoV3OpDuK602rBfvdSgrMObjwuUOBn4JrQ.m3u8': '/mad-max-subtitles.vtt',
  // View From A Blue Moon
  'https://stream.mux.com/lyrKpPcGfqyzeI00jZAfW6MvP6GNPrkML.m3u8': '/view-from-blue-moon-subtitles.vtt',
  // Cosmic Dawn
  'https://stream.mux.com/83EzHOvVzVN01AsrD01BCpiH02Pj3S8mfzBOu101w2nHC5s.m3u8': '/cosmic-dawn-subtitles.vtt',
};

function getSubtitleTrackForSrc(src: string): string | undefined {
  if (SUBTITLE_TRACKS[src]) return SUBTITLE_TRACKS[src];
  for (const [key, vtt] of Object.entries(SUBTITLE_TRACKS)) {
    const id = key.split('/').pop()?.split('.')[0];
    if (id && src.includes(id)) return vtt;
  }
  return undefined;
}

function getPosterForSrc(src: string): string | undefined {
  const match = src.match(/stream\.mux\.com\/([a-zA-Z0-9_-]+)(?:\.m3u8|\/|\?|$)/);
  if (match?.[1]) {
    return `https://image.mux.com/${match[1]}/thumbnail.webp`;
  }
  return undefined;
}

/** `media` carries the workbench's playback options: autoplay, muted, loop, and preload. */
export function Player({ media, customSrc, version }: { media?: PlaybackProps; customSrc?: string; version?: string }) {
  const src = customSrc?.trim() || DEFAULT_SRC;
  const poster = getPosterForSrc(src) || DEFAULT_POSTER;
  const hasChapters = src.includes('83EzHOvVzVN01AsrD01BCpiH02Pj3S8mfzBOu101w2nHC5s');

  const matched = SANDBOX_VIDEOS.find((v) => v.src === src);
  const title = matched ? matched.title : 'Custom Video';
  const subtitle = matched ? matched.subtitle : undefined;

  useEffect(() => {
    let unmounted = false;
    const ensureUnmutedSound = () => {
      const mediaEl = findPlaybackMedia();
      if (!mediaEl) return false;

      mediaEl.muted = false;
      mediaEl.volume = 1;

      const promise = mediaEl.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(() => {
          // If browser policy blocked unmuted autoplay without prior interaction,
          // resume with sound on the first user interaction anywhere on the window.
          const resumeAudioOnGesture = () => {
            window.removeEventListener('pointerdown', resumeAudioOnGesture, true);
            window.removeEventListener('keydown', resumeAudioOnGesture, true);
            window.removeEventListener('touchstart', resumeAudioOnGesture, true);
            if (unmounted) return;
            mediaEl.muted = false;
            mediaEl.volume = 1;
            if (mediaEl.paused) {
              mediaEl.play().catch(() => {});
            }
          };
          window.addEventListener('pointerdown', resumeAudioOnGesture, { capture: true, once: true });
          window.addEventListener('keydown', resumeAudioOnGesture, { capture: true, once: true });
          window.addEventListener('touchstart', resumeAudioOnGesture, { capture: true, once: true });
        });
      }
      return true;
    };

    if (!ensureUnmutedSound()) {
      const observer = new MutationObserver(() => {
        if (ensureUnmutedSound()) {
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return () => {
        unmounted = true;
        observer.disconnect();
      };
    }

    return () => {
      unmounted = true;
    };
  }, [src]);

  const subtitleTrackSrc = getSubtitleTrackForSrc(src);

  // MuxVideo natively supports:
  // - HLS .m3u8 streams (including all official videojs-sandbox streams)
  // - Progressive MP4, WebM, OGG, MOV
  // - Local Blob URLs (from drag-and-drop file upload)
  return (
    <VideoPlayer key={src} poster={poster} title={title}>
      <VideoSkin title={title} subtitle={subtitle}>
        <MuxVideo {...media} muted={false} src={src} playsInline crossOrigin="">
          {subtitleTrackSrc && (
            <track kind="subtitles" label="English" srcLang="en" src={subtitleTrackSrc} default />
          )}
          {hasChapters && <track kind="chapters" label="English" srcLang="en" src={COSMIC_DAWN_CHAPTERS} default />}
        </MuxVideo>
      </VideoSkin>
    </VideoPlayer>
  );
}
