import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";

export default function PhoneSignup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phonePassword, setPhonePassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPhonePassword, setShowPhonePassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState("");
  const [message, setMessage] = useState("");

  const checkPassword = (pass) => {
    if (pass.length >= 8) return "Strong password ✔";
    return "Password must be at least 8 characters";
  };

  const handlePhoneSignup = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!name) newErrors.name = "Please enter your name";
    if (!phone) newErrors.phone = "Please enter your phone number";
    if (!phonePassword) newErrors.phonePassword = "Please enter your password";
    else {
      const msg = checkPassword(phonePassword);
      if (msg !== "Strong password ✔") newErrors.phonePassword = msg;
    }
    if (!terms) newErrors.terms = "You must accept Terms & Conditions";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

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
        setMessage("OTP sent successfully 🚀");
        // reset
        setName("");
        setPhone("");
        setPhonePassword("");
        setTerms(false);
        setErrors({});
      } else {
        setErrors({ form: data.message });
      }
    } catch (err) {
      setErrors({ form: "Signup failed" });
    }
  };

  return (
    <form onSubmit={handlePhoneSignup}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          placeholder="Your Name"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <PhoneInput
          international
          defaultCountry="NG"
          value={phone}
          onChange={(value) => {
            setPhone(value || ""); // make sure it's never undefined
            setErrors((prev) => ({ ...prev, phone: "" }));
          }}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type={showPhonePassword ? "text" : "password"}
          value={phonePassword}
          onChange={(e) => {
            const val = e.target.value;
            setPhonePassword(val);
            setPasswordMessage(checkPassword(val));
            setErrors((prev) => ({ ...prev, phonePassword: "" }));
          }}
        />
        <span onClick={() => setShowPhonePassword(!showPhonePassword)}>
          {showPhonePassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {phonePassword && passwordMessage && (
          <span className={passwordMessage.includes("✔") ? "success" : "error"}>
            {passwordMessage}
          </span>
        )}
        {errors.phonePassword && <span className="error">{errors.phonePassword}</span>}
      </div>

      <div>
        <input
          type="checkbox"
          checked={terms}
          onChange={() => {
            setTerms(!terms);
            setErrors((prev) => ({ ...prev, terms: "" }));
          }}
        />
        <label>I accept Terms & Conditions</label>
        {errors.terms && <span className="error">{errors.terms}</span>}
      </div>

      <button type="submit">Send OTP</button>
      {message && <p className="success">{message}</p>}
      {errors.form && <span className="error">{errors.form}</span>}
    </form>
  );
}