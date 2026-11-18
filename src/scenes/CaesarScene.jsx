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
import { whoosh, whip, mouseClick, uiSwitch } from '@remotion/sfx';
import { THEME, SAFE_ZONE_STYLE } from '../Composition';
import { MemberVideo } from '../components/MemberVideo';
import { Stickman } from '../components/Stickman';

const ALPHABET_26 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PLAIN_CHARS = 'HELLO WORLD'.split('');
const CIPHER_CHARS = 'KHOOR ZRUOG'.split('');

const CipherWheelSVG = ({
  innerRotateDeg,
  size = 700,
  opacity = 1,
  directionLabel = '+3',
}) => {
  const rOuter = 278;
  const rInner = 198;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-320 -320 640 640"
      style={{ opacity, overflow: 'visible' }}
    >
      <circle
        cx="0"
        cy="0"
        r="302"
        fill="none"
        stroke={THEME.accent}
        strokeWidth="4"
        strokeDasharray="14 14"
        opacity="0.45"
      />

      {/* Outer Ring (Static Plaintext A-Z) */}
      <circle
        cx="0"
        cy="0"
        r={rOuter + 28}
        fill="#FFFDF9"
        stroke={THEME.primary}
        strokeWidth="6"
      />
      <circle
        cx="0"
        cy="0"
        r={rOuter - 28}
        fill="none"
        stroke={THEME.primary}
        strokeWidth="4"
      />

      {ALPHABET_26.map((letter, idx) => {
        const angle = (idx * 360) / 26 - 90;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * rOuter;
        const y = Math.sin(rad) * rOuter;
        const isFirstFour = idx < 4;

        return (
          <g key={`out-${letter}`}>
            <text
              x={x}
              y={y + 10}
              textAnchor="middle"
              fontFamily={THEME.fontMono}
              fontSize="30"
              fontWeight="900"
              fill={isFirstFour ? THEME.accent : THEME.primary}
            >
              {letter}
            </text>
          </g>
        );
      })}

      {/* Inner Rotating Ring (Ciphertext A-Z) */}
      <g transform={`rotate(${innerRotateDeg})`}>
        <circle
          cx="0"
          cy="0"
          r={rInner + 28}
          fill={THEME.bg}
          stroke={THEME.accent}
          strokeWidth="6"
        />
        <circle
          cx="0"
          cy="0"
          r={rInner - 28}
          fill="none"
          stroke={THEME.primary}
          strokeWidth="3.5"
          strokeDasharray="10 8"
        />

        {ALPHABET_26.map((letter, idx) => {
          const angle = (idx * 360) / 26 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * rInner;
          const y = Math.sin(rad) * rInner;

          return (
            <text
              key={`in-${letter}`}
              x={x}
              y={y + 10}
              textAnchor="middle"
              fontFamily={THEME.fontMono}
              fontSize="28"
              fontWeight="900"
              fill={THEME.accent}
            >
              {letter}
            </text>
          );
        })}
      </g>

      {/* Center Hub */}
      <circle
        cx="0"
        cy="0"
        r="112"
        fill={THEME.primary}
        stroke={THEME.accent}
        strokeWidth="6.5"
      />
      <text
        x="0"
        y="-8"
        textAnchor="middle"
        fontFamily={THEME.fontMono}
        fontSize="28"
        fontWeight="900"
        fill={THEME.white}
        opacity="0.95"
      >
        GESER
      </text>
      <text
        x="0"
        y="44"
        textAnchor="middle"
        fontFamily={THEME.fontMono}
        fontSize="58"
        fontWeight="900"
        fill={THEME.accent}
      >
        {directionLabel}
      </text>

      {/* Curved Orange Shift Arc */}
      <path
        d="M -68 -130 A 146 146 0 0 1 68 -130"
        fill="none"
        stroke={THEME.accent}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <polygon points="64,-144 86,-124 58,-118" fill={THEME.accent} />
    </svg>
  );
};

export const CaesarScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breathY = Math.sin(frame / 10) * 8;

  // Section 1: Frame 171 - 360
  const inSec1 = frame >= 171 && frame <= 360;
  const sec1Opacity = interpolate(
    frame,
    [171, 185, 345, 360],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const wheelShiftSpring = spring({
    frame: Math.max(0, frame - 210),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const wheelDeg1 = interpolate(wheelShiftSpring, [0, 1], [0, -(3 * 360) / 26]);

  // Parabolic scroll flight centered across 1000px battlefield
  const flightT = interpolate(frame, [200, 285], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scrollX = interpolate(flightT, [0, 1], [180, 820]);
  const scrollY = 330 - 4 * 240 * flightT * (1 - flightT);
  const scrollAngle = interpolate(flightT, [0, 1], [-28, 28]);

  // Section 2: Frame 361 - 608
  const inSec2 = frame >= 361 && frame <= 608;
  const sec2Opacity = interpolate(
    frame,
    [361, 375, 594, 608],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Section 3: Frame 609 - 899
  const inSec3 = frame >= 609 && frame <= 899;
  const sec3Opacity = interpolate(
    frame,
    [609, 624, 885, 899],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const reverseWheelSpring = spring({
    frame: Math.max(0, frame - 660),
    fps,
    config: { damping: 13, stiffness: 85 },
  });
  const wheelDeg3 = interpolate(
    reverseWheelSpring,
    [0, 1],
    [-(3 * 360) / 26, 0]
  );

  let nonSpaceIdx = 0;

  return (
    <AbsoluteFill
      style={{
        color: THEME.primary,
        fontFamily: THEME.fontSans,
      }}
    >
      {/* Sound Effects */}
      <Sequence from={171}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={210}>
        <Audio src={uiSwitch} volume={0.22} />
      </Sequence>
      <Sequence from={361}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <Sequence key={i} from={375 + i * 18}>
          <Audio src={mouseClick} volume={0.18} />
        </Sequence>
      ))}
      <Sequence from={609}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={660}>
        <Audio src={uiSwitch} volume={0.24} />
      </Sequence>
      <Sequence from={898}>
        <Audio src={whip} volume={0.2} />
      </Sequence>

      {/* =====================================================================
          FRAME 171 - 360: ROMAN BATTLEFIELD & ROTATING CAESAR CIPHER WHEEL
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
              transform: `translateY(${breathY * 0.5}px)`,
              zIndex: 5,
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
              01 • CAESAR CIPHER
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
              Roda Putar Sandi Romawi (+3)
            </div>
          </div>

          {/* Giant 700px Circular Cipher Wheel Centered */}
          <div
            style={{
              transform: `translateY(${breathY}px)`,
              zIndex: 4,
            }}
          >
            <CipherWheelSVG
              innerRotateDeg={wheelDeg1}
              size={700}
              directionLabel="+3"
            />
          </div>

          {/* Centered Battlefield Hills + 2 Roman Stickmen + Parabolic Scroll */}
          <div
            style={{
              position: 'relative',
              width: 1000,
              height: 560,
            }}
          >
            <svg
              width="1000"
              height="560"
              viewBox="0 0 1000 560"
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'visible',
              }}
            >
              <path
                d="M 180 310 Q 500 10 820 310"
                fill="none"
                stroke={THEME.accent}
                strokeWidth="7"
                strokeDasharray="18 14"
                strokeDashoffset={-frame * 3}
              />

              <path
                d="M -60 450 Q 260 350 560 430 T 1060 400 L 1060 600 L -60 600 Z"
                fill="#EFECE4"
                stroke={THEME.primary}
                strokeWidth="5.5"
              />
              <path
                d="M -60 495 Q 500 390 1060 480 L 1060 600 L -60 600 Z"
                fill="#E5E0D5"
                stroke={THEME.primary}
                strokeWidth="5.5"
              />
            </svg>

            {/* Flying Scroll Icon Along Parabolic Curve */}
            <div
              style={{
                position: 'absolute',
                left: scrollX - 105,
                top: scrollY,
                transform: `rotate(${scrollAngle}deg)`,
                backgroundColor: THEME.accent,
                color: THEME.white,
                padding: '16px 36px',
                borderRadius: 999,
                fontFamily: THEME.fontMono,
                fontSize: 34,
                fontWeight: 900,
                boxShadow: '0 14px 32px rgba(249, 115, 22, 0.4)',
                zIndex: 6,
                whiteSpace: 'nowrap',
              }}
            >
              📜 PESAN +3
            </div>

            {/* Left Roman Soldier */}
            <div style={{ position: 'absolute', left: 36, bottom: 45 }}>
              <Stickman
                variant="roman"
                label="Prajurit"
                speech="Kirim sandi +3!"
                scale={1.22}
              />
            </div>

            {/* Right Roman Commander */}
            <div style={{ position: 'absolute', right: 36, bottom: 45 }}>
              <Stickman variant="roman" label="Komandan" flip scale={1.22} />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FRAME 361 - 608: FREE-FLOATING HELLO WORLD -> KHOOR ZRUOG (+3 ARCS)
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
          {/* Giant Rotating Cipher Wheel Watermark Centered Behind Text */}
          <div
            style={{
              position: 'absolute',
              top: 380,
              opacity: 0.13,
              transform: `rotate(${frame * 0.4}deg)`,
            }}
          >
            <CipherWheelSVG
              innerRotateDeg={-(3 * 360) / 26}
              size={900}
              directionLabel="+3"
            />
          </div>

          {/* Huge Centered Heading */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 40,
              transform: `translateY(${breathY * 0.6}px)`,
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
              GESER MAJU +3 LANGKAH
            </div>
            <div
              style={{
                fontSize: 74,
                fontWeight: 900,
                marginTop: 12,
                letterSpacing: -1.5,
              }}
            >
              HELLO WORLD ➔ KHOOR ZRUOG
            </div>
          </div>

          {/* 100% Centered Single-Line Floating Characters (Huge 90px Font!) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              transform: `translateY(${breathY}px)`,
            }}
          >
            {PLAIN_CHARS.map((char, index) => {
              if (char === ' ') {
                return <div key={index} style={{ width: 24, flexShrink: 0 }} />;
              }

              const idx = nonSpaceIdx;
              nonSpaceIdx += 1;

              const revealFrame = 375 + idx * 18;
              const charSpring = spring({
                frame: Math.max(0, frame - revealFrame),
                fps,
                config: { damping: 10, stiffness: 150 },
              });
              const isEncrypted = frame >= revealFrame;

              const spin360 = interpolate(charSpring, [0, 1], [0, 360]);
              const jumpY =
                interpolate(
                  frame,
                  [revealFrame - 2, revealFrame + 6, revealFrame + 16],
                  [0, -48, 0],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ) +
                Math.sin((frame + idx * 7) / 9) * 6;

              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    width: 88,
                    flexShrink: 0,
                  }}
                >
                  {/* Curved SVG Jump Arc (+1, +2, +3 dots) Above Letter */}
                  <svg
                    width="88"
                    height="112"
                    viewBox="0 0 88 112"
                    style={{
                      overflow: 'visible',
                      opacity: isEncrypted ? 1 : 0.25,
                    }}
                  >
                    <path
                      d="M 10 92 Q 44 12 78 92"
                      fill="none"
                      stroke={THEME.accent}
                      strokeWidth="5.5"
                      strokeDasharray="6 6"
                    />
                    <circle cx="22" cy="60" r="6" fill={THEME.primary} />
                    <circle cx="44" cy="38" r="6.5" fill={THEME.primary} />
                    <circle cx="66" cy="60" r="7.5" fill={THEME.accent} />
                    <text
                      x="44"
                      y="26"
                      textAnchor="middle"
                      fontFamily={THEME.fontMono}
                      fontSize="28"
                      fontWeight="900"
                      fill={THEME.accent}
                    >
                      +3
                    </text>
                  </svg>

                  {/* Huge Floating Character (90px Monospace) */}
                  <div
                    style={{
                      fontFamily: THEME.fontMono,
                      fontSize: isEncrypted ? 90 : 80,
                      fontWeight: 900,
                      lineHeight: 1,
                      color: isEncrypted ? THEME.accent : THEME.primary,
                      transform: `translateY(${jumpY}px) rotate(${spin360}deg) scale(${
                        isEncrypted ? 1.08 : 1
                      })`,
                      textShadow: isEncrypted
                        ? '0 14px 30px rgba(249, 115, 22, 0.35)'
                        : 'none',
                    }}
                  >
                    {isEncrypted ? CIPHER_CHARS[index] : char}
                  </div>

                  {/* Large Letter Mapping Label Below */}
                  <div
                    style={{
                      marginTop: 28,
                      fontFamily: THEME.fontMono,
                      fontSize: 34,
                      fontWeight: 900,
                      color: isEncrypted ? THEME.primary : THEME.secondary,
                      opacity: isEncrypted ? 0.95 : 0.35,
                    }}
                  >
                    {char}➔{CIPHER_CHARS[index]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stickman Guide & 3-Step Visual Staircase Illustration at Bottom */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 48,
              width: '100%',
              marginBottom: 20,
            }}
          >
            <Stickman
              variant="roman"
              label="Pemandu Caesar"
              speech="Tiap huruf loncat +3 langkah!"
              scale={1.18}
            />

            {/* Visual 3-Step Staircase Illustration (H -> I -> J -> K) */}
            <svg width="460" height="240" viewBox="0 0 460 240">
              {['H', 'I', 'J', 'K'].map((stepChar, sIdx) => {
                const sx = 40 + sIdx * 105;
                const sy = 190 - sIdx * 38;
                const isFinal = sIdx === 3;
                return (
                  <g key={stepChar}>
                    <rect
                      x={sx}
                      y={sy}
                      width="95"
                      height={220 - sy}
                      rx="12"
                      fill={isFinal ? THEME.accent : '#EFECE4'}
                      stroke={THEME.primary}
                      strokeWidth="5"
                    />
                    <text
                      x={sx + 47.5}
                      y={sy - 18}
                      textAnchor="middle"
                      fontFamily={THEME.fontMono}
                      fontSize="44"
                      fontWeight="900"
                      fill={isFinal ? THEME.accent : THEME.primary}
                    >
                      {stepChar}
                    </text>
                    {sIdx > 0 && (
                      <text
                        x={sx + 47.5}
                        y={sy + 36}
                        textAnchor="middle"
                        fontFamily={THEME.fontMono}
                        fontSize="24"
                        fontWeight="900"
                        fill={isFinal ? THEME.white : THEME.secondary}
                      >
                        +{sIdx}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* =====================================================================
          FRAME 609 - 899: COUNTER-CLOCKWISE WHEEL (-3) & BACKWARD ARCS
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
          {/* Large Counter-Clockwise Rotating Cipher Wheel (-3) */}
          <div
            style={{
              marginTop: 20,
              transform: `translateY(${breathY * 0.7}px)`,
            }}
          >
            <CipherWheelSVG
              innerRotateDeg={wheelDeg3}
              size={640}
              directionLabel="-3"
            />
          </div>

          {/* Backward Pull Arcs Returning KHOOR ZRUOG -> HELLO WORLD */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 42,
                fontWeight: 900,
                color: THEME.accent,
                letterSpacing: 3,
                marginBottom: 28,
                textAlign: 'center',
              }}
            >
              PUTAR BALIK RODA -3 LANGKAH (DEKRIPSI)
            </div>

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
              {CIPHER_CHARS.map((cChar, index) => {
                if (cChar === ' ') {
                  return <div key={index} style={{ width: 24, flexShrink: 0 }} />;
                }
                const restoreAt = 710 + index * 12;
                const isRestored = frame >= restoreAt;
                const revSpring = spring({
                  frame: Math.max(0, frame - restoreAt),
                  fps,
                  config: { damping: 11, stiffness: 140 },
                });
                const floatChar = Math.sin((frame + index * 5) / 9) * 6;

                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: 88,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: THEME.fontMono,
                        fontSize: 86,
                        fontWeight: 900,
                        color: isRestored ? THEME.primary : THEME.accent,
                        transform: `translateY(${floatChar}px) scale(${interpolate(
                          revSpring,
                          [0, 0.5, 1],
                          [1, 1.25, 1]
                        )})`,
                      }}
                    >
                      {isRestored ? PLAIN_CHARS[index] : cChar}
                    </div>

                    {/* Bottom Curved Return Arc (-3) */}
                    <svg
                      width="88"
                      height="96"
                      viewBox="0 0 88 96"
                      style={{
                        overflow: 'visible',
                        opacity: isRestored ? 1 : 0.3,
                      }}
                    >
                      <path
                        d="M 76 14 Q 44 76 12 14"
                        fill="none"
                        stroke={THEME.primary}
                        strokeWidth="5"
                      />
                      <polygon points="8,24 10,6 24,18" fill={THEME.primary} />
                      <text
                        x="44"
                        y="86"
                        textAnchor="middle"
                        fontFamily={THEME.fontMono}
                        fontSize="30"
                        fontWeight="900"
                        fill={THEME.primary}
                      >
                        -3
                      </text>
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stickman Guide Explaining Reverse Decryption */}
          <Stickman
            variant="scholar"
            label="Dekripsi Caesar"
            speech="Geser mundur -3 kembali ke HELLO WORLD!"
            scale={1.1}
          />
        </div>
      )}

      {/* Member Video (100% Untouched Timing) */}
      <MemberVideo
        src="assets/videos/01_Arianto.mp4"
        startFromFrame={105}
        endAtFrame={1095}
        memberName="Arianto"
        topicTag="01 / CAESAR CIPHER"
        showFaceRanges={[
          [0, 170],
          [900, 990],
        ]}
      />
    </AbsoluteFill>
  );
};

export default CaesarScene;
