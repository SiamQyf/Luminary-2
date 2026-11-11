/** @jsxImportSource react */

import { VolumeSlider, MuteButton as MuteButtonPrimitive, usePlayer, selectVolume } from '@videojs/react';
import { selectFullscreen } from '@videojs/core/dom';
import type { ClassValue } from 'cn';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { cn } from '@/lib/resolve-class-name';

/**
 * Animated Volume Horn Icon:
 * - Dynamic volume scale: Horn scales smoothly from 0.88x (muted/0) to 1.10x (100% volume)
 * - Active slide / volume change pulse: Horn pumps/vibrates acoustically while sliding or on volume change
 * - Responsive sound wave: Scales and pulses outward with volume level
 * - Spring-transitioned 'x' icon when muted
 */
function VolumeHornAnimatedIcon({
  className,
  isDancing = false,
}: {
  className?: string;
  isDancing?: boolean;
}) {
  const volumeState = usePlayer(selectVolume);
  const volume = volumeState?.volume ?? 1;
  const muted = volumeState?.muted ?? false;

  const effectiveVolume = muted ? 0 : volume;
  const isMuted = muted || volume === 0;

  // Horn scale from 0.88 (min) to 1.00 (max)
  const hornScale = (0.88 + effectiveVolume * 0.12).toFixed(3);
  // Sound wave scale from 0.70 to 0.98
  const waveScale = (0.7 + effectiveVolume * 0.28).toFixed(3);
  const waveOpacity = isMuted ? 0 : 0.35 + effectiveVolume * 0.65;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Speaker Horn Body - pumps/pulses while sliding or on volume change */}
      <g
        className={cn(
          'origin-[10px_12px] transition-transform duration-150 ease-out',
          'group-has-[[data-dragging]]/vol-pill:animate-[horn-pulse_0.35s_ease-in-out_infinite]',
          isDancing && 'animate-[horn-pulse_0.35s_ease-in-out_infinite]!'
        )}
        style={{
          '--horn-scale': hornScale,
          transform: 'scale(var(--horn-scale, 1))',
        } as CSSProperties}
      >
        <path d="M12.992 3.976c.686-.528 1.504-.956 2.375-.588.863.365 1.14 1.245 1.26 2.11.123.887.123 2.108.123 3.626v5.755c0 1.519 0 2.74-.123 3.626-.12.865-.397 1.745-1.26 2.11-.871.369-1.689-.06-2.375-.587-.703-.54-1.595-1.451-2.645-2.524-.54-.55-.898-.817-1.26-.967-.365-.15-.808-.214-1.58-.214-.67 0-1.267 0-1.72-.047-.475-.05-.916-.157-1.313-.427-.756-.516-1.045-1.271-1.154-1.965-.082-.518-.073-1.086-.065-1.543v-.678c-.008-.458-.017-1.026.065-1.544.11-.694.398-1.449 1.154-1.964.397-.271.838-.378 1.313-.428.453-.047 1.05-.047 1.72-.047.772 0 1.215-.064 1.58-.214.362-.15.72-.416 1.26-.967 1.05-1.072 1.942-1.984 2.645-2.523" />
      </g>

      {/* Sound Waves - radiates outward as volume increases and pulses on slide or volume change */}
      <g
        className={cn(
          'origin-[17px_12px] transition-all duration-200 ease-out',
          'group-has-[[data-dragging]]/vol-pill:animate-[wave-pulse_0.35s_ease-in-out_infinite]',
          isDancing && 'animate-[wave-pulse_0.35s_ease-in-out_infinite]!'
        )}
        style={{
          '--wave-scale': waveScale,
          transform: `scale(var(--wave-scale, 1))`,
          opacity: waveOpacity,
          pointerEvents: 'none',
        } as CSSProperties}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.394 8.205a1 1 0 0 1 1.401.188A5.93 5.93 0 0 1 21 12a5.93 5.93 0 0 1-1.205 3.607 1 1 0 1 1-1.59-1.213A3.93 3.93 0 0 0 19 12c0-.915-.301-1.746-.795-2.393a1 1 0 0 1 .189-1.402"
        />
      </g>

      {/* Muted 'x' mark - springs in when muted or volume is 0 */}
      <g
        className="origin-[19.5px_12px] transition-all duration-200 ease-out"
        style={{
          transform: isMuted ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-45deg)',
          opacity: isMuted ? 1 : 0,
          pointerEvents: 'none',
        }}
      >
        <line x1="17.5" y1="9.5" x2="21.5" y2="14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="21.5" y1="9.5" x2="17.5" y2="14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/**
 * Volume Pill precisely matching user request:
 * - Remains a collapsed 27.3px circular button with centered speaker icon until hovered, focused, or volume changes
 * - Smoothly expands to 98px pill with horizontal slider track on hover or arrow up/down volume change
 * - Animates the volume horn and waves dynamically with the dancing pulse animation
 * - Automatically keeps bottom controls visible while adjusting volume, then smoothly auto-collapses
 */
export function VolumePill({ className }: { className?: ClassValue }) {
  const store = usePlayer();
  const volumeState = usePlayer(selectVolume);
  const currentVolume = volumeState?.volume ?? 1;
  const currentMuted = volumeState?.muted ?? false;

  const playerFullscreen = usePlayer(selectFullscreen)?.isFullscreen ?? false;
  const [docFullscreen, setDocFullscreen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const prevVolumeRef = useRef<number | null>(null);
  const prevMutedRef = useRef<boolean | null>(null);
  const activeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const releaseLockRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const update = () => {
      setDocFullscreen(Boolean(document.fullscreenElement || (document as any).webkitFullscreenElement));
    };
    update();
    document.addEventListener('fullscreenchange', update);
    document.addEventListener('webkitfullscreenchange', update);
    return () => {
      document.removeEventListener('fullscreenchange', update);
      document.removeEventListener('webkitfullscreenchange', update);
    };
  }, []);

  // Detect volume changes (ArrowUp, ArrowDown, scroll, etc.) to trigger pill expansion & horn dancing animation
  useEffect(() => {
    if (prevVolumeRef.current === null) {
      prevVolumeRef.current = currentVolume;
      prevMutedRef.current = currentMuted;
      return;
    }

    const volumeChanged = prevVolumeRef.current !== currentVolume;
    const mutedChanged = prevMutedRef.current !== currentMuted;

    prevVolumeRef.current = currentVolume;
    prevMutedRef.current = currentMuted;

    if (volumeChanged || mutedChanged) {
      setIsActive(true);

      // Acquire controls lock so the controls bar stays visible during volume adjustment
      if (!releaseLockRef.current) {
        const getLockFn = () => {
          if (!store) return null;
          if (typeof (store as any).requestControlsLock === 'function') {
            return (store as any).requestControlsLock.bind(store);
          }
          const state = typeof store.getState === 'function' ? (store.getState() as any) : null;
          if (state && typeof state.requestControlsLock === 'function') {
            return state.requestControlsLock;
          }
          return null;
        };
        const lockFn = getLockFn();
        if (lockFn) {
          releaseLockRef.current = lockFn();
        }
      }

      // Reset auto-collapse timer (stay expanded for 1.8 seconds after last volume change)
      if (activeTimerRef.current) {
        clearTimeout(activeTimerRef.current);
      }
      activeTimerRef.current = setTimeout(() => {
        setIsActive(false);
        if (releaseLockRef.current) {
          releaseLockRef.current();
          releaseLockRef.current = null;
        }
      }, 1800);
    }
  }, [currentVolume, currentMuted, store]);

  useEffect(() => {
    return () => {
      if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
      if (releaseLockRef.current) releaseLockRef.current();
    };
  }, []);

  const isFullscreen = playerFullscreen || docFullscreen;

  return (
    <div
      className={cn(
        'relative group/vol-pill flex h-[31.4px] shrink-0 items-center justify-center rounded-full overflow-hidden select-none isolate border-none outline-none',
        // Collapsed circle by default, expands to full pill when hovered, focused, dragged, or actively changing
        'w-[31.4px]',
        'hover:w-[112px] hover:pr-3 hover:justify-start',
        'focus-within:w-[112px] focus-within:pr-3 focus-within:justify-start',
        'has-[[data-dragging]]:w-[112px] has-[[data-dragging]]:pr-3 has-[[data-dragging]]:justify-start',
        isActive && 'w-[112px]! pr-3! justify-start!',
        // Static high-translucency dark liquid glass base
        'bg-black/20',
        // Luminous transparent liquid glass (lets video colors shine through with refraction)
        'bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent',
        'hover:from-white/[0.22] hover:via-white/[0.08] hover:to-transparent',
        // Outer elevation shadow (no border shine)
        'shadow-[0_2.5px_10px_0_rgba(0,0,0,0.3)]',
        // Optical backdrop refraction & clarity
        'backdrop-blur-[12px] backdrop-saturate-[150%] backdrop-brightness-[108%]',
        // Smooth transition
        'transition-[width,padding] duration-300 ease-out',
        className
      )}
      data-name="Volume Pill"
    >
      {/* Mute button trigger: exact 31.4px circular geometry matching Button, perfectly centering the animated horn */}
      <MuteButtonPrimitive className="relative z-10 size-[31.4px] shrink-0 grid place-items-center p-0 m-0 border-none bg-transparent cursor-pointer text-white group/mute outline-none">
        <span
          className={cn(
            'player-icon-scale relative z-10 size-full grid grid-cols-1 grid-rows-1 place-items-center text-white pointer-events-none transition-transform duration-500 ease-out',
            isFullscreen ? 'scale-[0.92]!' : 'scale-[0.86]!'
          )}
        >
          <VolumeHornAnimatedIcon
            isDancing={isActive}
            className="size-[15px] text-white"
          />
        </span>
      </MuteButtonPrimitive>

      {/* Horizontal slider line: 0 width when collapsed, expands smoothly on hover or when actively changing */}
      <VolumeSlider.Root
        orientation="horizontal"
        thumbAlignment="edge"
        className={cn(
          'relative z-10 flex h-full flex-1 items-center cursor-pointer outline-none origin-left transition-all duration-300 ease-out',
          'w-0 max-w-0 opacity-0 pointer-events-none scale-x-0 flex-none overflow-hidden',
          'group-hover/vol-pill:w-full group-hover/vol-pill:max-w-full group-hover/vol-pill:opacity-100 group-hover/vol-pill:pointer-events-auto group-hover/vol-pill:scale-x-100 group-hover/vol-pill:flex-1 group-hover/vol-pill:overflow-visible',
          'group-focus-within/vol-pill:w-full group-focus-within/vol-pill:max-w-full group-focus-within/vol-pill:opacity-100 group-focus-within/vol-pill:pointer-events-auto group-focus-within/vol-pill:scale-x-100 group-focus-within/vol-pill:flex-1 group-focus-within/vol-pill:overflow-visible',
          'group-has-[[data-dragging]]/vol-pill:w-full group-has-[[data-dragging]]/vol-pill:max-w-full group-has-[[data-dragging]]/vol-pill:opacity-100 group-has-[[data-dragging]]/vol-pill:pointer-events-auto group-has-[[data-dragging]]/vol-pill:scale-x-100 group-has-[[data-dragging]]/vol-pill:flex-1 group-has-[[data-dragging]]/vol-pill:overflow-visible',
          isActive && 'w-full! max-w-full! opacity-100! pointer-events-auto! scale-x-100! flex-1! overflow-visible!'
        )}
      >
        <VolumeSlider.Track className="relative h-[2px] w-full rounded-full bg-white/20 overflow-hidden">
          <VolumeSlider.Fill className="absolute inset-y-0 left-0 rounded-full bg-white/90 w-[var(--media-slider-fill,100%)] shadow-sm" />
        </VolumeSlider.Track>
        <VolumeSlider.Thumb
          className={cn(
            'volume-slider-thumb absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-[var(--media-slider-fill,100%)] size-[7px] rounded-full pointer-events-none',
            'transition-transform duration-150 ease-out',
            'group-has-[[data-dragging]]/vol-pill:left-(--media-slider-pointer)',
            'outline-none'
          )}
        />
      </VolumeSlider.Root>
    </div>
  );
}
