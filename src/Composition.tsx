import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { Opening } from './scenes/Opening';
import { CaesarScene } from './scenes/CaesarScene';
import { AtbashScene } from './scenes/AtbashScene';
import { VigenereScene } from './scenes/VigenereScene';
import { AESScene } from './scenes/AESScene';
import { Closing } from './scenes/Closing';

export const THEME = {
  bg: '#F8F7F3',
  primary: '#171717',
  secondary: '#737373',
  accent: '#F97316',
  white: '#FFFFFF',
  fontSans: 'Inter, Poppins, sans-serif',
  fontMono: '"JetBrains Mono", monospace',
};

// 100% Centered Full-Canvas Layout (No off-center safe-zone shifts!)
export const SAFE_ZONE_STYLE = {
  position: 'absolute' as const,
  inset: 0,
  padding: '64px 36px',
  boxSizing: 'border-box' as const,
};

const OrganicStoryCanvas = () => {
  const frame = useCurrentFrame();
  const slowSpin = frame * 0.18;
  const dashFlow = -frame * 1.6;
  const breathScale = 1 + Math.sin(frame / 32) * 0.04;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Rich Warm Editorial Aurora Glows */}
      <div
        style={{
          position: 'absolute',
          top: -140,
          left: -140,
          width: 900,
          height: 900,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, rgba(249, 115, 22, 0) 70%)',
          transform: `scale(${breathScale})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -160,
          right: -140,
          width: 960,
          height: 960,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(249, 115, 22, 0.14) 0%, rgba(249, 115, 22, 0) 72%)',
          transform: `scale(${2 - breathScale})`,
        }}
      />

      {/* Subtle Fine Dot Paper Texture */}
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(#171717 1.6px, transparent 1.6px)',
          backgroundSize: '36px 36px',
          opacity: 0.075,
        }}
      />

      {/* Flowing Topographic & Orbital Contour Curves Centered at (540, 960) */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', inset: 0, opacity: 0.1 }}
      >
        <path
          d="M -100 300 C 260 160, 720 460, 1180 240"
          fill="none"
          stroke={THEME.primary}
          strokeWidth="3"
          strokeDasharray="16 14"
          strokeDashoffset={dashFlow}
        />
        <path
          d="M -80 960 C 340 780, 740 1140, 1160 920"
          fill="none"
          stroke={THEME.accent}
          strokeWidth="3.5"
          strokeDasharray="24 16"
          strokeDashoffset={-dashFlow}
        />
        <path
          d="M -100 1620 C 300 1480, 780 1760, 1180 1540"
          fill="none"
          stroke={THEME.primary}
          strokeWidth="3"
          strokeDasharray="16 14"
          strokeDashoffset={dashFlow}
        />

        {/* Large Slow-Rotating Astrolabe Centered at (540, 960) */}
        <g transform={`translate(540, 960) rotate(${slowSpin})`} opacity="0.7">
          <circle
            cx="0"
            cy="0"
            r="470"
            fill="none"
            stroke={THEME.primary}
            strokeWidth="2"
            strokeDasharray="10 16"
          />
          <circle
            cx="0"
            cy="0"
            r="350"
            fill="none"
            stroke={THEME.accent}
            strokeWidth="2.5"
            strokeDasharray="42 24"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const CryptographyStory = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.bg,
        fontFamily: THEME.fontSans,
        color: THEME.primary,
      }}
    >
      {/* Organic Open-Canvas Background */}
      <OrganicStoryCanvas />

      {/* Backsound Audio with Audible Ducking */}
      <Audio
        src={staticFile('assets/audio/bgm.mp3')}
        loop
        volume={(f) =>
          interpolate(
            f,
            [0, 110, 125, 4595, 4610, 4770, 4800],
            [0.36, 0.36, 0.15, 0.15, 0.36, 0.36, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
        }
      />

      <Sequence durationInFrames={120}>
        <Opening />
      </Sequence>

      <Sequence from={120} durationInFrames={990}>
        <CaesarScene />
      </Sequence>

      <Sequence from={1110} durationInFrames={864}>
        <AtbashScene />
      </Sequence>

      <Sequence from={1974} durationInFrames={1596}>
        <VigenereScene />
      </Sequence>

      <Sequence from={3570} durationInFrames={1032}>
        <AESScene />
      </Sequence>

      <Sequence from={4602} durationInFrames={198}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
