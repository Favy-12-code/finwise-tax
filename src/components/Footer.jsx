import React from "react";
import "../styles/Footer.css";
import logo1 from "../images/LogoImg.png";
import logo2 from "../images/JekaImg.png";
import { Link } from "react-router-dom";

export default function Footer({ scrollToGuideSection }) {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-col logo-col">
            <img src={logo1} alt="Finwise Logo" className="footer-logo" />
            <p className="footer-tagline">
              Know your tax <br /> Own your money
            </p>
          </div>

          <div className="footer-col resources-col">
            <h3>Resources</h3>
           <a href="/#faq">Faqs</a>
            <a href="/blog">Blog</a>
            <a href="/why-us">Why Us</a>
            <a href="/help">Help Centre</a>
          </div>

          <div className="footer-col">
            <h3>Tax Guides</h3>
            <Link to="/calculator/guide#vat">VAT Guide Nigeria</Link>
            <Link to="/calculator/guide#paye">PAYE Guide Nigeria</Link>
            <Link to="/calculator/guide#pit">PIT Guide Nigeria</Link>
            <Link to="/calculator/guide#deadline">Tax Deadlines</Link>
          </div>

          <div className="footer-col calculator-col">
            <h3>Calculator</h3>
            <a href="/calculator/vat">VAT Calculator</a>
            <a href="/calculator/PAYE">PAYE Calculator</a>
            <a href="/calculator/business">Business Tax</a>
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            <a href="/#About">About Us</a>
            <a href="/features">Features</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>

        <div className="powered">
          <p>Powered by</p>
          <img src={logo2} alt="Powered by Jeka" />
        </div>
      </div>

      <div className="footer">
        <p>© Copyright @ Finwise 2026. All rights reserved</p>
      </div>
    </footer>
  );
}