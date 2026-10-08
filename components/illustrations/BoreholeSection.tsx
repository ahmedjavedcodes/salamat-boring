import type { IllustrationCopy } from '@/lib/content/types';
import { cn } from '@/lib/utils/cn';

/**
 * The signature visual (CLAUDE.md §3.1): a borehole cross-section. Soil bands, a bore
 * pipe descending through them, a screened section and a water-bearing layer.
 *
 * It is informative, not decorative, so it is role="img" with a localized title and
 * description. The layer labels are real text in the current locale.
 *
 * Geometry is mirrored for RTL by moving the pipe and the labels to the opposite side;
 * the bands span the full width and need no mirroring. `rtl:-scale-x-100` is not used,
 * because it would reverse the label text too.
 */

const VIEW = { width: 480, height: 560 };
const GROUND_Y = 56;
const PIPE_HALF_WIDTH = 13;
const PIPE_TOP = 28;
const PIPE_BOTTOM = 476;
const PIPE_LENGTH = PIPE_BOTTOM - PIPE_TOP;
const WATER_TABLE_Y = 330;

const bands = [
  { key: 'topsoil', y: GROUND_Y, height: 64, className: 'fill-silt' },
  { key: 'clay', y: 120, height: 116, className: 'fill-galvanized/55' },
  { key: 'sand', y: 236, height: 94, className: 'fill-sand' },
  { key: 'water', y: WATER_TABLE_Y, height: 122, className: 'fill-groundwater/25' },
  { key: 'bedrock', y: 452, height: 108, className: 'fill-aquifer/85' },
] as const;

/** Mid-height of each labelled band, for the label and its leader rule. */
const labelRows = [
  { key: 'topsoil', y: 94 },
  { key: 'clay', y: 182 },
  { key: 'sand', y: 287 },
  { key: 'water', y: 394 },
] as const;

/** Hand-placed so the texture reads as strata rather than noise. */
const grainLines = [
  { x: 40, y: 76, length: 54 },
  { x: 150, y: 70, length: 38 },
  { x: 300, y: 104, length: 46 },
  { x: 72, y: 142, length: 70 },
  { x: 210, y: 166, length: 44 },
  { x: 390, y: 150, length: 52 },
  { x: 120, y: 206, length: 60 },
  { x: 268, y: 222, length: 40 },
  { x: 46, y: 470, length: 66 },
  { x: 230, y: 492, length: 80 },
  { x: 130, y: 524, length: 50 },
  { x: 330, y: 536, length: 58 },
];

const sandGrains = [
  { x: 60, y: 258 },
  { x: 132, y: 274 },
  { x: 196, y: 252 },
  { x: 258, y: 290 },
  { x: 318, y: 262 },
  { x: 404, y: 282 },
  { x: 92, y: 306 },
  { x: 238, y: 318 },
  { x: 368, y: 312 },
];

/** Where water enters the bore through the screen. */
const inflowRows = [372, 406, 440];

export function BoreholeSection({
  dict,
  dir,
  className,
}: {
  dict: IllustrationCopy;
  dir: 'ltr' | 'rtl';
  className?: string;
}) {
  const rtl = dir === 'rtl';

  const pipeX = rtl ? 120 : 360;
  const pipeStart = pipeX - PIPE_HALF_WIDTH;
  const pipeEnd = pipeX + PIPE_HALF_WIDTH;

  const labelX = rtl ? 452 : 28;
  const leaderFrom = rtl ? 290 : 190;
  const leaderTo = rtl ? pipeEnd + 24 : pipeStart - 24;

  const layerLabels: Record<string, string> = {
    topsoil: dict.layers.topsoil,
    clay: dict.layers.clay,
    sand: dict.layers.sand,
    water: dict.layers.water,
  };

  return (
    <svg
      viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
      // "meet" (contain), not "slice" (cover): the whole illustration is meant to be
      // visible at every size now (CLAUDE.md §8), and "meet" guarantees that
      // regardless of the container's exact rounded ratio.
      preserveAspectRatio="xMidYMid meet"
      // The CSS/SVG2 text layout model makes text-anchor "start"/"end" direction-aware:
      // under an inherited dir="rtl" (from <html lang="ur" dir="rtl">), "end" can
      // resolve to the visual *left* instead of the right the mirrored coordinates
      // below assume, pushing the Urdu labels past the viewBox edge and clipping them.
      // Mirroring here is already done by hand (pipeX/labelX/textAnchor all swap on
      // `rtl`), so the SVG is pinned to direction="ltr" to stop the engine from
      // re-mirroring on top of that.
      direction="ltr"
      role="img"
      aria-labelledby="borehole-title borehole-desc"
      className={cn('h-full w-full', className)}
    >
      <title id="borehole-title">{dict.title}</title>
      <desc id="borehole-desc">{dict.description}</desc>

      {bands.map((band) => (
        <rect
          key={band.key}
          x={0}
          y={band.y}
          width={VIEW.width}
          height={band.height}
          className={band.className}
        />
      ))}

      {grainLines.map((line) => (
        <line
          key={`${line.x}-${line.y}`}
          x1={line.x}
          y1={line.y}
          x2={line.x + line.length}
          y2={line.y}
          strokeWidth={1.5}
          className="stroke-ink/20"
        />
      ))}

      {sandGrains.map((grain) => (
        <circle
          key={`${grain.x}-${grain.y}`}
          cx={grain.x}
          cy={grain.y}
          r={2.5}
          className="fill-silt/40"
        />
      ))}

      {/* Ground surface */}
      <line
        x1={0}
        y1={GROUND_Y}
        x2={VIEW.width}
        y2={GROUND_Y}
        strokeWidth={2.5}
        className="stroke-aquifer"
      />

      {labelRows.map((row) => (
        <g key={row.key}>
          <text
            x={labelX}
            y={row.y}
            textAnchor={rtl ? 'end' : 'start'}
            dominantBaseline="middle"
            fontSize={19}
            className="fill-ink font-body"
          >
            {layerLabels[row.key]}
          </text>
          <line
            x1={leaderFrom}
            y1={row.y}
            x2={leaderTo}
            y2={row.y}
            strokeWidth={1}
            className="stroke-ink/35"
          />
        </g>
      ))}

      <text x={pipeX} y={18} textAnchor="middle" fontSize={17} className="fill-aquifer font-body">
        {dict.pipe}
      </text>

      {/* The water layer and everything the water touches: one fade at the end of the
          pipe-draw animation (§3.6). */}
      <g className="bore-water">
        <rect
          x={0}
          y={WATER_TABLE_Y}
          width={VIEW.width}
          height={122}
          className="fill-groundwater/30"
        />
        <path
          d={`M0 ${WATER_TABLE_Y} q 30 -8 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0`}
          fill="none"
          strokeWidth={2.5}
          className="stroke-groundwater"
        />

        {inflowRows.map((y) => (
          <g key={y} strokeWidth={2} className="stroke-groundwater">
            <path d={`M${pipeStart - 46} ${y} h 34`} />
            <path
              d={`M${pipeStart - 16} ${y - 5} l 5 5 l -5 5`}
              fill="none"
              strokeLinecap="round"
            />
            <path d={`M${pipeEnd + 46} ${y} h -34`} />
            <path d={`M${pipeEnd + 16} ${y - 5} l -5 5 l 5 5`} fill="none" strokeLinecap="round" />
          </g>
        ))}

        {/* Screen: where the filter lets water in */}
        {Array.from({ length: 9 }, (_, index) => 348 + index * 12).map((y) => (
          <line
            key={y}
            x1={pipeStart + 2}
            y1={y}
            x2={pipeEnd - 2}
            y2={y}
            strokeWidth={2}
            className="stroke-brass/70"
          />
        ))}

        {/* Pipe shoe */}
        <path
          d={`M${pipeStart} ${PIPE_BOTTOM} h ${PIPE_HALF_WIDTH * 2} l -6 16 h -14 Z`}
          className="fill-brass"
        />
      </g>

      {/* The two casing walls draw downward together. */}
      <g
        className="bore-pipe stroke-galvanized"
        style={{ '--bore-length': PIPE_LENGTH } as React.CSSProperties}
        strokeWidth={5}
        strokeLinecap="butt"
        fill="none"
      >
        <path d={`M${pipeStart} ${PIPE_TOP} V ${PIPE_BOTTOM}`} />
        <path d={`M${pipeEnd} ${PIPE_TOP} V ${PIPE_BOTTOM}`} />
      </g>
    </svg>
  );
}
