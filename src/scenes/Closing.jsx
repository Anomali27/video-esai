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
import { whoosh, mouseClick, ding } from '@remotion/sfx';
import { THEME, SAFE_ZONE_STYLE } from '../Composition';
import { Stickman } from '../components/Stickman';

const MILESTONE_NODES = [
  {
    id: '01',
    title: 'Caesar Cipher',
    sub: 'Roda Geser (+3) • HELLO ➔ KHOOR',
    x: 150,
    y: 160,
    align: 'right',
    delay: 10,
  },
  {
    id: '02',
    title: 'Atbash Cipher',
    sub: 'Cermin Simetris (A↔Z) • SVOOL',
    x: 830,
    y: 410,
    align: 'left',
    delay: 26,
  },
  {
    id: '03',
    title: 'Vigenère Cipher',
    sub: 'Roda Gigi Kata Kunci (KEY) • RIJVS',
    x: 150,
    y: 660,
    align: 'right',
    delay: 42,
  },
  {
    id: '04',
    title: 'AES Modern',
    sub: 'Perisai Heksagon 256-Bit Digital',
    x: 830,
    y: 910,
    align: 'left',
    delay: 58,
  },
];

export const Closing = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floatY = Math.sin(frame / 10) * 6;

  const riverDraw = interpolate(frame, [0, 85], [2400, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const deltaSpring = spring({
    frame: Math.max(0, frame - 74),
    fps,
    config: { damping: 12, stiffness: 120 },
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
        justifyContent: 'space-between',
      }}
    >
      {/* Sound Effects */}
      <Sequence from={1}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      {MILESTONE_NODES.map((n) => (
        <Sequence key={n.id} from={n.delay}>
          <Audio src={mouseClick} volume={0.2} />
        </Sequence>
      ))}
      <Sequence from={74}>
        <Audio src={ding} volume={0.24} />
      </Sequence>

      {/* Huge Centered Top Editorial Title */}
      <div
        style={{
          textAlign: 'center',
          transform: `translateY(${floatY * 0.5}px)`,
        }}
      >
        <div
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 38,
            fontWeight: 900,
            color: THEME.accent,
            letterSpacing: 6,
          }}
        >
          ✦ JEJAK PERJALANAN WAKTU ✦
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 900,
            marginTop: 10,
            letterSpacing: -1.5,
          }}
        >
          Aliran Evolusi Kriptografi
        </div>
      </div>

      {/* Giant 980px Centered Winding Timeline River Path SVG & 4 Milestone Nodes */}
      <svg
        width="980"
        height="1040"
        viewBox="0 0 980 1040"
        style={{ overflow: 'visible' }}
      >
        {/* Soft River Glow Bed */}
        <path
          d="M 490 30 C 80 80, 80 240, 490 295 C 900 350, 900 490, 490 545 C 80 600, 80 740, 490 795 C 900 850, 900 960, 490 1020"
          fill="none"
          stroke={THEME.accent}
          strokeWidth="32"
          strokeLinecap="round"
          opacity="0.16"
        />

        {/* Animated Main Winding River Stroke */}
        <path
          d="M 490 30 C 80 80, 80 240, 490 295 C 900 350, 900 490, 490 545 C 80 600, 80 740, 490 795 C 900 850, 900 960, 490 1020"
          fill="none"
          stroke={THEME.primary}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="2400"
          strokeDashoffset={riverDraw}
        />

        {/* Continuous Flowing Water Current Dashes */}
        <path
          d="M 490 30 C 80 80, 80 240, 490 295 C 900 350, 900 490, 490 545 C 80 600, 80 740, 490 795 C 900 850, 900 960, 490 1020"
          fill="none"
          stroke={THEME.accent}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeDasharray="20 22"
          strokeDashoffset={-frame * 5}
        />

        {/* 4 Milestone Nodes Along the Winding River */}
        {MILESTONE_NODES.map((node, idx) => {
          const nodeSpring = spring({
            frame: Math.max(0, frame - node.delay),
            fps,
            config: { damping: 11, stiffness: 130 },
          });
          const pulseR = 72 + Math.sin(frame / 8 + idx) * 6;
          const isRight = node.align === 'right';
          const textX = isRight ? node.x + 96 : node.x - 96;
          const anchor = isRight ? 'start' : 'end';

          return (
            <g
              key={node.id}
              transform={`translate(0, ${Math.sin(frame / 10 + idx) * 5})`}
              opacity={interpolate(
                frame,
                [node.delay, node.delay + 10],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={pulseR}
                fill={THEME.accent}
                opacity="0.2"
              />

              <g
                transform={`translate(${node.x}, ${node.y}) scale(${nodeSpring})`}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="60"
                  fill="#FFFDF9"
                  stroke={THEME.primary}
                  strokeWidth="6"
                />
                <circle cx="0" cy="0" r="46" fill={THEME.accent} />
                <text
                  x="0"
                  y="14"
                  textAnchor="middle"
                  fontFamily={THEME.fontMono}
                  fontSize="40"
                  fontWeight="900"
                  fill={THEME.white}
                >
                  {node.id}
                </text>
              </g>

              {/* Huge Floating Organic Typography Next to Node */}
              <text
                x={textX}
                y={node.y - 6}
                textAnchor={anchor}
                fontFamily={THEME.fontSans}
                fontSize="58"
                fontWeight="900"
                fill={THEME.primary}
              >
                {node.title}
              </text>
              <text
                x={textX}
                y={node.y + 42}
                textAnchor={anchor}
                fontFamily={THEME.fontMono}
                fontSize="34"
                fontWeight="900"
                fill={THEME.secondary}
              >
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* River Delta Conclusion Typography + Celebrating Stickman at Bottom */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          opacity: interpolate(frame, [74, 90], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          transform: `scale(${deltaSpring}) translateY(${floatY}px)`,
        }}
      >
        <Stickman variant="scholar" pose="celebrate" scale={0.95} />

        <div style={{ textAlign: 'left', maxWidth: 680 }}>
          <div
            style={{
              fontFamily: THEME.fontMono,
              fontSize: 32,
              fontWeight: 900,
              color: THEME.accent,
              letterSpacing: 4,
              marginBottom: 8,
            }}
          >
            MUARA KESIMPULAN KRIPTOGRAFI
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.22,
              letterSpacing: -0.5,
            }}
          >
            Menjaga{' '}
            <span
              style={{
                color: THEME.accent,
                textDecoration: 'underline',
                textDecorationThickness: 6,
                textUnderlineOffset: 8,
              }}
            >
              Kerahasiaan Informasi
            </span>{' '}
            dari Era Kuno hingga Digital
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Closing;
