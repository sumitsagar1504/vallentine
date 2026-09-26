import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import CursorGlow     from './components/CursorGlow';
import MusicToggle    from './components/MusicToggle';
import Hero           from './components/Hero';
import Message        from './components/Message';
import Reasons        from './components/Reasons';
import Proposal       from './components/Proposal';
import Success        from './components/Success';
import { yourName }   from './config';

const SECTIONS = ['hero', 'message', 'reasons', 'proposal', 'success'];

const pageVariants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  enter:   { opacity: 1, y: 0, scale: 1 },
  exit:    { opacity: 0, y: -30, scale: 0.98 },
};
const pageTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

export default function App() {
  const [section, setSection] = useState('hero');

  const go = useCallback((s) => setSection(s), []);

  const renderSection = () => {
    switch (section) {
      case 'hero':     return <Hero     key="hero"     onNext={() => go('message')} />;
      case 'message':  return <Message  key="message"  onNext={() => go('reasons')} />;
      case 'reasons':  return <Reasons  key="reasons"  onNext={() => go('proposal')} />;
      case 'proposal': return <Proposal key="proposal" onYes={() => go('success')} />;
      case 'success':  return <Success  key="success"  onReplay={() => go('hero')} />;
      default:         return null;
    }
  };

  return (
    <div
      className="bg-romantic"
      style={{
        minHeight:    '100dvh',
        position:     'relative',
        overflowX:    'hidden',
      }}
    >
      {/* Ambient layer */}
      <FloatingHearts />
      <CursorGlow />

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={pageTransition}
          style={{ width: '100%' }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Footer (always visible except hero on mobile) */}
      {section !== 'success' && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position:      'fixed',
            bottom:        '1rem',
            left:          '50%',
            transform:     'translateX(-50%)',
            fontFamily:    'var(--font-sans)',
            fontSize:      '0.72rem',
            color:         'rgba(159,18,57,0.55)',
            letterSpacing: '0.06em',
            pointerEvents: 'none',
            whiteSpace:    'nowrap',
            zIndex:        50,
          }}
        >
          Made with ❤️ by {yourName}
        </motion.footer>
      )}

      {/* Music toggle */}
      <MusicToggle />
    </div>
  );
}
