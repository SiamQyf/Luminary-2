import { MoonIcon, SunIcon } from '@heroicons/react/16/solid';
import { LuminescenceLogo } from './logo';
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
  /** Active player theme name (e.g. obsidian-gold, cyber-neon, gta-vi) */
  theme?: string;
};

/** The skin logo and theme toggle. */
export function Navbar({ scheme, onSchemeChange, isDark, theme }: NavbarProps) {
  const effectiveDark = isDark ?? (scheme === 'dark');

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
            >
              {effectiveDark ? (
                <SunIcon className="size-4" aria-hidden="true" />
              ) : (
                <MoonIcon className="size-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
