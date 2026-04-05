import { useState, useEffect, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiRefreshCw, FiHeadphones, FiCheck } from "react-icons/fi";
import logo from "../images/LogoImg.png";
import flags from "react-phone-number-input/flags";
import { parsePhoneNumber } from "react-phone-number-input";
import Profilesetup from "./Profilesetup";
import bgImg from "../images/bgImg.png";
import img1 from "../images/HeroImg.png";
import '../styles/verify.css'

export default function VerifyPage({ type, value, onBack }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorState, setErrorState] = useState(false);

  

  const [resent, setResent] = useState(false);
  const [emptyOtpError, setEmptyOtpError] = useState(false);
  const [otpSubmitted, setOtpSubmitted] = useState(false); 
  const [verified, setVerified] = useState(false);
  
  const inputsRef = useRef([]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorState(false);
    setEmptyOtpError(false);

     if (otpSubmitted) setEmptyOtpError(false);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    setOtpSubmitted(true);

    if (code.length < 4) {
      setEmptyOtpError(true);
      return;
    }
    setLoading(true);
     setEmptyOtpError(false);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ otp: code }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setVerified(true)
      } else {
        setErrorState(true);
      }
    } catch {
      setErrorState(true);
    }

    setLoading(false);
  };

  const handleResend = async () => {
    setResending(true);

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/resend-otp`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      setTimeLeft(60);
      setExpired(false);
      setOtp(["", "", "", ""]);
      setResent(true);
      setOtpSubmitted(false);
      setEmptyOtpError(false);
        setErrorState(false); 
    } catch {}

    setResending(false);
  };

  const handleCancel = async () => {
    await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/cancel-signup`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    onBack(); 
  };

  if (verified) {
    return <Profilesetup />;
  }

  const handlePaste = (e) => {
  e.preventDefault();
  const pasteData = e.clipboardData.getData("text").trim();
  if (!/^\d{4}$/.test(pasteData)) return; 

  const newOtp = pasteData.split("").slice(0, 4); 
  setOtp(newOtp);

  inputsRef.current[3].focus();
};

  return (
    <div className="verify-page">
      <div className="verify-left">
        <img src={logo} className="verify-logo" />

        <h2>Enter Verification Code</h2>

        {!expired && (
          <p className="verify-text">
            {resent ? "Code has been resent to " : "We have sent a code to "}
            <span className="verify-value">
              {type === "phone" && value ? (
                (() => {
                  const phoneNumber = parsePhoneNumber(value);
                  const country = phoneNumber?.country;
                  const Flag = country ? flags[country] : null;

                  return (
                    <span className="phone-display">
                      {Flag && <Flag className="flag-icon" />}
                      <span>{value}</span>
                    </span>
                  );
                })()
              ) : (
                value
              )}
            </span>
          </p>
        )}

        {!expired && <p className="timer">00:{timeLeft}s</p>}

        {expired && (
          <p className="expired">
            Code sent to <span className="verify-value">
              {type === "phone" && value ? (
                (() => {
                  const phoneNumber = parsePhoneNumber(value);
                  const country = phoneNumber?.country;
                  const Flag = country ? flags[country] : null;

                  return (
                    <span className="phone-display">
                      {Flag && <Flag className="flag-icon" />}
                      <span>{value}</span>
                    </span>
                  );
                })()
              ) : (
                value
              )}
            </span> has expired. Resend Code to try again.{" "}
          </p>
        )}

        {!expired && (
          <div className="otp-container">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleBackspace(e, i)}
                onPaste={handlePaste}
                className={`otp-input ${errorState ? "error-border" : ""} ${digit ? "filled" : ""}`}
              />
            ))}
          </div>
        )}

        {emptyOtpError && !expired && (
          <p className="otp-error">Please enter the verification code</p>
        )}

        {!expired && (
          <button className="verify-btn" onClick={handleVerify}>
            {loading ? (
              <AiOutlineLoading3Quarters className="spinner" />
            ) : type === "phone" ? (
              "Verify Phone"
            ) : (
              "Verify Email"
            )}
          </button>
        )}


          <button className="resend-btn" onClick={handleResend}>
            {resending ? (
              <AiOutlineLoading3Quarters className="spinnerLoad" />
            ) : (
              <>
                <FiRefreshCw /> Resend Code
              </>
            )}
          </button>
    

        <p className="helper">
          Check your spam folder or{" "}
          <span onClick={handleCancel}>try signing up again</span>
        </p>

        <p className="support">
          Experiencing trouble?{" "}
          <a href="/support">Contact support <FiHeadphones /></a>
        </p>
      </div>
      
      <div className="verify-right">
        <div className="verifyBg">
          <img src={bgImg} alt="background" />
        </div>

        <div className="verifyContent">
          <div className="verifyImg">
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
    
  );
}