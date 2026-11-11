import { useEffect, useRef, useState } from 'react';

import { isEditableElement, matchPlayerShortcut } from '@/video/behaviors/playback-hotkeys';

import { AmbientBackground } from './ambient-background';
import { skin } from './config';
import { PARAMS_MESSAGE } from './messages';
import { Navbar } from './navbar';
import { readParams, writeParams, type WorkbenchParams } from './params';
import { usePreferences } from './preferences';
import { createUrlWriter } from './url';

const writeUrl = createUrlWriter();

/**
 * A clean Video.js sandbox for luminescence skin:
 * Displays the branding navbar with color scheme toggle, and the full player preview frame.
 */
export function App() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [params, setParams] = useState(() => readParams(location.search));
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        sessionStorage.getItem('luminescence-theme') ||
        sessionStorage.getItem('inescence-theme') ||
        'translucent'
      );
    }
    return 'translucent';
  });
  // The frame loads once with the first settings; later changes are posted to it, so playback is never interrupted.
  const [frameUrl] = useState(() => `./preview.html#${writeParams(params)}`);
  const preferences = usePreferences();
  const query = writeParams(params);

  // Every setting lives in the URL, so a reload or a shared link reproduces the preview.
  useEffect(() => {
    // The frame updates straight away; the address bar catches up once changes pause.
    writeUrl(`?${query}`);
    frame.current?.contentWindow?.postMessage({ type: PARAMS_MESSAGE, query }, location.origin);
  }, [query]);

  // The scheme control drives the shell too, so its chrome matches what the preview shows.
  useEffect(() => {
    if (params.scheme === 'auto') delete document.documentElement.dataset.colorScheme;
    else document.documentElement.dataset.colorScheme = params.scheme;
  }, [params.scheme]);

  const update = (value: Partial<WorkbenchParams>) => setParams((current) => ({ ...current, ...value }));

  // Listen for Theme and Mode changes from the command toolbar inside the preview frame
  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (e.data?.type === 'COLOR_SCHEME_CHANGE') {
        update({ scheme: e.data.scheme });
      }
      if (e.data?.type === 'THEME_CHANGE' && e.data.theme) {
        document.documentElement.dataset.theme = e.data.theme;
        setCurrentTheme(e.data.theme);
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  // Forward keyboard shortcuts from the outer workbench shell into the player iframe
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isEditableElement(e.target) || isEditableElement(document.activeElement)) {
        return;
      }

      const match = matchPlayerShortcut(e.key, e.code, e.shiftKey);
      if (!match) return;

      e.preventDefault();
      e.stopPropagation();

      const target = e.target as HTMLElement | null;
      if (target && typeof target.blur === 'function') {
        target.blur();
      }

      const win = frame.current?.contentWindow;
      if (win) {
        try {
          win.focus();
        } catch {
          // ignore
        }
        win.postMessage(
          { type: 'PLAYER_KEY', key: e.key, code: e.code, shiftKey: e.shiftKey, repeat: e.repeat },
          window.location.origin
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []);

  const isDark = params.scheme === 'dark' || (params.scheme === 'auto' && preferences['dark scheme']);

  return (
    <div className="relative text-foreground flex h-screen min-h-0 flex-col overflow-hidden bg-black transition-colors duration-300">
      <AmbientBackground theme={currentTheme} isDark={isDark} />
      <Navbar
        previewUrl={`./preview.html#${query}`}
        scheme={params.scheme}
        theme={currentTheme}
        onSchemeChange={(scheme) => update({ scheme })}
        isDark={isDark}
      />
      <main className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col">
        <iframe
          ref={frame}
          src={frameUrl}
          allow="fullscreen; autoplay; picture-in-picture; document-picture-in-picture"
          allowFullScreen
          onLoad={() => frame.current?.contentWindow?.postMessage({ type: PARAMS_MESSAGE, query }, location.origin)}
          className="min-h-0 w-full flex-1 border-0 bg-transparent"
          title={`${skin.name} preview`}
        />
      </main>
    </div>
  );
}
