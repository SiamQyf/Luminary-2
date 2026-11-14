import { useId } from 'react';
import { LuminescenceLogo, useLuminaryPalette } from './logo';
import type { ColorScheme } from './params';

type NavbarProps = {
  /** The preview on its own, to open in a new tab. */
  previewUrl?: string;
  /** Options panel id (optional, if any). */
  optionsId?: string;
  /** Current color scheme. */
  scheme?: ColorScheme;
  /** Callback to update color scheme. */
  onSchemeChange?: (scheme: ColorScheme) => void;
  /** Whether the effective scheme is dark. */
  isDark?: boolean;
  /** Active player theme name (e.g. obsidian-gold, cyber-neon) */
  theme?: string;
};

/** The skin logo and theme toggle. */
export function Navbar({ scheme, onSchemeChange, isDark, theme }: NavbarProps) {
  const effectiveDark = isDark ?? (scheme === 'dark');
  const palette = useLuminaryPalette(theme, effectiveDark);
  const uid = useId().replace(/:/g, '');

  return (
    <header className="studio-navbar-glass shrink-0 transition-all duration-300 z-50">
      <div className="mx-auto flex h-16 max-w-[1140px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center">
          <LuminescenceLogo theme={theme} isDark={effectiveDark} />
        </div>

        <div className="flex items-center gap-1">
          {onSchemeChange && (
            <button
              type="button"
              aria-label={effectiveDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={effectiveDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => onSchemeChange(effectiveDark ? 'light' : 'dark')}
              className="studio-theme-btn"
              style={{
                filter: `drop-shadow(0 0 7px ${palette.glow})`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-[16px] shrink-0"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={`${uid}-toggle-grad`} x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor={palette.accent} />
                    <stop offset="55%" stopColor={palette.primary} />
                    <stop offset="100%" stopColor={palette.secondary} />
                  </linearGradient>
                </defs>
                {effectiveDark ? (
                  <>
                    {/* Radiant photonic star-sun matching the Luminary space orb aesthetic */}
                    <circle cx="12" cy="12" r="4" fill={`url(#${uid}-toggle-grad)`} />
                    <path
                      d="M12 2.75V5.25M12 18.75V21.25M2.75 12H5.25M18.75 12H21.25M5.46 5.46L7.23 7.23M16.77 16.77L18.54 18.54M18.54 5.46L16.77 7.23M7.23 16.77L5.46 18.54"
                      stroke={`url(#${uid}-toggle-grad)`}
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </>
                ) : (
                  <>
                    {/* Crescent moon with companion four-point star */}
                    <path
                      d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10Z"
                      fill={`url(#${uid}-toggle-grad)`}
                    />
                    <path
                      d="M17.5 4.5L17.9 5.9L19.3 6.3L17.9 6.7L17.5 8.1L17.1 6.7L15.7 6.3L17.1 5.9Z"
                      fill={palette.primary}
                    />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
