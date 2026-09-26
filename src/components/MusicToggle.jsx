import { useRef, useEffect } from 'react';
import { musicSrc } from '../config';

export default function MusicToggle() {
  const audioRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    const playAudio = () => {
      if (!hasStarted.current && audioRef.current) {
        audioRef.current.play().then(() => {
          hasStarted.current = true;
          // Clean up listeners once playing
          document.removeEventListener('click', playAudio);
          document.removeEventListener('touchstart', playAudio);
        }).catch(() => {});
      }
    };

    // Browsers require user interaction before playing audio
    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Return nothing since we don't want to show the mute/unmute button
  return null;
}
