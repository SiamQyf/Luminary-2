/** @jsxImportSource react */

import { Hotkey } from '@videojs/react';

import { PlaybackHotkeys } from './playback-hotkeys';

export interface VideoHotkeysProps {
  disabled?: boolean | undefined;
}

export function VideoHotkeys({ disabled = false }: VideoHotkeysProps = {}) {
  return (
    <>
      <PlaybackHotkeys disabled={disabled} />
      <Hotkey target="document" disabled={disabled} keys="f" action="toggleFullscreen" />
      <Hotkey target="document" disabled={disabled} keys="c" action="toggleSubtitles" />
      <Hotkey target="document" disabled={disabled} keys="p" action="togglePictureInPicture" />
      <Hotkey target="document" disabled={disabled} keys="i" action="togglePictureInPicture" />
    </>
  );
}
