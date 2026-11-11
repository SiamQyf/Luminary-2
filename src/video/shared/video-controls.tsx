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
      <CaptionsDisplay />
      <ControlsContent
        captions={!live && <CaptionsToggle />}
        center={center}
        fullscreen={<FullscreenButton />}
        live={live}
        menu={menu}
        renderThumbnail={renderThumbnail}
        seekBackward={seekBackward}
        seekForward={seekForward}
        top={
          <div className="flex w-full items-start justify-between pointer-events-none">
            <Title title={title} subtitle={subtitle} />
            <div className="flex items-center gap-[12px] pointer-events-auto group-not-data-visible/controls:opacity-0 group-not-data-visible/controls:pointer-events-none transition-opacity duration-300">
              <CastButton />
              <PiPButton />
            </div>
          </div>
        }
      />
    </>
  );
}
