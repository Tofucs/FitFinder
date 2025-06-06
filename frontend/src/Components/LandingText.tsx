import React from 'react'

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"

const messages = [
  "Check your daily outfits with instant feedback",
  "Save your favorite looks to your style board",
  "Level up your fashion game with AI insights",
  "Join a style community that supports your vibe",
]

export default function LandingText() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mountTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => {
      clearTimeout(mountTimeout);
    };
  }, []);

  useEffect(() => {
    let cycleTimeout: ReturnType<typeof setTimeout>;
    let transitionTimeout: ReturnType<typeof setTimeout>;

    if (!visible) {
      transitionTimeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 600);
    } else {
      cycleTimeout = setTimeout(() => {
        setVisible(false);
      }, 3500);
    }

    return () => {
      clearTimeout(cycleTimeout);
      clearTimeout(transitionTimeout);
    };
  }, [visible]);

  const currentWords = messages[index].split(" ")

  return (
    <div className="split-text-wrapper">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={index}
            className="split-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {currentWords.map((word, i) => (
              <motion.span
                key={i}
                className="split-word"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .split-text-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 800px;
          height: 120px;
          font-size: 2.2rem;
          font-weight: 800;
          color: white;
          overflow: hidden;
          pointer-events: none; /* allow clicks to pass through */

        }

        .split-line {
          display: inline-block;
        }

        .split-word {
          display: inline-block;
          will-change: transform, opacity;
        }
        

      `}</style>
    </div>
  )
}
