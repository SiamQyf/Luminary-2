/** @jsxImportSource react */

import { VolumeSlider, MuteButton as MuteButtonPrimitive, usePlayer, selectVolume } from '@videojs/react';
import { selectFullscreen } from '@videojs/core/dom';
import type { ClassValue } from 'cn';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/resolve-class-name';
import { useIsMobilePortrait } from './use-mobile-portrait';

/**
 * Animated Volume Horn Icon:
 * - Dynamic volume scale: Horn scales smoothly from 0.88x (muted/0) to 1.10x (100% volume)
 * - Active slide / volume change pulse: Horn pumps/vibrates acoustically while sliding or on volume change
 * - Responsive sound wave: Scales and pulses outward with volume level
 * - Spring-transitioned 'x' icon when muted
 */
function easeCosine(t: number): number {
  return 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, t)));
}

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
  const hornScale = 0.88 + effectiveVolume * 0.12;
  // Sound wave scale from 0.70 to 0.98
  const waveScale = 0.7 + effectiveVolume * 0.28;
  const waveOpacity = isMuted ? 0 : 0.35 + effectiveVolume * 0.65;

  const hornRef = useRef<SVGGElement>(null);
  const waveRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const hornEl = hornRef.current;
    const waveEl = waveRef.current;
    if (!hornEl || !waveEl) return;

    const applyRest = () => {
      hornEl.setAttribute(
        'transform',
        `translate(10 12) scale(${hornScale.toFixed(4)}) translate(-10 -12)`
      );
      waveEl.setAttribute(
        'transform',
        `translate(17 12) scale(${waveScale.toFixed(4)}) translate(-17 -12)`
      );
      waveEl.style.opacity = isMuted ? '0' : waveOpacity.toFixed(3);
    };

    if (!isDancing) {
      applyRest();
      return;
    }

    let rafId = 0;
    const period = 350;
    const start = performance.now();

    // Drive native SVG transform attributes (instead of CSS @keyframes transform)
    // so Chromium repaints crisp vector paths every frame rather than caching a
    // low-res 1x GPU compositor bitmap and blurring while scaling/rotating.
    const tick = (now: number) => {
      const u = ((now - start) % period) / period;

      let hSx = 1;
      let hSy = 1;
      let hRot = 0;
      if (u < 0.3) {
        const k = easeCosine(u / 0.3);
        hSx = 1 + 0.15 * k;
        hSy = 1 - 0.08 * k;
        hRot = -4 * k;
      } else if (u < 0.7) {
        const k = easeCosine((u - 0.3) / 0.4);
        hSx = 1.15 - 0.2 * k;
        hSy = 0.92 + 0.16 * k;
        hRot = -4 + 7 * k;
      } else {
        const k = easeCosine((u - 0.7) / 0.3);
        hSx = 0.95 + 0.05 * k;
        hSy = 1.08 - 0.08 * k;
        hRot = 3 * (1 - k);
      }

      hornEl.setAttribute(
        'transform',
        `translate(10 12) rotate(${hRot.toFixed(2)}) scale(${(hornScale * hSx).toFixed(4)} ${(hornScale * hSy).toFixed(4)}) translate(-10 -12)`
      );

      const wavePulse = 0.5 - 0.5 * Math.cos(2 * Math.PI * u);
      const wDx = 1.5 * wavePulse;
      const wS = waveScale * (1 + 0.14 * wavePulse);
      const wOp = isMuted ? 0 : waveOpacity * (0.75 + 0.25 * wavePulse);

      waveEl.setAttribute(
        'transform',
        `translate(${(17 + wDx).toFixed(3)} 12) scale(${wS.toFixed(4)}) translate(-17 -12)`
      );
      waveEl.style.opacity = wOp.toFixed(3);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isDancing, isMuted, hornScale, waveScale, waveOpacity]);

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      className={className}
      aria-hidden="true"
    >
      {/* Speaker Horn Body - pumps/pulses in vector space while sliding or on volume change */}
      <g
        ref={hornRef}
        transform={`translate(10 12) scale(${hornScale.toFixed(4)}) translate(-10 -12)`}
      >
        <path d="M12.992 3.976c.686-.528 1.504-.956 2.375-.588.863.365 1.14 1.245 1.26 2.11.123.887.123 2.108.123 3.626v5.755c0 1.519 0 2.74-.123 3.626-.12.865-.397 1.745-1.26 2.11-.871.369-1.689-.06-2.375-.587-.703-.54-1.595-1.451-2.645-2.524-.54-.55-.898-.817-1.26-.967-.365-.15-.808-.214-1.58-.214-.67 0-1.267 0-1.72-.047-.475-.05-.916-.157-1.313-.427-.756-.516-1.045-1.271-1.154-1.965-.082-.518-.073-1.086-.065-1.543v-.678c-.008-.458-.017-1.026.065-1.544.11-.694.398-1.449 1.154-1.964.397-.271.838-.378 1.313-.428.453-.047 1.05-.047 1.72-.047.772 0 1.215-.064 1.58-.214.362-.15.72-.416 1.26-.967 1.05-1.072 1.942-1.984 2.645-2.523" />
      </g>

      {/* Sound Waves - radiates outward as volume increases and pulses on slide or volume change */}
      <g
        ref={waveRef}
        transform={`translate(17 12) scale(${waveScale.toFixed(4)}) translate(-17 -12)`}
        style={{
          opacity: waveOpacity,
          pointerEvents: 'none',
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.394 8.205a1 1 0 0 1 1.401.188A5.93 5.93 0 0 1 21 12a5.93 5.93 0 0 1-1.205 3.607 1 1 0 1 1-1.59-1.213A3.93 3.93 0 0 0 19 12c0-.915-.301-1.746-.795-2.393a1 1 0 0 1 .189-1.402"
        />
      </g>

      {/* Muted 'x' mark - appears cleanly when muted or volume is 0 */}
      <g
        transform={
          isMuted
            ? 'translate(19.5 12) scale(1) rotate(0) translate(-19.5 -12)'
            : 'translate(19.5 12) scale(0.3) rotate(-45) translate(-19.5 -12)'
        }
        style={{
          opacity: isMuted ? 1 : 0,
          transition: 'opacity 150ms ease-out',
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
  const isMobilePortrait = useIsMobilePortrait();

  const playerFullscreen = usePlayer(selectFullscreen)?.isFullscreen ?? false;
  const [docFullscreen, setDocFullscreen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVerticalOpen, setIsVerticalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastSliderReleaseRef = useRef(0);
  const prevVolumeRef = useRef<number | null>(null);
  const prevMutedRef = useRef<boolean | null>(null);
  const activeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const releaseLockRef = useRef<(() => void) | null>(null);

  const armActiveTimer = () => {
    if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
    activeTimerRef.current = setTimeout(() => {
      setIsActive(false);
      setIsVerticalOpen(false);
      if (releaseLockRef.current) {
        releaseLockRef.current();
        releaseLockRef.current = null;
      }
    }, 2000);
  };

  useEffect(() => {
    isDraggingRef.current = isDragging;
    if (!isDragging) return;
    const stopDragging = () => {
      isDraggingRef.current = false;
      lastSliderReleaseRef.current = performance.now();
      setIsDragging(false);
      armActiveTimer();
    };
    window.addEventListener('pointerup', stopDragging, { capture: true, once: true });
    window.addEventListener('pointercancel', stopDragging, { capture: true, once: true });
    window.addEventListener('blur', stopDragging, { once: true });
    return () => {
      window.removeEventListener('pointerup', stopDragging, { capture: true });
      window.removeEventListener('pointercancel', stopDragging, { capture: true });
      window.removeEventListener('blur', stopDragging);
    };
  }, [isDragging]);

  // Close vertical slider on tap outside
  useEffect(() => {
    if (!isVerticalOpen) return;
    const handleOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsVerticalOpen(false);
      }
    };
    window.addEventListener('pointerdown', handleOutside);
    return () => window.removeEventListener('pointerdown', handleOutside);
  }, [isVerticalOpen]);

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

  const mountTimeRef = useRef(performance.now());
  const hasUserInteractedRef = useRef(false);

  useEffect(() => {
    const markInteraction = () => {
      hasUserInteractedRef.current = true;
    };
    window.addEventListener('pointerdown', markInteraction, { capture: true, passive: true });
    window.addEventListener('keydown', markInteraction, { capture: true, passive: true });
    return () => {
      window.removeEventListener('pointerdown', markInteraction, { capture: true });
      window.removeEventListener('keydown', markInteraction, { capture: true });
    };
  }, []);

  // Detect volume changes (ArrowUp, ArrowDown hotkeys) to trigger pill expansion
  useEffect(() => {
    if (prevVolumeRef.current === null) {
      prevVolumeRef.current = currentVolume;
      prevMutedRef.current = currentMuted;
      return;
    }

    const volumeChanged = Math.abs(prevVolumeRef.current - currentVolume) > 0.001;
    prevVolumeRef.current = currentVolume;
    prevMutedRef.current = currentMuted;

    // Never expand on reload, initial page mount, or before the user has interacted
    if (performance.now() - mountTimeRef.current < 2000 || !hasUserInteractedRef.current) {
      return;
    }

    // Only active hotkey/sliding volume adjustments expand the horizontal slider on desktop/landscape
    // Never expand on mute toggles or automatically on mobile portrait (mobile opens strictly on tap)
    if (volumeChanged && !isMobilePortrait) {
      if (isDraggingRef.current || performance.now() - lastSliderReleaseRef.current < 120) {
        return;
      }
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

      armActiveTimer();
    }
  }, [currentVolume, currentMuted, store, isMobilePortrait]);

  useEffect(() => {
    return () => {
      if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
      if (releaseLockRef.current) releaseLockRef.current();
    };
  }, []);

  const isFullscreen = playerFullscreen || docFullscreen;

  return (
    <div ref={containerRef} className="relative flex items-center shrink-0">
      {/* Vertical Volume Slider on Mobile Portrait */}
      {isMobilePortrait && (
        <div
          data-part="vertical-volume-popup"
          className={cn(
            'vertical-volume-popup absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-40',
            'flex flex-col items-center justify-between w-[32px] h-[114px] py-3 px-1 rounded-full select-none isolate',
            // Liquid Frosted Glass surface matching player buttons
            'bg-black/55 backdrop-blur-[16px] backdrop-saturate-[150%] backdrop-brightness-[105%]',
            'bg-gradient-to-b from-white/[0.16] via-white/[0.04] to-transparent',
            'border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]',
            'transition-all duration-200 ease-out origin-bottom',
            isVerticalOpen || isDragging
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-90 translate-y-2 pointer-events-none'
          )}
        >
          <VolumeSlider.Root
            orientation="vertical"
            thumbAlignment="edge"
            onPointerDown={() => {
              isDraggingRef.current = true;
              setIsDragging(true);
              setIsVerticalOpen(true);
              if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
            }}
            className="relative flex size-full cursor-pointer justify-center outline-none select-none"
          >
            <VolumeSlider.Track className="relative h-full w-[3px] rounded-full bg-white/20 overflow-hidden mx-auto">
              <VolumeSlider.Fill className="absolute bottom-0 left-0 w-full rounded-full bg-white shadow-sm h-[var(--media-slider-fill,100%)]" />
            </VolumeSlider.Track>
            <VolumeSlider.Thumb
              className={cn(
                'volume-slider-thumb absolute bottom-[var(--media-slider-fill,100%)] left-1/2 -translate-x-1/2 translate-y-1/2 size-[8.5px] rounded-full bg-white shadow-md pointer-events-none',
                'transition-transform duration-100 ease-out outline-none'
              )}
            />
          </VolumeSlider.Root>
        </div>
      )}

      {/* Main Volume Pill: Collapsed 31.4px circle on mobile portrait, expands horizontally on desktop/landscape */}
      <div
        className={cn(
          'relative group/vol-pill flex h-[31.4px] shrink-0 items-center justify-center rounded-full overflow-hidden select-none isolate border-none outline-none',
          'w-[31.4px]',
          !isMobilePortrait && 'hover:w-[112px] hover:pr-3 hover:justify-start focus-within:w-[112px] focus-within:pr-3 focus-within:justify-start has-[[data-dragging]]:w-[112px] has-[[data-dragging]]:pr-3 has-[[data-dragging]]:justify-start',
          !isMobilePortrait && isActive && 'w-[112px]! pr-3! justify-start!',
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
        <MuteButtonPrimitive
          onClick={() => {
            if (isMobilePortrait) {
              setIsVerticalOpen((prev) => !prev);
              setIsActive(true);
              armActiveTimer();
            }
          }}
          className="relative z-10 size-[31.4px] shrink-0 grid place-items-center p-0 m-0 border-none bg-transparent cursor-pointer text-white group/mute outline-none"
        >
          <span
            className={cn(
              'player-icon-scale relative z-10 size-full grid grid-cols-1 grid-rows-1 place-items-center text-white pointer-events-none transition-transform duration-500 ease-out',
              isFullscreen ? 'scale-[0.92]!' : 'scale-[0.86]!'
            )}
          >
            <VolumeHornAnimatedIcon
              isDancing={isActive || isDragging || isVerticalOpen}
              className="size-[15px] text-white"
            />
          </span>
        </MuteButtonPrimitive>

        {/* Horizontal slider line: Desktop & Landscape only, 0 width when collapsed, expands smoothly on hover */}
        {!isMobilePortrait && (
          <VolumeSlider.Root
            orientation="horizontal"
            thumbAlignment="edge"
            onPointerDown={() => {
              isDraggingRef.current = true;
              setIsDragging(true);
            }}
            className={cn(
              'horizontal-volume-slider relative z-10 flex h-full flex-1 items-center cursor-pointer outline-none origin-left transition-all duration-300 ease-out',
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
        )}
      </div>
    </div>
  );
}
