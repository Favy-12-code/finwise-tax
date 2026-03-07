import React from "react";
import "../styles/Goal.css";

const GoalSection = () => {
  return (
    <section className="info-section">

      <div className="info-card">
         <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 512 512"
    className="icon"
  >
    <path
      fill="none"
      stroke="#16A34A"
      strokeWidth="12"
      d="M256 48c-88.22 0-160 71.78-160 160 0 123.38 160 256 160 256s160-132.62 160-256c0-88.22-71.78-160-160-160z"
    />
    <circle cx="256" cy="208" r="48" fill="none" stroke="#149443" strokeWidth="12"/>
  </svg>
        <h3>Built for Nigeria</h3>
        <p>
          We do not involve hidden fees or
          unnecessary complexity. Your 
          calculations are straightforward,
          and your privacy matters. 
          Our goal is simple; help you 
          understand your tax—completely.
        </p>
      </div>

      <div className="info-card">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  width="60"
  height="60"
  viewBox="0 0 512 512"
  className="icon"
>
  <circle
    cx="256"
    cy="256"
    r="200"
    fill="none"
    stroke="#149443"
    strokeWidth="12"
  />
  <circle
    cx="256"
    cy="256"
    r="120"
    fill="none"
    stroke="#149443"
    strokeWidth="12"
  />

  <circle
    cx="256"
    cy="256"
    r="40"
    fill="none"
    stroke="#149443"
    strokeWidth="12"
  />

  <line
    x1="256"
    y1="216"
    x2="256"
    y2="120"
    stroke="#149443"
    strokeWidth="12"
    strokeLinecap="round"
  />
  <circle
    cx="256"
    cy="120"
    r="12"
    fill="#149443"
  />
</svg>
        <h3>Our Mission</h3>
        <p>
          To simplify tax calculations in Nigeria and 
          give individuals the confidence
          to take control of their finances.
        </p>
      </div>

      <div className="info-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 512 512" className="icon">
    <path d="M256 16L48 96v144c0 132 120 224 208 256 88-32 208-124 208-256V96L256 16z" fill="none" stroke="#149443" strokeWidth="12" />
  </svg>
        <h3>Transparency & Trust</h3>
        <p>
          Designed around the Nigeria tax 
          structure and updated to reflect 
          current regulations. We focus on 
          accuracy, transparency, and stability
          so you can make better financial 
          decisions with confidence.
        </p>
      </div>

    </section>
  );
};

export default GoalSection;