import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { pageTurn, mouseClick, whip, whoosh } from '@remotion/sfx';
import { THEME, SAFE_ZONE_STYLE } from '../Composition';
import { Stickman } from '../components/Stickman';

const INK_PARTICLES = [
  { orig: 'P', cipher: '#', x: -340, y: -230, delay: 18, rot: -28 },
  { orig: 'E', cipher: 'Ø', x: -200, y: -320, delay: 22, rot: 22 },
  { orig: 'S', cipher: '7', x: -45, y: -275, delay: 26, rot: -16 },
  { orig: 'A', cipher: 'K', x: 115, y: -335, delay: 30, rot: 25 },
  { orig: 'N', cipher: 'Z', x: 295, y: -245, delay: 34, rot: -20 },
  { orig: 'R', cipher: '∆', x: -290, y: -85, delay: 28, rot: 18 },
  { orig: 'H', cipher: '§', x: 0, y: -125, delay: 32, rot: -14 },
  { orig: 'I', cipher: 'Ø', x: 300, y: -80, delay: 36, rot: 24 },
];

const KINETIC_WORDS = [
  { word: 'GULUNGAN', delay: 46, tilt: -8 },
  { word: 'SURAT', delay: 51, tilt: 6 },
  { word: 'YANG', delay: 56, tilt: -5 },
  { word: 'BERUBAH', delay: 61, tilt: 7 },
  { word: 'JADI', delay: 66, tilt: -6 },
];

export const Opening = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const unrollSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 105 },
  });

  const parchmentHalfH = interpolate(unrollSpring, [0, 1], [28, 320]);
  const floatY = Math.sin(frame / 10) * 10;

  const secretSpring = spring({
    frame: Math.max(0, frame - 72),
    fps,
    config: { damping: 12, stiffness: 130 },
  });
  const brushDash = interpolate(frame, [76, 104], [1020, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(frame, [108, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        color: THEME.primary,
        fontFamily: THEME.fontSans,
        ...SAFE_ZONE_STYLE,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        opacity: fadeOut,
      }}
    >
      {/* Sound Effects */}
      <Sequence from={2}>
        <Audio src={pageTurn} volume={0.24} />
      </Sequence>
      <Sequence from={26}>
        <Audio src={mouseClick} volume={0.2} />
      </Sequence>
      <Sequence from={48}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={76}>
        <Audio src={whip} volume={0.24} />
      </Sequence>

      {/* Large Centered Top Tag */}
      <div
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 42,
          fontWeight: 900,
          letterSpacing: 6,
          color: THEME.accent,
          transform: `translateY(${floatY * 0.5}px)`,
        }}
      >
        ✦ PROLOG KRIPTOGRAFI ✦
      </div>

      {/* Giant Centered SVG Vertical Parchment Scroll + Stickman Guide */}
      <div
        style={{
          position: 'relative',
          width: 980,
          height: 820,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${floatY}px)`,
        }}
      >
        <svg
          width="980"
          height="820"
          viewBox="0 0 980 820"
          style={{ overflow: 'visible' }}
        >
          <circle
            cx="490"
            cy="410"
            r={interpolate(unrollSpring, [0, 1], [90, 400])}
            fill={THEME.accent}
            opacity="0.11"
          />

          <path
            d="M 220 410 C 140 250, 310 135, 490 95 C 660 55, 810 215, 730 410"
            fill="none"
            stroke={THEME.accent}
            strokeWidth="5"
            strokeDasharray="16 14"
            strokeDashoffset={-frame * 3}
            opacity={interpolate(frame, [20, 45], [0, 0.6], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
          />

          {/* Unrolling Parchment Sheet */}
          <path
            d={`
              M 140 ${410 - parchmentHalfH}
              Q 490 ${410 - parchmentHalfH + 22} 840 ${410 - parchmentHalfH}
              C 864 410, 824 410, 840 ${410 + parchmentHalfH}
              Q 490 ${410 + parchmentHalfH - 22} 140 ${410 + parchmentHalfH}
              C 124 410, 158 410, 140 ${410 - parchmentHalfH}
              Z
            `}
            fill="#FFFDF9"
            stroke={THEME.primary}
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Ancient Script Wave Lines on Parchment */}
          {[-140, -60, 20, 100, 180].map((offsetY, i) => {
            if (Math.abs(offsetY) > parchmentHalfH - 55) return null;
            return (
              <path
                key={i}
                d={`M 215 ${410 + offsetY} Q 350 ${392 + offsetY} 490 ${
                  410 + offsetY
                } T 765 ${410 + offsetY}`}
                fill="none"
                stroke={i % 2 === 0 ? THEME.primary : THEME.accent}
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeDasharray="28 14"
                strokeDashoffset={-frame * (i + 1) * 1.3}
                opacity="0.32"
              />
            );
          })}

          {/* Wax Seal in Center of Scroll */}
          <g
            transform={`translate(490, 410) scale(${unrollSpring}) rotate(${
              Math.sin(frame / 12) * 8
            })`}
          >
            <circle
              cx="0"
              cy="0"
              r="78"
              fill={THEME.accent}
              stroke={THEME.primary}
              strokeWidth="6.5"
            />
            <circle
              cx="0"
              cy="0"
              r="56"
              fill="none"
              stroke={THEME.white}
              strokeWidth="3.5"
              strokeDasharray="8 6"
            />
            <text
              x="0"
              y="20"
              textAnchor="middle"
              fontFamily={THEME.fontMono}
              fontSize="60"
              fontWeight="900"
              fill={THEME.white}
            >
              Ø
            </text>
          </g>

          {/* Top Wooden Cylindrical Roller */}
          <g transform={`translate(0, ${410 - parchmentHalfH - 26})`}>
            <rect
              x="75"
              y="0"
              width="830"
              height="52"
              rx="26"
              fill={THEME.primary}
            />
            <rect
              x="108"
              y="8"
              width="764"
              height="36"
              rx="18"
              fill={THEME.accent}
            />
            <circle
              cx="88"
              cy="26"
              r="22"
              fill={THEME.white}
              stroke={THEME.primary}
              strokeWidth="6"
            />
            <circle
              cx="892"
              cy="26"
              r="22"
              fill={THEME.white}
              stroke={THEME.primary}
              strokeWidth="6"
            />
          </g>

          {/* Bottom Wooden Cylindrical Roller */}
          <g transform={`translate(0, ${410 + parchmentHalfH - 26})`}>
            <rect
              x="75"
              y="0"
              width="830"
              height="52"
              rx="26"
              fill={THEME.primary}
            />
            <rect
              x="108"
              y="8"
              width="764"
              height="36"
              rx="18"
              fill={THEME.accent}
            />
            <circle
              cx="88"
              cy="26"
              r="22"
              fill={THEME.white}
              stroke={THEME.primary}
              strokeWidth="6"
            />
            <circle
              cx="892"
              cy="26"
              r="22"
              fill={THEME.white}
              stroke={THEME.primary}
              strokeWidth="6"
            />
          </g>
        </svg>

        {/* Floating Ink Particles Rising Out of the Parchment */}
        {INK_PARTICLES.map((p, idx) => {
          const pProgress = interpolate(
            frame,
            [p.delay, p.delay + 42],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const curX = interpolate(pProgress, [0, 1], [0, p.x]);
          const curY =
            interpolate(pProgress, [0, 1], [0, p.y]) +
            Math.sin((frame + idx * 9) / 8) * 12;
          const spinDeg = interpolate(pProgress, [0, 1], [0, 360 + p.rot]);
          const isMorphed = pProgress > 0.48;

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                opacity: interpolate(pProgress, [0, 0.15, 1], [0, 1, 1]),
                transform: `translate(${curX - 42}px, ${
                  curY - 42
                }px) rotate(${spinDeg}deg) scale(${interpolate(
                  pProgress,
                  [0, 0.5, 1],
                  [0.3, 1.35, 1.18]
                )})`,
                fontFamily: THEME.fontMono,
                fontSize: isMorphed ? 92 : 76,
                fontWeight: 900,
                color: isMorphed ? THEME.accent : THEME.primary,
                textShadow: isMorphed
                  ? '0 14px 36px rgba(249, 115, 22, 0.45)'
                  : 'none',
              }}
            >
              {isMorphed ? p.cipher : p.orig}
            </div>
          );
        })}

        {/* Stickman Scholar Guide Presenting the Scroll */}
        <div
          style={{
            position: 'absolute',
            left: 16,
            bottom: -36,
            zIndex: 8,
          }}
        >
          <Stickman
            variant="scholar"
            label="Pemandu"
            speech="Mari bongkar rahasia kode!"
            scale={1.12}
          />
        </div>
      </div>

      {/* Huge Centered Kinetic Editorial Typography */}
      <div
        style={{
          marginTop: 18,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '14px 26px',
            maxWidth: 980,
          }}
        >
          {KINETIC_WORDS.map((item) => {
            const wSpring = spring({
              frame: Math.max(0, frame - item.delay),
              fps,
              config: { damping: 11, stiffness: 140 },
            });
            const tilt = interpolate(wSpring, [0, 1], [item.tilt * 2.5, 0]);
            const yShift = interpolate(wSpring, [0, 1], [60, 0]);

            return (
              <span
                key={item.word}
                style={{
                  display: 'inline-block',
                  fontSize: 78,
                  fontWeight: 900,
                  letterSpacing: -1.5,
                  lineHeight: 1.08,
                  opacity: interpolate(
                    frame,
                    [item.delay, item.delay + 6],
                    [0, 1],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                  ),
                  transform: `translateY(${yShift}px) rotate(${tilt}deg) scale(${wSpring})`,
                }}
              >
                {item.word}
              </span>
            );
          })}
        </div>

        {/* Highlighted "KODE RAHASIA" Encircled by Dynamic Orange Brush Stroke SVG */}
        <div
          style={{
            position: 'relative',
            marginTop: 24,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px 56px',
            transform: `scale(${secretSpring}) rotate(${interpolate(
              secretSpring,
              [0, 1],
              [-10, -2]
            )}deg)`,
          }}
        >
          <span
            style={{
              fontSize: 90,
              fontWeight: 900,
              color: THEME.accent,
              letterSpacing: 2,
              zIndex: 2,
            }}
          >
            KODE RAHASIA
          </span>

          <svg
            width="780"
            height="168"
            viewBox="0 0 680 150"
            style={{
              position: 'absolute',
              inset: -12,
              overflow: 'visible',
              pointerEvents: 'none',
            }}
          >
            <path
              d="M 42 78 C 35 22, 635 14, 646 74 C 655 132, 58 142, 32 72 C 24 44, 180 18, 340 22"
              fill="none"
              stroke={THEME.accent}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="1020"
              strokeDashoffset={brushDash}
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Opening;
