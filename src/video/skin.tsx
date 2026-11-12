/** @jsxImportSource react */

'use client';

import '../styles/video/scaffold.css';
import { Container as ContainerPrimitive, Poster as PosterPrimitive, Slider as SliderPrimitive } from '@videojs/react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';

import { cn } from '@/lib/resolve-class-name';

import { VideoGestures } from './behaviors/gestures';
import { VideoHotkeys } from './behaviors/hotkeys';
import { VideoControls } from './controls';
import { ErrorDialog } from './shared/error-dialog';
import { Indicators } from './shared/indicators';
import { SeekIndicator } from './shared/seek-indicator';
import { StatusAnnouncer } from './shared/status-announcer';
import { Poster } from './shared/video-feedback';
import { CIRCLE_DISPLACEMENT_MAP_URI, PILL_DISPLACEMENT_MAP_URI } from './shared/liquid-glass';

export interface VideoSkinProps extends Omit<ContainerPrimitive.Props, 'children' | 'title'> {
  children?: ReactNode;
  renderPoster?: PosterPrimitive.ImageProps['render'];
  renderThumbnail?: SliderPrimitive.Thumbnail.ImageProps['render'];
  /** Optional custom title; falls back to reactive player title, or nothing if unset */
  title?: ReactNode;
  /** Optional subtitle or episode info */
  subtitle?: ReactNode;
}

function LiquidGlassFilter() {
  return (
    <svg
      className="absolute -top-[9999px] -left-[9999px] w-0 h-0 pointer-events-none opacity-0 overflow-hidden"
      aria-hidden="true"
    >
      <defs>
        {/* srdavo/liquid-glass Circular Button Refraction Filter with Chromatic Aberration */}
        <filter id="displace-circle" colorInterpolationFilters="sRGB">
          <feImage x="0" y="0" height="32" width="32" href={CIRCLE_DISPLACEMENT_MAP_URI} result="displacementMap" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale={32}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="displacedR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale={30}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="displacedG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale={28}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="displacedB"
          />
          <feBlend in="displacedR" in2="displacedG" mode="screen" />
          <feBlend in2="displacedB" mode="screen" />
        </filter>

        {/* srdavo/liquid-glass Pill Refraction Filter with Chromatic Aberration */}
        <filter id="displace-pill" colorInterpolationFilters="sRGB">
          <feImage x="0" y="0" height="32" width="112" href={PILL_DISPLACEMENT_MAP_URI} result="displacementMap" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale={32}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="displacedR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale={30}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="displacedG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="displacementMap"
            scale={28}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="displacedB"
          />
          <feBlend in="displacedR" in2="displacedG" mode="screen" />
          <feBlend in2="displacedB" mode="screen" />
        </filter>

        {/* Organic texture filter */}
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves={1}
            seed={5}
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale={40}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function VideoSkin({
  children,
  className,
  renderPoster,
  renderThumbnail,
  title,
  subtitle,
  ...props
}: VideoSkinProps = {}) {
  return (
    <ContainerPrimitive
      className={cn(
        'media-skin',
        'relative block h-full w-full overflow-hidden rounded-[24px] sm:rounded-[28.8px] shadow-2xl [--spacing:var(--media-spacing)] [font-family:var(--media-font-family,inherit)] text-media text-media-foreground @container/media-root',
        'outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white',
        'bg-transparent',
        className
      )}
      data-theme="scaffold"
      data-preset="video"
      {...props}
    >
      <LiquidGlassFilter />
      {children}
      <Poster renderImage={renderPoster} />
      <ErrorDialog />
      <VideoControls renderThumbnail={renderThumbnail} title={title} subtitle={subtitle} />

      <VideoHotkeys />
      <VideoGestures />
      <StatusAnnouncer />
      <Indicators>
        <SeekIndicator />
      </Indicators>
    </ContainerPrimitive>
  );
}
