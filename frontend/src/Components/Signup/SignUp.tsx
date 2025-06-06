import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import '../Login/Login.css'
import { useNavigate } from "react-router-dom";

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import pw_icon from '../Assets/password.png'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pw: "",
        confirmpw: ""
    });

    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong");
                setSuccess(null);
            } else {
                setSuccess("Registered successfully!");
                localStorage.setItem("user", JSON.stringify(data.user));
                setError(null);
                navigate("/profile");
            }
        } catch (err) {
            setError("Failed to connect to server.");
            setSuccess(null);
        }
    };

    return (
        <div className="wrapper">
            <div className="login-box">
                <div className="header">
                    <div className="text">Register</div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" id="user" name="name" value={formData.name} onChange={handleChange} className="input-field" required/>
                        <label htmlFor="user" className="label">Username</label>
                    </div>
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="input-field" required/>
                        <label htmlFor="email" className="label">Email</label>
                    </div>
                    <div className="input">
                        <img src={pw_icon} alt="" />
                        <input type="password" id="pw" name="pw" value={formData.pw} onChange={handleChange} className="input-field" required/>
                        <label htmlFor="pw" className="label">Password</label>
                    </div>
                    <div className="input">
                        <img src={pw_icon} alt="" />
                        <input type="password" id="confirmpw" name="confirmpw" value={formData.confirmpw} onChange={handleChange} className="input-field" required/>
                        <label htmlFor="confirmpw" className="label">Confirm Password</label>
                    </div>
                </div>

                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

                <div className="remember-forget">
                    <div className="remember-me">
                        <input type="checkbox" id="remember"/>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                </div>
                <div className="submit-container">

                    <motion.div className="submit"
                    whileHover={{scale: 1.1,
                        transition: {duration: 0.3},
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}>
                        Register
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default Signup
