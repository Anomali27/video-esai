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
import { whoosh, uiSwitch, mouseClick, ding } from '@remotion/sfx';
import { THEME, SAFE_ZONE_STYLE } from '../Composition';
import { MemberVideo } from '../components/MemberVideo';
import { Stickman } from '../components/Stickman';

const TOP_MIRROR = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'Z'];
const BOT_MIRROR = ['Z', 'Y', 'X', 'W', 'V', 'S', 'O', 'N', 'A'];
const PLAIN_CHARS = 'HELLO WORLD'.split('');
const ATBASH_CHARS = 'SVOOL DLIOW'.split('');

export const AtbashScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const waveY = Math.sin(frame / 10) * 8;

  // Section 1: Frame 121 - 355
  const inSec1 = frame >= 121 && frame <= 355;
  const sec1Opacity = interpolate(
    frame,
    [121, 136, 342, 355],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Section 2: Frame 356 - 605
  const inSec2 = frame >= 356 && frame <= 605;
  const sec2Opacity = interpolate(
    frame,
    [356, 370, 592, 605],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Section 3: Frame 606 - 774
  const inSec3 = frame >= 606 && frame <= 774;
  const sec3Opacity = interpolate(
    frame,
    [606, 620, 760, 774],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const pendulumSpring = spring({
    frame: Math.max(0, frame - 645),
    fps,
    config: { damping: 12, stiffness: 90 },
  });
  const pendulumDeg = interpolate(pendulumSpring, [0, 1], [0, 180]);
  const slashDash = interpolate(frame, [675, 710], [220, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  let nonSpaceOrder = 0;

  return (
    <AbsoluteFill
      style={{
        color: THEME.primary,
        fontFamily: THEME.fontSans,
      }}
    >
      {/* Sound Effects */}
      <Sequence from={121}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={155}>
        <Audio src={uiSwitch} volume={0.2} />
      </Sequence>
      <Sequence from={356}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <Sequence key={i} from={380 + i * 19}>
          <Audio src={mouseClick} volume={0.18} />
        </Sequence>
      ))}
      <Sequence from={606}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={645}>
        <Audio src={uiSwitch} volume={0.24} />
      </Sequence>
      <Sequence from={700}>
        <Audio src={ding} volume={0.22} />
      </Sequence>

      {/* =====================================================================
          FRAME 121 - 355: LIQUID MIRROR HORIZON & DNA S-CURVE STRANDS
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
          {/* Huge Centered Editorial Heading */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 24,
              transform: `translateY(${waveY * 0.6}px)`,
            }}
          >
            <div
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 40,
                fontWeight: 900,
                letterSpacing: 5,
                color: THEME.accent,
              }}
            >
              02 • ATBASH CIPHER
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                letterSpacing: -1.5,
                marginTop: 10,
                lineHeight: 1.1,
              }}
            >
              Pantulan Cermin Alfabet (A ↔ Z)
            </div>
          </div>

          {/* Giant 980px Centered DNA S-Curve Strands & Glowing Mirror Line */}
          <svg
            width="980"
            height="860"
            viewBox="0 0 980 860"
            style={{ overflow: 'visible' }}
          >
            <ellipse
              cx="490"
              cy="430"
              rx="475"
              ry="22"
              fill={THEME.accent}
              opacity="0.16"
            />
            <line
              x1="15"
              y1="430"
              x2="965"
              y2="430"
              stroke={THEME.accent}
              strokeWidth="7.5"
              strokeLinecap="round"
            />

            {TOP_MIRROR.map((topChar, idx) => {
              const x = 58 + idx * 108;
              const botChar = BOT_MIRROR[idx];
              const isPrimary = idx < 3;
              const floatOffset = Math.sin(frame / 9 + idx * 0.9) * 10;
              const curveSwing = Math.sin(frame / 11 + idx) * 36;

              const t = (Math.sin(frame / 12 + idx * 0.8) + 1) / 2;
              const particleY = interpolate(t, [0, 1], [150, 710]);
              const particleX =
                x + Math.sin(t * Math.PI * 2) * (curveSwing * 0.65);

              return (
                <g key={idx}>
                  <path
                    d={`M ${x} 145 C ${x + curveSwing} 285, ${
                      x - curveSwing
                    } 575, ${x} 715`}
                    fill="none"
                    stroke={isPrimary ? THEME.accent : THEME.primary}
                    strokeWidth={isPrimary ? '6.5' : '4'}
                    strokeDasharray={isPrimary ? undefined : '10 10'}
                    opacity={isPrimary ? 0.95 : 0.4}
                  />

                  <circle
                    cx={particleX}
                    cy={particleY}
                    r={isPrimary ? 14 : 9}
                    fill={THEME.accent}
                  />

                  {/* Top Floating Letter (Normal A-Z) */}
                  <text
                    x={x}
                    y={108 + floatOffset}
                    textAnchor="middle"
                    fontFamily={THEME.fontMono}
                    fontSize={isPrimary ? '86' : '68'}
                    fontWeight="900"
                    fill={isPrimary ? THEME.accent : THEME.primary}
                  >
                    {topChar}
                  </text>

                  {/* Bottom Reflected Letter (Inverted Z-A) */}
                  <text
                    x={x}
                    y={800 - floatOffset}
                    textAnchor="middle"
                    fontFamily={THEME.fontMono}
                    fontSize={isPrimary ? '86' : '68'}
                    fontWeight="900"
                    fill={isPrimary ? THEME.primary : THEME.secondary}
                    opacity="0.92"
                  >
                    {botChar}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Stickman Guide Explaining Mirror Principle */}
          <Stickman
            variant="scholar"
            label="Pemandu Atbash"
            speech="A ditukar Z, B ditukar Y seperti cermin!"
            scale={1.15}
          />
        </div>
      )}

      {/* =====================================================================
          FRAME 356 - 605: LIQUID MIRROR DIVE (HELLO WORLD -> SVOOL DLIOW)
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
              marginTop: 28,
              transform: `translateY(${waveY * 0.5}px)`,
            }}
          >
            <div
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 40,
                fontWeight: 900,
                color: THEME.accent,
                letterSpacing: 4,
              }}
            >
              MENYELAM MENEMBUS GARIS CERMIN
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                marginTop: 12,
              }}
            >
              HELLO WORLD ➔ SVOOL DLIOW
            </div>
          </div>

          {/* Centered Mirror Horizon + Diving Characters + Water Ripples */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 640,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Glowing Horizontal Mirror Surface */}
            <div
              style={{
                position: 'absolute',
                left: 16,
                right: 16,
                top: '50%',
                height: 8,
                backgroundColor: THEME.accent,
                boxShadow: '0 0 38px rgba(249, 115, 22, 0.75)',
                borderRadius: 999,
              }}
            />

            {/* Single-Line Characters Diving Across Mirror (Huge 88px Font!) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                width: '100%',
              }}
            >
              {PLAIN_CHARS.map((char, index) => {
                if (char === ' ') {
                  return <div key={index} style={{ width: 24, flexShrink: 0 }} />;
                }

                const order = nonSpaceOrder;
                nonSpaceOrder += 1;

                const diveStart = 376 + order * 19;
                const diveT = interpolate(
                  frame,
                  [diveStart, diveStart + 22],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                const posY = interpolate(diveT, [0, 1], [-160, 160]);
                const scaleY = interpolate(
                  diveT,
                  [0, 0.45, 0.55, 1],
                  [1, -0.8, 0.8, 1]
                );
                const crossedMirror = diveT >= 0.5;

                const rippleRadius = interpolate(diveT, [0.35, 1], [8, 60], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
                const rippleOpacity = interpolate(
                  diveT,
                  [0.35, 0.5, 1],
                  [0, 0.95, 0],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      width: 88,
                      height: 460,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Ghost Reference Above Mirror After Dive */}
                    {crossedMirror && (
                      <div
                        style={{
                          position: 'absolute',
                          transform: 'translateY(-160px)',
                          fontFamily: THEME.fontMono,
                          fontSize: 64,
                          fontWeight: 900,
                          color: THEME.secondary,
                          opacity: 0.38,
                        }}
                      >
                        {char}
                      </div>
                    )}

                    {/* Water Ripple SVG at Mirror Surface */}
                    <svg
                      width="120"
                      height="60"
                      viewBox="-60 -30 120 60"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        overflow: 'visible',
                        pointerEvents: 'none',
                      }}
                    >
                      <ellipse
                        cx="0"
                        cy="0"
                        rx={rippleRadius}
                        ry={rippleRadius * 0.38}
                        fill="none"
                        stroke={THEME.accent}
                        strokeWidth="5"
                        opacity={rippleOpacity}
                      />
                    </svg>

                    {/* Diving Character (Huge 88px Font) */}
                    <div
                      style={{
                        fontFamily: THEME.fontMono,
                        fontSize: crossedMirror ? 88 : 78,
                        fontWeight: 900,
                        color: crossedMirror ? THEME.accent : THEME.primary,
                        transform: `translateY(${
                          posY + Math.sin((frame + index * 6) / 9) * 5
                        }px) scaleY(${scaleY})`,
                        textShadow: crossedMirror
                          ? '0 12px 28px rgba(249, 115, 22, 0.35)'
                          : 'none',
                      }}
                    >
                      {crossedMirror ? ATBASH_CHARS[index] : char}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Stickman
            variant="scholar"
            label="Transformasi Cermin"
            speech="Huruf menyelam & terbalik menjadi SVOOL DLIOW!"
            scale={1.15}
          />
        </div>
      )}

      {/* =====================================================================
          FRAME 606 - 774: 180-DEGREE PENDULUM SWING & CROSSED-OUT KEY ICON
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
          {/* Large Crossed-Out Key SVG Icon (Tanpa Kunci Tambahan) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 20,
              transform: `translateY(${waveY * 0.6}px)`,
            }}
          >
            <svg
              width="280"
              height="280"
              viewBox="0 0 240 240"
              style={{ overflow: 'visible' }}
            >
              <circle
                cx="120"
                cy="120"
                r="96"
                fill="#FFF7ED"
                stroke={THEME.primary}
                strokeWidth="6"
                strokeDasharray="16 10"
              />
              <circle
                cx="90"
                cy="120"
                r="28"
                fill="none"
                stroke={THEME.primary}
                strokeWidth="9"
              />
              <line
                x1="118"
                y1="120"
                x2="182"
                y2="120"
                stroke={THEME.primary}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <line
                x1="156"
                y1="120"
                x2="156"
                y2="144"
                stroke={THEME.primary}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <line
                x1="176"
                y1="120"
                x2="176"
                y2="148"
                stroke={THEME.primary}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <line
                x1="48"
                y1="192"
                x2="192"
                y2="48"
                stroke={THEME.accent}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="220"
                strokeDashoffset={slashDash}
              />
            </svg>

            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: THEME.accent,
                marginTop: 16,
                textAlign: 'center',
              }}
            >
              TANPA KUNCI TAMBAHAN
            </div>
          </div>

          {/* 180-Degree Pendulum Swing Assembly */}
          <div
            style={{
              position: 'relative',
              width: 960,
              height: 420,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: `rotate(${pendulumDeg}deg)`,
            }}
          >
            <div
              style={{
                transform: `rotate(${-pendulumDeg}deg)`,
                fontFamily: THEME.fontMono,
                fontSize: 78,
                fontWeight: 900,
                letterSpacing: 8,
                color: pendulumDeg > 90 ? THEME.secondary : THEME.accent,
              }}
            >
              SVOOL DLIOW
            </div>

            <svg width="920" height="60" viewBox="0 0 920 60">
              <line
                x1="30"
                y1="30"
                x2="890"
                y2="30"
                stroke={THEME.accent}
                strokeWidth="7.5"
                strokeLinecap="round"
              />
              <circle
                cx="460"
                cy="30"
                r="22"
                fill={THEME.accent}
                stroke={THEME.primary}
                strokeWidth="6"
              />
            </svg>

            <div
              style={{
                transform: `rotate(${-pendulumDeg}deg)`,
                fontFamily: THEME.fontMono,
                fontSize: 80,
                fontWeight: 900,
                letterSpacing: 8,
                color: pendulumDeg > 90 ? THEME.primary : THEME.secondary,
              }}
            >
              HELLO WORLD
            </div>
          </div>

          <Stickman
            variant="scholar"
            pose="celebrate"
            label="Simetris Dua Arah"
            speech="Balik cerminnya, pesan langsung kembali!"
            scale={1.12}
          />
        </div>
      )}

      {/* Member Video (100% Untouched Timing) */}
      <MemberVideo
        src="assets/videos/02_Billy.mp4"
        startFromFrame={12}
        endAtFrame={876}
        memberName="Billy"
        topicTag="02 / ATBASH CIPHER"
        showFaceRanges={[
          [0, 120],
          [775, 864],
        ]}
      />
    </AbsoluteFill>
  );
};

export default AtbashScene;
