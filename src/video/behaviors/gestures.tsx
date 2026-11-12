/** @jsxImportSource react */

import { selectTime, useContainer, usePlayer, usePlayerContext } from '@videojs/react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/resolve-class-name';

export interface VideoGesturesProps {
  disabled?: boolean | undefined;
}

/**
 * Compounding Seek Increments requested by user:
 * 5s to begin with, then compounding increments: 10s, 15s, 30s, 45s, 60s max.
 */
const COMPOUNDING_STEPS = [5, 10, 15, 30, 45, 60] as const;

type SeekDirection = 'backward' | 'forward';

interface ActiveSeekState {
  direction: SeekDirection;
  stepIndex: number;
  seconds: number;
  baselineTime: number;
}

/**
 * 3 Pulsing animated chevrons cascading in direction of seek
 */
function FastSeekingChevrons({ direction }: { direction: SeekDirection }) {
  const isBack = direction === 'backward';
  return (
    <div className={cn('flex items-center gap-0.5 text-white', isBack && '-scale-x-100')}>
      <svg className="size-5 shrink-0 seek-wave-chevron-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
      <svg className="size-5 shrink-0 seek-wave-chevron-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
      <svg className="size-5 shrink-0 seek-wave-chevron-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    </div>
  );
}

export function VideoGestures({ disabled = false }: VideoGesturesProps = {}) {
  const container = useContainer();
  const timeState = usePlayer(selectTime);
  const playerCtx = usePlayerContext();
  const store = playerCtx?.store;

  const [seekState, setSeekState] = useState<ActiveSeekState | null>(null);
  const [rippleKey, setRippleKey] = useState(0);

  const activeStateRef = useRef<ActiveSeekState | null>(null);
  activeStateRef.current = seekState;

  const lastClickRef = useRef<{
    time: number;
    x: number;
    y: number;
    region: 'left' | 'center' | 'right';
  } | null>(null);

  const pointerDownPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const singleClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const seekTo = (targetSeconds: number) => {
    const video = (container?.querySelector('video') || document.querySelector('video')) as HTMLVideoElement | null;
    const maxDuration =
      video && Number.isFinite(video.duration) && video.duration > 0
        ? video.duration
        : (timeState?.duration ?? Infinity);

    const clamped = Math.max(0, Math.min(maxDuration, targetSeconds));

    if (video) {
      video.currentTime = clamped;
    }
    if (timeState && typeof (timeState as any).seek === 'function') {
      (timeState as any).seek(clamped);
    }
  };

  const getCurrentTime = () => {
    const video = (container?.querySelector('video') || document.querySelector('video')) as HTMLVideoElement | null;
    if (video && Number.isFinite(video.currentTime)) {
      return video.currentTime;
    }
    return timeState?.currentTime ?? 0;
  };

  const toggleFullscreen = () => {
    if (!container) return;
    const doc = document as any;
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      if (doc.exitFullscreen) doc.exitFullscreen().catch(() => {});
      else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    } else {
      if (container.requestFullscreen) container.requestFullscreen().catch(() => {});
      else if ((container as any).webkitRequestFullscreen) (container as any).webkitRequestFullscreen();
    }
  };

  const togglePlayPause = () => {
    const video = (container?.querySelector('video') || document.querySelector('video')) as HTMLVideoElement | null;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleControls = () => {
    if (store && (store as any).state && typeof (store as any).state.toggleControls === 'function') {
      (store as any).state.toggleControls();
      return;
    }
    togglePlayPause();
  };

  useEffect(() => {
    if (!container || disabled) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pointerDownPosRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (!pointerDownPosRef.current) return;

      const downPos = pointerDownPosRef.current;
      pointerDownPosRef.current = null;

      // Ignore drag movements
      if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 12) {
        return;
      }

      // Ignore clicks on interactive controls
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'button, [role="button"], [role="slider"], [role="menuitem"], input, a, [data-interactive], .flat-select-menu, [popover]'
        )
      ) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      const region: 'left' | 'center' | 'right' = ratio < 0.38 ? 'left' : ratio > 0.62 ? 'right' : 'center';

      const now = performance.now();
      const isTouch = e.pointerType === 'touch';

      // 1. ACTIVE COMPOUNDING BURST:
      // If currently seeking in compounding mode on this side, advance immediately
      const active = activeStateRef.current;
      if (
        active &&
        ((active.direction === 'backward' && region === 'left') ||
          (active.direction === 'forward' && region === 'right'))
      ) {
        if (singleClickTimerRef.current) {
          clearTimeout(singleClickTimerRef.current);
          singleClickTimerRef.current = null;
        }

        const nextStepIndex = Math.min(active.stepIndex + 1, COMPOUNDING_STEPS.length - 1);
        const nextSeconds = COMPOUNDING_STEPS[nextStepIndex];

        const targetTime =
          active.direction === 'backward'
            ? Math.max(0, active.baselineTime - nextSeconds)
            : active.baselineTime + nextSeconds;

        seekTo(targetTime);

        const updated: ActiveSeekState = {
          ...active,
          stepIndex: nextStepIndex,
          seconds: nextSeconds,
        };
        activeStateRef.current = updated;
        setSeekState(updated);
        setRippleKey((k) => k + 1);

        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
          setSeekState(null);
          activeStateRef.current = null;
        }, 850);

        return;
      }

      // 2. CHECK FOR DOUBLE CLICK / DOUBLE TAP
      const last = lastClickRef.current;
      const timeSinceLast = last ? now - last.time : 9999;
      const dist = last ? Math.hypot(e.clientX - last.x, e.clientY - last.y) : 9999;

      if (timeSinceLast < 320 && dist < 45 && last?.region === region) {
        // DOUBLE CLICK / TAP DETECTED
        if (singleClickTimerRef.current) {
          clearTimeout(singleClickTimerRef.current);
          singleClickTimerRef.current = null;
        }
        lastClickRef.current = null;

        if (region === 'left' || region === 'right') {
          const direction: SeekDirection = region === 'left' ? 'backward' : 'forward';
          const initialSeconds = COMPOUNDING_STEPS[0]; // 5s
          const baselineTime = getCurrentTime();

          const targetTime =
            direction === 'backward'
              ? Math.max(0, baselineTime - initialSeconds)
              : baselineTime + initialSeconds;

          seekTo(targetTime);

          const newState: ActiveSeekState = {
            direction,
            stepIndex: 0,
            seconds: initialSeconds,
            baselineTime,
          };
          activeStateRef.current = newState;
          setSeekState(newState);
          setRippleKey((k) => k + 1);

          if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
          closeTimerRef.current = setTimeout(() => {
            setSeekState(null);
            activeStateRef.current = null;
          }, 850);
        } else {
          // Center region double click -> Toggle Fullscreen
          toggleFullscreen();
        }
        return;
      }

      // 3. FIRST CLICK / TAP: debounce single click
      lastClickRef.current = { time: now, x: e.clientX, y: e.clientY, region };

      if (singleClickTimerRef.current) clearTimeout(singleClickTimerRef.current);
      singleClickTimerRef.current = setTimeout(() => {
        singleClickTimerRef.current = null;
        if (isTouch) {
          toggleControls();
        } else {
          togglePlayPause();
        }
      }, 260);
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointerup', onPointerUp);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointerup', onPointerUp);
      if (singleClickTimerRef.current) clearTimeout(singleClickTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [container, disabled]);

  if (!seekState) return null;

  const isBackward = seekState.direction === 'backward';

  return (
    <div
      key={rippleKey}
      className={cn(
        'pointer-events-none absolute inset-0 z-35 overflow-hidden select-none',
        'animate-in fade-in duration-150'
      )}
      aria-live="polite"
    >
      <div
        className={cn(
          'absolute inset-y-0 w-2/5 flex items-center justify-center',
          isBackward ? 'left-0' : 'right-0'
        )}
      >
        {/* Curved semi-transparent liquid glass radial ripple */}
        <div
          className={cn(
            'absolute inset-y-0 w-full transition-all duration-300 ease-out',
            isBackward
              ? 'left-0 bg-gradient-to-r from-white/[0.22] via-white/[0.08] to-transparent rounded-r-[140px] shadow-[inset_1px_0_1px_rgba(255,255,255,0.3)]'
              : 'right-0 bg-gradient-to-l from-white/[0.22] via-white/[0.08] to-transparent rounded-l-[140px] shadow-[inset_-1px_0_1px_rgba(255,255,255,0.3)]',
            'backdrop-blur-[2px]'
          )}
        />

        {/* Content badge with animated chevrons and compounding seconds */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 animate-seek-badge-pulse">
          <FastSeekingChevrons direction={seekState.direction} />

          <div
            className={cn(
              'px-4 py-1.5 rounded-full flex items-center justify-center',
              'bg-black/65 backdrop-blur-xl border border-white/20',
              'shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)]'
            )}
          >
            <span
              className="text-[15px] font-bold tracking-tight text-white tabular-nums"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))' }}
            >
              {isBackward ? `-${seekState.seconds}s` : `+${seekState.seconds}s`}
            </span>
          </div>

          <span
            className="text-[11px] font-medium uppercase tracking-widest text-white/85"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))' }}
          >
            {seekState.seconds === 60 ? '60s max' : `${seekState.seconds} seconds`}
          </span>
        </div>
      </div>
    </div>
  );
}
