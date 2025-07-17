import { useState, useEffect } from 'react';

export const useSound = (url: string, play: boolean, volume: number = 1.0) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  useEffect(() => {
    if (play && !isPlaying) {
      audio.play().then(() => setIsPlaying(true));
    }
  }, [play, isPlaying, audio]);

  useEffect(() => {
    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnd);
    return () => {
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audio]);

  useEffect(() => {
      if(!play && isPlaying) {
          audio.pause();
          audio.currentTime = 0;
          setIsPlaying(false);
      }
  }, [play, isPlaying, audio]);
}; 