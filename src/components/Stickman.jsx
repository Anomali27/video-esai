import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME } from '../Composition';

/**
 * Stickman Presenter & Character Component
 * Variants:
 * - 'roman'    : Roman Soldier / Commander with plume helmet, cape & spear
 * - 'scholar'  : Guide with round glasses & pointer stick
 * - 'mechanic' : Guide with wrench/gear tool
 * - 'cyber'    : Modern security guide with glowing visor & shield
 * - 'default'  : Expressive presenter stickman with pointer stick
 */
export const Stickman = ({
  variant = 'default',
  pose = 'point', // 'point' | 'wave' | 'celebrate' | 'think'
  label,
  role,
  speech,
  scale = 1,
  flip = false,
  accentColor = THEME.accent,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const isRoman = variant === 'roman';
  const isScholar = variant === 'scholar';
  const isMechanic = variant === 'mechanic';
  const isCyber = variant === 'cyber';
  const displayLabel = label || role;

  const breathY = Math.sin(frame / 8) * 5;
  const capeWave = Math.sin(frame / 6) * 9;
  const armWave = Math.sin(frame / 6) * 12;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        transform: `scale(${scale}) translateY(${breathY}px)`,
        ...style,
      }}
    >
      {/* Optional Floating Speech Bubble Above Stickman Guide */}
      {speech && (
        <div
          style={{
            marginBottom: 14,
            backgroundColor: THEME.primary,
            color: THEME.white,
            padding: '16px 34px',
            borderRadius: 999,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
            boxShadow: '0 14px 32px rgba(23,23,23,0.22)',
            position: 'relative',
          }}
        >
          <span style={{ color: accentColor, marginRight: 10 }}>💬</span>
          {speech}
        </div>
      )}

      <svg
        width="240"
        height="280"
        viewBox="0 0 240 280"
        fill="none"
        style={{
          transform: flip ? 'scaleX(-1)' : undefined,
          overflow: 'visible',
        }}
      >
        {/* Ground Shadow Aura */}
        <ellipse
          cx="120"
          cy="262"
          rx="58"
          ry="11"
          fill={THEME.primary}
          opacity="0.15"
        />

        {/* ROMAN VARIANT ACCESSORIES */}
        {isRoman && (
          <g>
            {/* Roman Spear */}
            <line
              x1="56"
              y1="258"
              x2="42"
              y2="24"
              stroke={THEME.primary}
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <polygon
              points="42,2 30,28 54,28"
              fill={accentColor}
              stroke={THEME.primary}
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Billowing Roman Cape */}
            <path
              d={`M 106 110 C 74 134, ${50 + capeWave} 174, ${
                44 + capeWave
              } 214 L 94 204 Z`}
              fill={accentColor}
              stroke={THEME.primary}
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Sweeping Feather Plume / Helmet Crest */}
            <path
              d="M 68 34 C 84 0, 156 0, 172 34 C 148 24, 92 24, 68 34 Z"
              fill={accentColor}
              stroke={THEME.primary}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M 80 64 C 80 36, 160 36, 160 64 L 168 68 L 72 68 Z"
              fill={THEME.white}
              stroke={THEME.primary}
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Head */}
        <circle
          cx="120"
          cy="78"
          r="29"
          fill={THEME.white}
          stroke={THEME.primary}
          strokeWidth="6"
        />

        {/* SCHOLAR GLASSES */}
        {isScholar && (
          <g>
            <circle
              cx="110"
              cy="76"
              r="9"
              fill="none"
              stroke={accentColor}
              strokeWidth="4"
            />
            <circle
              cx="132"
              cy="76"
              r="9"
              fill="none"
              stroke={accentColor}
              strokeWidth="4"
            />
            <line
              x1="119"
              y1="76"
              x2="123"
              y2="76"
              stroke={accentColor}
              strokeWidth="4"
            />
          </g>
        )}

        {/* CYBER VISOR */}
        {isCyber && (
          <rect
            x="98"
            y="66"
            width="48"
            height="16"
            rx="8"
            fill={accentColor}
            stroke={THEME.primary}
            strokeWidth="3.5"
          />
        )}

        {/* Expressive Eyes & Smile */}
        {!isCyber && (
          <>
            <circle cx="112" cy="75" r="4" fill={THEME.primary} />
            <circle cx="130" cy="75" r="4" fill={THEME.primary} />
          </>
        )}
        <path
          d="M 112 89 Q 121 97 130 89"
          fill="none"
          stroke={THEME.primary}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Helmet Visor Brow */}
        {isRoman && (
          <path
            d="M 78 64 L 162 64"
            stroke={THEME.primary}
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}

        {/* Torso / Spine */}
        <path
          d="M 120 107 Q 122 150 120 192"
          stroke={THEME.primary}
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Roman Cuirass Tunic or Presenter Scarf */}
        {isRoman ? (
          <path
            d="M 96 114 L 144 114 L 138 174 L 102 174 Z"
            fill={THEME.white}
            stroke={THEME.primary}
            strokeWidth="5"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d={`M 106 110 Q 120 122 134 110 L ${146 + capeWave * 0.5} 142 L ${
              128 + capeWave * 0.5
            } 146 Z`}
            fill={accentColor}
            stroke={THEME.primary}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        )}

        {/* Left Arm */}
        <path
          d={
            pose === 'celebrate'
              ? `M 104 120 Q 74 ${95 - armWave} 56 ${70 - armWave}`
              : 'M 104 120 Q 78 140 56 150'
          }
          stroke={THEME.primary}
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Right Arm (Pointing / Waving / Holding Pointer Stick or Wrench) */}
        <path
          d={`M 136 120 Q 168 ${112 + armWave * 0.6} 194 ${
            92 + armWave * 0.6
          }`}
          stroke={THEME.primary}
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Presenter Pointer Baton / Wand in Right Hand */}
        {!isRoman && !isMechanic && (
          <g
            transform={`translate(194, ${92 + armWave * 0.6}) rotate(${
              -28 + armWave * 0.4
            })`}
          >
            <line
              x1="0"
              y1="0"
              x2="48"
              y2="-24"
              stroke={accentColor}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle
              cx="48"
              cy="-24"
              r="9"
              fill={accentColor}
              stroke={THEME.primary}
              strokeWidth="3.5"
            />
          </g>
        )}

        {/* Mechanic Wrench in Right Hand */}
        {isMechanic && (
          <g
            transform={`translate(194, ${92 + armWave * 0.6}) rotate(${
              armWave * 1.2
            })`}
          >
            <line
              x1="0"
              y1="0"
              x2="38"
              y2="-22"
              stroke={THEME.primary}
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle
              cx="42"
              cy="-25"
              r="14"
              fill="none"
              stroke={accentColor}
              strokeWidth="6"
            />
          </g>
        )}

        {/* Left Leg */}
        <path
          d="M 120 192 Q 102 225 88 258"
          stroke={THEME.primary}
          strokeWidth="6.5"
          strokeLinecap="round"
        />

        {/* Right Leg */}
        <path
          d="M 120 192 Q 138 225 152 258"
          stroke={THEME.primary}
          strokeWidth="6.5"
          strokeLinecap="round"
        />
      </svg>

      {displayLabel && (
        <div
          style={{
            marginTop: 6,
            backgroundColor: THEME.primary,
            color: THEME.white,
            borderRadius: 999,
            padding: '10px 32px',
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 1,
            boxShadow: '0 10px 24px rgba(23,23,23,0.18)',
          }}
        >
          {displayLabel}
        </div>
      )}
    </div>
  );
};

export default Stickman;
