/** @jsxImportSource react */

import { PlayButton as PlayButtonPrimitive, BufferingIndicator as BufferingIndicatorPrimitive } from '@videojs/react';
import type { ClassValue } from 'cn';

import { cn, resolveClassName } from '@/lib/resolve-class-name';

import { Button } from './button';
import { ButtonTooltip } from './tooltip';

/**
 * Replay icon matching the bold Figma skip arrow weight with a smoothly rounded, centered play triangle
 */
function ReplayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 18"
      width="13.33"
      height="15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Bold counter-clockwise circular arrow matching Figma skip icons */}
      <path d="M7.82568 17.2634C6.75602 17.2634 5.74943 17.0591 4.80591 16.6504C3.86239 16.2417 3.02987 15.6766 2.30835 14.9551C1.58683 14.2386 1.02173 13.4086 0.613036 12.4651C0.204345 11.5165 -8.70321e-07 10.5074 -8.70321e-07 9.43774C-8.70321e-07 8.62541 0.126138 7.8383 0.378417 7.07642C0.630696 6.30949 0.983886 5.60311 1.43799 4.95727C1.89713 4.31144 2.43197 3.75895 3.04248 3.2998C3.24935 3.1333 3.46126 3.06266 3.67822 3.08789C3.90023 3.10807 4.07682 3.20646 4.20801 3.38306C4.34424 3.5647 4.38965 3.76147 4.34424 3.97339C4.29883 4.18026 4.1853 4.3619 4.00366 4.51831C3.5092 4.89673 3.08032 5.34074 2.71704 5.85034C2.35376 6.3549 2.07121 6.91243 1.86938 7.52295C1.66756 8.12842 1.56665 8.76668 1.56665 9.43774C1.56665 10.3056 1.72811 11.1204 2.05102 11.8823C2.37394 12.6392 2.82047 13.3027 3.39062 13.8728C3.96582 14.443 4.63184 14.8895 5.38867 15.2124C6.14551 15.5353 6.95784 15.6968 7.82568 15.6968C8.69857 15.6968 9.5109 15.5353 10.2627 15.2124C11.0195 14.8895 11.683 14.443 12.2532 13.8728C12.8284 13.3027 13.2774 12.6392 13.6003 11.8823C13.9233 11.1204 14.0847 10.3056 14.0847 9.43774C14.0847 8.57495 13.9233 7.76514 13.6003 7.0083C13.2825 6.25146 12.8385 5.58797 12.2683 5.01782C11.7032 4.44767 11.0448 4.00114 10.293 3.67822C9.54118 3.35026 8.73136 3.18376 7.86353 3.17871V1.61206C8.93319 1.61206 9.93726 1.81893 10.8757 2.23267C11.8193 2.64136 12.6493 3.20646 13.3657 3.92798C14.0822 4.64445 14.6423 5.47445 15.0459 6.41797C15.4546 7.36149 15.6589 8.36808 15.6589 9.43774C15.6589 10.5074 15.4546 11.5165 15.0459 12.4651C14.6372 13.4086 14.0721 14.2386 13.3506 14.9551C12.6291 15.6766 11.7965 16.2417 10.853 16.6504C9.9095 17.0591 8.90039 17.2634 7.82568 17.2634ZM9.39233 4.46533C9.39233 4.75797 9.29899 4.94214 9.1123 5.01782C8.93066 5.08846 8.72127 5.038 8.48413 4.86645L5.93359 3.04248C5.74186 2.90625 5.646 2.74479 5.646 2.5581C5.646 2.36637 5.74186 2.20239 5.93359 2.06616L8.4917 0.257323C8.72884 0.0857738 8.93823 0.0378409 9.11987 0.113524C9.30151 0.184163 9.39233 0.365803 9.39233 0.658446V4.46533Z" />
      {/* Centered smoothly rounded center play triangle */}
      <path d="M5.6 7.7C5.6 7.15 6.2 6.8 6.7 7.1L9.6 8.8C10.05 9.05 10.05 9.95 9.6 10.2L6.7 11.9C6.2 12.2 5.6 11.85 5.6 11.3V7.7Z" />
    </svg>
  );
}

/**
 * Play/Pause Button precisely matching user screenshot:
 * - Thick, crisp, pure solid white pause bars with rounded pill caps
 * - Pure solid white play triangle with rounded apex, mathematically centered with respect to button background
 * - Replay state matching Figma skip icon boldness and centered rounded play triangle
 */
export function PlayButton({
  className,
  iconClassName,
  tooltip = true,
  ...props
}: PlayButtonPrimitive.Props & { iconClassName?: ClassValue; tooltip?: boolean } = {}) {
  return (
    <ButtonTooltip disabled={!tooltip}>
      <PlayButtonPrimitive
        render={<Button />}
        className={(state) => cn('group/play', resolveClassName(className, state))}
        {...props}
      >
        <ReplayIcon
          className={cn(
            'col-start-1 row-start-1 hidden w-[12.6px] h-[15px] text-white',
            'group-data-ended/play:block',
            iconClassName
          )}
        />
        {/* Play triangle with slightly rounded corners - optically centered & balanced */}
        <svg
          viewBox="0 0 16 20"
          width="13"
          height="15.6"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            'col-start-1 row-start-1 hidden w-[13px] h-[15.6px] text-white translate-x-[0.6px]',
            'group-not-data-ended/play:group-data-paused/play:block',
            'group-not-data-ended/play:group-not-data-started/play:block',
            iconClassName
          )}
          aria-hidden="true"
        >
          <path d="M2 4.2C2 2.8 3.5 2 4.7 2.7L14.1 8.5C15.3 9.2 15.3 10.8 14.1 11.5L4.7 17.3C3.5 18 2 17.2 2 15.8V4.2Z" />
        </svg>
        {/* Pause exact two rounded pill bars - sleek & balanced with ample glass margin */}
        <svg
          viewBox="0 0 16 20"
          width="10.8"
          height="14"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            'col-start-1 row-start-1 hidden w-[10.8px] h-[14px] text-white',
            'group-data-started/play:group-not-data-paused/play:group-not-data-ended/play:block',
            iconClassName
          )}
          aria-hidden="true"
        >
          <rect x="0.5" y="0" width="5.5" height="20" rx="2.75" />
          <rect x="10" y="0" width="5.5" height="20" rx="2.75" />
        </svg>
      </PlayButtonPrimitive>
    </ButtonTooltip>
  );
}

export function AudioPlayButton() {
  return (
    <ButtonTooltip>
      <PlayButtonPrimitive render={<Button />} className={'group/play'}>
        <BufferingIndicatorPrimitive className={'group/buffering col-start-1 row-start-1 grid place-items-center'}>
          {/* Pause */}
          <svg
            viewBox="0 0 16 20"
            width="9.8"
            height="12.65"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'col-start-1 row-start-1 hidden w-[9.8px] h-[12.65px] text-white',
              'group-data-started/play:group-not-data-paused/play:group-not-data-ended/play:block',
              'group-data-visible/buffering:opacity-0'
            )}
            aria-hidden="true"
          >
            <rect x="0.5" y="0" width="5.5" height="20" rx="2.75" />
            <rect x="10" y="0" width="5.5" height="20" rx="2.75" />
          </svg>
          {/* Play */}
          <svg
            viewBox="0 0 16 20"
            width="11"
            height="13.2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'col-start-1 row-start-1 hidden w-[11px] h-[13.2px] text-white translate-x-[0.6px]',
              'group-not-data-ended/play:group-data-paused/play:block',
              'group-not-data-ended/play:group-not-data-started/play:block',
              'group-data-visible/buffering:opacity-0'
            )}
            aria-hidden="true"
          >
            <path d="M2 4.2C2 2.8 3.5 2 4.7 2.7L14.1 8.5C15.3 9.2 15.3 10.8 14.1 11.5L4.7 17.3C3.5 18 2 17.2 2 15.8V4.2Z" />
          </svg>
          {/* Replay */}
          <ReplayIcon
            className={cn(
              'col-start-1 row-start-1 hidden w-[12.6px] h-[15px] text-white',
              'group-data-ended/play:block',
              'group-data-visible/buffering:opacity-0'
            )}
          />
        </BufferingIndicatorPrimitive>
      </PlayButtonPrimitive>
    </ButtonTooltip>
  );
}
