/** @jsxImportSource react */

import { usePlayer } from '@videojs/react';
import { selectFullscreen } from '@videojs/core/dom';
import { useEffect, useState, type ComponentProps } from 'react';

import { cn } from '@/lib/resolve-class-name';

export type ButtonProps = ComponentProps<'button'>;

/**
 * Liquid Glass Button precisely matching user screenshot:
 * - 27.3px diameter (.65x scale) circular geometry
 * - Seamless borderless translucent glass body with vertical downward light sheen
 * - Refractive optical backdrop blur
 * - Soft ambient elevation shadow underneath
 * - Perfectly centered icon grid container with zero directional shadow offset
 * - Tactile spring-like scale on hover & click
 * - Responsive icon scaling: 1.1x when minimized, 1.2x in fullscreen
 */
export function Button({ className, children, ...props }: ButtonProps) {
  const playerFullscreen = usePlayer(selectFullscreen)?.isFullscreen ?? false;
  const [docFullscreen, setDocFullscreen] = useState(false);

  useEffect(() => {
    const update = () => {
      setDocFullscreen(Boolean(document.fullscreenElement || (document as any).webkitFullscreenElement));
    };
    update();
    document.addEventListener('fullscreenchange', update);
    document.addEventListener('webkitfullscreenchange', update);
    return () => {
      document.removeEventListener('fullscreenchange', update);
      document.removeEventListener('webkitfullscreenchange', update);
    };
  }, []);

  const isFullscreen = playerFullscreen || docFullscreen;

  return (
    <button
      className={cn(
        'relative group/liquid-btn grid size-[31.4px] shrink-0 cursor-pointer place-items-center rounded-full p-0 text-white overflow-hidden isolate select-none border-none outline-none',
        // Static high-translucency dark liquid glass base
        'bg-black/20',
        // Luminous transparent liquid glass sheen (refined for high translucency)
        'bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent',
        'hover:from-white/[0.22] hover:via-white/[0.08] hover:to-transparent',
        'active:from-white/[0.28] active:via-white/[0.12] active:to-transparent',
        // Outer elevation shadow (no border shine)
        'shadow-[0_2.5px_10px_0_rgba(0,0,0,0.3)]',
        // Optical backdrop refraction & clarity
        'backdrop-blur-[12px] backdrop-saturate-[150%] backdrop-brightness-[108%]',
        // Tactile scale
        'hover:scale-105 active:scale-95 transition-transform duration-150 ease-out',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
        "pointer-coarse:before:absolute pointer-coarse:before:-inset-[6px] pointer-coarse:before:content-[''] before:rounded-[inherit]",
        'aria-disabled:cursor-not-allowed aria-disabled:opacity-40 disabled:cursor-not-allowed disabled:opacity-40',
        'data-hidden:hidden',
        className
      )}
      {...props}
    >
      {/* Centered icon layer covering full button grid cell with non-directional soft ambient drop shadow: scaled down slightly for refined padding */}
      <span
        className={cn(
          'player-icon-scale relative z-10 size-full grid grid-cols-1 grid-rows-1 place-items-center text-white pointer-events-none transition-transform duration-500 ease-out rounded-[inherit]',
          isFullscreen ? 'scale-[0.92]!' : 'scale-[0.86]!'
        )}
      >
        {children}
      </span>
    </button>
  );
}
