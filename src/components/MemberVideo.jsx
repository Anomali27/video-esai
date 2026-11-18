import React from 'react';
import {
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { THEME } from '../Composition';

export const MemberVideo = ({
  src,
  startFromFrame = 0,
  endAtFrame,
  memberName,
  topicTag,
  showFaceRanges = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeRange = showFaceRanges.find(
    ([start, end]) => frame >= start - 10 && frame <= end + 10
  );

  let opacity = 0;
  if (activeRange) {
    const [s, e] = activeRange;
    opacity = interpolate(
      frame,
      [s - 8, s, e, e + 8],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
  }

  const scale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const floatY = Math.sin(frame / 12) * 8;
  const orbitDeg = frame * 0.6;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        opacity,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {/* Rotating Orbital Rings Behind Portrait (100% Centered at 540, 960) */}
      <svg
        width="1040"
        height="1580"
        viewBox="0 0 1040 1580"
        style={{
          position: 'absolute',
          pointerEvents: 'none',
        }}
      >
        <g transform={`translate(520, 790) rotate(${orbitDeg})`}>
          <ellipse
            cx="0"
            cy="0"
            rx="475"
            ry="690"
            fill="none"
            stroke={THEME.accent}
            strokeWidth="4.5"
            strokeDasharray="28 18"
            opacity="0.55"
          />
          <circle cx="475" cy="0" r="14" fill={THEME.accent} />
          <circle cx="-475" cy="0" r="12" fill={THEME.primary} />
        </g>
        <g transform={`translate(520, 790) rotate(${-orbitDeg * 0.7})`}>
          <ellipse
            cx="0"
            cy="0"
            rx="445"
            ry="655"
            fill="none"
            stroke={THEME.primary}
            strokeWidth="3"
            strokeDasharray="12 20"
            opacity="0.3"
          />
        </g>
      </svg>

      {/* Large Organic Floating Topic Ribbon */}
      <div
        style={{
          backgroundColor: THEME.accent,
          color: THEME.white,
          padding: '18px 50px',
          borderRadius: 999,
          fontSize: 38,
          fontWeight: 900,
          letterSpacing: 2,
          marginBottom: 32,
          transform: `translateY(${floatY * 0.6}px)`,
          boxShadow: '0 16px 36px rgba(249, 115, 22, 0.35)',
        }}
      >
        {topicTag}
      </div>

      {/* Large 100% Centered Organic Arch Portrait Container */}
      <div
        style={{
          width: 860,
          height: 1280,
          borderRadius: '430px 430px 180px 180px',
          overflow: 'hidden',
          backgroundColor: THEME.white,
          boxShadow:
            '0 32px 80px rgba(23, 23, 23, 0.22), 0 0 0 12px rgba(249, 115, 22, 0.25)',
          transform: `scale(${scale}) translateY(${floatY}px)`,
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          startFrom={startFromFrame}
          endAt={endAtFrame}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Large Speaker Signature Pill */}
      <div
        style={{
          marginTop: -34,
          backgroundColor: THEME.primary,
          color: THEME.white,
          padding: '20px 64px',
          borderRadius: 999,
          fontSize: 46,
          fontWeight: 900,
          letterSpacing: 1,
          transform: `translateY(${floatY}px)`,
          boxShadow: '0 18px 40px rgba(23, 23, 23, 0.28)',
          zIndex: 3,
        }}
      >
        {memberName}
      </div>
    </div>
  );
};
