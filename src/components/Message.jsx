import { motion } from 'framer-motion';
import { customMessage, customMessage2 } from '../config';

export default function Message({ onNext }) {
  return (
    <section
      id="message-section"
      style={{
        minHeight:      '100dvh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        'clamp(1.5rem, 5vw, 3rem)',
        position:       'relative',
        zIndex:         10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="glass"
        style={{
          maxWidth:     '620px',
          width:        '100%',
          borderRadius: '2rem',
          padding:      'clamp(2rem, 6vw, 3.5rem)',
          textAlign:    'center',
          position:     'relative',
          overflow:     'hidden',
        }}
      >
        {/* Decorative orb */}
        <div style={{
          position:   'absolute',
          top:        '-60px',
          right:      '-60px',
          width:      '200px',
          height:     '200px',
          borderRadius:'50%',
          background: 'radial-gradient(circle, rgba(251,113,133,0.18) 0%, transparent 70%)',
          pointerEvents:'none',
        }} />
        <div style={{
          position:   'absolute',
          bottom:     '-50px',
          left:       '-50px',
          width:      '160px',
          height:     '160px',
          borderRadius:'50%',
          background: 'radial-gradient(circle, rgba(225,29,72,0.12) 0%, transparent 70%)',
          pointerEvents:'none',
        }} />

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 16 }}
          style={{ fontSize: '3rem', marginBottom: '1.2rem', display: 'block' }}
        >
          💌
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily:          'var(--font-serif)',
            fontSize:            'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight:          600,
            lineHeight:          1.2,
            marginBottom:        '1.5rem',
            background:          'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip:      'text',
          }}
        >
          Before I ask…
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            width:      '60px',
            height:     '2px',
            background: 'linear-gradient(90deg, transparent, #e11d48, transparent)',
            margin:     '0 auto 1.8rem',
          }}
        />

        {/* Message paragraph 1 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            fontFamily:   'var(--font-sans)',
            fontSize:     'clamp(0.98rem, 2.2vw, 1.12rem)',
            lineHeight:   1.8,
            color:        '#4a1525',
            marginBottom: '1.4rem',
            fontWeight:   300,
            fontStyle:    'italic',
          }}
        >
          "{customMessage}"
        </motion.p>

        {/* Message paragraph 2 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.8 }}
          style={{
            fontFamily:   'var(--font-sans)',
            fontSize:     'clamp(0.95rem, 2vw, 1.05rem)',
            lineHeight:   1.75,
            color:        '#6b2d3e',
            marginBottom: '2.2rem',
            fontWeight:   300,
          }}
        >
          {customMessage2}
        </motion.p>

        {/* CTA */}
        <motion.button
          id="one-last-question-btn"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
          onClick={onNext}
          className="btn-shimmer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding:      '0.9rem 2.4rem',
            borderRadius: '99px',
            border:       'none',
            background:   'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
            color:        '#fff',
            fontFamily:   'var(--font-sans)',
            fontSize:     '1rem',
            fontWeight:   600,
            cursor:       'pointer',
            boxShadow:    '0 6px 24px rgba(225,29,72,0.35)',
            letterSpacing:'0.02em',
          }}
        >
          One Last Question ❤️
        </motion.button>
      </motion.div>
    </section>
  );
}
