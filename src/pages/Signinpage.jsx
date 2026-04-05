import React, { useState, useEffect, useRef } from "react";
import "react-phone-number-input/style.css";
import { HiOutlineMail, HiOutlineDeviceMobile } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiEye, FiArrowLeft, FiEyeOff, FiCheck } from "react-icons/fi";
import PhoneInput from "react-phone-number-input";
import img1 from "../images/HeroImg.png";
import bgImg from "../images/bgImg.png";
import logo from "../images/LogoImg.png";
import "../styles/signin.css";
import { useNavigate } from "react-router-dom";

const Signinpage = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [method, setMethod] = useState("email");
  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [inputType, setInputType] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [userFound, setUserFound] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [otpArray, setOtpArray] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [expired, setExpired] = useState(false);
  const [resending, setResending] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
  if (mode !== "otp") return;

  if (timeLeft <= 0) {
    setExpired(true);
    return;
  }

  const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, mode]);

    const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;

    setOtpArray(newOtp);
    setOtpError(false);
     setFormError("");

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");

    if (!/^\d{4}$/.test(paste)) return;

    const split = paste.split("");
    setOtpArray(split);

    inputsRef.current[3].focus();
  };

  const handleVerifyOtp = async () => {
  const code = otpArray.join("");

  if (!code || code.length < 4) {
    setOtpError(true);
    setFormError("Enter OTP"); 
    return;
  }

  if (code.length < 4) {
    setOtpError(true);
    return;
  }

  setLoading(true);
  setFormError("");

  try {
    const res = await fetch(`${API}/api/auth/verify-reset-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputType === "email" ? email : undefined,
        phone: inputType === "phone" ? phone : undefined,
        otp: code,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setOtp(code);
      setMode("reset"); 
      setOtpError(false);     
      setFormError("");  
    } else {
      setFormError(data.message);
      setOtpError(true);
    }

  } catch {
    setFormError("Verification failed");
    setOtpError(true);
  }

  setLoading(false);
};

const handleResendOtp = async () => {
  setResending(true);
  setFormError("");
  setOtpError(false);
  try {
    await fetch(`${API}/api/auth/send-reset-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputType === "email" ? email : undefined,
        phone: inputType === "phone" ? phone : undefined,
      }),
    });

    setTimeLeft(60);
    setExpired(false);
    setOtpArray(["", "", "", ""]);
    setOtp("");                    
    setOtpError(false);          
    setFormError("");  
  } catch {}

  setResending(false);
};

   const passwordTimer = useRef(null);

  const validateEmail = (value) => {
    const regex = /^\S+@\S+\.\S+$/;
    if (!value) return "! Enter your email";
    if (!regex.test(value)) return "! Invalid email";
    return "";
  };

  const validatePhone = (value) => {
    if (!value) return "! Enter your phone number";
    if (value.length < 7) return "! Invalid phone";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "! Enter password";
    return "";
  };

   const validateStrongPassword = (value) => {
    if (value.length < 6) return "! Too short (min 6)";
    if (!/[A-Z]/.test(value)) return "! Add uppercase letter";
    if (!/[0-9]/.test(value)) return "! Add number";
    if (!/[!@#$%^&*]/.test(value)) return "! Add special character (!@#$%^&*)";
    return "Strong password ✔";
  };

  const handleMethodChange = (type) => {
    setMethod(type);

    setEmail("");
    setPhone("");
    setPassword("");

    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setFormError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;
    setHasSubmitted(true);

    if (method === "email") {
      const err = validateEmail(email);
      setEmailError(err);
      if (err) valid = false;
    }

    if (method === "phone") {
      const err = validatePhone(phone);
      setPhoneError(err);
      if (err) valid = false;
    }

    const passErr = validatePassword(password);
    setPasswordError(passErr);
    if (passErr) valid = false;

    if (!valid) return;

    setLoading(true);
    setFormError("");
    setUserFound(false);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: method === "email" ? email : undefined,
          phone: method === "phone" ? phone : undefined,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormError("");
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setFormError(data.message);
      }

      if (data.message.toLowerCase().includes("not found")) {
        setUserFound(false);
      } else {
        setUserFound(true); 
      }
    } catch {
      setFormError("Login failed");
      setUserFound(false);
    }

    setLoading(false);
  };

  const handleSendOtp = async () => {
    let valid = true;

    if (method === "email") {
      const err = validateEmail(email);
      setEmailError(err);
      if (err) valid = false;
    }

    if (method === "phone") {
      const err = validatePhone(phone);
      setPhoneError(err);
      if (err) valid = false;
    }

    if (!valid) return;

    setLoading(true);
    setFormError("");

    try {
      const res = await fetch(`${API}/api/auth/send-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: method === "email" ? email : undefined,
          phone: method === "phone" ? phone : undefined,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormError("");
        setInputType(method);
        setMode("otp");
        setOtpArray(["", "", "", ""]); 
        setOtp("");   
      } else {
        setFormError(data.message);
      }
    } catch {
      setFormError("Failed to send OTP");
    }

    setLoading(false);
  };

  const handleResetPassword = async () => {
  setSubmitted(true);

  if (!newPassword) {
    setFormError("Enter new password");
    return;
  }

  if (passwordError && passwordError !== "Strong password ✔") {
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inputType === "email" ? email : undefined,
        phone: inputType === "phone" ? phone : undefined,
        otp,
        newPassword,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setFormError("");
      setMode("login");
      setOtp("");
      setNewPassword("");
      setSubmitted(false);
    } else {
      setFormError(data.message);
    }
  } catch {
    setFormError("Reset failed");
  }

  setLoading(false);
};

const handleForgotClick = () => {
  setMode("forgot");
  setFormError(""); 
};

 useEffect(() => {
    if (!newPassword) return;

    const msg = validateStrongPassword(newPassword);
    setPasswordError(msg);

    if (msg === "Strong password ✔") {
      if (passwordTimer.current) clearTimeout(passwordTimer.current);

      passwordTimer.current = setTimeout(() => {
        setPasswordError("");
      }, 5000);
    }
  }, [newPassword]);

  useEffect(() => {
  setFormError("");
  setPasswordError(""); 
}, [mode]);

  return (
    <div className="signin-page">
      <div className="signin-left">
        <div className="signinContent">

          <div className="signinHeader">
            <img src={logo} className="signin-logo" />
            <h2>
              {mode === "login" && "Welcome Back"}
              {mode === "forgot" && "Reset Password"}
              {mode === "otp" && "Verify OTP"}
              {mode === "reset" && "Create New Password"}
            </h2>
            <p>
              {mode === "login" && "Enter your details to continue."}
              
              {mode === "forgot" &&
                (method === "email"
                  ? `Send otp to  ${email || "example@email.com"} to reset your password.`
                  : `Send otp to ${phone || "+234XXXXXXXX"} to reset your password.`)}
              
              {mode === "reset" &&
                (inputType === "email"
                  ? `Set a new password for ${email || "your email"}.`
                  : `Set a new password for ${phone || "your phone"}.`)}
            </p>
          </div>

          <div className="signinForm">
            {mode === "login" && (
            <div className="methodBox">
            
              <div className="methodSwitch">
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
             )}

            {mode === "login" && (
              <form onSubmit={handleLogin}>

                {method === "email" ? (
                  <div className="emailInput">
                    <label className="label">Email</label>
                    <input
                      type="text"
                      placeholder="yourname@gmail.com"
                      value={email}
                      className="formInput"
                      onChange={(e) => {
                        const value = e.target.value;
                        setEmail(value);

                        if (!value) {
                          setFormError(""); 
                        } else {
                          setEmailError(validateEmail(value));
                        }
                      }}
                    />
                    {emailError && <p className="error">{emailError}</p>}
                  </div>
                ) : (
                  <div className="phoneInput">
                    <label className="label">Phone Number</label>
                    <PhoneInput
                      international
                      defaultCountry="NG"
                      value={phone}
                      className="phoneWrapper"
                      onChange={(value) => {
                        setPhone(value);

                        if (!value) {
                          setFormError(""); 
                        } else {
                          setPhoneError(validatePhone(value));
                        }
                      }}
                      placeholder="Enter phone"
                    />
                    {phoneError && <p className="error">{phoneError}</p>}
                  </div>
                )}

                <div className="passwordBox">
                  <label className="label">Password</label>

                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="formInput"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(validatePassword(e.target.value));
                      }}
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="eye">
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                    
                  </div>
                  {passwordError && <p className="error">{passwordError}</p>}
                </div>

                <p
                  className={`forgot ${(!userFound || !hasSubmitted) ? "disabled" : ""}`}
                  onClick={() => {
                    if (!userFound || !hasSubmitted) return;
                    handleForgotClick();
                  }}
                >
                  Forgot Password?
                </p>

                <button type="submit" className="signinBtn">
                  {loading ? <AiOutlineLoading3Quarters className="spinnerLoad"/> : "Sign In"}
                </button>

                {formError && <p className="form-error">{formError}</p>}
              </form>
            )}

            {mode === "forgot" && (
              <div>
                {method === "email" ? (
                  <>
                    <input
                      type="text"
                      placeholder="Enter Email"
                      className="formInput"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                        setFormError(""); 
                      }}
                    />
                    {emailError && <p className="error">{emailError}</p>}
                  </>
                ) : (
                  <>
                    <PhoneInput value={phone} 
                    onChange={(value) => {
                      setPhone(value);
                      setPhoneError("");
                      setFormError(""); 
                    }}
                    className="phoneWrapper"/>
                    {phoneError && <p className="error">{phoneError}</p>}
                  </>
                )}
                

                <div className="buttons">
                  <button onClick={() => setMode("login")} className="otpBtn"> <FiArrowLeft />Back to login</button>
                  <button onClick={handleSendOtp} className="otpBtn">
                    {loading ? <AiOutlineLoading3Quarters className="spinnerLoad"/> : "Send OTP"}
                  </button>
                </div>
               {formError && <p className="form-error">{formError}</p>}
              </div>
            )}

            {mode === "otp" && (
              <div className="otp-wrapper">

                {!expired && (
                  <p className="verify-text">
                    OTP sent to{" "}
                    <span className="verify-value">
                      {inputType === "email" ? email : phone}
                    </span>
                  </p>
                )}

                {!expired && <p className="timer">00:{timeLeft}s</p>}

                {expired && (
                  <p className="expired">
                    Code expired. Please resend.
                  </p>
                )}

                {!expired && (
                  <div className="otp-container">
                    {otpArray.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputsRef.current[i] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        onKeyDown={(e) => handleBackspace(e, i)}
                        onPaste={handlePaste}
                        className={`otp-input ${otpError ? "error-border" : ""}`}
                      />
                    ))}
                  </div>
                )}

                {otpError && !expired && <p className="error">{formError}</p>}

                {!expired && (
                  <button onClick={handleVerifyOtp}>
                    Verify OTP
                  </button>
                )}

                <button onClick={handleResendOtp}>
                  {resending ? (
                    <AiOutlineLoading3Quarters className="spinnerLoad" />
                  ) : (
                    "Resend Code"
                  )}
                </button>

              </div>
            )}
            {mode === "reset" && (
              <div className="password-wrapper">
                <div className="inputWrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="password-input"
                    placeholder="Enter new password"
                  />
                  <span onClick={() => setShowPassword(!showPassword)} className="Eye">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>

                {newPassword && passwordError && (
                  <p
                    className={`password-message ${
                      passwordError === "Strong password ✔" ? "strong" : "error"
                    }`}
                  >
                    {passwordError}
                  </p>
                )}

                <button onClick={handleResetPassword} className="reset-btn" disabled={!newPassword || (passwordError && passwordError !== "Strong password ✔")}>
                  {loading ? <AiOutlineLoading3Quarters className="spinnerLoad" /> : "Create Password"}
                </button>

                {submitted && formError && !passwordError && (
                  <p className="form-error">{formError}</p>
                )}
              </div>
            )}
          </div>

          <p className="signupBtn">You don't have an account yet? <a onClick={() => navigate("/signup")}>Sign up</a></p>
        </div>
      </div>

      <div className="signin-right">
        <div className="signinBg">
          <img src={bgImg} />
        </div>

        <div className="signinContent">
          <div className="signinImg">
            <img src={img1} />
          </div>

          <div className="contentInfo">
            <div className="contentBox"><FiCheck  className="checkIcon"/> Instant PAYE</div>
            <div className="contentBox"><FiCheck className="checkIcon" /> Tax breakdown</div>
            <div className="contentBox"><FiCheck className="checkIcon" /> Deductions</div>
            <div className="contentBox"><FiCheck className="checkIcon" /> Simple UI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signinpage;