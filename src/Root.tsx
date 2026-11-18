import { Composition } from 'remotion';
import { CryptographyStory } from './Composition';

export const RemotionRoot = () => {
  return (
    <Composition
      id="CryptographyStory"
      component={CryptographyStory}
      durationInFrames={4800}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};