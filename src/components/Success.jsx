import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { herName, yourName } from '../config';

function BigSuccessHeart() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.2 }}
      className="heartbeat"
      style={{ fontSize: 'clamp(4rem, 14vw, 8rem)', display: 'inline-block' }}
    >
      ❤️
    </motion.div>
  );
}

export default function Success({ onReplay }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const shoot = (origin) =>
      confetti({
        particleCount: 80,
        spread:        70,
        origin,
        colors:        ['#fb7185', '#e11d48', '#fda4af', '#fff1f2', '#fce7f3'],
        gravity:       0.8,
        scalar:        1.1,
      });

    shoot({ x: 0.1, y: 0.7 });
    shoot({ x: 0.9, y: 0.7 });
    setTimeout(() => shoot({ x: 0.5, y: 0.6 }), 350);
    setTimeout(() => {
      shoot({ x: 0.2, y: 0.5 });
      shoot({ x: 0.8, y: 0.5 });
    }, 700);
    setTimeout(() => shoot({ x: 0.5, y: 0.4 }), 1100);
  }, []);

  return (
    <section
      id="success-section"
      style={{
        minHeight:      '100dvh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 3rem)',
        position:       'relative',
        zIndex:         10,
        textAlign:      'center',
      }}
    >
      {/* Radial glow background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:     'absolute',
          inset:        0,
          background:   'radial-gradient(ellipse at center, rgba(251,113,133,0.2) 0%, transparent 65%)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass"
        style={{
          borderRadius: '2.5rem',
          padding:      'clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 6vw, 5rem)',
          maxWidth:     '640px',
          width:        '100%',
          position:     'relative',
          zIndex:       1,
          textAlign:    'center',
        }}
      >
        <BigSuccessHeart />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          style={{
            fontFamily:          'var(--font-serif)',
            fontSize:            'clamp(2rem, 6vw, 3.8rem)',
            fontWeight:          700,
            lineHeight:          1.1,
            margin:              '1rem 0 1.2rem',
            background:          'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip:      'text',
          }}
        >
          I KNEW IT! ❤️🥹
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            width:      '60px',
            height:     '2px',
            background: 'linear-gradient(90deg, transparent, #e11d48, transparent)',
            margin:     '0 auto 1.5rem',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          style={{
            fontFamily:   'var(--font-sans)',
            fontSize:     'clamp(1rem, 2.5vw, 1.18rem)',
            lineHeight:   1.75,
            color:        '#4a1525',
            fontWeight:   300,
            marginBottom: '0.8rem',
          }}
        >
          You just made my day, my week, and probably my entire year.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          style={{
            fontFamily:   'var(--font-sans)',
            fontSize:     'clamp(0.95rem, 2.2vw, 1.08rem)',
            lineHeight:   1.75,
            color:        '#6b2d3e',
            fontWeight:   300,
            marginBottom: '0.8rem',
          }}
        >
          Looks like we're officially starting our story. ❤️
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          style={{
            fontFamily:   'var(--font-sans)',
            fontSize:     'clamp(0.85rem, 1.8vw, 0.95rem)',
            color:        '#9f1239',
            fontStyle:    'italic',
            marginBottom: '2.5rem',
          }}
        >
          — with love, {yourName} 💌
        </motion.p>

        <motion.button
          id="replay-btn"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          onClick={onReplay}
          className="btn-shimmer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding:      '0.85rem 2.2rem',
            borderRadius: '99px',
            border:       'none',
            background:   'linear-gradient(135deg, rgba(251,113,133,0.15) 0%, rgba(225,29,72,0.12) 100%)',
            color:        '#e11d48',
            fontFamily:   'var(--font-sans)',
            fontSize:     '0.95rem',
            fontWeight:   600,
            cursor:       'pointer',
            border:       '1.5px solid rgba(225,29,72,0.25)',
            letterSpacing:'0.02em',
          }}
        >
          Replay ✨
        </motion.button>
      </motion.div>
    </section>
  );
}
