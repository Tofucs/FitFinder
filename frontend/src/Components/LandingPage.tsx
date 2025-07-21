import { useState, useEffect } from "react";
import React from 'react'
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Parallax from "../Parallax.tsx";
import SnapWrapper from "../Snap.tsx";
import {
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef } from "react"
import TopToolbar from "./Toolbar.tsx";
import Login from "./Login/Login.tsx";
import LandingText from "./LandingText.tsx";
import TopToolbarLoggedIn from "./ToolbarLogin/ToolbarLogin.tsx";



function OpeningSequence({showLogin}) {
  const navigate = useNavigate();
  const [hideLanding, setHideLanding] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100000) {
        setHideLanding(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);
  const {scrollYProgress} = useScroll({target : ref});
  // When scrollYProgress goes from 0.2 to 0.3, slide the fancy-camera horizontally from 0 to 500px.
  // You can adjust these values to your liking.
  const slideX = useTransform(scrollYProgress, [0.05, 0.5], [0, -1000]);

  return (
    <>
        <AnimatePresence>
            {!hideLanding && (
                <div className="container">
                        

                        <motion.div style={{ x: slideX }}>
                        <div className="fancy-camera">

                            <motion.div
                                animate={{opacity: [0, 1]}}
                                transition={{duration:1}}
                                className="fancy-camera"
                                >
                            
                            

                            </motion.div>
                            
                        </div>
                        </motion.div>
                        {/*end background deco*/}

                        
                        {/*below is overlay title text n stuff*/}
                        <div className="title-container"
                        style={{
                          pointerEvents: showLogin ? "auto" : "none",
                        }}>
                          <AnimatePresence>
                            {showLogin ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: [0,1], x: [20, 0]}}
                                transition={{ duration: .4, ease: "easeInOut" }}
                                exit={{ opacity: 0, x: 20 }}
                                color="rgba(255,255,255,1"
                                className="fluffle-container"
                            ><Login/></motion.div> )
                          : <motion.div key="marketing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0,1], x: [40,0] }}
                                exit={{ opacity: [1,0], x: -20}}
                                transition={{ duration: 0.4 }}
                                className="fluffle-container"
                              ><LandingText />
                            </motion.div> }
                          </AnimatePresence>
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
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
  };

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setHoverEffect(true);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    
    <div className="app-container">
      
      <div className="landing">
        {user ? (
          <TopToolbarLoggedIn username={user.name} onLogout={handleLogout}/> 
        ) : (
          <TopToolbar onLoginClick={toggleLogin} />
        )}
        <OpeningSequence showLogin={showLogin} />
      </div>
    
    </div>
  );
}

export default LandingPage;


// extra stuff

