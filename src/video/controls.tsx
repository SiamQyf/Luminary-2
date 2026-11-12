/** @jsxImportSource react */

import { Controls } from '@videojs/react';

import { cn } from '@/lib/resolve-class-name';

import type { ReactNode } from 'react';

import { SettingsMenu } from './shared/settings-menu';
import type { ThumbnailSlot } from './shared/time-slider';
import { VideoControlsContent } from './shared/video-controls';

export function VideoControls({
  renderThumbnail,
  title,
  subtitle,
}: ThumbnailSlot & { title?: ReactNode; subtitle?: ReactNode } = {}) {
  return (
    <Controls.Root>
      <VideoControlsContent
        center={true}
        menu={<SettingsMenu />}
        renderThumbnail={renderThumbnail}
        title={title}
        subtitle={subtitle}
      />
    </Controls.Root>
  );
}
