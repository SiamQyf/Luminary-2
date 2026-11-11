/** @jsxImportSource react */

import { Title as TitlePrimitive, usePlayer } from '@videojs/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/resolve-class-name';

export interface TitleProps {
  /** Optional custom title; if omitted, dynamically resolves from the Video.js player title */
  title?: ReactNode;
  /** Optional subtitle or episode description */
  subtitle?: ReactNode;
  className?: string;
}

/**
 * Disappearing Video Title:
 * - Appears when video starts / loads, remains for 4 seconds, then disappears.
 * - Stays hidden during normal playback and general mouse movement.
 * - Reappears smoothly ONLY when the mouse cursor hovers into the title area.
 */
export function Title({ title, subtitle, className }: TitleProps = {}) {
  const [initialVisible, setInitialVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isPaused = usePlayer((state: any) => state?.paused ?? true);
  const prevPausedRef = useRef(isPaused);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startDisappearTimer = () => {
    setInitialVisible(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setInitialVisible(false);
    }, 4000);
  };

  // 1. Initial mount: show for 4 seconds, then disappear
  useEffect(() => {
    startDisappearTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 2. When video/title changes: show for 4 seconds, then disappear
  useEffect(() => {
    startDisappearTimer();
  }, [title]);

  // 3. When video starts playing (from paused to playing): show for 4 seconds, then disappear
  useEffect(() => {
    if (prevPausedRef.current && !isPaused) {
      startDisappearTimer();
    }
    prevPausedRef.current = isPaused;
  }, [isPaused]);

  const shouldShow = initialVisible || isHovered;

  const content =
    title || subtitle ? (
      <>
        {title && (
          <h1 className="video-title font-semibold text-sm sm:text-base md:text-[17px] leading-snug tracking-[-0.2px] truncate">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="video-subtitle font-normal text-[11px] sm:text-xs md:text-[13px] leading-normal truncate opacity-80">
            {subtitle}
          </p>
        )}
      </>
    ) : (
      <TitlePrimitive className="video-title font-semibold text-sm sm:text-base md:text-[17px] leading-snug tracking-[-0.2px] truncate empty:hidden" />
    );

  return (
    <div
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={cn(
        'group/title relative flex flex-col gap-0.5 select-none pointer-events-auto cursor-default max-w-[70%]',
        // Generous top-left hover zone
        'min-w-[280px] min-h-[56px] pr-10 pb-8 -mr-10 -mb-8',
        'transition-opacity ease-out',
        shouldShow ? 'opacity-100 duration-300' : 'opacity-0 duration-700 pointer-events-auto',
        className
      )}
    >
      {content}
    </div>
  );
}
