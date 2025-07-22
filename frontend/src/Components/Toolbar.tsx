import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

import './Toolbar.css'

interface Props {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

const TopToolbar: React.FC<Props> = ( { isLoggedIn, onLoginClick, onLogout } ) => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const logoutAndReload = () => {
      onLogout();
      window.location.reload();
    }

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
                  {isLoggedIn ? (
                    <nav className="hamburger-links">
                    <Link to="/">Home</Link>
                    <a href="#s" onClick={() => setMenuOpen(false)}>Gallery</a>
                    <Link to="/profile">Profile</Link>
                    <a href="#a" onClick={() => setMenuOpen(false)}>More</a>
                    <a href="#d" onClick={() => setMenuOpen(false)}>About</a>
                  </nav>
                  ) : (
                    <nav className="hamburger-links">
                      <Link to="/">Home</Link>
                      <a href="#s" onClick={() => setMenuOpen(false)}>Gallery</a>

                      <a href="#a" onClick={() => setMenuOpen(false)}>More</a>
                      <a href="#d" onClick={() => setMenuOpen(false)}>About</a>
                    </nav>
                  )}
                  
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          
            <div className="right-section">

            {isLoggedIn ? 
            <>
            <button 
              className="sign-in-btn"
            >
              <Link to="/profile">Account</Link>
            </button>
            <button 
              className="sign-out-btn"
              onClick={onLogout}
            >
              Sign Out
            </button>
            </>
            
            : 
            <button 
              className="sign-in-btn"
              onClick={onLoginClick}
            >
              Sign In
            </button>
            }
            
            <div className="divider"></div>
            
            <motion.div
              whileHover={{ scale: 1.02, y: 1 }}
              transition={{
                scale: { duration: 0.2, ease: "easeInOut" },
                y: { duration: 0.2 },
              }}
            >
              <Link to="/upload" className="upload-btn" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "white" }}>
                <div className="upload-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
                <span className="uploadText">Upload</span>
              </Link>
            </motion.div>

          </div>
        </div>

      </motion.div>
      </div>
    );
  }

  export default TopToolbar;