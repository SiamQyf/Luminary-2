/** @jsxImportSource react */

import { CaptionsButton as CaptionsButtonPrimitive } from '@videojs/react';
import type { ClassValue } from 'cn';

import { cn, resolveClassName } from '@/lib/resolve-class-name';

import { Button } from './button';
import { ButtonTooltip } from './tooltip';

/**
 * Modern rounded caption off icon matching the smooth liquid glass aesthetic (strict 2 subtitle lines)
 */
export function RoundedCaptionsOffIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0.5 1.8 17 14.4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Smoothly rounded outer badge */}
      <rect
        x="1.2"
        y="2.8"
        width="15.6"
        height="12.4"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        className="opacity-80"
      />
      {/* Subtitle Line 1 (2 rounded dashes) */}
      <rect x="4.2" y="6.7" width="4.5" height="1.6" rx="0.8" fill="currentColor" className="opacity-75" />
      <rect x="9.8" y="6.7" width="4" height="1.6" rx="0.8" fill="currentColor" className="opacity-75" />
      {/* Subtitle Line 2 (2 rounded dashes) */}
      <rect x="4.2" y="10.1" width="6.8" height="1.6" rx="0.8" fill="currentColor" className="opacity-75" />
      <rect x="12.2" y="10.1" width="1.6" height="1.6" rx="0.8" fill="currentColor" className="opacity-75" />
    </svg>
  );
}

/**
 * Modern rounded caption on icon (active state: filled badge with transparent 2-line cutouts)
 */
export function RoundedCaptionsOnIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0.5 1.8 17 14.4"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Solid filled badge with transparent 2-line cutouts using evenodd fill rule */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.7 2.8C2.77 2.8 1.2 4.37 1.2 6.3V11.7C1.2 13.63 2.77 15.2 4.7 15.2H13.3C15.23 15.2 16.8 13.63 16.8 11.7V6.3C16.8 4.37 15.23 2.8 13.3 2.8H4.7ZM5 6.7C4.56 6.7 4.2 7.06 4.2 7.5C4.2 7.94 4.56 8.3 5 8.3H7.9C8.34 8.3 8.7 7.94 8.7 7.5C8.7 7.06 8.34 6.7 7.9 6.7H5ZM10.6 6.7C10.16 6.7 9.8 7.06 9.8 7.5C9.8 7.94 10.16 8.3 10.6 8.3H13C13.44 8.3 13.8 7.94 13.8 7.5C13.8 7.06 13.44 6.7 13.0 6.7H10.6ZM5 10.1C4.56 10.1 4.2 10.46 4.2 10.9C4.2 11.34 4.56 11.7 5 11.7H10.2C10.64 11.7 11 11.34 11 10.9C11 10.46 10.64 10.1 10.2 10.1H5ZM12.2 10.9C12.2 10.46 12.56 10.1 13 10.1C13.44 10.1 13.8 10.46 13.8 10.9C13.8 11.34 13.44 11.7 13 11.7C12.56 11.7 12.2 11.34 12.2 10.9Z"
      />
    </svg>
  );
}

export function CaptionsToggle() {
  return (
    <ButtonTooltip>
      <CaptionsButton />
    </ButtonTooltip>
  );
}

export type CaptionsButtonProps = Omit<CaptionsButtonPrimitive.Props, 'children'> & {
  iconClassName?: ClassValue;
};

/**
 * Mesmerizing Captions Button:
 * - Shares the exact same translucent liquid glass background as all player buttons
 * - Standardized 14px visual footprint matching Play, Skip, Volume, Fullscreen, and Settings
 * - Strict 2 subtitle lines display
 * - Radiant active indicator jewel dot at the bottom when subtitles are active
 */
export function CaptionsButton({ className, iconClassName, ...props }: CaptionsButtonProps = {}) {
  return (
    <CaptionsButtonPrimitive
      render={<Button />}
      className={(state) =>
        cn(
          'group/captions relative transition-all duration-200',
          resolveClassName(className, state)
        )
      }
      {...props}
    >
      <RoundedCaptionsOffIcon
        className={cn(
          'col-start-1 row-start-1 w-[15.5px] h-[13.1px] text-white transition-transform duration-200 group-hover/captions:scale-105',
          'group-data-active/captions:hidden',
          iconClassName
        )}
      />
      <RoundedCaptionsOnIcon
        className={cn(
          'col-start-1 row-start-1 hidden w-[15.5px] h-[13.1px] text-white transition-transform duration-200 group-hover/captions:scale-105',
          'group-data-active/captions:block',
          iconClassName
        )}
      />
    </CaptionsButtonPrimitive>
  );
}
