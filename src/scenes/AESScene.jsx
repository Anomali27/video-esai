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
import { whoosh, uiSwitch, mouseClick, ding, shutterModern } from '@remotion/sfx';
import { THEME, SAFE_ZONE_STYLE } from '../Composition';
import { MemberVideo } from '../components/MemberVideo';
import { Stickman } from '../components/Stickman';

const HEX_STREAMS = [
  '9F 86 D0 81 88 4C',
  '7D 65 9A 2F E4 1B',
  '3C A0 F5 09 B8 72',
];

const CONSTELLATION_NODES = [
  { label: 'Cloud Storage', angle: -45, dist: 345, icon: 'cloud' },
  { label: 'Chat Terenkripsi', angle: 45, dist: 345, icon: 'chat' },
  { label: 'Mobile Banking', angle: 135, dist: 345, icon: 'bank' },
  { label: 'Server Data', angle: 225, dist: 345, icon: 'server' },
];

const hexPoints = (radius) =>
  Array.from({ length: 6 })
    .map((_, i) => {
      const rad = ((i * 60 - 30) * Math.PI) / 180;
      return `${Math.cos(rad) * radius},${Math.sin(rad) * radius}`;
    })
    .join(' ');

export const AESScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floatY = Math.sin(frame / 10) * 8;

  // Section 1: Frame 126 - 430
  const inSec1 = frame >= 126 && frame <= 430;
  const sec1Opacity = interpolate(
    frame,
    [126, 140, 415, 430],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Section 2: Frame 431 - 814
  const inSec2 = frame >= 431 && frame <= 814;
  const sec2Opacity = interpolate(
    frame,
    [431, 445, 800, 814],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const shockwaveT = interpolate(frame, [490, 560], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const isUnlocked = frame >= 505;

  // Section 3: Frame 921 - 1032
  const inSec3 = frame >= 921 && frame <= 1032;
  const sec3Opacity = interpolate(
    frame,
    [921, 934, 1020, 1032],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const morphT = interpolate(frame, [940, 995], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        color: THEME.primary,
        fontFamily: THEME.fontSans,
      }}
    >
      {/* Sound Effects */}
      <Sequence from={126}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={210}>
        <Audio src={uiSwitch} volume={0.2} />
      </Sequence>
      <Sequence from={310}>
        <Audio src={ding} volume={0.22} />
      </Sequence>
      <Sequence from={431}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={495}>
        <Audio src={ding} volume={0.24} />
      </Sequence>
      {[0, 1, 2, 3].map((i) => (
        <Sequence key={i} from={540 + i * 16}>
          <Audio src={mouseClick} volume={0.18} />
        </Sequence>
      ))}
      <Sequence from={921}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={965}>
        <Audio src={shutterModern} volume={0.22} />
      </Sequence>

      {/* =====================================================================
          FRAME 126 - 430: DATA STREAM INTO SPINNING HEXAGONAL AES CORE
         ===================================================================== */}
      {inSec1 && (
        <div
          style={{
            opacity: sec1Opacity,
            ...SAFE_ZONE_STYLE,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Huge Centered Editorial Title */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
              transform: `translateY(${floatY * 0.5}px)`,
            }}
          >
            <div
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 40,
                fontWeight: 900,
                color: THEME.accent,
                letterSpacing: 5,
              }}
            >
              04 • AES ENCRYPTION
            </div>
            <div
              style={{
                fontSize: 68,
                fontWeight: 900,
                marginTop: 8,
                lineHeight: 1.12,
              }}
            >
              Inti Perisai Heksagon &amp; Aliran Data
            </div>
          </div>

          {/* Giant 980px Centered SVG Illustration */}
          <svg
            width="980"
            height="1120"
            viewBox="0 0 980 1120"
            style={{ overflow: 'visible' }}
          >
            {/* Top-Left Floating Paper Document SVG */}
            <g
              transform={`translate(220, ${
                165 + Math.sin(frame / 9) * 12
              }) rotate(-8)`}
            >
              <path
                d="M -78 -100 L 45 -100 L 78 -65 L 78 100 L -78 100 Z"
                fill="#FFFDF9"
                stroke={THEME.primary}
                strokeWidth="6"
                strokeLinejoin="round"
              />
              <path
                d="M 45 -100 L 45 -65 L 78 -65"
                fill="none"
                stroke={THEME.primary}
                strokeWidth="6"
              />
              <line
                x1="-46"
                y1="-32"
                x2="46"
                y2="-32"
                stroke={THEME.primary}
                strokeWidth="6"
                strokeLinecap="round"
              />
              <line
                x1="-46"
                y1="6"
                x2="46"
                y2="6"
                stroke={THEME.accent}
                strokeWidth="6"
                strokeLinecap="round"
              />
              <line
                x1="-46"
                y1="44"
                x2="20"
                y2="44"
                stroke={THEME.primary}
                strokeWidth="6"
                strokeLinecap="round"
              />
              <text
                x="0"
                y="156"
                textAnchor="middle"
                fontFamily={THEME.fontSans}
                fontSize="38"
                fontWeight="900"
                fill={THEME.primary}
              >
                Dokumen Plaintext
              </text>
            </g>

            {/* Top-Right Floating Golden/Orange Key SVG */}
            <g
              transform={`translate(760, ${
                165 + Math.cos(frame / 9) * 12
              }) rotate(10)`}
            >
              <circle
                cx="-40"
                cy="0"
                r="44"
                fill={THEME.accent}
                stroke={THEME.primary}
                strokeWidth="6"
              />
              <circle
                cx="-40"
                cy="0"
                r="16"
                fill={THEME.bg}
                stroke={THEME.primary}
                strokeWidth="4.5"
              />
              <path
                d="M 4 0 L 98 0 L 98 32 M 64 0 L 64 28"
                fill="none"
                stroke={THEME.primary}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <text
                x="12"
                y="156"
                textAnchor="middle"
                fontFamily={THEME.fontSans}
                fontSize="38"
                fontWeight="900"
                fill={THEME.accent}
              >
                Secret Key 256-Bit
              </text>
            </g>

            {/* Bezier Particle Data Streams Spiraling Into Center AES Core (490, 560) */}
            <path
              d="M 220 250 C 240 410, 390 450, 490 560"
              fill="none"
              stroke={THEME.primary}
              strokeWidth="5.5"
              strokeDasharray="14 16"
              strokeDashoffset={-frame * 6}
            />
            <path
              d="M 760 250 C 740 410, 590 450, 490 560"
              fill="none"
              stroke={THEME.accent}
              strokeWidth="6.5"
              strokeDasharray="16 14"
              strokeDashoffset={-frame * 6}
            />

            {[0, 0.25, 0.5, 0.75].map((offset, i) => {
              const t = (frame / 36 + offset) % 1;
              const lx = interpolate(t, [0, 1], [220, 490]);
              const ly =
                interpolate(t, [0, 1], [250, 560]) +
                Math.sin(t * Math.PI) * 45;
              const rx = interpolate(t, [0, 1], [760, 490]);
              const ry =
                interpolate(t, [0, 1], [250, 560]) +
                Math.sin(t * Math.PI) * 45;

              return (
                <g key={i}>
                  <circle cx={lx} cy={ly} r="11" fill={THEME.primary} />
                  <circle cx={rx} cy={ry} r="12" fill={THEME.accent} />
                </g>
              );
            })}

            {/* Center Spinning Geometric Hexagonal AES Core */}
            <g transform="translate(490, 560)">
              <circle
                cx="0"
                cy="0"
                r="225"
                fill="none"
                stroke={THEME.accent}
                strokeWidth="4.5"
                strokeDasharray="28 16"
                transform={`rotate(${-frame * 0.8})`}
              />
              <polygon
                points={hexPoints(188)}
                fill="#FFFDF9"
                stroke={THEME.primary}
                strokeWidth="6.5"
                transform={`rotate(${frame * 0.9})`}
              />
              <polygon
                points={hexPoints(138)}
                fill="none"
                stroke={THEME.accent}
                strokeWidth="5.5"
                transform={`rotate(${-frame * 1.3})`}
              />
              <polygon
                points={hexPoints(94)}
                fill={THEME.primary}
                stroke={THEME.accent}
                strokeWidth="5"
              />
              <text
                x="0"
                y="16"
                textAnchor="middle"
                fontFamily={THEME.fontMono}
                fontSize="48"
                fontWeight="900"
                fill={THEME.white}
              >
                AES
              </text>
            </g>

            {/* Outgoing Hexadecimal Shield Streams Below Core */}
            {[-210, 0, 210].map((dx, i) => (
              <path
                key={i}
                d={`M 490 750 Q ${490 + dx * 0.6} 850 ${490 + dx} 930`}
                fill="none"
                stroke={THEME.accent}
                strokeWidth="5"
                strokeDasharray="12 12"
                strokeDashoffset={-frame * 5}
              />
            ))}

            {/* Multi-Layered Hexadecimal Protective Shield Arcs */}
            {HEX_STREAMS.map((hexLine, idx) => {
              const y = 965 + idx * 68;
              const waveX = Math.sin(frame / 10 + idx * 1.3) * 14;
              return (
                <g key={idx} transform={`translate(${490 + waveX}, ${y})`}>
                  <path
                    d={`M ${-270 - idx * 28} -18 Q 0 24 ${
                      270 + idx * 28
                    } -18`}
                    fill="none"
                    stroke={THEME.accent}
                    strokeWidth="4.5"
                    opacity="0.35"
                  />
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fontFamily={THEME.fontMono}
                    fontSize="48"
                    fontWeight="900"
                    fill={idx === 0 ? THEME.accent : THEME.primary}
                    letterSpacing="6"
                  >
                    {hexLine}
                  </text>
                </g>
              );
            })}
          </svg>

          <Stickman
            variant="cyber"
            label="Agen Siber AES"
            speech="Dokumen + Kunci 256-Bit diacak menjadi kode heksadesimal!"
            scale={1.12}
          />
        </div>
      )}

      {/* =====================================================================
          FRAME 431 - 814: KEY UNLOCK SHOCKWAVE & ORBITING DIGITAL CONSTELLATION
         ===================================================================== */}
      {inSec2 && (
        <div
          style={{
            opacity: sec2Opacity,
            ...SAFE_ZONE_STYLE,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
              transform: `translateY(${floatY * 0.5}px)`,
            }}
          >
            <div
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 40,
                fontWeight: 900,
                color: THEME.accent,
                letterSpacing: 3,
              }}
            >
              PEMBUKAAN KUNCI &amp; KONSTELASI DIGITAL
            </div>
            <div style={{ fontSize: 66, fontWeight: 900, marginTop: 10 }}>
              Melindungi Seluruh Ekosistem Modern
            </div>
          </div>

          <svg
            width="980"
            height="1020"
            viewBox="-490 -510 980 1020"
            style={{ overflow: 'visible' }}
          >
            {shockwaveT > 0 && shockwaveT < 1 && (
              <circle
                cx="0"
                cy="0"
                r={interpolate(shockwaveT, [0, 1], [80, 470])}
                fill="none"
                stroke={THEME.accent}
                strokeWidth={interpolate(shockwaveT, [0, 1], [16, 1])}
                opacity={interpolate(shockwaveT, [0, 1], [0.9, 0])}
              />
            )}

            {/* Orbital Constellation Ring */}
            <circle
              cx="0"
              cy="0"
              r="345"
              fill="none"
              stroke={THEME.primary}
              strokeWidth="3.5"
              strokeDasharray="14 14"
              opacity="0.3"
            />

            {/* 4 Orbiting Digital World Constellation Nodes */}
            {CONSTELLATION_NODES.map((node, idx) => {
              const nodeAppear = spring({
                frame: Math.max(0, frame - (530 + idx * 15)),
                fps,
                config: { damping: 12, stiffness: 120 },
              });
              const curAngle = node.angle + frame * 0.22;
              const rad = (curAngle * Math.PI) / 180;
              const nx = Math.cos(rad) * node.dist;
              const ny = Math.sin(rad) * node.dist;

              return (
                <g key={node.label} opacity={nodeAppear}>
                  <line
                    x1="0"
                    y1="0"
                    x2={nx}
                    y2={ny}
                    stroke={THEME.accent}
                    strokeWidth="4.5"
                    strokeDasharray="10 10"
                    strokeDashoffset={-frame * 3}
                  />

                  <g
                    transform={`translate(${nx}, ${ny}) scale(${nodeAppear})`}
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r="86"
                      fill="#FFFDF9"
                      stroke={THEME.primary}
                      strokeWidth="6"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="70"
                      fill="none"
                      stroke={THEME.accent}
                      strokeWidth="3.5"
                      strokeDasharray="8 6"
                    />

                    {node.icon === 'cloud' && (
                      <path
                        d="M -32 14 A 20 20 0 0 1 -22 -22 A 28 28 0 0 1 26 -18 A 18 18 0 0 1 32 14 Z"
                        fill={THEME.accent}
                        stroke={THEME.primary}
                        strokeWidth="4.5"
                      />
                    )}
                    {node.icon === 'chat' && (
                      <path
                        d="M -30 -20 H 30 A 12 12 0 0 1 42 -8 V 14 A 12 12 0 0 1 30 26 H -6 L -28 40 V 26 H -30 A 12 12 0 0 1 -42 14 V -8 A 12 12 0 0 1 -30 -20 Z"
                        fill={THEME.accent}
                        stroke={THEME.primary}
                        strokeWidth="4.5"
                      />
                    )}
                    {node.icon === 'bank' && (
                      <path
                        d="M 0 -36 L 38 0 V 30 C 38 42, 0 50, 0 50 C 0 50, -38 42, -38 30 V 0 Z"
                        fill={THEME.accent}
                        stroke={THEME.primary}
                        strokeWidth="4.5"
                      />
                    )}
                    {node.icon === 'server' && (
                      <g>
                        <rect
                          x="-32"
                          y="-26"
                          width="64"
                          height="20"
                          rx="5"
                          fill={THEME.accent}
                          stroke={THEME.primary}
                          strokeWidth="4"
                        />
                        <rect
                          x="-32"
                          y="6"
                          width="64"
                          height="20"
                          rx="5"
                          fill={THEME.white}
                          stroke={THEME.primary}
                          strokeWidth="4"
                        />
                      </g>
                    )}

                    <text
                      x="0"
                      y="132"
                      textAnchor="middle"
                      fontFamily={THEME.fontSans}
                      fontSize="36"
                      fontWeight="900"
                      fill={THEME.primary}
                    >
                      {node.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Center Hexagon Unlocking into Restored Document */}
            <g>
              <polygon
                points={hexPoints(isUnlocked ? 165 : 145)}
                fill="#FFFDF9"
                stroke={THEME.accent}
                strokeWidth="6.5"
                transform={`rotate(${frame * 0.6})`}
              />
              <path
                d="M -52 -68 L 30 -68 L 52 -46 L 52 68 L -52 68 Z"
                fill={isUnlocked ? THEME.white : THEME.bg}
                stroke={THEME.primary}
                strokeWidth="5.5"
              />
              <line
                x1="-30"
                y1="-18"
                x2="30"
                y2="-18"
                stroke={THEME.accent}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <line
                x1="-30"
                y1="12"
                x2="30"
                y2="12"
                stroke={THEME.primary}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <line
                x1="-30"
                y1="40"
                x2="12"
                y2="40"
                stroke={THEME.primary}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            </g>
          </svg>

          <Stickman
            variant="cyber"
            pose="celebrate"
            label="Keamanan Modern"
            speech="Kunci yang sama membuka kembali dokumen dengan aman!"
            scale={1.12}
          />
        </div>
      )}

      {/* =====================================================================
          FRAME 921 - 1032: HISTORICAL MORPHOSIS (SCROLL -> DIGITAL SHIELD)
         ===================================================================== */}
      {inSec3 && (
        <div
          style={{
            opacity: sec3Opacity,
            ...SAFE_ZONE_STYLE,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <div
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 40,
                fontWeight: 900,
                color: THEME.accent,
                letterSpacing: 4,
              }}
            >
              MORFOSIS LINTAS ZAMAN
            </div>
            <div style={{ fontSize: 68, fontWeight: 900, marginTop: 10 }}>
              Gulungan Surat ➔ Perisai Digital Modern
            </div>
          </div>

          <svg
            width="780"
            height="780"
            viewBox="-390 -390 780 780"
            style={{ overflow: 'visible' }}
          >
            <g
              transform={`rotate(${interpolate(
                morphT,
                [0, 1],
                [0, 360]
              )})`}
            >
              {/* Ancient Scroll Strokes Fading Out */}
              <g
                opacity={interpolate(morphT, [0, 0.55], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}
                transform={`scale(${interpolate(morphT, [0, 0.6], [1, 0.4])})`}
              >
                <rect
                  x="-190"
                  y="-230"
                  width="380"
                  height="460"
                  rx="26"
                  fill="#FFFDF9"
                  stroke={THEME.primary}
                  strokeWidth="6.5"
                />
                <rect
                  x="-230"
                  y="-250"
                  width="460"
                  height="40"
                  rx="20"
                  fill={THEME.accent}
                  stroke={THEME.primary}
                  strokeWidth="5.5"
                />
                <rect
                  x="-230"
                  y="210"
                  width="460"
                  height="40"
                  rx="20"
                  fill={THEME.accent}
                  stroke={THEME.primary}
                  strokeWidth="5.5"
                />
              </g>

              {/* Modern Digital Hexagonal Shield Morphing In */}
              <g
                opacity={interpolate(morphT, [0.35, 0.85], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}
                transform={`scale(${interpolate(morphT, [0.35, 1], [0.4, 1])})`}
              >
                <polygon
                  points={hexPoints(270)}
                  fill="#FFFDF9"
                  stroke={THEME.primary}
                  strokeWidth="6.5"
                />
                <path
                  d="M 0 -185 L 150 -95 V 55 C 150 150, 0 205, 0 205 C 0 205, -150 150, -150 55 V -95 Z"
                  fill={THEME.accent}
                  stroke={THEME.primary}
                  strokeWidth="6.5"
                  strokeLinejoin="round"
                />
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fontFamily={THEME.fontMono}
                  fontSize="68"
                  fontWeight="900"
                  fill={THEME.white}
                >
                  AES
                </text>
              </g>
            </g>
          </svg>

          {/* Roman Messenger & Modern Cyber Stickman Together */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Stickman variant="roman" label="Era Kuno" scale={1.1} />
            <div
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 48,
                fontWeight: 900,
                color: THEME.accent,
              }}
            >
              ➔ EVOLUSI ➔
            </div>
            <Stickman
              variant="cyber"
              label="Era Digital"
              flip
              scale={1.1}
            />
          </div>
        </div>
      )}

      {/* Member Video (100% Untouched Timing) */}
      <MemberVideo
        src="assets/videos/04_Vido.mp4"
        startFromFrame={24}
        endAtFrame={1056}
        memberName="Vido"
        topicTag="04 / AES ENCRYPTION"
        showFaceRanges={[
          [0, 125],
          [815, 920],
        ]}
      />
    </AbsoluteFill>
  );
};

export default AESScene;
