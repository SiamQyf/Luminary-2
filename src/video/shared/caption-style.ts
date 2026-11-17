import { useEffect, useState } from 'react';

export const CAPTION_DESIGNS = [
  { id: 'default', label: 'Default' },
  { id: 'classic', label: 'Classic' },
  { id: 'cinema', label: 'Cinema' },
  { id: 'glow', label: 'Glow' },
  { id: 'minimal', label: 'Minimal' },
] as const;

export type CaptionDesignId = (typeof CAPTION_DESIGNS)[number]['id'] | string;

const STORAGE_KEY = 'luminary-caption-style';
const CAPTION_EVENT = 'luminary-caption-style-change';

export function readInitialCaptionStyle(): string {
  if (typeof window === 'undefined') return 'default';
  const urlStyle = new URLSearchParams(window.location.search).get('caption-style');
  if (urlStyle) return urlStyle;
  const domStyle = document.documentElement.dataset.captionStyle;
  if (domStyle) return domStyle;
  return sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY) || 'default';
}

export function applyCaptionStyle(styleId: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, styleId);
  try {
    localStorage.setItem(STORAGE_KEY, styleId);
  } catch {}
  document.documentElement.dataset.captionStyle = styleId;
  document.querySelectorAll('.preview-player, .media-player, [data-part="caption-pill"]').forEach((el) => {
    el.setAttribute('data-caption-style', styleId);
  });
  window.dispatchEvent(new CustomEvent(CAPTION_EVENT, { detail: { style: styleId } }));
}

export function useCaptionStyle(): [string, (styleId: string) => void] {
  const [style, setStyleState] = useState<string>(readInitialCaptionStyle);

  useEffect(() => {
    const handleStyleChange = (e: Event) => {
      const next = (e as CustomEvent<{ style?: string }>).detail?.style;
      if (next) {
        setStyleState(next);
      }
    };
    window.addEventListener(CAPTION_EVENT, handleStyleChange);
    return () => window.removeEventListener(CAPTION_EVENT, handleStyleChange);
  }, []);

  const setStyle = (next: string) => {
    setStyleState(next);
    applyCaptionStyle(next);
  };

  return [style, setStyle];
}

export default useCaptionStyle;
