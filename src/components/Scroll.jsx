import React from 'react';
import { interpolate } from 'remotion';
import { THEME } from '../Composition';

export const Scroll = ({
  openProgress = 1,
  progress,
  width = 760,
  height = 420,
  children,
  text,
  subtext,
  style = {},
}) => {
  const actualProgress = progress !== undefined ? progress : openProgress;
  const clamped = interpolate(actualProgress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bodyWidth = interpolate(clamped, [0, 1], [40, width]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* Left Roller */}
      <div
        style={{
          width: 44,
          height: height + 56,
          backgroundColor: THEME.accent,
          border: `5px solid ${THEME.primary}`,
          borderRadius: 22,
          boxShadow: '0 12px 24px rgba(23,23,23,0.12)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: THEME.white,
            border: `3px solid ${THEME.primary}`,
          }}
        />
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: THEME.white,
            border: `3px solid ${THEME.primary}`,
          }}
        />
      </div>

      {/* Unrolling Parchment Body */}
      <div
        style={{
          width: bodyWidth,
          height,
          backgroundColor: THEME.white,
          borderTop: `5px solid ${THEME.primary}`,
          borderBottom: `5px solid ${THEME.primary}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 20px 50px rgba(23,23,23,0.08)',
        }}
      >
        {/* Decorative top & bottom dashed guide lines */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 32,
            right: 32,
            height: 3,
            backgroundColor: THEME.bg,
            borderTop: `2px dashed ${THEME.secondary}`,
            opacity: 0.4,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 32,
            right: 32,
            height: 3,
            backgroundColor: THEME.bg,
            borderBottom: `2px dashed ${THEME.secondary}`,
            opacity: 0.4,
          }}
        />

        <div
          style={{
            opacity: interpolate(clamped, [0.35, 0.85], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            width: width - 64,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 24,
          }}
        >
          {children ? (
            children
          ) : (
            <>
              {text && (
                <div
                  style={{
                    fontFamily: THEME.fontMono,
                    fontSize: 54,
                    fontWeight: 800,
                    color: THEME.primary,
                    letterSpacing: 4,
                  }}
                >
                  {text}
                </div>
              )}
              {subtext && (
                <div
                  style={{
                    marginTop: 14,
                    fontSize: 26,
                    fontWeight: 600,
                    color: THEME.secondary,
                  }}
                >
                  {subtext}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Roller */}
      <div
        style={{
          width: 44,
          height: height + 56,
          backgroundColor: THEME.accent,
          border: `5px solid ${THEME.primary}`,
          borderRadius: 22,
          boxShadow: '0 12px 24px rgba(23,23,23,0.12)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: THEME.white,
            border: `3px solid ${THEME.primary}`,
          }}
        />
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: THEME.white,
            border: `3px solid ${THEME.primary}`,
          }}
        />
      </div>
    </div>
  );
};

export default Scroll;
