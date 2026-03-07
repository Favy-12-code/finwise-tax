import React from 'react';
import "./Herostyle.css";
import HeroImg from "../images/HeroImg.png";
import bgImg from "../images/bgImg.png";

const HeroSection = () => {
  return (
    <section
      className="hero"
    >
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      ></div>
      <div className="hero-container">

        {/* LEFT SIDE TEXT */}
        <div className="hero-text">
          <h1>
            KNOW YOUR TAX <br />
            OWN YOUR MONEY
          </h1>

          <p>
            Calculate your income tax instantly, understand every deduction
            and know exactly what you owe — no confusion, no guesswork.
          </p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero-image">
          <img
            src={HeroImg}
            alt="Tax illustration"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;