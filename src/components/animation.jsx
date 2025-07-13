import React, { useState, useEffect } from 'react';

export const AnimatedTitle = ({ title }) => {
  const [displayText, setDisplayText] = useState('');
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    let interval = null;
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      setDisplayText(
        title
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return title[index];
            }
          
            return letters[Math.floor(Math.random() * 26)]
          })
          .join("")
      );
      
      if(iteration >= title.length){ 
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, [title]);

  return (
    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tighter">
      {displayText}
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