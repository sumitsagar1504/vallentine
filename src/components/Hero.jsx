import { useState } from 'react';
import { motion } from 'framer-motion';
import { herName } from '../config';

/* ── Animated SVG Heart ── */
function BigHeart({ onClick, easterPop }) {
  return (
    <motion.div
      id="hero-heart"
      onClick={onClick}
      style={{ cursor: 'pointer', display: 'inline-block', position: 'relative', userSelect: 'none' }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      animate={easterPop ? { scale: [1, 1.5, 0.85, 1.2, 1], rotate: [0, -10, 10, -5, 0] } : {}}
      transition={easterPop ? { duration: 0.55 } : { type: 'spring', stiffness: 300 }}
      className={!easterPop ? 'heartbeat' : ''}
    >
      {/* Pulse rings */}
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{
            position:     'absolute',
            inset:        '-22%',
            borderRadius: '50%',
            border:       '2px solid rgba(244,63,94,0.22)',
            pointerEvents:'none',
          }}
          animate={{ scale: [0.9, 1.55], opacity: [0.45, 0] }}
          transition={{ duration: 2.2, delay: i * 0.72, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      <svg
        viewBox="0 0 100 90"
        width="110"
        height="100"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(244,63,94,0.45))' }}
        aria-label="Heart"
      >
        <defs>
          <linearGradient id="heroHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ff6b8a" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        <path
          d="M50 85 C50 85 5 55 5 28 C5 14 16 5 28 5 C36 5 44 10 50 18 C56 10 64 5 72 5 C84 5 95 14 95 28 C95 55 50 85 50 85Z"
          fill="url(#heroHeartGrad)"
        />
        <ellipse cx="35" cy="25" rx="10" ry="6" fill="rgba(255,255,255,0.22)" transform="rotate(-30,35,25)" />
      </svg>
    </motion.div>
  );
}

export default function Hero({ onNext }) {
  const [clicks,    setClicks]    = useState(0);
  const [easterPop, setEasterPop] = useState(false);

  const handleHeartClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next % 5 === 0) {
      setEasterPop(true);
      setTimeout(() => setEasterPop(false), 600);
    }
  };

  return (
    <section
      id="hero-section"
      style={{
        minHeight:      '100dvh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '2rem',
        position:       'relative',
        zIndex:         10,
        textAlign:      'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.8rem' }}
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '0.4rem',
            padding:       '0.35rem 1rem',
            borderRadius:  '99px',
            background:    'rgba(225,29,72,0.08)',
            border:        '1px solid rgba(225,29,72,0.18)',
            fontFamily:    'var(--font-sans)',
            fontSize:      '0.72rem',
            fontWeight:    500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         '#e11d48',
          }}
        >
          <span>💌</span> A little something for you
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily:          'var(--font-serif)',
            fontSize:            'clamp(2.6rem, 7vw, 5rem)',
            fontWeight:          700,
            lineHeight:          1.1,
            background:          'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip:      'text',
          }}
        >
          Hey {herName}… ❤️
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.9 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize:   'clamp(1rem, 2.5vw, 1.22rem)',
            fontWeight: 300,
            color:      '#6b2d3e',
            maxWidth:   '440px',
            lineHeight: 1.7,
          }}
        >
          There's something I've been meaning to ask you.
        </motion.p>

        {/* Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, duration: 0.7, type: 'spring', stiffness: 240, damping: 18 }}
        >
          <BigHeart onClick={handleHeartClick} easterPop={easterPop} />
        </motion.div>

        {/* Easter-egg message */}
        <motion.p
          animate={{ opacity: clicks >= 5 ? 1 : 0, y: clicks >= 5 ? 0 : 8 }}
          transition={{ duration: 0.4 }}
          style={{
            fontFamily:  'var(--font-sans)',
            fontSize:    '0.85rem',
            color:       '#e11d48',
            fontStyle:   'italic',
            height:      '1.2rem',
          }}
        >
          {clicks >= 5 ? '✨ You found the Easter egg! I knew you were curious 🫶' : ''}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          id="open-heart-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          onClick={onNext}
          className="btn-shimmer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding:      '0.95rem 2.6rem',
            borderRadius: '99px',
            border:       'none',
            background:   'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
            color:        '#fff',
            fontFamily:   'var(--font-sans)',
            fontSize:     '1.05rem',
            fontWeight:   600,
            cursor:       'pointer',
            boxShadow:    '0 6px 28px rgba(225,29,72,0.38), 0 1px 3px rgba(0,0,0,0.1)',
            letterSpacing:'0.02em',
          }}
        >
          Open My Heart 💌
        </motion.button>
      </motion.div>
    </section>
  );
}
