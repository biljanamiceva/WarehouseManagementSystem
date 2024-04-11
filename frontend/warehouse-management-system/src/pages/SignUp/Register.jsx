import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { images } from "../../constants";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7076/register",
        {
          email,
          password,
          firstName,
          lastName,
          role: "user",
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("Registration successful:", response.data);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      navigate("/employees");
    } catch (error) {
      console.error("Registration error:", error);
      console.log("Error response:", error.response);
    }
  };

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit} className="form-login">
        <div className="logo-login">
         
        </div>
        <div className="logo-login">
        <p style={{color: "#6388aa", fontSize: "24px", marginTop: "20px"}}>Register</p>
          <img src={images.logoC} alt="Logo" />
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-login"
        />
        <div  className="password-container"> 
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-login"
          />
          <span onClick={() => setShowPassword(!showPassword)}   className="password-toggle">
            {showPassword ? <FaRegEye /> :  <FaRegEyeSlash /> }
          </span>
        </div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input-login"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input-login"
        />
        <button type="submit" className="button-login">
          Register
        </button>
        <button className="backBtn">
        <Link to="/employees" >
          Back
        </Link>
        </button>
       
      </form>
    </div>
  );
};

export default Register;
