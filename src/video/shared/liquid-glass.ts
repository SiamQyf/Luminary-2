/**
 * Liquid Glass utilities based on srdavo/liquid-glass (YouTube: cuED0u_HKJs)
 * "How to create Liquid Glass on the web using vanilla Javascript"
 *
 * Implements physical optical refraction via SVG feDisplacementMap + chromatic aberration (3-channel split)
 */

export interface LiquidGlassOptions {
  width: number;
  height: number;
  radius: number;
  depth?: number;
  strength?: number;
  chromaticAberration?: number;
  filterId?: string;
}

/**
 * Creates the vector displacement map where:
 * - Red channel (X gradient) displaces horizontally
 * - Green channel (Y gradient) displaces vertically
 * - Center filled with neutral gray #808080 (where R=128, G=128 => 0 displacement)
 * This causes physical refraction only along the curved edges of the glass lens.
 */
export function getDisplacementMap({
  height,
  width,
  radius,
  depth = 4,
}: {
  height: number;
  width: number;
  radius: number;
  depth?: number;
}): string {
  const y1 = Math.ceil((radius / height) * 15);
  const y2 = Math.floor(100 - (radius / height) * 15);
  const x1 = Math.ceil((radius / width) * 15);
  const x2 = Math.floor(100 - (radius / width) * 15);

  const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>.mix { mix-blend-mode: screen; }</style>
    <defs>
      <linearGradient id="Y" x1="0" x2="0" y1="${y1}%" y2="${y2}%">
        <stop offset="0%" stop-color="#0F0" />
        <stop offset="100%" stop-color="#000" />
      </linearGradient>
      <linearGradient id="X" x1="${x1}%" x2="${x2}%" y1="0" y2="0">
        <stop offset="0%" stop-color="#F00" />
        <stop offset="100%" stop-color="#000" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
    <g filter="blur(2px)">
      <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
      <rect x="0" y="0" height="${height}" width="${width}" fill="url(#Y)" class="mix" />
      <rect x="0" y="0" height="${height}" width="${width}" fill="url(#X)" class="mix" />
      <rect x="${depth}" y="${depth}" height="${Math.max(0, height - 2 * depth)}" width="${Math.max(0, width - 2 * depth)}" fill="#808080" rx="${radius}" ry="${radius}" filter="blur(${depth}px)" />
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Creates the chromatic aberration displacement filter.
 * Splits Red, Green, and Blue channels and displaces each with a slightly different scale,
 * reproducing real physical optical dispersion (prism edge fringing).
 */
export function getDisplacementFilter({
  height,
  width,
  radius,
  depth = 4,
  strength = 32,
  chromaticAberration = 2,
  filterId = 'liquid-glass-filter',
}: LiquidGlassOptions): string {
  const displacementMapUrl = getDisplacementMap({ height, width, radius, depth });

  const svg = `<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="${filterId}" color-interpolation-filters="sRGB">
        <feImage x="0" y="0" height="${height}" width="${width}" href="${displacementMapUrl}" result="displacementMap" />
        <!-- Red Channel -->
        <feDisplacementMap
          transform-origin="center"
          in="SourceGraphic"
          in2="displacementMap"
          scale="${strength + chromaticAberration * 2}"
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
        <!-- Green Channel -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="displacementMap"
          scale="${strength + chromaticAberration}"
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
        <!-- Blue Channel -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="displacementMap"
          scale="${strength}"
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
        <!-- Blend channels together -->
        <feBlend in="displacedR" in2="displacedG" mode="screen" />
        <feBlend in2="displacedB" mode="screen" />
      </filter>
    </defs>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}#${filterId}`;
}

// Precomputed filter data URIs for instantaneous rendering
export const CIRCLE_BUTTON_FILTER_URI = getDisplacementFilter({
  width: 32,
  height: 32,
  radius: 16,
  depth: 4,
  strength: 28,
  chromaticAberration: 2,
  filterId: 'displace-circle',
});

export const PILL_BUTTON_FILTER_URI = getDisplacementFilter({
  width: 112,
  height: 32,
  radius: 16,
  depth: 4,
  strength: 28,
  chromaticAberration: 2,
  filterId: 'displace-pill',
});

export const CIRCLE_DISPLACEMENT_MAP_URI = getDisplacementMap({
  width: 32,
  height: 32,
  radius: 16,
  depth: 4,
});

export const PILL_DISPLACEMENT_MAP_URI = getDisplacementMap({
  width: 112,
  height: 32,
  radius: 16,
  depth: 4,
});

