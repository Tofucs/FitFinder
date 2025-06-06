import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface Props {
  username: string;
  onLogout: () => void;
}

const TopToolbarLoggedIn: React.FC<Props> = ({ username, onLogout }) => {
    return (
      <div className="taskbar">
        <motion.div
          className="top-toolbar"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
        >
          <div className="toolbar-content">
            <nav className="toolbar-links">
                <Link to="/profile">{username}'s Profile</Link>
                <a href="#gallery"> Gallery</a>
                <Link to="/">FitCheck</Link>
                <Link to="/upload">Create</Link>
                <a href="#about">About</a>
                <a href="/" onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</a>
            </nav>
          </div>
        </motion.div>
      </div>
    );
  };
  
  export default TopToolbarLoggedIn;