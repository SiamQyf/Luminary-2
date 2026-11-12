/** @jsxImportSource react */

import { CaptionsButton as CaptionsButtonPrimitive, useMedia } from '@videojs/react';
import type { ClassValue } from 'cn';
import { useEffect, useState } from 'react';

import { cn, resolveClassName } from '@/lib/resolve-class-name';

import { Button } from './button';
import { ButtonTooltip } from './tooltip';

/**
 * Modern rounded caption off icon matching the smooth liquid glass aesthetic (strict 2 subtitle lines)
 */
export function RoundedCaptionsOffIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Smoothly rounded outer badge */}
      <rect
        x="1"
        y="1"
        width="16"
        height="12"
        rx="3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        className="opacity-80"
      />
      {/* Subtitle Line 1 (2 rounded dashes) */}
      <rect x="3.8" y="4.5" width="4.4" height="1.6" rx="0.8" fill="currentColor" className="opacity-80" />
      <rect x="9.2" y="4.5" width="5.0" height="1.6" rx="0.8" fill="currentColor" className="opacity-80" />
      {/* Subtitle Line 2 (2 rounded dashes) */}
      <rect x="3.8" y="7.9" width="6.6" height="1.6" rx="0.8" fill="currentColor" className="opacity-80" />
      <rect x="11.4" y="7.9" width="2.8" height="1.6" rx="0.8" fill="currentColor" className="opacity-80" />
    </svg>
  );
}

/**
 * Modern rounded caption on icon (active state: filled badge with transparent 2-line cutouts)
 */
export function RoundedCaptionsOnIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 18 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Solid filled badge with transparent 2-line cutouts using evenodd fill rule */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 4.2 1 C 2.43 1 1 2.43 1 4.2 V 9.8 C 1 11.57 2.43 13 4.2 13 H 13.8 C 15.57 13 17 11.57 17 9.8 V 4.2 C 17 2.43 15.57 1 13.8 1 H 4.2 Z M 3.8 4.5 C 3.8 4.06 4.16 3.7 4.6 3.7 H 7.4 C 7.84 3.7 8.2 4.06 8.2 4.5 V 5.3 C 8.2 5.74 7.84 6.1 7.4 6.1 H 4.6 C 4.16 6.1 3.8 5.74 3.8 5.3 Z M 9.2 4.5 C 9.2 4.06 9.56 3.7 10 3.7 H 13.4 C 13.84 3.7 14.2 4.06 14.2 4.5 V 5.3 C 14.2 5.74 13.84 6.1 13.4 6.1 H 10 C 9.56 6.1 9.2 5.74 9.2 5.3 Z M 3.8 7.9 C 3.8 7.46 4.16 7.1 4.6 7.1 H 9.6 C 10.04 7.1 10.4 7.46 10.4 7.9 V 8.7 C 10.4 9.14 10.04 9.5 9.6 9.5 H 4.6 C 4.16 9.5 3.8 9.14 3.8 8.7 Z M 11.4 7.9 C 11.4 7.46 11.76 7.1 12.2 7.1 H 13.4 C 13.84 7.1 14.2 7.46 14.2 7.9 V 8.7 C 14.2 9.14 13.84 9.5 13.4 9.5 H 12.2 C 11.76 9.5 11.4 9.14 11.4 8.7 Z"
      />
    </svg>
  );
}

export function useHasCaptionTracks() {
  const media = useMedia() as HTMLVideoElement | null;
  const [hasTracks, setHasTracks] = useState(false);

  useEffect(() => {
    const textTracks = media?.textTracks;
    if (!textTracks) {
      setHasTracks(false);
      return;
    }

    const update = () => {
      const tracks = Array.from(textTracks);
      setHasTracks(tracks.some((t) => t.kind === 'subtitles' || t.kind === 'captions'));
    };

    update();
    textTracks.addEventListener('addtrack', update);
    textTracks.addEventListener('removetrack', update);
    textTracks.addEventListener('change', update);
    return () => {
      textTracks.removeEventListener('addtrack', update);
      textTracks.removeEventListener('removetrack', update);
      textTracks.removeEventListener('change', update);
    };
  }, [media]);

  return hasTracks;
}

export function CaptionsToggle() {
  const hasTracks = useHasCaptionTracks();
  const media = useMedia() as HTMLVideoElement | null;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const textTracks = media?.textTracks;
    if (!textTracks) return;

    const update = () => {
      const tracks = Array.from(textTracks);
      setIsActive(tracks.some((t) => (t.kind === 'subtitles' || t.kind === 'captions') && t.mode === 'showing'));
    };

    update();
    textTracks.addEventListener('change', update);
    textTracks.addEventListener('addtrack', update);
    textTracks.addEventListener('removetrack', update);
    return () => {
      textTracks.removeEventListener('change', update);
      textTracks.removeEventListener('addtrack', update);
      textTracks.removeEventListener('removetrack', update);
    };
  }, [media]);

  const tooltipLabel = !hasTracks
    ? 'Captions unavailable'
    : isActive
      ? 'Captions (c) • On'
      : 'Captions (c) • Off';

  return (
    <ButtonTooltip label={tooltipLabel}>
      <CaptionsButton hasTracks={hasTracks} />
    </ButtonTooltip>
  );
}

export type CaptionsButtonProps = Omit<CaptionsButtonPrimitive.Props, 'children'> & {
  iconClassName?: ClassValue;
  hasTracks?: boolean;
};

/**
 * Mesmerizing Captions Button:
 * - Shares the exact same translucent liquid glass circular geometry as all player buttons
 * - Standardized 14px visual footprint matching Play, Skip, Volume, Fullscreen, and Settings
 * - Strict 2 subtitle lines display with uniform icon drop shadow per GEMINI.md
 * - Luminous optical active state indicator dot indicating active caption playback
 * - Stays visibly rendered (disabled) when a stream has no subtitle tracks instead of vanishing
 */
export function CaptionsButton({ className, iconClassName, hasTracks: hasTracksProp, ...props }: CaptionsButtonProps = {}) {
  const detectedTracks = useHasCaptionTracks();
  const hasTracks = hasTracksProp ?? detectedTracks;

  if (!hasTracks) {
    return (
      <Button
        disabled
        aria-label="Captions unavailable"
        className={cn(
          'group/captions relative opacity-40 cursor-not-allowed transition-all duration-200',
          typeof className === 'string' ? className : undefined
        )}
        {...(props as any)}
      >
        <RoundedCaptionsOffIcon
          className={cn('col-start-1 row-start-1 w-[15.5px] h-[13.1px] text-white/70', iconClassName)}
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))' }}
        />
      </Button>
    );
  }

  return (
    <CaptionsButtonPrimitive
      render={<Button />}
      className={(state) =>
        cn(
          'group/captions relative transition-all duration-200',
          resolveClassName(className, state)
        )
      }
      {...props}
    >
      <RoundedCaptionsOffIcon
        className={cn(
          'col-start-1 row-start-1 w-[15.5px] h-[13.1px] text-white transition-transform duration-200 group-hover/captions:scale-105',
          'group-data-active/captions:hidden',
          iconClassName
        )}
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))' }}
      />
      <RoundedCaptionsOnIcon
        className={cn(
          'col-start-1 row-start-1 hidden w-[15.5px] h-[13.1px] text-white transition-transform duration-200 group-hover/captions:scale-105',
          'group-data-active/captions:block',
          iconClassName
        )}
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))' }}
      />
      {/* Luminous optical active indicator dot */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[3.5px] left-1/2 -translate-x-1/2 size-[3px] rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95)] opacity-0 scale-50 group-data-active/captions:opacity-100 group-data-active/captions:scale-100 transition-all duration-200"
      />
    </CaptionsButtonPrimitive>
  );
}
