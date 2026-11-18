/** @jsxImportSource react */

import { Controls } from '@videojs/react';
import type { ReactNode } from 'react';

import { CaptionsToggle } from './captions-button';
import { CaptionsDisplay } from './captions-display';
import { ControlsContent, type ControlsSlots } from './controls';
import { CastButton, FullscreenButton, PiPButton } from './screen-controls';
import { Title } from './title';
import { VideoBufferingIndicator } from './video-feedback';

export function VideoControlsContent({
  center = false,
  live = false,
  menu,
  renderThumbnail,
  seekBackward,
  seekForward,
  title,
  subtitle,
}: ControlsSlots & {
  center?: boolean;
  live?: boolean;
  menu?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
} = {}) {
  return (
    <>
      <VideoBufferingIndicator />
      {/* CaptionsDisplay preserved for later re-enabling */}
      {/* <CaptionsDisplay /> */}
      <ControlsContent
        center={center}
        fullscreen={<FullscreenButton />}
        live={live}
        menu={menu}
        pip={!live && <PiPButton />}
        renderThumbnail={renderThumbnail}
        seekBackward={seekBackward}
        seekForward={seekForward}
        top={
          <div className="flex w-full items-start justify-between gap-2 sm:gap-3 pointer-events-none">
            <Title title={title} subtitle={subtitle} />
            <div className="flex items-center gap-1.5 sm:gap-[12px] shrink-0 pointer-events-auto group-not-data-visible/controls:opacity-0 group-not-data-visible/controls:pointer-events-none transition-opacity duration-300">
              <CastButton />
            </div>
          </div>
        }
      />
    </>
  );
}
