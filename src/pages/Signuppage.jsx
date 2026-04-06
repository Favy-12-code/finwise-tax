import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { HiOutlineMail, HiOutlineDeviceMobile } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiEye, FiEyeOff, FiCheck  } from "react-icons/fi";
import bgImg from "../images/bgImg.png";
import img1 from "../images/HeroImg.png";
import logo from "../images/LogoImg.png";
import VerifyPage from "./VerifyPage";
import PhoneSignUp from "./PhoneSignUp";
import '../styles/signup.css';

const Signuppage = () => {
  const [method, setMethod] = useState("email");
  const [step, setStep] = useState("signup");
  const [verifyType, setVerifyType] = useState("");
  const [verifyValue, setVerifyValue] = useState("");

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const signupLeftRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (signupLeftRef.current) {
      signupLeftRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const passwordTimer = useRef(null);
   useEffect(() => {
    if (passwordMessage.includes("✔")) {
      if (passwordTimer.current) clearTimeout(passwordTimer.current);

      passwordTimer.current = setTimeout(() => {
        setPasswordMessage("");
      }, 10000); 
    }

    return () => {
      if (passwordTimer.current) clearTimeout(passwordTimer.current);
    };
  }, [passwordMessage]);

  const checkPassword = (value) => {
    if (value.length < 6) return "! Too short (min 6)";
    if (!/[A-Z]/.test(value)) return "! Add at least one uppercase letter";
    if (!/[0-9]/.test(value)) return "! Add at least one number";
    if (!/[!@#$%^&*]/.test(value))
      return "! Add at least one special character (!@#$%^&*)";
    return "Strong password ✔";
  };

  const checkEmail = (value) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!value) return "";
    if (!emailRegex.test(value)) return "! Please enter a valid email address";
    return "";
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    let formErrors = {};

    if (!name) formErrors.name = "! Please enter your name";
    if (!email) formErrors.email = "! Please enter your email";
    else {
      const liveEmailError = checkEmail(email);
      if (liveEmailError) formErrors.email = liveEmailError;
    }

    if (!password) formErrors.password = "! Please enter your password";
    else {
      const msg = checkPassword(password);
      if (msg !== "Strong password ✔") formErrors.password = msg;
    }

    setPasswordMessage("")

    if (!terms) formErrors.terms = "! You must accept Terms & Conditions";

    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      setLoading(false);
      return;
    } 


    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordMessage("");
        setTerms(false);
        setErrors({});

        setVerifyType("email");
        setVerifyValue(email);
        setStep("verify");
        
      } else {
        setErrors({ form: data.message});
      }
    } catch (error) {
      setErrors({ form: "Signup failed" });
    }
    setLoading(false);
  };

  const handleMethodChange = (type) => {
    setMethod(type);

    setName("");
    setEmail("");
    setPassword("");
    setPasswordMessage("");
    setTerms(false);
    setErrors({});

    if (window.innerWidth <= 760 && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

const handlePhoneSignupSuccess = (phone) => {
    setVerifyType("phone");
    setVerifyValue(phone);
    setStep("verify"); 
};

const [submitted, setSubmitted] = useState(false);

  return step === "signup" ? (
    <div className="signup-page">
      <div className="signup-left" ref={signupLeftRef}>
          <div className="signupContent" >
            <div className="signupHead" ref={formRef}>
              <img src={logo} className="signup-logo" />
              <h2>Create an account</h2>
              <p>Create your account and simplify tax calculations.</p>
            </div>

            <div className="signupForm" >
              <div className="methodBox">
                <div className="signupMethod">
                  <div
                    className={`method-box ${method === "email" ? "active" : ""}`}
                  onClick={() => handleMethodChange("email")}
                  >
                    <HiOutlineMail /> Email
                  </div>
                  <div
                    className={`method-box ${method === "phone" ? "active" : ""}`}
                    onClick={() => handleMethodChange("phone")}
                  >
                    <HiOutlineDeviceMobile /> Phone
                  </div>
                </div>
              </div>

              {method === "email" && (
                <form onSubmit={handleEmailSignup} autoComplete="off">
                  <div className="nameInput">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      value={name}
                      className={errors.name ? "input-error" : "formInput"}
                      onChange={(e) => {
                        const value = e.target.value;
                        setName(value);
                        setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      placeholder="Your Name"
                    />

                    <div className="spanError">
                      {errors.name && (
                      <span className="error">
                        {errors.name}
                      </span>
                    )}
                    </div>
                  </div>

                  <div className="emailInput">
                    <label className="label">Email Address</label>
                    <input
                      type="text"
                      value={email}
                      autoComplete="new-email"
                      className={submitted && errors.email ? "input-error" : "formInput"}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);
                        setErrors((prev) => ({
                          ...prev,
                          email: checkEmail(value),
                          form: value ? prev.form : ""
                        }));
                      }}
                      placeholder="yourname@gmail.com"
                    />
                    <div className="spanError">
                      {errors.email && (
                      <span className="error">
                        {errors.email}
                      </span>
                    )}
                    </div>
                    
                  </div>

                  <div className="PasswordInput">
                    <label className="label">Password</label>

                    <div className="input-wrapper">
                      <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      autoComplete="new-password"
                      className={errors.password ? "input-error" : "formInput"}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);

                        const msg = checkPassword(value);
                        setPasswordMessage(msg);

                        setErrors((prev) => ({ ...prev, password: "" }));

                      
                      }}
                      placeholder="Minimum of 6 characters"
                      />

                      <span
                        className="eye"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </span>
                    </div>

                    <div className="spanError">
                      {!errors.password && password && passwordMessage && (
                      <span className={passwordMessage.includes("✔") ? "success" : "error"}>
                        {passwordMessage}
                      </span>
                      )}

                      {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                  </div>

                  <div className="terms">
                    <label className="terms-label">
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
                      <span className="customCheck">{terms && <FiCheck />}</span>
                      <p className="labelP">
                        I accept <a onClick={() => navigate("/terms")}>Terms & Conditions</a>
                      </p>
                    </label>
                      
                    <div className="spanError">
                        {errors.terms && <span>{errors.terms}</span>}
                    </div> 
                  </div>

                    <button className="signup-btn" type="submit" disabled={loading}>
                      {loading ? (
                        <AiOutlineLoading3Quarters className="spinnerLoad" />
                      ) : (
                        "Create Account"
                      )}
                    </button>

                    {errors.form && (
                      <div className="form-error">
                        {errors.form}
                      </div>
                    )}

                    <p className="SIGNin">
                      Already have an account? <a onClick={() => navigate("/signin")}>Sign in</a>
                    </p>
                
                </form>
              )}

              {method === "phone" && <PhoneSignUp onSuccess={handlePhoneSignupSuccess} />}
  
            </div>
          </div>
        
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
              <FiCheck className="checkIcon" />
              <h4>Instant PAYE calculations</h4>
            </div>
            <div className="contentBox">
              <FiCheck className="checkIcon" />
              <h4>Clear tax breakdown</h4>
            </div>
            <div className="contentBox">
              <FiCheck className="checkIcon" />
              <h4>Transport deductions</h4>
            </div>
            <div className="contentBox">
              <FiCheck className="checkIcon" />
              <h4>Simple interface</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    ) : (
    <VerifyPage
      type={verifyType}
      value={verifyValue}
      onBack={() => setStep("signup")}
    />
  )

};

export default Signuppage;
 