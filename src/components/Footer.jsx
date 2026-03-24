import React from "react";
import "../styles/Footer.css";
import logo1 from "../images/LogoImg.png";
import logo2 from "../images/JekaImg.png";
import { Link, useNavigate, useLocation  } from "react-router-dom";

export default function Footer() {
   const navigate = useNavigate();
  const location = useLocation();

  const goToPageAndScroll = (path, sectionId) => {
    navigate(path, { state: { scrollTo: sectionId } });
  };

  const goToGuide = () => {
    navigate("/calculator/guide", { state: { scrollTo: "guideSection" } });
  };

  const isVatActive = location.pathname === "/calculator/vat";
  const isPayeActive = location.pathname === "/calculator/paye";
  const isBusinessActive = location.pathname === "/calculator/business";
  const isGuideActive = location.pathname === "/calculator/guide";
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

          <div className="footer-col calculator-col">
            <h3>Tax Guides</h3>
            <p onClick={() => goToPageAndScroll('/calculator/guide#vatGuide', 'vatGuide')}>VAT Guide Nigeria</p>
            <p onClick={() => goToPageAndScroll('/calculator/guide#payeGuide', 'payeGuide')}>PAYE Guide Nigeria</p>
            <p onClick={() => goToPageAndScroll('/calculator/guide#pitGuide', 'pitGuide')}>PIT Guide Nigeria</p>
            <p onClick={() => goToPageAndScroll('/calculator/guide#guideDeadline', 'guideDeadline')}>Tax Deadlines</p>
          </div>

          <div className="footer-col calculator-col">
            <h3>Calculator</h3>
            <p onClick={() => goToPageAndScroll('/calculator/vat', 'vatSection')}>VAT Calculator</p>
            <p onClick={() => goToPageAndScroll('/calculator/paye', 'payeSection')}>PAYE Calculator</p>
            <p onClick={() => goToPageAndScroll('/calculator/business', 'businessSection')}>Business Tax</p>
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