import { I18nProvider } from '@videojs/react/i18n';
import { type CSSProperties, StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import '@/skin.css';
import './preview.css';
import { playbackProps, playerStyles } from '../shell/params';
import { initialParams, onParamsChange } from './frame';
import { DEFAULT_SRC, Player } from './player';
import { isEditableElement } from '@/video/behaviors/playback-hotkeys';
import { DEVICE_OPTIONS, type DeviceType, VideoBar } from './video-input';
import { ControlsGuide } from './controls-guide';
import { UsageGuide } from './usage-guide';
import { AmbientBackground } from '../shell/ambient-background';

function Preview() {
  const [params, setParams] = useState(initialParams);
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const [customSrc, setCustomSrc] = useState<string>(() => {
    const raw = searchParams?.get('src') || sessionStorage.getItem('luminescence-custom-src') || sessionStorage.getItem('inescence-custom-src') || '';
    if (raw && !raw.includes('youtube.com') && !raw.includes('youtu.be')) {
      return raw;
    }
    return DEFAULT_SRC;
  });
  const [currentTheme, setCurrentTheme] = useState<string>(() => searchParams?.get('theme') || sessionStorage.getItem('luminescence-theme') || sessionStorage.getItem('inescence-theme') || 'translucent');
  const [currentDevice, setCurrentDevice] = useState<DeviceType>(() => {
    const raw = searchParams?.get('device') || sessionStorage.getItem('luminescence-device');
    if (raw === 'tablet' || raw === 'mobile' || raw === 'desktop') return raw;
    return 'desktop';
  });

  useEffect(() => onParamsChange(setParams), []);

  const handleVideoChange = (src: string) => {
    setCustomSrc(src);
    if (!src.startsWith('blob:')) {
      sessionStorage.setItem('luminescence-custom-src', src);
    }
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    sessionStorage.setItem('luminescence-theme', theme);
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('.preview-player').forEach((el) => {
      el.setAttribute('data-theme', theme);
    });
    window.dispatchEvent(new CustomEvent('luminescence-theme-change', { detail: { theme } }));
    try {
      window.postMessage({ type: 'THEME_CHANGE', theme }, '*');
      window.parent?.postMessage({ type: 'THEME_CHANGE', theme }, '*');
    } catch {
      // ignore
    }
  };

  const handleDeviceChange = (device: DeviceType) => {
    setCurrentDevice(device);
    sessionStorage.setItem('luminescence-device', device);
    const found = DEVICE_OPTIONS.find((d) => d.id === device) || DEVICE_OPTIONS[0];
    setParams((prev) => ({ ...prev, width: found.width }));
    try {
      window.parent?.postMessage({ type: 'DEVICE_CHANGE', device, width: found.width }, '*');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleThemeEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: string }>;
      if (customEvent.detail?.theme) {
        setCurrentTheme(customEvent.detail.theme);
      }
    };
    window.addEventListener('luminescence-theme-change', handleThemeEvent);
    return () => window.removeEventListener('luminescence-theme-change', handleThemeEvent);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
    document.documentElement.dataset.device = currentDevice;
  }, [currentTheme, currentDevice]);

  const playerMaxWidth =
    currentDevice === 'mobile'
      ? 'calc(384px * 0.98)'
      : currentDevice === 'tablet'
      ? 'calc(768px * 0.98)'
      : 'calc(896px * 0.98)';

  const isStandalone = typeof window !== 'undefined' && window.self === window.top;
  const isDark =
    params.scheme === 'dark' ||
    (params.scheme !== 'light' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <I18nProvider locale={params.locale}>
      {isStandalone && <AmbientBackground theme={currentTheme} isDark={isDark} />}
      <div className="preview-stage w-full flex flex-col items-center">
        {/* 3 Simple Controls: Video Link Input, Themes dropdown, Device dropdown (standard size) */}
        <div className="w-full flex justify-center" style={{ maxWidth: '1140px' }}>
          <VideoBar
            currentSrc={customSrc}
            currentTheme={currentTheme}
            currentDevice={currentDevice}
            onVideoChange={handleVideoChange}
            onThemeChange={handleThemeChange}
            onDeviceChange={handleDeviceChange}
          />
        </div>

        {/* Video Player - Default desktop size (with 2% reduction), or adapted for tablet/mobile */}
        <div
          className="preview-player w-full transition-[max-width] duration-350 ease-out"
          data-theme={currentTheme}
          data-device={currentDevice}
          onPointerEnter={() => {
            if (!isEditableElement(document.activeElement) && !document.querySelector('.flat-select-menu, [role="menu"][data-open]')) {
              try {
                window.focus();
              } catch {
                // ignore
              }
            }
          }}
          style={{
            ...(playerStyles(params) as CSSProperties),
            maxWidth: playerMaxWidth,
          }}
        >
          <Player media={playbackProps(params)} customSrc={customSrc} />
        </div>

        {/* What Each Button Does - Controls Guide */}
        <ControlsGuide />

        {/* Video.js v10 Integration & Usage Guide */}
        <UsageGuide />
      </div>
    </I18nProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Preview />
  </StrictMode>
);
