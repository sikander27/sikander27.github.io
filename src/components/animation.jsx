import React, { useState, useEffect } from 'react';
// --- ANIMATION COMPONENTS ---
export const AnimatedTitle = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const phrases = ["I am a Problem Solver", "love everything about code", "Senior Software Engineer"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && text === fullText) {
        // Pause at end of word
        if (i === phrases.length - 1) {
            // Last phrase, so we stop here
            return;
        }
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, typingSpeed]);

  return (
    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tighter h-20">
      {text}
      <span className="border-r-2 border-slate-900 dark:border-slate-200 animate-pulse"></span>
    </h2>
  );
};

export const GlowStyle = () => (
  <style>{`
    .glow-card::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(22, 163, 74, 0.15),
            transparent 80%
        );
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 0;
    }
    .dark .glow-card::before {
        background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(34, 197, 94, 0.2),
            transparent 80%
        );
    }
    .glow-card:hover::before {
        opacity: 1;
    }
  `}</style>
);