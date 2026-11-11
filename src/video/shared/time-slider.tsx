/** @jsxImportSource react */

import { Slider as SliderPrimitive } from '@videojs/react';
import { TimeSlider as TimeSliderPrimitive } from '@videojs/react';

import { cn } from '@/lib/resolve-class-name';

export function TimeSlider({
  audio = false,
  className,
  renderThumbnail,
}: ThumbnailSlot & { audio?: boolean; className?: string } = {}) {
  return (
    <div className={cn('w-full', className)}>
      <TimeSliderPrimitive.Root
        className={cn(
          'media-slider-smooth group/slider relative flex h-2.5 min-w-12 flex-1 cursor-pointer items-center',
          'data-disabled:cursor-not-allowed data-disabled:opacity-40 forced-colors:data-disabled:text-[GrayText] forced-colors:data-disabled:opacity-100'
        )}
        thumbAlignment="edge"
      >
        {/* Continuous undivided progress bar track (no divisions) matching button background color and animation */}
        <TimeSliderPrimitive.Track
          className={cn(
            'media-slider-smooth absolute inset-x-0 isolate h-[2px] rounded-full overflow-hidden transition-[height] duration-250 ease-out group-hover/slider:h-[3.5px]',
            // Base background track matches button static color and liquid glass translucency
            'bg-black/20',
            'bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent',
            'backdrop-blur-[12px] backdrop-saturate-[150%] backdrop-brightness-[108%]',
            'shadow-[0_1px_3px_rgba(0,0,0,0.25)]',
            'forced-colors:bg-[Canvas] forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]'
          )}
        >
          <TimeSliderPrimitive.Buffer
            className={cn(
              'media-slider-smooth absolute inset-y-0 rounded-full bg-white/25 clip-media-x-[--media-slider-buffer]',
              'forced-colors:opacity-100! forced-colors:forced-color-adjust-none',
              'forced-colors:bg-[repeating-linear-gradient(135deg,CanvasText_0px,CanvasText_1px,Canvas_1px,Canvas_3px)]',
              audio && 'bg-[#b3b3b3]!'
            )}
          />
          <TimeSliderPrimitive.Fill
            className={cn(
              'media-slider-smooth absolute inset-y-0 rounded-full clip-media-x-[--media-slider-fill] forced-colors:forced-color-adjust-none',
              'group-data-dragging/slider:clip-media-x-[--media-slider-pointer]',
              'forced-colors:bg-[Canvas] forced-colors:bg-[linear-gradient(Highlight,Highlight)]'
            )}
            style={{
              background:
                'linear-gradient(90deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.25) 20%, rgba(59, 130, 246, 0.7) 48%, #2563eb 67%, #38bdf8 100%)',
              boxShadow: '0 0 8px rgba(56, 189, 248, 0.35)',
              opacity: 0.75,
            }}
          />
        </TimeSliderPrimitive.Track>
        <TimeSliderPrimitive.Thumb
          className={cn(
            'media-thumb-smooth absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-[var(--media-slider-fill,0%)] size-[7px] rounded-full bg-white shadow-[0_0_8px_rgba(56,189,248,0.9),0_1px_3px_rgba(0,0,0,0.5)]',
            'transition-transform duration-150 ease-out group-hover/slider:scale-125 group-data-dragging/slider:scale-125',
            'group-data-dragging/slider:left-(--media-slider-pointer)',
            'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
            'forced-colors:bg-[Highlight] forced-colors:forced-color-adjust-none'
          )}
        />

        <TimeSliderPrimitive.Preview
          className={cn(
            'pointer-events-none bottom-[calc(100%+var(--media-spacing)*3)] grid max-w-39 origin-bottom justify-items-center gap-1',
            'opacity-0 group-data-disabled/slider:hidden',
            'group-data-pointing/slider:opacity-100',
            'group-data-dragging/slider:opacity-100'
          )}
        >
          <SliderPrimitive.Thumbnail.Root className={'block max-w-39 overflow-hidden rounded-none bg-media-background'}>
            <SliderPrimitive.Thumbnail.Image render={renderThumbnail} className={'block'} />
          </SliderPrimitive.Thumbnail.Root>
          <div
            className={cn(
              'flex w-full min-w-0 justify-center px-2 py-1',
              audio &&
                'w-auto! rounded-none px-1.5! py-0.5 text-media-foreground media-high-contrast:outline forced-colors:outline'
            )}
          >
            <div className={'flex max-w-full min-w-0 items-center gap-2'}>
              <TimeSliderPrimitive.Value className={'shrink-0 tabular-nums'} type="pointer" />
              <TimeSliderPrimitive.ChapterTitle className={'min-w-0 truncate opacity-70 empty:hidden'} />
            </div>
          </div>
        </TimeSliderPrimitive.Preview>
      </TimeSliderPrimitive.Root>
    </div>
  );
}

export interface ThumbnailSlot {
  /** Draws the storyboard frame in the slider preview in place of the one the skin renders. */
  renderThumbnail?: SliderPrimitive.Thumbnail.ImageProps['render'];
}
