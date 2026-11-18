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
import { whoosh, mouseClick, uiSwitch, ding } from '@remotion/sfx';
import { THEME, SAFE_ZONE_STYLE } from '../Composition';
import { MemberVideo } from '../components/MemberVideo';
import { Stickman } from '../components/Stickman';

const ALPHABET_26 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PLAIN_10 = 'HELLOWORLD'.split('');
const KEY_10 = 'KEYKEYKEYK'.split('');
const CIPHER_SPACED = 'RIJVS UYVJN'.split('');

const GearSVG = ({
  letter,
  subLabel,
  radius = 126,
  rotation = 0,
  color = THEME.accent,
}) => {
  const teeth = 12;
  return (
    <svg
      width={radius * 2 + 54}
      height={radius * 2 + 54}
      viewBox={`${-radius - 27} ${-radius - 27} ${radius * 2 + 54} ${
        radius * 2 + 54
      }`}
      style={{ overflow: 'visible' }}
    >
      <g transform={`rotate(${rotation})`}>
        {Array.from({ length: teeth }).map((_, i) => {
          const deg = (i * 360) / teeth;
          return (
            <rect
              key={i}
              x="-18"
              y={-radius - 18}
              width="36"
              height="30"
              rx="7"
              fill={color}
              stroke={THEME.primary}
              strokeWidth="5"
              transform={`rotate(${deg})`}
            />
          );
        })}
        <circle
          cx="0"
          cy="0"
          r={radius - 4}
          fill="#FFFDF9"
          stroke={THEME.primary}
          strokeWidth="6"
        />
        <circle
          cx="0"
          cy="0"
          r={radius - 28}
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeDasharray="14 10"
        />
      </g>

      <text
        x="0"
        y="14"
        textAnchor="middle"
        fontFamily={THEME.fontMono}
        fontSize="74"
        fontWeight="900"
        fill={THEME.primary}
      >
        {letter}
      </text>
      {subLabel && (
        <text
          x="0"
          y="54"
          textAnchor="middle"
          fontFamily={THEME.fontMono}
          fontSize="30"
          fontWeight="900"
          fill={color}
        >
          {subLabel}
        </text>
      )}
    </svg>
  );
};

export const VigenereScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floatY = Math.sin(frame / 10) * 8;

  // Section 1: Frame 156 - 365
  const inSec1 = frame >= 156 && frame <= 365;
  const sec1Opacity = interpolate(
    frame,
    [156, 170, 352, 365],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const sweepSpring = spring({
    frame: Math.max(0, frame - 215),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const padlockX = interpolate(sweepSpring, [0, 1], [0, -720]);
  const gearsX = interpolate(sweepSpring, [0, 1], [680, 0]);

  // Section 2: Frame 366 - 585
  const inSec2 = frame >= 366 && frame <= 585;
  const sec2Opacity = interpolate(
    frame,
    [366, 380, 572, 585],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Section 3: Frame 586 - 795
  const inSec3 = frame >= 586 && frame <= 795;
  const sec3Opacity = interpolate(
    frame,
    [586, 600, 782, 795],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const laserIndex = interpolate(frame, [600, 750], [0, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp' }
  );

  // Section 4: Frame 796 - 1215
  const inSec4 = frame >= 796 && frame <= 1215;
  const sec4Opacity = interpolate(
    frame,
    [796, 810, 1202, 1215],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const isSecondTape = frame >= 1086;

  const slide1Raw = interpolate(frame, [835, 965], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bounce1 = spring({
    frame: Math.max(0, frame - 955),
    fps,
    config: { damping: 9, stiffness: 150 },
  });
  const currentIdx1 =
    frame < 955
      ? interpolate(slide1Raw, [0, 1], [7, 16.6])
      : interpolate(bounce1, [0, 1], [16.6, 17]);

  const slide2Raw = interpolate(frame, [1105, 1175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp' }
  );
  const bounce2 = spring({
    frame: Math.max(0, frame - 1168),
    fps,
    config: { damping: 9, stiffness: 150 },
  });
  const currentIdx2 =
    frame < 1168
      ? interpolate(slide2Raw, [0, 1], [4, 7.7])
      : interpolate(bounce2, [0, 1], [7.7, 8]);

  const activeTapeIndex = !isSecondTape ? currentIdx1 : currentIdx2;
  const roundedIndex = Math.round(activeTapeIndex);

  // Section 5: Frame 1216 - 1459
  const inSec5 = frame >= 1216 && frame <= 1459;
  const sec5Opacity = interpolate(
    frame,
    [1216, 1230, 1446, 1459],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const isReverseDecrypt = frame >= 1380;
  const reversePull = spring({
    frame: Math.max(0, frame - 1380),
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  return (
    <AbsoluteFill
      style={{
        color: THEME.primary,
        fontFamily: THEME.fontSans,
      }}
    >
      {/* Sound Effects */}
      <Sequence from={156}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={215}>
        <Audio src={uiSwitch} volume={0.24} />
      </Sequence>
      <Sequence from={366}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <Sequence key={i} from={395 + i * 14}>
          <Audio src={mouseClick} volume={0.16} />
        </Sequence>
      ))}
      <Sequence from={586}>
        <Audio src={uiSwitch} volume={0.22} />
      </Sequence>
      <Sequence from={796}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={960}>
        <Audio src={ding} volume={0.24} />
      </Sequence>
      <Sequence from={1086}>
        <Audio src={uiSwitch} volume={0.22} />
      </Sequence>
      <Sequence from={1172}>
        <Audio src={ding} volume={0.24} />
      </Sequence>
      <Sequence from={1216}>
        <Audio src={whoosh} volume={0.22} />
      </Sequence>
      <Sequence from={1380}>
        <Audio src={uiSwitch} volume={0.24} />
      </Sequence>

      {/* =====================================================================
          FRAME 156 - 365: SINGLE PADLOCK SWEPT BY 3 INTERLOCKING KEY GEARS
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
              transform: `translateY(${floatY * 0.5}px)`,
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
              03 • VIGENÈRE CIPHER
            </div>
            <div
              style={{
                fontSize: 70,
                fontWeight: 900,
                marginTop: 10,
                letterSpacing: -1.5,
                lineHeight: 1.1,
              }}
            >
              Roda Gigi Kata Kunci vs Kunci Tunggal
            </div>
          </div>

          {/* Huge Floating Plaintext */}
          <div
            style={{
              fontFamily: THEME.fontMono,
              fontSize: 82,
              fontWeight: 900,
              letterSpacing: 12,
              transform: `translateY(${floatY}px)`,
            }}
          >
            HELLO WORLD
          </div>

          {/* Stage: Single Padlock (+3) Swept Aside by 3 Giant Interlocking KEY Gears */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 540,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                transform: `translateX(${padlockX}px) rotate(${interpolate(
                  sweepSpring,
                  [0, 1],
                  [0, -35]
                )}deg)`,
                opacity: interpolate(sweepSpring, [0, 0.85], [1, 0]),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <svg width="260" height="300" viewBox="0 0 240 280">
                <path
                  d="M 70 120 L 70 78 A 50 50 0 0 1 170 78 L 170 120"
                  fill="none"
                  stroke={THEME.secondary}
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <rect
                  x="45"
                  y="120"
                  width="150"
                  height="130"
                  rx="28"
                  fill="#FFFDF9"
                  stroke={THEME.primary}
                  strokeWidth="6"
                />
                <text
                  x="120"
                  y="200"
                  textAnchor="middle"
                  fontFamily={THEME.fontMono}
                  fontSize="58"
                  fontWeight="900"
                  fill={THEME.secondary}
                >
                  +3
                </text>
              </svg>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: THEME.secondary,
                  marginTop: 10,
                }}
              >
                Gembok Tunggal (Mudah Ditebak)
              </div>
            </div>

            {/* 3 Giant Interlocking Rotating SVG Gears: K - E - Y */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translateX(${gearsX}px)`,
              }}
            >
              <div style={{ marginRight: -22 }}>
                <GearSVG
                  letter="K"
                  subLabel="+10"
                  radius={124}
                  rotation={frame * 1.4}
                  color={THEME.accent}
                />
              </div>
              <div style={{ marginTop: 96, zIndex: 3 }}>
                <GearSVG
                  letter="E"
                  subLabel="+4"
                  radius={114}
                  rotation={-frame * 1.4 + 15}
                  color={THEME.primary}
                />
              </div>
              <div style={{ marginLeft: -22 }}>
                <GearSVG
                  letter="Y"
                  subLabel="+24"
                  radius={124}
                  rotation={frame * 1.4}
                  color={THEME.accent}
                />
              </div>
            </div>
          </div>

          <Stickman
            variant="mechanic"
            label="Mekanik Vigenère"
            speech="Kata kunci KEY menggerakkan 3 roda geser berbeda!"
            scale={1.15}
          />
        </div>
      )}

      {/* =====================================================================
          FRAME 366 - 585: FLOWING RIBBON WAVE SPLITTING INTO KEYKEYKEYK
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
              GELOMBANG PENGULANGAN KATA KUNCI
            </div>
            <div style={{ fontSize: 68, fontWeight: 900, marginTop: 12 }}>
              Kata &ldquo;KEY&rdquo; Mengalir di Bawah Tiap Huruf
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              width: 980,
              height: 540,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Top Row: 10 Floating Plaintext Letters H E L L O W O R L D */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {PLAIN_10.map((pChar, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 92,
                    textAlign: 'center',
                    fontFamily: THEME.fontMono,
                    fontSize: 82,
                    fontWeight: 900,
                    transform: `translateY(${
                      Math.sin(frame / 9 + idx * 0.6) * 8
                    }px)`,
                  }}
                >
                  {pChar}
                </div>
              ))}
            </div>

            {/* Flowing Cinematic Ribbon Wave SVG */}
            <svg
              width="980"
              height="210"
              viewBox="0 0 980 210"
              style={{ overflow: 'visible' }}
            >
              <path
                d={`M -20 140 C 220 ${
                  30 + Math.sin(frame / 8) * 35
                }, 480 ${190 - Math.sin(frame / 8) * 35}, 1000 80`}
                fill="none"
                stroke={THEME.accent}
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.24"
              />
              <path
                d={`M -20 140 C 220 ${
                  30 + Math.sin(frame / 8) * 35
                }, 480 ${190 - Math.sin(frame / 8) * 35}, 1000 80`}
                fill="none"
                stroke={THEME.accent}
                strokeWidth="6"
                strokeDasharray="24 14"
                strokeDashoffset={-frame * 5}
              />
            </svg>

            {/* Bottom Row: KEYKEYKEYK Splitting into Position */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {KEY_10.map((kChar, idx) => {
                const revealAt = 390 + idx * 14;
                const kSpring = spring({
                  frame: Math.max(0, frame - revealAt),
                  fps,
                  config: { damping: 10, stiffness: 140 },
                });
                const isVisible = frame >= revealAt;

                return (
                  <div
                    key={idx}
                    style={{
                      width: 92,
                      textAlign: 'center',
                      fontFamily: THEME.fontMono,
                      fontSize: 82,
                      fontWeight: 900,
                      color: THEME.accent,
                      opacity: isVisible ? 1 : 0.15,
                      transform: `translateY(${interpolate(
                        kSpring,
                        [0, 1],
                        [90, Math.sin(frame / 9 + idx * 0.6) * -8]
                      )}px) scale(${isVisible ? kSpring : 0.5})`,
                    }}
                  >
                    {kChar}
                  </div>
                );
              })}
            </div>
          </div>

          <Stickman
            variant="scholar"
            label="Pola Kunci"
            speech="Ulangi K-E-Y terus tanpa menghitung spasi!"
            scale={1.15}
          />
        </div>
      )}

      {/* =====================================================================
          FRAME 586 - 795: CRYPTOGRAPHIC LASER THREAD NETWORK
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
              JARINGAN BENANG KRIPTOGRAFI
            </div>
            <div style={{ fontSize: 68, fontWeight: 900, marginTop: 10 }}>
              Ikat Setiap Pasangan Huruf Pesan &amp; Kunci
            </div>
          </div>

          <svg
            width="980"
            height="640"
            viewBox="0 0 980 640"
            style={{ overflow: 'visible' }}
          >
            {PLAIN_10.map((pChar, idx) => {
              const x = 45 + idx * 98.8;
              const threadActive = laserIndex >= idx;
              const isJustBound =
                laserIndex >= idx && laserIndex < idx + 1.2;
              const pulseScale = isJustBound
                ? 1.25
                : threadActive
                ? 1 + Math.sin(frame / 7 + idx) * 0.06
                : 1;

              const beamY2 = interpolate(
                laserIndex,
                [idx, idx + 0.6],
                [115, 520],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );

              return (
                <g key={idx}>
                  {threadActive && (
                    <g>
                      <line
                        x1={x}
                        y1={115}
                        x2={x}
                        y2={beamY2}
                        stroke={THEME.accent}
                        strokeWidth="14"
                        opacity="0.22"
                        strokeLinecap="round"
                      />
                      <line
                        x1={x}
                        y1={115}
                        x2={x}
                        y2={beamY2}
                        stroke={THEME.accent}
                        strokeWidth="6"
                        strokeDasharray="14 8"
                        strokeDashoffset={-frame * 4}
                        strokeLinecap="round"
                      />
                      <circle cx={x} cy={318} r="26" fill={THEME.accent} />
                      <text
                        x={x}
                        y="328"
                        textAnchor="middle"
                        fontFamily={THEME.fontMono}
                        fontSize="34"
                        fontWeight="900"
                        fill={THEME.white}
                      >
                        +
                      </text>
                    </g>
                  )}

                  {/* Top Plaintext Letter */}
                  <g
                    transform={`translate(${x}, 82) scale(${pulseScale})`}
                  >
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      fontFamily={THEME.fontMono}
                      fontSize="78"
                      fontWeight="900"
                      fill={threadActive ? THEME.primary : THEME.secondary}
                    >
                      {pChar}
                    </text>
                  </g>

                  {/* Bottom Key Letter */}
                  <g
                    transform={`translate(${x}, 585) scale(${pulseScale})`}
                  >
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      fontFamily={THEME.fontMono}
                      fontSize="78"
                      fontWeight="900"
                      fill={threadActive ? THEME.accent : THEME.secondary}
                    >
                      {KEY_10[idx]}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          <Stickman
            variant="mechanic"
            label="Pasangan Huruf"
            speech="Jumlahkan nilai indeks atas dan bawah!"
            scale={1.15}
          />
        </div>
      )}

      {/* =====================================================================
          FRAME 796 - 1215: INTERACTIVE SLIDING ALPHABET TAPE MEASURE
         ===================================================================== */}
      {inSec4 && (
        <div
          style={{
            opacity: sec4Opacity,
            ...SAFE_ZONE_STYLE,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Huge Educational Focus Title */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 28,
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
              {!isSecondTape
                ? 'CONTOH PERHITUNGAN HURUF KE-1'
                : 'CONTOH PERHITUNGAN HURUF KE-2'}
            </div>
            <div
              style={{
                fontSize: 78,
                fontWeight: 900,
                marginTop: 14,
                fontFamily: THEME.fontMono,
              }}
            >
              {!isSecondTape
                ? `H (7) + K (10) = ${ALPHABET_26[roundedIndex]} (${roundedIndex})`
                : `E (4) + E (4) = ${ALPHABET_26[roundedIndex]} (${roundedIndex})`}
            </div>
          </div>

          {/* Center Fixed Pointer Needle + Giant Sliding Alphabet Tape Measure */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Fixed Top Pointer Needle at Center */}
            <div
              style={{
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  backgroundColor: THEME.accent,
                  color: THEME.white,
                  padding: '12px 38px',
                  borderRadius: 999,
                  fontFamily: THEME.fontMono,
                  fontSize: 34,
                  fontWeight: 900,
                }}
              >
                JARUM PENUNJUK ({roundedIndex})
              </div>
              <svg width="58" height="50" viewBox="0 0 48 44">
                <polygon points="6,4 42,4 24,40" fill={THEME.accent} />
              </svg>
            </div>

            {/* Sliding Alphabet Ruler Ribbon */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 135,
                display: 'flex',
                alignItems: 'center',
                transform: `translateX(${-activeTapeIndex * 130 - 65}px)`,
              }}
            >
              {ALPHABET_26.map((letter, idx) => {
                const isSelected = idx === roundedIndex;
                const isStart = !isSecondTape ? idx === 7 : idx === 4;
                const inRange = !isSecondTape
                  ? idx >= 7 && idx <= roundedIndex
                  : idx >= 4 && idx <= roundedIndex;

                return (
                  <div
                    key={letter}
                    style={{
                      width: 130,
                      height: 270,
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: `7px solid ${
                        inRange ? THEME.accent : THEME.primary
                      }`,
                      paddingBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: isSelected ? 7 : 4,
                        height: isSelected ? 42 : 26,
                        backgroundColor: isSelected
                          ? THEME.accent
                          : THEME.primary,
                      }}
                    />

                    <div
                      style={{
                        fontFamily: THEME.fontMono,
                        fontSize: isSelected ? 96 : 72,
                        fontWeight: 900,
                        color: isSelected
                          ? THEME.accent
                          : isStart
                          ? THEME.primary
                          : inRange
                          ? THEME.accent
                          : THEME.secondary,
                        transform: `scale(${isSelected ? 1.18 : 1})`,
                      }}
                    >
                      {letter}
                    </div>

                    <div
                      style={{
                        fontFamily: THEME.fontMono,
                        fontSize: 38,
                        fontWeight: 900,
                        color: isSelected ? THEME.accent : THEME.secondary,
                      }}
                    >
                      {idx}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Stickman
            variant="scholar"
            label="Kalkulasi Pita"
            speech={
              !isSecondTape
                ? 'H (7) digeser +10 langkah berhenti di R (17)!'
                : 'E (4) digeser +4 langkah berhenti di I (8)!'
            }
            scale={1.15}
          />
        </div>
      )}

      {/* =====================================================================
          FRAME 1216 - 1459: WAVE SYMPHONY RIJVS UYVJN & REVERSE GEARS DECRYPT
         ===================================================================== */}
      {inSec5 && (
        <div
          style={{
            opacity: sec5Opacity,
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
                letterSpacing: 3,
              }}
            >
              {isReverseDecrypt
                ? 'PUTAR MUNDUR RODA GIGI (-KEY)'
                : 'SIMFONI HASIL ENKRIPSI VIGENÈRE'}
            </div>
            <div
              style={{
                fontSize: 66,
                fontWeight: 900,
                marginTop: 12,
                lineHeight: 1.15,
              }}
            >
              {isReverseDecrypt
                ? 'RIJVS UYVJN - KEY ➔ HELLO WORLD'
                : 'HELLOWORLD + KEY ➔ RIJVS UYVJN'}
            </div>
          </div>

          {/* 100% Centered Single-Line Wave Burst of RIJVS UYVJN (Huge 90px Font!) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              padding: '32px 0',
            }}
          >
            {CIPHER_SPACED.map((ch, idx) => {
              if (ch === ' ') {
                return <div key={idx} style={{ width: 24, flexShrink: 0 }} />;
              }

              const burstSpring = spring({
                frame: Math.max(0, frame - (1222 + idx * 8)),
                fps,
                config: { damping: 10, stiffness: 140 },
              });
              const waveYOffset = Math.sin((frame - idx * 5) / 6) * 20;
              const plainEquivalent = 'HELLO WORLD'[idx];

              return (
                <div
                  key={idx}
                  style={{
                    width: 88,
                    flexShrink: 0,
                    textAlign: 'center',
                    fontFamily: THEME.fontMono,
                    fontSize: 90,
                    fontWeight: 900,
                    color: isReverseDecrypt ? THEME.primary : THEME.accent,
                    transform: `translateY(${waveYOffset}px) scale(${burstSpring})`,
                    textShadow: isReverseDecrypt
                      ? 'none'
                      : '0 14px 32px rgba(249, 115, 22, 0.38)',
                  }}
                >
                  {isReverseDecrypt && reversePull > 0.5
                    ? plainEquivalent
                    : ch}
                </div>
              );
            })}
          </div>

          {/* Spinning KEY Gears & Stickman Guide Beneath */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 36,
            }}
          >
            <Stickman
              variant="mechanic"
              pose="celebrate"
              label="Hasil Vigenère"
              scale={1.08}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(0.88) translateY(${floatY}px)`,
              }}
            >
              <div style={{ marginRight: -20 }}>
                <GearSVG
                  letter="K"
                  subLabel={isReverseDecrypt ? '-10' : '+10'}
                  radius={105}
                  rotation={isReverseDecrypt ? -frame * 2.2 : frame * 1.2}
                  color={THEME.accent}
                />
              </div>
              <div style={{ marginTop: 75, zIndex: 3 }}>
                <GearSVG
                  letter="E"
                  subLabel={isReverseDecrypt ? '-4' : '+4'}
                  radius={95}
                  rotation={isReverseDecrypt ? frame * 2.2 : -frame * 1.2}
                  color={THEME.primary}
                />
              </div>
              <div style={{ marginLeft: -20 }}>
                <GearSVG
                  letter="Y"
                  subLabel={isReverseDecrypt ? '-24' : '+24'}
                  radius={105}
                  rotation={isReverseDecrypt ? -frame * 2.2 : frame * 1.2}
                  color={THEME.accent}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Video (100% Untouched Timing) */}
      <MemberVideo
        src="assets/videos/03_Edward.mp4"
        startFromFrame={9}
        endAtFrame={1605}
        memberName="Edward"
        topicTag="03 / VIGENÈRE CIPHER"
        showFaceRanges={[
          [0, 155],
          [1460, 1596],
        ]}
      />
    </AbsoluteFill>
  );
};

export default VigenereScene;
