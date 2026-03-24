import React, { useState } from "react";
import axios from "axios";
import "react-phone-number-input/style.css";
import {
  FaExclamationCircle,
  FaEnvelope,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import bgImg from "../images/bgImg.png";
import img1 from "../images/HeroImg.png";
import logo from "../images/LogoImg.png";
import VerifyPage from "./VerifyPage";
import PhoneSignUp from "./PhoneSignUp";

const Signuppage = () => {
  const [method, setMethod] = useState("email");
  const [step, setStep] = useState("signup");
  const [verifyType, setVerifyType] = useState("");
  const [verifyValue, setVerifyValue] = useState("");
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const checkPassword = (value) => {
    if (value.length < 6) return "Too short (min 6)";
    if (!/[A-Z]/.test(value)) return "Add at least one uppercase letter";
    if (!/[0-9]/.test(value)) return "Add at least one number";
    if (!/[!@#$%^&*]/.test(value))
      return "Add at least one special character (!@#$%^&*)";
    return "Strong password ✔";
  };

  const checkEmail = (value) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!value) return "";
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const showTempMessage = (msg) => {
    setInfoMessage(msg);
    setTimeout(() => setInfoMessage(""), 20000); 
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!name) formErrors.name = "Please enter your name";
    if (!email) formErrors.email = "Please enter your email";
    else {
      const liveEmailError = checkEmail(email);
      if (liveEmailError) formErrors.email = liveEmailError;
    }

    if (!password) formErrors.password = "Please enter your password";
    else {
      const msg = checkPassword(password);
      if (msg !== "Strong password ✔") formErrors.password = msg;
    }

    if (!terms) formErrors.terms = "You must accept Terms & Conditions";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
        credentials: "include"
       });

      setEmail("");
      setPassword("");
      setPasswordMessage("");
      setTerms(false);
      setName("");
      setErrors({});
      setVerifyType("email");
      setVerifyValue(email);
      setStep("verify");

      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert("OTP sent 🚀");
      } else {
        alert(data.message);
      }
    } catch (error) {
      setErrors({ form: error.response?.data?.message || "Signup failed" });
    }
  };

 
  return (
    <div className="signup-page">
      <div className="signup-left">
        {step === 'signup' ? (
          <div className="signupContent">
            <img src={logo} className="signup-logo" />
            <h2>Create an Account</h2>
            <p>Create your account and simplify tax calculations.</p>

            <div className="signupForm">
              <div className="signupMethod">
                <div
                  className={`method-box ${method === "email" ? "active" : ""}`}
                  onClick={() => setMethod("email")}
                >
                  <FaEnvelope /> Email
                </div>
                <div
                  className={`method-box ${method === "phone" ? "active" : ""}`}
                  onClick={() => setMethod("phone")}
                >
                  <FaPhone /> Phone
                </div>
              </div>

              {method === "email" && (
                <form onSubmit={handleEmailSignup}>
                  <div className="nameInput">
                    <label>Name:</label>
                    <input
                      type="text"
                      value={name}
                       onChange={(e) => {
                        const value = e.target.value;
                        setName(value);
                        setErrors((prev) => ({ ...prev, password: "" }))
                      }}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <span className="error">
                        <FaExclamationCircle style={{ marginRight: 5 }} />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="emailInput">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);
                        setErrors((prev) => ({
                          ...prev,
                          email: checkEmail(value),
                        }));
                      }}
                      placeholder="yourname@gmail.com"
                    />
                    {errors.email && (
                      <span className="error">
                        <FaExclamationCircle style={{ marginRight: 5 }} />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="PasswordInput">
                    <label>Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        const msg = checkPassword(value);
                        setPasswordMessage(msg);
                         setErrors((prev) => ({ ...prev, password: "" }))
                        if (!msg.includes("✔")) {
                          const timer = setTimeout(() => setPasswordMessage(""), 20000);
                          return () => clearTimeout(timer);
                        }
                      }}
                       
                   
                      placeholder="Minimum of 6 characters"
                    />
                    <span
                      className="eye"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                    {password && passwordMessage && (
                      <span
                        className={passwordMessage.includes("✔") ? "success" : "error"}
                      >
                        {passwordMessage}
                      </span>
                    )}

                    {errors.password && !password && (
                      <span className="error">
                        <FaExclamationCircle style={{ marginRight: 5 }} />
                        {errors.password}
                      </span>
                    )}
                  </div>

                  <div className="terms">
                    <input
                      type="checkbox"
                      checked={terms}
                      onChange={() => {
                        setTerms(!terms);
                        setErrors((prev) => {
                          const { terms, ...rest } = prev;
                          return rest;
                        });
                      }}
                    />
                    <p>
                      I accept <a href="/terms">Terms & Conditions</a>
                    </p>
                    {errors.terms && (
                      <span className="error">
                        <FaExclamationCircle style={{ marginRight: 5 }} />
                        {errors.terms}
                      </span>
                    )}
                    <button className="signup-btn" type="submit">
                      Create Account
                    </button>
                    {errors.form && <span className="error">{errors.form}</span>}
                  </div>
              </form>
            )}

            {method === "phone" && (
              <PhoneSignUp />
            )}
          </div>
        </div>
        ) : (
          <VerifyPage
            type={verifyType}
            value={verifyValue}
            onBack={() => setStep("signup")}
          />
        )}  
      </div>

      <div className="signup-right">
        <div className="signupBg">
          <img src={bgImg} alt="background" />
        </div>

        <div className="signupContent">
          <div className="signupImg">
            <img src={img1} alt="Hero" />
          </div>

          <div className="contentInfo">
            <div className="contentBox">
              <h4>Instant PAYE calculations</h4>
            </div>

            <div className="contentBox">
              <h4>Clear tax breakdown</h4>
            </div>

            <div className="contentBox">
              <h4>Transport deductions</h4>
            </div>

            <div className="contentBox">
              <h4>Simple interface</h4>
            </div>
          </div>
        </div>

        <h1>Smart Tax Tools</h1>
        <p>Calculate and understand Nigerian taxes easily.</p>
      </div>
    </div>
  );
};

export default Signuppage;
 