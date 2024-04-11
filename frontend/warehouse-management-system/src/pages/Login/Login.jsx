import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./loginStyles.css";
import { images } from "../../constants";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Import the eye icons
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle show/hide password
  const [loginError, setLoginError] = useState(""); // State for login error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7076/login", {
        email: email,
        password: password,
      });
      console.log("Login successful:", response.data);
      setEmail("");
      setPassword("");
      const { accessToken, role } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      console.log("Error response:", error.response);
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid email or password. Please try again.");
      } else {
        setLoginError("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit} className="form-login">
        <div style={{display: "flex", justifyContent: "center"}}>
       
        </div>
        <div className="logo-login">
        <p style={{color: "#6388aa", fontSize: "24px", marginTop: "20px"}}>Login</p>
          <img src={images.logoC} alt="Logo" />
         
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login"
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-login"
          />
         
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ?  <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>
        
        {loginError && <p className="error-message">{loginError}</p>}
        
        <button type="submit" className="button-login">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
