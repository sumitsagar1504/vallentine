import { motion } from 'framer-motion';
import { reasons } from '../config';

const ICONS = ['😊', '✨', '🌸', '🎶', '💖'];

function ReasonCard({ title, body, icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(244,63,94,0.2)' }}
      className="glass"
      style={{
        borderRadius: '1.5rem',
        padding:      'clamp(1.4rem, 3vw, 2rem)',
        textAlign:    'center',
        cursor:       'default',
        transition:   'box-shadow 0.3s ease',
        flex:         '1 1 220px',
        maxWidth:     '260px',
      }}
    >
      {/* Icon circle */}
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
        transition={{ duration: 0.4 }}
        style={{
          width:          '3.2rem',
          height:         '3.2rem',
          borderRadius:   '50%',
          background:     'linear-gradient(135deg, rgba(251,113,133,0.18) 0%, rgba(225,29,72,0.1) 100%)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '1.5rem',
          margin:         '0 auto 1rem',
          border:         '1px solid rgba(225,29,72,0.15)',
        }}
      >
        {icon}
      </motion.div>

      <h3
        style={{
          fontFamily:   'var(--font-serif)',
          fontSize:     '1.1rem',
          fontWeight:   600,
          color:        '#9f1239',
          marginBottom: '0.6rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily:  'var(--font-sans)',
          fontSize:    '0.9rem',
          lineHeight:  1.65,
          color:       '#6b2d3e',
          fontWeight:  300,
        }}
      >
        {body}
      </p>
    </motion.div>
  );
}

export default function Reasons({ onNext }) {
  return (
    <section
      id="reasons-section"
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
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        <p style={{
          fontFamily:    'var(--font-sans)',
          fontSize:      '0.75rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color:         '#e11d48',
          marginBottom:  '0.75rem',
          fontWeight:    500,
        }}>
          A few reasons ❤️
        </p>
        <h2 style={{
          fontFamily:          'var(--font-serif)',
          fontSize:            'clamp(2rem, 5vw, 3.2rem)',
          fontWeight:          700,
          background:          'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip:      'text',
          lineHeight:          1.15,
          marginBottom:        '0.5rem',
        }}>
          Why You, Specifically
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize:   'clamp(0.95rem, 2vw, 1.05rem)',
          color:      '#6b2d3e',
          fontWeight: 300,
          maxWidth:   '420px',
          margin:     '0 auto',
        }}>
          Just in case you needed reminding…
        </p>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display:        'flex',
        flexWrap:       'wrap',
        gap:            '1.2rem',
        justifyContent: 'center',
        maxWidth:       '860px',
        width:          '100%',
        marginBottom:   'clamp(2.5rem, 6vw, 4rem)',
      }}>
        {reasons.map((r, i) => (
          <ReasonCard
            key={i}
            title={r.title}
            body={r.body}
            icon={ICONS[i % ICONS.length]}
            index={i}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.button
        id="continue-to-proposal-btn"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.7 }}
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
          boxShadow:    '0 6px 28px rgba(225,29,72,0.38)',
          letterSpacing:'0.02em',
        }}
      >
        And now… the question 💌
      </motion.button>
    </section>
  );
}
