import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const VerifyPage = ({ type, value, onBack }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(300); // 5 mins
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  // TIMER
  useEffect(() => {
    if (timer <= 0) return setExpired(true);
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/, "");
    if (!val) return;
    let newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (index < 5) {
      inputsRef.current[index + 1].focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      let newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputsRef.current[index - 1].focus();
        setActiveIndex(index - 1);
      }
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length < 6) return setError("Enter full OTP");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
        [type]: value,
        otp: otpString,
      });
      setMessage(res.data.message);
      setError("");
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/login"; // Redirect after success
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:5000/resend-otp", { [type]: value });
      setOtp(new Array(6).fill(""));
      setTimer(300);
      setExpired(false);
      setMessage("New OTP sent ✅");
      setActiveIndex(0);
      inputsRef.current[0].focus();
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  const formatTime = () => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="verify-page">
      <h2>Verify OTP</h2>
      <p>Code sent to {value}</p>

      <div className="otp-inputs">
        {otp.map((num, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            value={num}
            ref={(el) => (inputsRef.current[idx] = el)}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            disabled={expired}
          />
        ))}
      </div>

      <p className="timer">Expires in: {formatTime()}</p>

      <button onClick={handleVerify} disabled={loading || expired}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      {expired && (
        <button onClick={handleResend}>Resend OTP</button>
      )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <p className="back" onClick={onBack}>
        ← Back to Signup
      </p>
    </div>
  );
};

export default VerifyPage;