// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopToolbarLoggedIn from "../ToolbarLogin/ToolbarLogin";
import './UserDashboard.css'
import { AnimatePresence, motion } from "motion/react";
import { time } from "motion";

interface User {
  name: string;
  username: string;
  date_joined?: string;
  stats?: {
    streak: number;
    rated: number;
    recommended: number;
  };
  recentUpload?: {
    imageUrl: string;
    date: string;
  };
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const statBoxVariants = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(10px)", y: 10, x: 80 },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 35
      }
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    
    fetch("http://localhost:4000/api/userinfo")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  const hasUploadToday = () => {
    if (!user?.recentUpload?.date) return false;
    const today = new Date().toISOString().split("T")[0];
    return user.recentUpload.date.startsWith(today);
  };

  return (
    <div className="dashboard">
      {user && (
        <>
          <TopToolbarLoggedIn
            username={user.username}
            onLogout={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          />

          <div className="profile-header">
            <motion.div
                className="user-info"
                initial={{ y: 0, x: -20, opacity: 0, filter: "blur(10px)"}}
                animate={{ y: [10, 8, 0], x: [ -20, 0 ], opacity: [0, 1], filter: ["blur(10px)", "blur(0px)"] }}
                transition={{
                    duration: 1.4,
                    ease: "easeInOut",
                    delay: 0.2,
                }}
                >
                <motion.h2
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                    {user.name}
                </motion.h2>
                <div className="scrolling-username-wrapper">
                    <motion.div
                        className="scrolling-username-track"
                        animate={{ x: ["0%", "-66%"] }}
                        transition={{
                        duration: 3.88,
                        ease: "linear",
                        repeat: Infinity,
                        }}
                    >
                        <span className="scrolling-username">@{user.username}&nbsp;</span>
                        <span className="scrolling-username">@{user.username}&nbsp;</span>
                        <span className="scrolling-username">@{user.username}&nbsp;</span>
                    </motion.div>
                </div>
                {user.date_joined && (
                    <p>Joined {new Date(user.date_joined).toLocaleDateString()}</p>
                )}
            </motion.div>

            <motion.div
                className="user-stats"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                    transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.3,
                    },
                    },
                }}
                >
              <motion.div 
              className="stat-box"
              variants={statBoxVariants}>
                <h3>{user.stats?.streak ?? 0}</h3>
                <p>Week Streak</p>
              </motion.div>
              <motion.div 
                className="stat-box"
                variants={statBoxVariants}>
                <h3>{user.stats?.rated ?? "N/A"}</h3>
                <p>Most popular vibe</p>
              </motion.div>
              <motion.div 
                className="stat-box"
                variants={statBoxVariants}>
                <h3>{user.stats?.recommended ?? 0}</h3>
                <p>Recommended Outfits</p>
              </motion.div>
            </motion.div>
          </div>

          <div className="dashboard-body">
            {hasUploadToday() ? (
              <div className="highlighted-upload">
                <h4>Your latest outfit recap</h4>
                <img src={user.recentUpload?.imageUrl} alt="Most recent upload" />
              </div>
            ) : (
              <div className="no-upload">
                <p>You haven't uploaded anything this week.</p>
                <button onClick={() => navigate("/upload")}>Share your outfit</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
