// Signuppage.jsx
import React, { useState, useEffect } from "react";
import { auth, RecaptchaVerifier } from "../firebase"; // make sure firebase.js is correct
import { createUserWithEmailAndPassword, sendSignInLinkToEmail, signInWithPhoneNumber } from "firebase/auth";
import bgImg from '../images/bgImg.png';
import { FaEnvelope, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../images/LogoImg.png";
import img1 from '../images/HeroImg.png';

const Signuppage = () => {
  const [method, setMethod] = useState("email"); // email or phone
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const actionCodeSettings = {
    url: 'http://localhost:3000/finishSignUp',
    handleCodeInApp: true
  };

  // Password validation
  const checkPasswordStrength = (value) => {
    if (value.length < 6) return setPasswordMessage("Too short (min 6)"), false;
    if (!/[A-Z]/.test(value)) return setPasswordMessage("Add at least one uppercase"), false;
    if (!/[0-9]/.test(value)) return setPasswordMessage("Add at least one number"), false;
    if (!/[!@#$%^&*]/.test(value)) return setPasswordMessage("Add a special symbol (!@#$%^&*)"), false;
    setPasswordMessage("Strong password ✔");
    return true;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
  };

  // Email validation
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email address";
    return "";
  };

  // Email OTP
  const sendEmailOTP = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      localStorage.setItem("emailForSignIn", email);
      alert("Verification email sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send verification email");
    }
  };

 useEffect(() => {
  if (method === "phone" && !window.recaptchaVerifier) {
    if (!auth) return; // make sure auth is defined
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      auth
    );
  }
}, [method]);


  const sendPhoneOTP = async () => {
    if (!phone) {
      setErrors(prev => ({ ...prev, phone: "Phone number is required" }));
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      alert("OTP sent! Use your test OTP (from Firebase console).");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Make sure phone auth is enabled and you are using a test number.");
    }
  };

  const verifyPhoneOTP = async () => {
    try {
      await window.confirmationResult.confirm(otp);
      alert("Phone verified! Account created.");
      setPhone(""); setOtp(""); setOtpSent(false);
    } catch (err) {
      alert("Invalid OTP, try again.");
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (method === "email") {
      const emailError = validateEmail(email);
      if (emailError) newErrors.email = emailError;
      if (!password) newErrors.password = "Password is required";
      if (!terms) newErrors.terms = "You must accept the terms";
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0 && checkPasswordStrength(password)) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          await sendEmailOTP();
          alert("Account created! Verify your email before logging in.");
          setEmail(""); setPassword(""); setTerms(false);
        } catch (err) {
          setErrors({ form: err.message });
        }
      }
    } else {
      if (!phone) newErrors.phone = "Phone number is required";
      if (!terms) newErrors.terms = "You must accept the terms";
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) sendPhoneOTP();
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <img src={logo} alt="logo" className="signup-logo" />
        <h2>Create an Account</h2>
        <p>Create your account and simplify your tax calculations.</p>

        <div className="signup-methods">
          <div className={`method-box ${method === "email" ? "active" : ""}`} onClick={() => setMethod("email")}>
            <FaEnvelope /> Email
          </div>
          <div className={`method-box ${method === "phone" ? "active" : ""}`} onClick={() => setMethod("phone")}>
            <FaPhone /> Phone
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {method === "email" && <>
            <label>Email Address</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com"/>
            {errors.email && <span className="error">{errors.email}</span>}

            <label>Password</label>
            <div className="password-input">
              <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} placeholder="Minimum of 6 characters"/>
              <span className="eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            {password && <span className={passwordMessage === "Strong password ✔" ? "success" : "error"}>{passwordMessage}</span>}
            {errors.password && <span className="error">{errors.password}</span>}
          </>}

          {method === "phone" && <>
            <label>Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1234567890"/>
            {errors.phone && <span className="error">{errors.phone}</span>}
            {otpSent && <>
              <label>Enter OTP</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP"/>
              <button type="button" onClick={verifyPhoneOTP}>Verify OTP</button>
            </>}
          </>}

          <div className="terms">
            <input type="checkbox" checked={terms} onChange={() => setTerms(!terms)} />
            <p>I accept the <a href="/terms">Terms & Conditions</a></p>
          </div>
          {errors.terms && <span className="error">{errors.terms}</span>}
          {errors.form && <span className="error">{errors.form}</span>}

          <button type="submit" className="signup-btn">{method === "email" ? "Create Account" : "Send OTP"}</button>
        </form>

        <p className="login-link">Already have an account? <a href="/signin">Login</a></p>
      </div>

      <div className="signup-right">
        <div className="signupBg"><img src={bgImg} alt="background"/></div>
        <div className="signupContent">
          <div className="signupImg"><img src={img1} alt="Hero"/></div>
          <div className="contentInfo">
            <div className="contentBox"><h4>Instant PAYE calculations</h4></div>
            <div className="contentBox"><h4>Clear breakdown per tax brackets</h4></div>
            <div className="contentBox"><h4>Transport deduction summary</h4></div>
            <div className="contentBox"><h4>Easy intuitive interface</h4></div>
          </div>
        </div>
        <h1>Smart Tax Tools</h1>
        <p>Calculate, understand, and manage your Nigerian taxes easily with Finwise.</p>
      </div>

      {/* Invisible recaptcha container */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signuppage;
