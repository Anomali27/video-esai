import React from 'react';
import { interpolate } from 'remotion';
import { THEME } from '../Composition';

export const CipherLetters = ({
  fromText = 'HELLO WORLD',
  toText = 'KHOOR ZRUOG',
  progress = 0,
  stepLabel = '+3',
  showRuleOnActive = true,
  style = {},
}) => {
  const chars = fromText.split('');
  const targetChars = toText.split('');
  const nonSpaceCount = chars.filter((c) => c !== ' ').length;

  let letterIdx = 0;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        ...style,
      }}
    >
      {chars.map((char, index) => {
        if (char === ' ') {
          return <div key={index} style={{ width: 20, flexShrink: 0 }} />;
        }

        const currentLetterOrder = letterIdx;
        letterIdx += 1;

        const startThreshold = currentLetterOrder / nonSpaceCount;
        const endThreshold = (currentLetterOrder + 1) / nonSpaceCount;

        const charProgress = interpolate(
          progress,
          [startThreshold, endThreshold],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const isTransformed = charProgress >= 0.5;
        const isCurrentlyActive = charProgress > 0.05 && charProgress < 0.95;
        const flipScaleY = Math.abs(Math.cos(charProgress * Math.PI));

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            {showRuleOnActive && (
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 18,
                  fontWeight: 800,
                  fontFamily: THEME.fontMono,
                  color: isTransformed ? THEME.accent : THEME.secondary,
                  opacity: charProgress > 0 ? 1 : 0.35,
                  transform: `translateY(${isCurrentlyActive ? -6 : 0}px)`,
                }}
              >
                {stepLabel}
              </div>
            )}

            <div
              style={{
                width: 66,
                height: 84,
                borderRadius: 16,
                backgroundColor: isTransformed ? THEME.accent : THEME.white,
                color: isTransformed ? THEME.white : THEME.primary,
                border: `4px solid ${THEME.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: THEME.fontMono,
                fontSize: 40,
                fontWeight: 900,
                transform: `scaleY(${Math.max(0.15, flipScaleY)}) scale(${
                  isCurrentlyActive ? 1.1 : 1
                })`,
                boxShadow: isCurrentlyActive
                  ? '0 12px 24px rgba(249, 115, 22, 0.35)'
                  : `5px 5px 0px ${THEME.primary}`,
              }}
            >
              {isTransformed ? targetChars[index] : char}
            </div>

            <div
              style={{
                marginTop: 8,
                fontFamily: THEME.fontMono,
                fontSize: 18,
                fontWeight: 800,
                color: THEME.secondary,
                opacity: isTransformed ? 0.95 : 0.45,
              }}
            >
              {char}→{targetChars[index]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CipherLetters;
