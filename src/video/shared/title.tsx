/** @jsxImportSource react */

import { Title as TitlePrimitive, useContainer, usePlayer } from '@videojs/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/resolve-class-name';

export interface TitleProps {
  /** Optional custom title; if omitted, dynamically resolves from the Video.js player title */
  title?: ReactNode;
  /** Optional subtitle or episode description */
  subtitle?: ReactNode;
  className?: string;
}

function checkIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  const isDocMobile =
    document.documentElement.dataset.device === 'mobile' ||
    document.querySelector('.preview-player')?.getAttribute('data-device') === 'mobile' ||
    document.querySelector('.media-player')?.getAttribute('data-device') === 'mobile';
  const isNarrow = window.innerWidth <= 768;
  const isSmallScreen = window.matchMedia('(max-width: 639.98px)').matches;
  return Boolean(isDocMobile || isNarrow || isSmallScreen);
}

/**
 * Disappearing Video Title:
 * - Appears when video starts / loads, remains for 4 seconds (desktop) or 5 seconds (mobile), then disappears.
 * - On desktop: stays hidden during normal playback, reappears smoothly when hovered.
 * - On mobile: on click / tap, the title appears and stays for 5 seconds before fading out.
 */
export function Title({ title, subtitle, className }: TitleProps = {}) {
  const container = useContainer();
  const [initialVisible, setInitialVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileClickVisible, setMobileClickVisible] = useState(false);

  const isPaused = usePlayer((state: any) => state?.paused ?? true);
  const prevPausedRef = useRef(isPaused);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startDisappearTimer = () => {
    setInitialVisible(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const duration = checkIsMobile() ? 5000 : 4000;
    timerRef.current = setTimeout(() => {
      setInitialVisible(false);
    }, duration);
  };

  const startMobileClickTimer = () => {
    setMobileClickVisible(true);
    if (mobileTimerRef.current) {
      clearTimeout(mobileTimerRef.current);
    }
    mobileTimerRef.current = setTimeout(() => {
      setMobileClickVisible(false);
    }, 5000);
  };

  // 1. Initial mount
  useEffect(() => {
    startDisappearTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (mobileTimerRef.current) clearTimeout(mobileTimerRef.current);
    };
  }, []);

  // 2. When video/title changes
  useEffect(() => {
    startDisappearTimer();
  }, [title]);

  // 3. When video starts playing (from paused to playing)
  useEffect(() => {
    if (prevPausedRef.current && !isPaused) {
      startDisappearTimer();
    }
    prevPausedRef.current = isPaused;
  }, [isPaused]);

  // 4. Mobile: on click/tap anywhere on the player container, show title for 5 seconds
  useEffect(() => {
    if (!container) return;

    const handlePointerUp = (e: PointerEvent | MouseEvent) => {
      if (!checkIsMobile()) return;
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('[role="menu"]') ||
        target?.closest('[data-part="popup"]') ||
        target?.closest('.group\\/settings') ||
        target?.closest('[data-part="seek-track"]')
      ) {
        return;
      }
      startMobileClickTimer();
    };

    container.addEventListener('pointerup', handlePointerUp, { capture: true });
    return () => {
      container.removeEventListener('pointerup', handlePointerUp, { capture: true });
    };
  }, [container]);

  const handleTitleClick = () => {
    if (checkIsMobile()) {
      startMobileClickTimer();
    }
  };

  const shouldShow = initialVisible || isHovered || mobileClickVisible;

  const content =
    title || subtitle ? (
      <>
        {title && (
          <h1 className="video-title text-white font-semibold text-sm sm:text-base md:text-[17px] leading-snug tracking-[-0.2px] truncate">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="video-subtitle text-white/80 font-normal text-[11px] sm:text-xs md:text-[13px] leading-normal truncate">
            {subtitle}
          </p>
        )}
      </>
    ) : (
      <TitlePrimitive className="video-title text-white font-semibold text-sm sm:text-base md:text-[17px] leading-snug tracking-[-0.2px] truncate empty:hidden" />
    );

  return (
    <div
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={handleTitleClick}
      className={cn(
        'group/title relative flex flex-col gap-0.5 select-none pointer-events-auto cursor-default flex-1 min-w-0 max-w-[65%] sm:max-w-[75%]',
        // Generous top-left hover zone on desktop, fully contained on mobile
        'min-w-0 sm:min-w-[200px] min-h-[40px] sm:min-h-[56px] pr-2 sm:pr-8 pb-3 sm:pb-8',
        'transition-opacity ease-out',
        shouldShow ? 'opacity-100 duration-300' : 'opacity-0 duration-700 pointer-events-auto',
        className
      )}
    >
      {content}
    </div>
  );
}
