import React from 'react'
import { motion } from "motion/react";

interface Props {
  isLoggedIn: boolean;
}

function TopToolbar( {onLoginClick} ) {
    return (
      <div className="taskbar">
      <motion.div
        className="top-toolbar"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }} 
        >
  
        <div className="toolbar-content">
          <nav className="toolbar-links">
            <a onClick={onLoginClick} style={{ cursor: "pointer" }}>Login</a>
            <a href="#s">Gallery</a>
            <a href="#s">FitCheck</a>
            <a href="#a">More</a>
            <a href="#d">About</a>
          </nav>
        </div>
      </motion.div>
      </div>
    );
  }

  export default TopToolbar;