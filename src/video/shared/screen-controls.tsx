/** @jsxImportSource react */

import {
  CastButton as CastButtonPrimitive,
  PiPButton as PiPButtonPrimitive,
  FullscreenButton as FullscreenButtonPrimitive,
} from '@videojs/react';
import {
  CastEnterIcon as CastEnterIconPrimitive,
  CastExitIcon as CastExitIconPrimitive,
  PipEnterIcon as PipEnterIconPrimitive,
  PipExitIcon as PipExitIconPrimitive,
  FullscreenEnterIcon as FullscreenEnterIconPrimitive,
  FullscreenExitIcon as FullscreenExitIconPrimitive,
} from '@videojs/react/icons/scaffold';

import { cn } from '@/lib/resolve-class-name';

import { AirPlayButton } from './airplay-button';
import { Button } from './button';
import { ButtonTooltip } from './tooltip';

function CastIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16.4571 12.8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.2571 0C14.1058 0 14.9198 0.337134 15.5199 0.937238C16.12 1.53734 16.4571 2.35126 16.4571 3.19993V9.59979C16.4571 10.4485 16.12 11.2624 15.5199 11.8625C14.9198 12.4626 14.1058 12.7997 13.2571 12.7997H6.85714C6.85714 12.1661 6.76937 11.5536 6.60937 10.9712H13.2571C13.6209 10.9712 13.9697 10.8267 14.2269 10.5695C14.4841 10.3123 14.6286 9.96351 14.6286 9.59979V3.19993C14.6286 2.83621 14.4841 2.48739 14.2269 2.2302C13.9697 1.97302 13.6209 1.82853 13.2571 1.82853H3.2C2.83628 1.82853 2.48745 1.97302 2.23025 2.2302C1.97306 2.48739 1.82857 2.83621 1.82857 3.19993V6.19049C1.233 6.0259 0.617903 5.94255 0 5.94273L0 3.19993C0 2.35126 0.337142 1.53734 0.937258 0.937238C1.53737 0.337134 2.35131 0 3.2 0H13.2571Z"
        fill="currentColor"
      />
      <path
        d="M12.3429 3.19995C12.5853 3.19995 12.8179 3.29627 12.9894 3.46773C13.1608 3.63919 13.2571 3.87173 13.2571 4.11421V8.68554C13.2571 8.92802 13.1608 9.16057 12.9894 9.33203C12.8179 9.50348 12.5853 9.59981 12.3429 9.59981H6.06537C5.41933 8.37888 4.42095 7.38052 3.2 6.7345V4.11421C3.2 3.87173 3.29633 3.63919 3.46779 3.46773C3.63925 3.29627 3.8718 3.19995 4.11429 3.19995H12.3429ZM0 9.14268C0.969935 9.14268 1.90014 9.52797 2.58599 10.2138C3.27184 10.8996 3.65714 11.8298 3.65714 12.7997H2.28571C2.28571 12.1935 2.0449 11.6122 1.61624 11.1835C1.18759 10.7549 0.606209 10.5141 0 10.5141L0 9.14268Z"
        fill="currentColor"
      />
      <path
        d="M0 6.85726C1.57614 6.85726 3.08773 7.48336 4.20224 8.59784C5.31674 9.71232 5.94286 11.2239 5.94286 12.8H4.57143C4.57143 11.5876 4.0898 10.4249 3.23249 9.56757C2.37518 8.71028 1.21242 8.22865 0 8.22865L0 6.85726ZM0 11.4286C0.363726 11.4286 0.712554 11.5731 0.969747 11.8303C1.22694 12.0874 1.37143 12.4363 1.37143 12.8H0.457143C0.335901 12.8 0.219625 12.7518 0.133894 12.6661C0.0481631 12.5804 0 12.4641 0 12.3429V11.4286Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PiPIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16.8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12.1333 0C13.1235 0 14.073 0.39333 14.7732 1.09346C15.4733 1.79359 15.8666 2.74317 15.8666 3.73331V5.63357C15.7121 5.61123 15.5561 5.6 15.4 5.59997H14V3.98811C14 2.81678 13.0293 1.86666 11.8337 1.86666H4.032C2.83733 1.86666 1.86666 2.81678 1.86666 3.98811V9.07848C1.86666 10.2498 2.83733 11.1999 4.03293 11.1999H5.59999V12.5999C5.59999 12.7586 5.61119 12.9141 5.63359 13.0666H3.73333C2.74319 13.0666 1.7936 12.6733 1.09347 11.9731C0.393332 11.273 0 10.3234 0 9.33328V3.73331C0 2.74317 0.393332 1.79359 1.09347 1.09346C1.7936 0.39333 2.74319 0 3.73333 0H12.1333Z"
        fill="currentColor"
      />
      <path
        d="M14.9333 7.46662H9.33328C8.30235 7.46662 7.46662 8.30235 7.46662 9.33327V12.1333C7.46662 13.1642 8.30235 13.9999 9.33328 13.9999H14.9333C15.9642 13.9999 16.7999 13.1642 16.7999 12.1333V9.33327C16.7999 8.30235 15.9642 7.46662 14.9333 7.46662Z"
        fill="currentColor"
      />
      <path
        d="M6.65364 3.3103C6.55106 3.26748 6.43806 3.25615 6.32903 3.27775C6.22 3.29936 6.11986 3.35293 6.04137 3.43163L3.43177 6.04122C3.35253 6.11944 3.2984 6.2195 3.27631 6.32863C3.25421 6.43776 3.26515 6.551 3.30773 6.65389C3.35031 6.75677 3.42259 6.84463 3.51534 6.90623C3.60809 6.96784 3.7171 7.00039 3.82844 6.99974H6.43804C6.7479 6.99974 6.9999 6.74775 6.9999 6.43788V3.82923C7.00016 3.71814 6.96738 3.60949 6.90572 3.51708C6.84406 3.42468 6.75631 3.3527 6.65364 3.3103Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PiPExitIcon({ className }: { className?: string }) {
  return <PipExitIconPrimitive className={className} aria-hidden="true" />;
}

function FullscreenEnterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top-left triangle subtly shifted inward along diagonal */}
      <g transform="translate(0.5, 0.5)">
        <path d="M9.57 3.617A1 1 0 0 0 8.646 3H4c-.552 0-1 .449-1 1v4.646a.996.996 0 0 0 1.001 1 1 1 0 0 0 .706-.293l4.647-4.647a1 1 0 0 0 .216-1.089Z" />
      </g>
      {/* Bottom-right triangle subtly shifted inward along diagonal */}
      <g transform="translate(-0.5, -0.5)">
        <path d="M14.382 8.429a1 1 0 0 0-1.089.217l-4.647 4.647a.998.998 0 0 0 .708 1.706H14c.552 0 1-.449 1-1V9.353a1 1 0 0 0-.618-.924Z" />
      </g>
    </svg>
  );
}

function FullscreenExitIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.883 1.93a.99.99 0 0 0-1.09.217L2.146 6.793A.998.998 0 0 0 2.853 8.5H7.5c.551 0 1-.449 1-1V2.854a1 1 0 0 0-.617-.924m7.263 7.57H10.5c-.551 0-1 .449-1 1v4.646a.996.996 0 0 0 1.001 1.001 1 1 0 0 0 .706-.293l4.646-4.646a.998.998 0 0 0-.707-1.707z" />
    </svg>
  );
}

export function CastButton() {
  return (
    <ButtonTooltip popupClassName={'[--media-tooltip-side-offset:calc(var(--media-spacing)*3)]!'}>
      <CastButtonPrimitive render={<Button />} className={'group/cast'}>
        <CastIcon className="col-start-1 row-start-1 w-[17.2px] h-[13.5px] text-white" />
      </CastButtonPrimitive>
    </ButtonTooltip>
  );
}

export function PiPButton() {
  return (
    <ButtonTooltip popupClassName={'[--media-tooltip-side-offset:calc(var(--media-spacing)*3)]!'}>
      <PiPButtonPrimitive render={<Button />} className={'group/pip'}>
        <PiPExitIcon className="col-start-1 row-start-1 hidden w-[17.2px] h-[14.4px] text-white group-data-[pip]/pip:block" />
        <PiPIcon className="col-start-1 row-start-1 w-[17.2px] h-[14.4px] text-white group-data-[pip]/pip:hidden" />
      </PiPButtonPrimitive>
    </ButtonTooltip>
  );
}

export function FullscreenButton() {
  return (
    <ButtonTooltip popupClassName={'[--media-tooltip-side-offset:calc(var(--media-spacing)*3)]!'}>
      <FullscreenButtonPrimitive
        render={<Button />}
        className={'group/fullscreen media-fullscreen-button'}
      >
        <FullscreenEnterIcon
          className={cn(
            'col-start-1 row-start-1 size-[17px] text-white',
            'group-data-fullscreen/fullscreen:hidden',
            'media-fullscreen-button-enter-icon'
          )}
        />
        <FullscreenExitIcon
          className={cn(
            'col-start-1 row-start-1 hidden size-[17px] text-white',
            'group-data-fullscreen/fullscreen:block',
            'media-fullscreen-button-exit-icon'
          )}
        />
      </FullscreenButtonPrimitive>
    </ButtonTooltip>
  );
}

export function ScreenControls() {
  return (
    <>
      <AirPlayButton popupClassName={'[--media-tooltip-side-offset:calc(var(--media-spacing)*3)]!'} />
      <CastButton />
      <PiPButton />
      <FullscreenButton />
    </>
  );
}
