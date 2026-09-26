import { useRef, useState, useEffect } from 'react';
import { musicSrc } from '../config';

export default function MusicToggle() {
  const audioRef  = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    const audio = new Audio(musicSrc);
    audio.loop   = true;
    audio.volume = 0.35;
    audio.addEventListener('canplaythrough', () => setLoaded(true));
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      id="music-toggle-btn"
      onClick={toggle}
      title={playing ? 'Pause music' : 'Play music'}
      style={{
        position:    'fixed',
        bottom:      '1.5rem',
        right:       '1.5rem',
        zIndex:      9999,
        width:       '3rem',
        height:      '3rem',
        borderRadius:'50%',
        border:      '1.5px solid rgba(244,63,94,0.35)',
        background:  'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(12px)',
        cursor:      'pointer',
        fontSize:    '1.3rem',
        display:     'flex',
        alignItems:  'center',
        justifyContent:'center',
        boxShadow:   '0 4px 20px rgba(244,63,94,0.18)',
        transition:  'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <span style={{ filter: playing ? 'none' : 'grayscale(0.6)' }}>
        {playing ? '🎵' : '🔇'}
      </span>
    </button>
  );
}
