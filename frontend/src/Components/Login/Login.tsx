import React from 'react'
import './Login.css'
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import pw_icon from '../Assets/password.png'

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
          const res = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
      
          const data = await res.json();
      
          if (!res.ok) {
            setError(data.message || "Login failed");
            return;
          }
      
          localStorage.setItem("user", JSON.stringify(data.user)); // or store token
          navigate("/profile"); // or "/dashboard"
        } catch (err) {
          setError("Failed to connect to server.");
        }
    };

    return (
        <div className="wrapper">
            <div className="login-box">
                <div className="header">
                    <div className="text">Login</div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" id="user" name="name" className="input-field" value={formData.name} onChange={handleChange} required/>
                        <label htmlFor="user" className="label">Username</label>
                    </div>
                    <div className="input">
                        <img src={pw_icon} alt="" />
                        <input type="password" id="password" name="password" className="input-field" value={formData.password} onChange={handleChange} required/>
                        <label htmlFor="password" className="label">Password</label>
                    </div>
                </div>
                <div className="remember-forget">
                    <div className="remember-me">
                        <input type="checkbox" id="remember"/>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <div className="forgot-password"><span>Forgot Password?</span></div>
                </div>
                <div className="submit-container">
                    <motion.div className="submit"
                    whileHover={{scale: 1.1,
                        transition: {duration: 0.3},
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogin}>Login</motion.div>
                </div>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                <div className="register">
                    <span>Don't have an account? <a href="register">Register here</a></span>
                </div>
            </div>
        </div>
    )
}

export default Login
