import { useState, useEffect } from "react";
import React from 'react'
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function TopToolbar() {
  return (
    <div className="taskbar">
    <motion.div
      className="top-toolbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 3 }} 
      >
      <svg
        width="20%"
        height="200" 
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect 
          x="0" 
          y="-40" 
          width="100%" 
          height="100" 
          rx="40" 
          ry="40" 
          fill="black" 
        />
      </svg>

      <div className="toolbar-content">
        <nav className="toolbar-links">
          <a href="#b">W</a>
          <a href="#s">A</a>
          <a className="hidemeow" href="#s">fwfwfwfwfwfwfwf</a>
          <a href="#a">S</a>
          <a href="#d">D</a>
        </nav>
      </div>
    </motion.div>
    </div>
  );
}


function OpeningSequence() {
  const navigate = useNavigate();
  const [hideLanding, setHideLanding] = useState(false);
  const circlehaha2 = {
    width: 1500,
    height: 1500,
    background: "conic-gradient(from 0deg,rgb(171, 138, 227), #e52e71,rgb(171, 138, 227))",
    maskImage: "radial-gradient(circle, transparent 64%, black 41%)",
    WebkitMaskImage: "radial-gradient(circle, transparent 64%, black 41%)",
    borderRadius: "50%",
  }
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
      if (window.scrollY > 100000) {
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
                    
                    
                        <div className="fancy-camera">

                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: [0, 0, 0, 0, 0.2, 0.8, 1]}}
                                transition={{duration:3}}
                                className="fancy-camera"
                                >
                            
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
                                width="100%"
                                height="100%"
                                viewBox="00 25 1500 700"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect
                                x="50"         
                                y="50"         
                                width="1200"    
                                height="700"   
                                rx="50"        // radius for rounded corners
                                ry="50"
                                stroke="rgb(199, 230, 255)"
                                strokeWidth="20"
                                fill="none"
                                    />
                                <rect
                                x="550"         
                                y="-20"         
                                width="400"    
                                height="80"   
                                rx="30"        // radius for rounded corners
                                ry="30"
                                stroke="rgb(199, 230, 255)"
                                strokeWidth="20"
                                fill="none"
                                    />
                                <rect
                                x="1050"         
                                y="-20"         
                                width="140"    
                                height="100"   
                                rx="30"        // radius for rounded corners
                                ry="30"
                                stroke="rgb(199, 230, 255)"
                                strokeWidth="20"
                                fill="none"
                                    />
                                </motion.svg>
                            </div>
                            </motion.div>
                            
                        </div>
                        {/*end background deco*/}

                        
                        {/*below is overlay title text n stuff*/}
                        <div className="title-container">
                            <motion.div
                                initial={{opacity:0, y: -150}}
                                animate={{y: [200, -40, 0, -10, -320], opacity:[0,1,1,1,1], transition: {duration: 3.5, ease: "easeInOut",
                                    times: [0, 0.12, 0.24, 0.44, 1]
                                }}}
                                exit={{opacity: 0, transition: {duration: 0.6}}}
                                className="fluffle-container">
                                <motion.h1
                                    layoutId="title"
                                    style={{
                                        borderRadius: "12px",                    
                                        padding: "10px 20px",
                                        color: "rgba(255, 255, 255, 1.0)",
                                        }}
                                    initial={{ scale: 0.8 }}
                                    animate={{
                                        color: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1.0)"],
                                        }}>
                                            Fluffle!
                                        </motion.h1>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: [0,1], y: [50, -15, 0] }}
                                transition={{ duration: 2.0, ease: "easeInOut" }}
                                className="fluffle-container"
                            ><h2>up your style with daily fit checks</h2></motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: [0,1], y: [50, -40, 0] }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                className="fluffle-container"
                            >
                                <motion.button
                                className="login-button"
                                onClick={() => navigate("/upload")}
                                whileHover={{ scale: 0.9 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                Get Started
                                </motion.button>
                            </motion.div>
                        </div>

                        
                        
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

  return (
    <div className="app-container">
      <div className="meow1"><TopToolbar /></div>
      <div className="meow"><OpeningSequence /></div>
      
      {/* <div className="main-content">
        <div className="scroll-content">
          <h2>HI</h2>
          <p>lorem ipsum deez nuts</p>
        </div>
      </div> */}
    </div>
  );
}

export default LandingPage;
