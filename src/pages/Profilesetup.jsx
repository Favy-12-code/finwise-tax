import logo from "../images/LogoImg.png";
import '../styles/profile.css'
import { useState, useEffect } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const [finalLoading, setFinalLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employment: "",
    incomeRange: "",
    housing: "",
    taxStatus: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("profileSetup");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("profileSetup", JSON.stringify(form));
  }, [form]);

  const validateStep = () => {
    if (step === 1) {
    let valid = true;

    if (!form.firstName) {
      setErrors((prev) => ({
        ...prev,
        firstName: "! Please enter your first name",
      }));
      valid = false;
    }

    if (!form.lastName) {
      setErrors((prev) => ({
        ...prev,
        lastName: "! Please enter your last name",
      }));
      valid = false;
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "! Enter a valid email address",
      }));
      valid = false;
    }

    return valid;
    
  }

    if (step === 2 && !form.employment) return false;
    if (step === 3 && !form.incomeRange) return false;
    if (step === 4 && !form.housing) return false;
    if (step === 5 && !form.taxStatus)  return false;

    return true;
  };

  const API = import.meta.env.VITE_API_URL;

  const handleNext = async () => {
     window.scrollTo({ top: 200, behavior: 'smooth' });
    setSubmitted(true);
    if (!validateStep()) {
    if (step === 1) {

    } else {
      setError("Please choose an option")
    };
    return;
  }
    setLoading(true);

    try {
      let endpoint = "";

      if (step === 1) endpoint = "/api/auth/setup-profile";
      if (step === 2) endpoint = "/api/auth/employment";
      if (step === 3) endpoint = "/api/auth/income";
      if (step === 4) endpoint = "/api/auth/housing";
      if (step === 5) endpoint = "/api/auth/tax";

      const bodyData = {
        1: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email || undefined,
        },
        2: { employment: form.employment },
        3: { incomeRange: form.incomeRange },
        4: { housing: form.housing },
        5: { taxStatus: form.taxStatus },
      };

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData[step]),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

       if (step === 1 && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (step === 5) {
        localStorage.removeItem("profileSetup");
        localStorage.setItem("userId", data.userId);
        setStep(6);
         setLoading(false);
        return;
      }

      setStep(step + 1);
      setSubmitted(false);
      setError("");
      
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const handleBack = () => {
     window.scrollTo({ top: 200, behavior: 'smooth' });
    setStep(step - 1);
    setError("");
    setSubmitted(false);
  };

  if (step === 6) {
  return (
    <div className="success-screen full-page">
      <div className="success-card animate-fade-in">
        <div className="success-icon">🎉</div>

        <h1>Welcome, {form.firstName} </h1>
        <h2>Your FinWise account is fully ready</h2>

        <p>
          Everything is set. You now have a smarter, faster way to manage your
          taxes, track income, and stay ahead effortlessly.
        </p>

        <button
          className="enter-btn"
         onClick={() => {
  setFinalLoading(true);


  navigate(`/dashboard`);
   
  
}}
        >
          {finalLoading ? <div className="spinner"></div> : "Enter Dashboard"}
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="profile-page">
      <img src={logo} className="profile-logo" />

      <h2>Set up your profile</h2>
      <p className="profileText">It only takes a minute to set things up</p>

      <div className="stepCount">
        <span className="step-text">Step {step} of 5</span>
        <div className="steps">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`step-box ${
                step === s ? "active" : step > s ? "done" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="form-box">
          <h2>Let's get to know you</h2>
          <div className="firstnameInput">
            <label>First Name</label>
            <input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => {
                const value = e.target.value;

                setForm({ ...form, firstName: value });

                if (errors.firstName && value) {
                  setErrors((prev) => ({
                    ...prev,
                    firstName: "",
                  }));
                }
              }}
            />
            {submitted && errors.firstName && (
              <p className="inputError">{errors.firstName}</p>
            )}
          </div>

          <div className="lastnameInput">
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => {
                  const value = e.target.value;

                setForm({ ...form, lastName: value });

                if (errors.lastName && value) {
                  setErrors((prev) => ({
                    ...prev,
                    lastName: "",
                  }));
                }
              }}
            />
            {submitted && errors.lastName && (
              <p className="inputError">{errors.lastName}</p>
            )}
          </div>

          <div className="emailInput">
            <label>Email (optional)</label>
            <input
              placeholder="Email (optional)"
              value={form.email}
              onChange={(e) => {
                const value = e.target.value;

                setForm({ ...form, email: value });

                const emailRegex = /^\S+@\S+\.\S+$/;

                if (value && !emailRegex.test(value)) {
                  setErrors((prev) => ({
                    ...prev,
                    email: "! Enter a valid email address",
                  }));
                } else {
                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }
              }}
            />
            {submitted && errors.email && (
              <p className="inputError">{errors.email}</p>
            )}
            <small>Get timely tax reminders so you never miss a deadline</small>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={`options-grid ${error ? "has-error" : ""}`}>
          <h2>What best describes you?</h2>
          {[
            ["employed", "I’m Employed (monthly earner)"],
            ["self_employed", "Self employed / remote worker"],
            ["business_owner", "Business owner"],
            ["student", "I create content"],
            ["unemployed", "I have multiple income streams"],
            ["tax_consultant", "Tax consultant"],
          ].map(([value, label]) => (
            <div
              key={value}
              className={`option ${
                form.employment === value ? "selected" : ""
              }`}
              onClick={() => {
                setForm({ ...form, employment: value });
                if (error) setError("");
              }}
            >
              {label}
            </div>
          ))}
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {step === 3 && (
        <div className={`options-grid ${error ? "has-error" : ""}`}>
          <h2>What's your estimated annual income?</h2>
          {[
            ["under_800k", "Under ₦800,000 yearly"],
            ["800k_3m", "₦800,001 - ₦3,000,000 yearly"],
            ["3m_12m", "₦3,000,000 - ₦12,000,000 yearly"],
            ["12m_25m", "₦12,000,000 - ₦25,000,000 yearly"],
            ["above_25m", "Above ₦25,000,000 yearly"],
            ["prefer_not", "I would prefer not to say"],
          ].map(([value, label]) => (
            <div
              key={value}
              className={`option ${
                form.incomeRange === value ? "selected" : ""
              }`}
              onClick={() => {
                setForm({ ...form, incomeRange: value });
                if (error) setError("");
              }}
            >
              {label}
            </div>
          ))}
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {step === 4 && (
        <div className="optionsHouse">
          <div className={`options-horizontal ${error ? "has-error" : ""}`}>
        <h2>Do you pay rent?</h2>

        <div
          className={`option ${form.housing === "rent" ? "selected" : ""}`}
          onClick={() => {
            setForm({ ...form, housing: "rent" });
            if (error) setError("");
          }}
        >
          Yes, I pay rent
        </div>

        <div
          className={`option ${form.housing === "own" ? "selected" : ""}`}
          onClick={() => {
            setForm({ ...form, housing: "own" });
            if (error) setError("");
          }}
        >
          No, I own my home or live rent-free
        </div>

      </div>
      {error && <p className="error">{error}</p>}
        </div>
        
      
        
      )}
    

      {step === 5 && (
        <div className={`options-grid ${error ? "has-error" : ""}`}>
          <h2>Have you filed a tax return in Nigeria before?</h2>
          {[
            ["regular", "Yes, I file regularly"],
            ["sometimes", "I've filed once or twice"],
            ["new", "No, this is new to me"],
            ["not_sure", "I'm not sure"],
          ].map(([value, label]) => (
            <div
              key={value}
              className={`option ${
                form.taxStatus === value ? "selected" : ""
              }`}
              onClick={() => {
                setForm({ ...form, taxStatus: value });
                if (error) setError("");
              }}
            >
              {label}
            </div>
          ))}
          {error && <p className="error">{error}</p>}
        </div>
      )}

      

      <div className="btns">
        {step > 1 && (
          <button className="back-btn" onClick={handleBack}>
            <FiArrowLeft /> Go Back
          </button>
        )}

        <button className="next-btn" onClick={handleNext}>
          {loading ? (
            <div className="spinner"></div>
          ) : step === 5 ? (
            "Finish"
          ) : (
            "Proceed"
          )}
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}