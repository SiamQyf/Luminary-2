import { useEffect, useState } from 'react';

export const LAYOUT_OPTIONS = [
  { id: 'simple', label: 'Simple' },
  { id: 'expanded', label: 'Expanded' },
] as const;

export type PlayerLayout = (typeof LAYOUT_OPTIONS)[number]['id'];

const STORAGE_KEY = 'luminescence-layout';
const LAYOUT_EVENT = 'luminescence-layout-change';

function normalizeLayout(raw: string | null | undefined): PlayerLayout {
  return raw === 'expanded' ? 'expanded' : 'simple';
}

export function readInitialLayout(): PlayerLayout {
  if (typeof window === 'undefined') return 'simple';
  const urlLayout = new URLSearchParams(window.location.search).get('layout');
  if (urlLayout) return normalizeLayout(urlLayout);
  const domLayout = document.documentElement.dataset.layout;
  if (domLayout) return normalizeLayout(domLayout);
  return normalizeLayout(sessionStorage.getItem(STORAGE_KEY));
}

export function applyLayoutMode(layout: PlayerLayout): void {
  if (typeof window === 'undefined') return;
  const next = normalizeLayout(layout);
  sessionStorage.setItem(STORAGE_KEY, next);
  document.documentElement.dataset.layout = next;
  document.querySelectorAll('.preview-player').forEach((el) => {
    el.setAttribute('data-layout', next);
  });
  window.dispatchEvent(new CustomEvent(LAYOUT_EVENT, { detail: { layout: next } }));
}

export function useLayoutMode(): [PlayerLayout, (layout: PlayerLayout) => void] {
  const [layout, setLayoutState] = useState<PlayerLayout>(readInitialLayout);

  useEffect(() => {
    const syncFromEvent = (e: Event) => {
      const next = (e as CustomEvent<{ layout?: string }>).detail?.layout;
      if (next === 'simple' || next === 'expanded') {
        setLayoutState(next);
      }
    };
    window.addEventListener(LAYOUT_EVENT, syncFromEvent);
    return () => window.removeEventListener(LAYOUT_EVENT, syncFromEvent);
  }, []);

  const setLayout = (next: PlayerLayout) => {
    setLayoutState(next);
    applyLayoutMode(next);
  };

  return [layout, setLayout];
}

