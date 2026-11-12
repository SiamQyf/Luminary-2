/** @jsxImportSource react */

import { isHotkeyToggleAction, resolveHotkeyAction } from '@videojs/core/dom';
import { Hotkey, usePlayer } from '@videojs/react';
import { useEffect } from 'react';

export interface PlaybackHotkeysProps {
  disabled?: boolean | undefined;
}

export interface PlayerKeyPayload {
  type: 'PLAYER_KEY';
  key: string;
  code: string;
  shiftKey?: boolean;
  repeat?: boolean;
}

type HotkeyMatch = {
  action:
    | 'togglePaused'
    | 'toggleMuted'
    | 'toggleSubtitles'
    | 'toggleFullscreen'
    | 'togglePictureInPicture'
    | 'seekStep'
    | 'volumeStep'
    | 'seekToPercent'
    | 'speedUp'
    | 'speedDown';
  key: string;
  value?: number;
};

export function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

function hasOpenInteractiveMenu(): boolean {
  const active = document.activeElement as HTMLElement | null;
  if (active?.closest('[role="menu"], [role="listbox"], .flat-select-menu')) return true;
  return Boolean(document.querySelector('[role="menu"][data-open], [data-open] [role="menu"], .flat-select-menu'));
}

export function matchPlayerShortcut(key: string, code: string, shiftKey = false): HotkeyMatch | null {
  if (code === 'Space' || key === ' ') {
    return { action: 'togglePaused', key: 'Space' };
  }

  const lower = key.toLowerCase();
  switch (lower) {
    case 'm':
      return { action: 'toggleMuted', key: 'm' };
    case 'c':
      return { action: 'toggleSubtitles', key: 'c' };
    case 'f':
      return { action: 'toggleFullscreen', key: 'f' };
    case 'p':
    case 'i':
      return { action: 'togglePictureInPicture', key: lower };
    case 'arrowright':
    case 'l':
      return { action: 'seekStep', key: lower === 'l' ? 'l' : 'ArrowRight', value: 10 };
    case 'arrowleft':
    case 'j':
      return { action: 'seekStep', key: lower === 'j' ? 'j' : 'ArrowLeft', value: -10 };
    case 'arrowup':
      return { action: 'volumeStep', key: 'ArrowUp', value: 0.05 };
    case 'arrowdown':
      return { action: 'volumeStep', key: 'ArrowDown', value: -0.05 };
    case 'home':
      return { action: 'seekToPercent', key: 'Home', value: 0 };
    case 'end':
      return { action: 'seekToPercent', key: 'End', value: 100 };
    case '>':
      return { action: 'speedUp', key: '>' };
    case '<':
      return { action: 'speedDown', key: '<' };
    default:
      break;
  }

  if (!shiftKey && key >= '0' && key <= '9') {
    return { action: 'seekToPercent', key };
  }

  // Fallback for keyboard layouts where Digit0..Digit9 reports locale characters
  if (!shiftKey && /^Digit([0-9])$/.test(code)) {
    const digit = code.slice(5);
    return { action: 'seekToPercent', key: digit };
  }

  return null;
}

const MENU_NAV_KEYS = new Set(['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'home', 'end']);

export function PlaybackHotkeys({ disabled = false }: PlaybackHotkeysProps = {}) {
  const store = usePlayer();

  useEffect(() => {
    if (disabled || !store) return;

    const executeShortcut = (match: HotkeyMatch, isRepeat: boolean) => {
      const toggle = isHotkeyToggleAction(match.action) || match.action === 'seekToPercent';
      if (isRepeat && toggle) return;

      const resolver = resolveHotkeyAction(match.action);
      resolver?.({ store: store as any, key: match.key, value: match.value });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isEditableElement(e.target) || isEditableElement(document.activeElement)) return;

      const match = matchPlayerShortcut(e.key, e.code, e.shiftKey);
      if (!match) return;

      if (MENU_NAV_KEYS.has(e.key.toLowerCase()) && hasOpenInteractiveMenu()) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Blur non-input controls so Space/Arrows never double-trigger a focused button or slider
      const active = document.activeElement as HTMLElement | null;
      if (active && active !== document.body && !isEditableElement(active)) {
        active.blur?.();
      }

      executeShortcut(match, e.repeat);
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data as PlayerKeyPayload | undefined;
      if (data?.type !== 'PLAYER_KEY') return;
      if (isEditableElement(document.activeElement)) return;

      const match = matchPlayerShortcut(data.key, data.code, Boolean(data.shiftKey));
      if (!match) return;
      if (MENU_NAV_KEYS.has(data.key.toLowerCase()) && hasOpenInteractiveMenu()) {
        return;
      }

      executeShortcut(match, Boolean(data.repeat));
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('message', handleMessage);
    };
  }, [disabled, store]);

  return (
    <>
      <Hotkey target="document" disabled={disabled} keys="m" action="toggleMuted" />
      <Hotkey target="document" disabled={disabled} keys="c" action="toggleSubtitles" />
      <Hotkey target="document" disabled={disabled} keys="ArrowRight" action="seekStep" />
      <Hotkey target="document" disabled={disabled} keys="ArrowLeft" action="seekStep" />
      <Hotkey target="document" disabled={disabled} keys="l" action="seekStep" />
      <Hotkey target="document" disabled={disabled} keys="j" action="seekStep" />
      <Hotkey target="document" disabled={disabled} keys="ArrowUp" action="volumeStep" />
      <Hotkey target="document" disabled={disabled} keys="ArrowDown" action="volumeStep" />
      <Hotkey target="document" disabled={disabled} keys="0-9" action="seekToPercent" />
      <Hotkey target="document" disabled={disabled} keys="Home" action="seekToPercent" value={0} />
      <Hotkey target="document" disabled={disabled} keys="End" action="seekToPercent" value={100} />
      <Hotkey target="document" disabled={disabled} keys=">" action="speedUp" />
      <Hotkey target="document" disabled={disabled} keys="<" action="speedDown" />
    </>
  );
}
