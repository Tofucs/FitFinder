import { useState, useEffect } from "react";
import React from 'react'
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function OpeningSequence() {
  const navigate = useNavigate();
  const [hideLanding, setHideLanding] = useState(false);
  const circlehaha = {
    width: 520,
    height: 520,
    background: "conic-gradient(from 0deg,rgb(171, 138, 227), #e52e71,rgb(171, 138, 227))",
    maskImage: "radial-gradient(circle, transparent 64%, black 41%)",
    WebkitMaskImage: "radial-gradient(circle, transparent 64%, black 41%)",
    borderRadius: "50%",
  }
  const circlehaha1 = {
    width: 340,
    height: 340,
    background: "conic-gradient(from 0deg,rgb(138, 193, 227),rgb(46, 229, 214),rgb(138, 193, 227))",
    maskImage: "radial-gradient(circle, transparent 60%, black 41%)",
    WebkitMaskImage: "radial-gradient(circle, transparent 60%, black 41%)",
    borderRadius: "50%",
  }


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideLanding(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
        <AnimatePresence>
            {!hideLanding && (
                <div className="container">
                    <motion.div
                    initial={{opacity:1}}
                    animate={{opacity:[0,1]}}
                    exit={{opacity: 0, transition: {duration: 0.6}}}>
                        <div className="fancy-camera">
                            
                            <div className="big-circle">
                                <motion.div 
                                    animate={{
                                        scale: [1, 1, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 0.9, 1, 1, 1],
                                        rotate: [0, 30, 60, 90, 80, 30, 60, 90, 120, 180, 240, 300, 360, 0]
                                      }}
                                      transition={{
                                        duration: 13,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 0
                                      }}
                                      style={circlehaha}>
                                </motion.div>
                            </div>

                            <div className="small-circle">
                                <motion.div
                                  animate={{
                                    scale: [1, 1, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 0.9, 1, 1, 1],
                                    rotate: [0, 30, 60, 90, 80, 30, 60, 90, 120, 180, 240, 300, 360, 0],
                                    x: [0, 0, 0, 0, 0, 30, 30, 30, 0, 0, 0, -30, -30, 0],
                                    y: [0, 0, 0, 0, 0, -15, -30, -20, 0, 0, 0, 20, 20, 0]
                                  }}
                                  transition={{
                                    duration: 13,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 0
                                  }}
                                  style={circlehaha1}>
                                </motion.div>
                            </div>

                            <div className="chunk">
                                <motion.svg
                                    width="300"
                                    height="150"
                                    viewBox="0 0 300 150"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    initial={{ strokeDasharray: 800, strokeDashoffset: 800 }}
                                    animate={{ strokeDashoffset: 0 }}
                                    transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                    }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <motion.path
                                    d="M 20 10 H 280 Q 290 10 290 20 V 130 Q 290 140 280 140 H 20 Q 10 140 10 130 V 20 Q 10 10 20 10 Z"
                                    stroke="rgb(199, 230, 255)"
                                    strokeWidth="10"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </motion.svg>
                            </div>
                        </div>
                        {/*end background deco*/}

                        {/*below is overlay title text n stuff*/}
                        <div className="title-container">
                            <h1>Fluffle!</h1>
                            <h2>daily fit checks</h2>
                            <motion.button
                            className="login-button"
                            onClick={() => navigate("/upload")}
                            whileHover={{ scale: 0.9 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                            Get Started
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </>
  )
}

function LandingPage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoverEffect, setHoverEffect] = useState(false);
  

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setHoverEffect(true);
  };

  
  

  const handleMouseLeave = () => {
    setHoverEffect(false);
  };

  return (
    <>
    <div className="container">
        <div className="home-text">
        <motion.div
            initial={{ opacity: 0, y: -150 }}
            animate={{ opacity: [0,1], y: [200, -40, 0] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fluffle-container"
        >
            {/* <div className="fluffle-word" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {"Fluffle!".split("").map((letter, index) => (
                <motion.span
                key={index}
                className="fluffle-letter"
                animate={
                    hoverEffect
                    ? {
                        x: (cursorPos.x - window.innerWidth / 2) * 0.01 * (index + 1),
                        y: (cursorPos.y - window.innerHeight / 2) * 0.01 * (index + 1),
                        }
                    : { x: 0, y: 0 }
                }
                transition={{ duration: 0.2, ease: "easeOut" }}
                >
                {letter}
                </motion.span>
            ))}
            </div> */}
            <h1>Fluffle!</h1>
            <h2>daily fit checks</h2>
        </motion.div>


        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: [0,1], y: [50, -15, 0] }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
            className="fluffle-container"
        >
        <div className="login-button" ><motion.button
            onClick={() => navigate("/upload")}
            animate={{opacity: [0, 1]}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            whileHover={{ scale: 0.9 }}>
        get started
        </motion.button></div>
        </motion.div>
      </div>

      <div className="fancy-camera">
        <div className="big-circle"><motion.div animate={{
            scale: [1, 1, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 0.9, 1, 1, 1],
            rotate: [0, 30, 60, 90, 80, 30, 60, 90, 120, 180, 240, 300, 360, 0]
        }}
        transition={{
            duration: 13,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0,
        }}
        style={circlehaha}
        ></motion.div></div>
        
        <div className="small-circle"><motion.div animate={{
            scale: [1, 1, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 0.9, 1, 1, 1],
            rotate: [0, 30, 60, 90, 80, 30, 60, 90, 120, 180, 240, 300, 360, 0],
            x: [0, 0, 0, 0, 0, 30, 30, 30, 0, 0, 0, -30, -30, 0],
            y: [0, 0, 0, 0, 0, -15, -30, -20, 0, 0, 0, 20, 20, 0],
        }}
        transition={{
            duration: 13,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0,
        }}
        style={circlehaha1}
        ></motion.div></div>

        <div className="chunk"><motion.svg
        width="300"
        height="150"
        viewBox="0 0 300 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ strokeDasharray: 800, strokeDashoffset: 800 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.path
          d="M 20 10 H 280 Q 290 10 290 20 V 130 Q 290 140 280 140 H 20 Q 10 140 10 130 V 20 Q 10 10 20 10 Z"
          stroke="rgb(199, 230, 255)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
        </div>
        
      </div>

    </div>
    
    </>
  );
}

export default LoginPage;
