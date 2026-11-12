/** @jsxImportSource react */

import { Time, Controls, BufferingIndicator, Tooltip, usePlayer } from '@videojs/react';
import { useRef, useEffect, type ReactNode, type HTMLAttributes } from 'react';

import { cn } from '@/lib/resolve-class-name';

import { LiveButton } from './live-button';
import { type PlayerLayout, useLayoutMode } from './layout-mode';
import { AudioPlayButton, PlayButton } from './play-button';
import { SeekButton } from './seek-button';
import { TimeSlider } from './time-slider';
import { type ThumbnailSlot } from './time-slider';
import { VolumePill } from './volume-pill';
import { VolumePopover } from './volume-popover';

/**
 * Bottom Controls Container with Hover Auto-Hide Protection:
 * When the mouse is anywhere on or under the progressbar area (the time slider track,
 * duration/remaining timestamps, buttons row, volume pill, and bottom padding):
 * - Holds a Video.js controls lock so controls NEVER auto-hide while the mouse is hovering.
 * - Cancels the idle timer for uninterrupted inspection and interaction.
 * - Releases the lock when the cursor leaves the bottom controls region, resuming normal auto-hide.
 */
function BottomControlsContainer({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const store = usePlayer();
  const isHoveredRef = useRef(false);
  const releaseLockRef = useRef<(() => void) | null>(null);

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

  const acquireLock = () => {
    isHoveredRef.current = true;
    if (!releaseLockRef.current) {
      const lockFn = getLockFn();
      if (lockFn) {
        releaseLockRef.current = lockFn();
      }
    }
  };

  const releaseLock = () => {
    isHoveredRef.current = false;
    if (releaseLockRef.current) {
      releaseLockRef.current();
      releaseLockRef.current = null;
    }
  };

  // Acquire lock if player store finishes attaching while pointer is already hovered
  useEffect(() => {
    if (isHoveredRef.current && !releaseLockRef.current) {
      const lockFn = getLockFn();
      if (lockFn) {
        releaseLockRef.current = lockFn();
      }
    }
  }, [store]);

  // Clean up lock when component unmounts
  useEffect(() => {
    return () => {
      if (releaseLockRef.current) {
        releaseLockRef.current();
        releaseLockRef.current = null;
      }
    };
  }, []);

  return (
    <div
      onPointerEnter={(e) => {
        acquireLock();
        props.onPointerEnter?.(e);
      }}
      onPointerMove={(e) => {
        if (!releaseLockRef.current) acquireLock();
        props.onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        releaseLock();
        props.onPointerLeave?.(e);
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export function ControlsRow({
  audio = false,
  captions,
  className,
  fullscreen,
  live = false,
  menu,
  rate,
  seekBackward,
  seekForward,
}: ControlsSlots & { audio?: boolean; className?: string; live?: boolean; menu?: ReactNode } = {}) {
  return (
    <Controls.Group className={cn('flex items-center rtl:flex-row-reverse justify-between gap-[12px] mb-[3px]', className)}>
      {/* Left controls: Rewind 10, Forward 10, Play/Pause (desktop only), Volume Pill */}
      <Controls.Group className={'flex items-center rtl:flex-row-reverse gap-[12px] min-w-0'}>
        <div className="hidden media-md:flex items-center rtl:flex-row-reverse gap-[12px]">
          {seekBackward}
          {seekForward}
          {audio ? <AudioPlayButton /> : <PlayButton />}
        </div>
        {!audio && <VolumePill />}
        {live && <LiveButton />}
      </Controls.Group>

      {/* Right controls: Captions/Rate (if any), Settings, Fullscreen */}
      <Controls.Group className={'flex items-center rtl:flex-row-reverse gap-[12px]'}>
        {audio && <VolumePopover />}
        {captions}
        {rate}
        {menu}
        {fullscreen}
      </Controls.Group>
    </Controls.Group>
  );
}

export interface ControlsSlots extends ThumbnailSlot {
  /** The captions toggle, supplied by the video presets because the audio presets have no text track feature. */
  captions?: ReactNode;
  /** Fullscreen button on the bottom controls bar. */
  fullscreen?: ReactNode;
  /** The playback-rate control, supplied by the on-demand audio preset. */
  rate?: ReactNode;
  /** The skip-back control, supplied by the presets that have a timeline. */
  seekBackward?: ReactNode;
  /** The skip-forward control, supplied by the presets that have a timeline. */
  seekForward?: ReactNode;
}

export function ControlsContent({
  audio = false,
  captions,
  center = false,
  fullscreen,
  layout,
  live = false,
  menu,
  rate,
  renderThumbnail,
  seekBackward,
  seekForward,
  top,
}: ControlsSlots & { audio?: boolean; center?: boolean; layout?: PlayerLayout; live?: boolean; menu?: ReactNode; top?: ReactNode } = {}) {
  const [layoutMode] = useLayoutMode();
  const activeLayout = layout ?? layoutMode;
  const isSimple = activeLayout === 'simple';

  return (
    <Controls.Content
      className={cn('group/controls pointer-events-none absolute inset-0 z-30 bg-transparent! bg-none!', audio && 'relative! inset-auto!')}
    >
      <Tooltip.Provider>
        {top && (
          <div
            className={cn(
              'pointer-events-none absolute inset-x-0 top-0 px-6 sm:px-10 pt-6 pb-14 flex items-start justify-between z-20',
              'bg-transparent! bg-none!'
            )}
          >
            {top}
          </div>
        )}
        {!isSimple && center && (
          <BufferingIndicator className={'group/center-buffering contents'}>
            <Controls.Group
              className={cn(
                'group-not-data-visible/controls:pointer-events-none pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center rtl:flex-row-reverse gap-[12px] z-30',
                'group-not-data-visible/controls:opacity-0 group-not-data-visible/controls:scale-90 transition-all duration-300 ease-out',
                'group-data-visible/center-buffering:hidden!',
                'flex media-md:hidden'
              )}
            >
              <SeekButton
                seconds={-10}
                tooltip={false}
              />
              <PlayButton
                tooltip={false}
              />
              <SeekButton
                seconds={10}
                tooltip={false}
              />
            </Controls.Group>
          </BufferingIndicator>
        )}
        <BottomControlsContainer
          data-part="bottom-controls-bar"
          data-layout={activeLayout}
          className={cn(
            'pointer-events-auto absolute inset-x-0 bottom-0 flex',
            isSimple
              ? 'flex-row rtl:flex-row-reverse items-center gap-2.5 sm:gap-3 px-4 sm:px-6 pt-2.5 pb-2 sm:py-2.5'
              : 'flex-col gap-1 px-6 sm:px-10 pb-2 sm:pb-2.5 pt-12',
            'bg-transparent',
            'group-not-data-visible/controls:opacity-0 group-not-data-visible/controls:pointer-events-none group-not-data-visible/controls:hover:opacity-100 group-not-data-visible/controls:hover:pointer-events-auto transition-[padding,gap,opacity] duration-500 ease-out',
            audio && 'static! p-3'
          )}
        >
          {isSimple ? (
            <>
              {/* Simple Left: Play + Volume + Compact Elapsed/Duration */}
              <Controls.Group className={'flex items-center rtl:flex-row-reverse gap-2 sm:gap-[10px] shrink-0'}>
                {audio ? <AudioPlayButton /> : <PlayButton />}
                {!audio && <VolumePill />}
                {live && <LiveButton />}
                {!live && (
                  <div className="hidden media-sm:inline-flex items-center gap-1 text-[11.5px] font-normal leading-none text-white opacity-80 hover:opacity-100 transition-opacity duration-200 tabular-nums whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none">
                    <span className="cursor-default"><Time.Value type="current" /></span>
                    <span aria-hidden="true" className="opacity-55">/</span>
                    <span className="cursor-default"><Time.Value type="duration" /></span>
                  </div>
                )}
              </Controls.Group>

              {/* Simple Middle: Progress Bar */}
              {!live && (
                <div className="flex-1 min-w-[48px] flex items-center">
                  <TimeSlider audio={audio} renderThumbnail={renderThumbnail} />
                </div>
              )}

              {/* Simple Right: Remains identical to Expanded right side */}
              <Controls.Group className={'flex items-center rtl:flex-row-reverse gap-2 sm:gap-[12px] shrink-0 ms-auto'}>
                {audio && <VolumePopover />}
                {captions}
                {rate}
                {menu}
                {fullscreen}
              </Controls.Group>
            </>
          ) : (
            <>
              {!live && (
                <div className="flex flex-col gap-1 mb-[5px]">
                  <div className="flex items-center justify-between px-0.5 text-[12px] font-normal leading-tight text-white opacity-75 hover:opacity-100 transition-opacity duration-200 tabular-nums drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none">
                    <span className="cursor-default"><Time.Value type="current" /></span>
                    <span className="cursor-default"><Time.Value type="duration" /></span>
                  </div>
                  <TimeSlider audio={audio} renderThumbnail={renderThumbnail} />
                </div>
              )}
              <ControlsRow
                audio={audio}
                captions={captions}
                fullscreen={fullscreen}
                live={live}
                menu={menu}
                rate={rate}
                seekBackward={seekBackward}
                seekForward={seekForward}
              />
            </>
          )}
        </BottomControlsContainer>
      </Tooltip.Provider>
    </Controls.Content>
  );
}
