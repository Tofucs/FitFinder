import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

import './Toolbar.css'

interface Props {
  isLoggedIn: boolean;
  onLoginClick: () => void; 
}

function TopToolbar( {onLoginClick} ) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    return (
      <div className="taskbar">
      <motion.div
        className="top-toolbar"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.0 }} 
        >
  
        <div className="toolbar-content">
  
            <div className="left-section">
            <button 
              className="hamburger-btn"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            
            {/* Hamburger Menu Dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="hamburger-menu"
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <nav className="hamburger-links">
                    <a href="#s" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#s" onClick={() => setMenuOpen(false)}>Gallery</a>

                    <a href="#a" onClick={() => setMenuOpen(false)}>More</a>
                    <a href="#d" onClick={() => setMenuOpen(false)}>About</a>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          
            <div className="right-section">
            <button 
              className="sign-in-btn"
              onClick={onLoginClick}
            >
              Sign In
              {/*{isLoggedIn ? 'Account' : 'Sign in'} */}
            </button>
            
            <div className="divider"></div>
            
            <button 
              className="upload-btn"
              aria-label="Upload"
            >
              <div className="upload-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <span>Upload</span>
            </button>
          </div>
        </div>

      </motion.div>
      </div>
    );
  }

  export default TopToolbar;