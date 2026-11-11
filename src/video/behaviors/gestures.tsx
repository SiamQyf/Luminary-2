/** @jsxImportSource react */

import { Gesture } from '@videojs/react';

export interface VideoGesturesProps {
  disabled?: boolean | undefined;
}

export function VideoGestures({ disabled = false }: VideoGesturesProps = {}) {
  return (
    <>
      {/* Mouse: single click anywhere toggles play/pause */}
      <Gesture disabled={disabled} type="tap" action="togglePaused" pointer="mouse" />
      {/* Mouse: double click anywhere on player maximizes and minimizes (fullscreen) */}
      <Gesture disabled={disabled} type="doubletap" action="toggleFullscreen" pointer="mouse" />

      {/* Touch: single tap toggles controls */}
      <Gesture disabled={disabled} type="tap" action="toggleControls" pointer="touch" />
      {/* Touch: double tap left/right seeks 10s, center toggles fullscreen */}
      <Gesture disabled={disabled} type="doubletap" action="seekStep" region="left" pointer="touch" />
      <Gesture disabled={disabled} type="doubletap" action="toggleFullscreen" region="center" pointer="touch" />
      <Gesture disabled={disabled} type="doubletap" action="seekStep" region="right" pointer="touch" />
    </>
  );
}
