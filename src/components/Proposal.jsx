import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { herName, proposalSubheading } from '../config';

const NO_MESSAGES = [
  "Are you sure? 🥺",
  "Think again 😭",
  "Really? 🙈",
  "Give me one chance? 🥹",
  "That button seems suspiciously difficult to click 👀",
  "Hmm… maybe reconsider? 🫣",
  "You sure sure? 😅",
];

function SparkleParticle({ x, y }) {
  return (
    <motion.div
      style={{
        position:    'fixed',
        left:        x,
        top:         y,
        pointerEvents:'none',
        zIndex:      9000,
        fontSize:    '1.2rem',
      }}
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 1.4, x: (Math.random() - 0.5) * 80, y: -60 - Math.random() * 40 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {['💕', '✨', '🌸', '💖'][Math.floor(Math.random() * 4)]}
    </motion.div>
  );
}

export default function Proposal({ onYes, onNoFinal }) {
  const [noCount,    setNoCount]    = useState(0);
  const [noPos,      setNoPos]      = useState({ x: 0, y: 0 });
  const [sparks,     setSparks]     = useState([]);
  const [showGiveUp, setShowGiveUp] = useState(false);
  const noRef = useRef(null);
  const containerRef = useRef(null);

  const spawnSparks = (x, y) => {
    const id = Date.now();
    setSparks(p => [...p, { id, x, y }]);
    setTimeout(() => setSparks(p => p.filter(s => s.id !== id)), 900);
  };

  const handleYes = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setTimeout(onYes, 200);
  };

  const handleNoHover = useCallback(() => {
    if (showGiveUp) return;
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const nRect = noRef.current?.getBoundingClientRect();
    const nW = nRect?.width  ?? 120;
    const nH = nRect?.height ?? 44;

    const maxX = cRect.width  - nW  - 20;
    const maxY = cRect.height - nH  - 20;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setNoPos({ x: newX, y: newY });
  }, [showGiveUp]);

  const handleNoClick = () => {
    const next = noCount + 1;
    setNoCount(next);
    if (next >= 7) setShowGiveUp(true);
  };

  const noLabel = showGiveUp
    ? "Fine... you win 😂"
    : NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];

  return (
    <section
      id="proposal-section"
      ref={containerRef}
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
      {/* Sparks */}
      <AnimatePresence>
        {sparks.map(s => <SparkleParticle key={s.id} x={s.x} y={s.y} />)}
      </AnimatePresence>

      {/* Background orb */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position:     'absolute',
          width:        'clamp(280px, 50vw, 500px)',
          height:       'clamp(280px, 50vw, 500px)',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(251,113,133,0.14) 0%, transparent 70%)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="glass"
        style={{
          borderRadius: '2.5rem',
          padding:      'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
          maxWidth:     '680px',
          width:        '100%',
          position:     'relative',
          zIndex:       1,
          overflow:     'visible',
        }}
      >
        {/* Large heart */}
        <motion.div
          className="heartbeat"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', marginBottom: '1rem', display: 'block' }}
        >
          ❤️
        </motion.div>

        {/* Main question */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontFamily:          'var(--font-serif)',
            fontSize:            'clamp(2rem, 6vw, 3.8rem)',
            fontWeight:          700,
            lineHeight:          1.1,
            marginBottom:        '1.2rem',
            background:          'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip:      'text',
          }}
        >
          {herName}, Will You Be Mine? ❤️
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.9 }}
          style={{
            fontFamily:   'var(--font-sans)',
            fontSize:     'clamp(0.92rem, 2vw, 1.05rem)',
            lineHeight:   1.75,
            color:        '#6b2d3e',
            fontWeight:   300,
            maxWidth:     '500px',
            margin:       '0 auto',
            marginBottom: 'clamp(2rem, 5vw, 3rem)',
          }}
        >
          {proposalSubheading}
        </motion.p>

        {/* Buttons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.7 }}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '1.5rem',
            flexWrap:       'wrap',
            position:       'relative',
            minHeight:      '80px',
          }}
        >
          {/* YES */}
          <motion.button
            id="yes-btn"
            onClick={handleYes}
            className="btn-shimmer"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94 }}
            style={{
              padding:       '1rem 3rem',
              borderRadius:  '99px',
              border:        'none',
              background:    'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
              color:         '#fff',
              fontFamily:    'var(--font-sans)',
              fontSize:      'clamp(1.1rem, 3vw, 1.4rem)',
              fontWeight:    700,
              cursor:        'pointer',
              boxShadow:     '0 8px 32px rgba(225,29,72,0.42)',
              letterSpacing: '0.02em',
            }}
          >
            YES ❤️
          </motion.button>

          {/* NO — moves away on hover */}
          <AnimatePresence mode="wait">
            {showGiveUp ? (
              <motion.div
                key="giveup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  fontFamily:  'var(--font-sans)',
                  fontSize:    '0.9rem',
                  color:       '#9f1239',
                  fontStyle:   'italic',
                  maxWidth:    '200px',
                  lineHeight:  1.5,
                }}
              >
                Okay okay… I'll stop bothering you 😂❤️
                <br />
                <button
                  id="try-again-btn"
                  onClick={() => { setNoCount(0); setNoPos({ x: 0, y: 0 }); setShowGiveUp(false); }}
                  style={{
                    marginTop:    '0.6rem',
                    background:   'none',
                    border:       '1px solid rgba(225,29,72,0.3)',
                    borderRadius: '99px',
                    padding:      '0.3rem 1rem',
                    cursor:       'pointer',
                    color:        '#e11d48',
                    fontSize:     '0.8rem',
                    fontFamily:   'var(--font-sans)',
                  }}
                >
                  Back to the question
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="no-btn"
                id="no-btn"
                ref={noRef}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onClick={handleNoClick}
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding:      '0.75rem 1.8rem',
                  borderRadius: '99px',
                  border:       '1.5px solid rgba(225,29,72,0.3)',
                  background:   'rgba(255,255,255,0.6)',
                  color:        '#9f1239',
                  fontFamily:   'var(--font-sans)',
                  fontSize:     'clamp(0.85rem, 2vw, 1rem)',
                  fontWeight:   500,
                  cursor:       'pointer',
                  backdropFilter:'blur(8px)',
                  transition:   'border-color 0.2s',
                }}
              >
                {noLabel}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
