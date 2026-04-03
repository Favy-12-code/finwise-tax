import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import { FiEye, FiEyeOff, FiCheck  } from "react-icons/fi";
import "react-phone-number-input/style.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import '../styles/signup.css';

export default function PhoneSignup({ onSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phonePassword, setPhonePassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPhonePassword, setShowPhonePassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordTimer = useRef(null);

  useEffect(() => {
    if (passwordMessage) {
      if (passwordTimer.current) clearTimeout(passwordTimer.current);

      passwordTimer.current = setTimeout(() => {
        setPasswordMessage("");
      }, 10000); 
    }

    return () => {
      if (passwordTimer.current) clearTimeout(passwordTimer.current);
    };
  }, [passwordMessage]);

   const checkPassword = (pass) => {
    if (pass.length < 6) return "! Too short (min 6)";
    if (!/[A-Z]/.test(pass)) return "! Add at least one uppercase letter";
    if (!/[0-9]/.test(pass)) return "! Add at least one number";
    if (!/[!@#$%^&*]/.test(pass))
      return "! Add at least one special character (!@#$%^&*)";
    return "Strong password ✔";
  };

const handlePhoneSignup = async (e) => {
  e.preventDefault();
  let newErrors = {};
  setLoading(true);

  if (!name) newErrors.name = "! Please enter your name";
  if (!phone) newErrors.phone = "! Please enter your phone number";

  if (!phonePassword) newErrors.phonePassword = "! Please enter your password";
  else {
    const msg = checkPassword(phonePassword);
    if (msg !== "Strong password ✔") newErrors.phonePassword = msg;
  }

  if (!terms) newErrors.terms = "! You must accept Terms & Conditions";

  setPasswordMessage("");

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) {
    setLoading(false);
    return;
  };

  try {
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
        phone,
        password: phonePassword,
      }),
    });

    const data = await res.json();
    console.log("Backend response:", data);

    if (data.success) {
      setName("");
      setPhone("");
      setPhonePassword("");
      setTerms(false);
      setErrors({});
      setPasswordMessage("");

       if (onSuccess) {
    onSuccess(phone);
  }

      if (passwordTimer.current) clearTimeout(passwordTimer.current);
    } else {
      setErrors({ form: data.message });
    }
  } catch (err) {
    setErrors({ form: "Signup failed" });
  }
  setLoading(false);
};

  return (
    <form onSubmit={handlePhoneSignup}>
      <div className="nameInput">
        <label className="label">Name</label>
        <input
          type="text"
          value={name}
          className={errors.name ? "input-error" : "formInput"}
          onChange={(e) => {
            setName(e.target.value);
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

      <div className="phoneInput">
        <label className="label">Phone Number</label>
        <PhoneInput
          international
          defaultCountry="NG"
          value={phone}
           className={`phoneWrapper ${errors.phone ? "input-error" : ""}`}
          onChange={(value) => {
            setPhone(value || "");
             setErrors((prev) => {
              const { phone, form, ...rest } = prev; // remove phone + form errors
              return rest;
            });
          }}  
        />
        <div className="spanError">
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      </div>

      <div className="PasswordInput">
        <label>Password</label>
        <div className="input-wrapper">
          <input
            type={showPhonePassword ? "text" : "password"}
            value={phonePassword}
            autoComplete="new-password"
            className={errors.phonePassword ? "input-error" : "formInput"}
            onChange={(e) => {
              const val = e.target.value;
              setPhonePassword(val);

              const msg = checkPassword(val);
              setPasswordMessage(msg);

              setErrors((prev) => ({ ...prev, phonePassword: "" }));
              
            }}
            placeholder="Minimum 6 characters"
          />
          <span
            className="eye"
            onClick={() => setShowPhonePassword(!showPhonePassword)}
          >
            {showPhonePassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <div className="spanError">
          {!errors.phonePassword && phonePassword && passwordMessage && (
          <span className={passwordMessage.includes("✔") ? "success" : "error"}>
            {passwordMessage}
          </span>
        )}

        {errors.phonePassword && <span className="error">{errors.phonePassword}</span>}
        </div>  
      </div>

      <div className="terms">
        <label className="terms-label">
          <input
          type="checkbox"
          checked={terms}
          onChange={() => {
            setTerms(!terms);
            setErrors((prev) => ({ ...prev, terms: "" }));
          }}
        />
        <span className="customCheck">{terms && <FiCheck />}</span>
        <p className="labelP">
          I accept <a href="/terms">Terms & Conditions</a>
        </p>
        </label>
        <div className="spanError">
          {errors.terms && <span>{errors.terms}</span>}
        </div>
      </div>

      <button className="signup-btn" type="submit" disabled={loading}>
        {loading ? (
          <AiOutlineLoading3Quarters className="spinner" />
        ) : (
          "Create Account"
        )}
      </button>

      <p className="SIGNin">
        Already have an account? <a href="/signin">Sign in</a>
      </p>

      {message && <p className="success">{message}</p>}
      {errors.form && <span className="form-error">{errors.form}</span>}
    </form>
  );
}