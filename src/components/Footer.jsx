import { Link } from "react-router-dom";
import "../styles/Footer.css";
import logo1 from "../images/LogoImg.png";
import logo2 from "../images/JekaImg.png";

export default function Footer() {
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
            <Link to="/faq">FAQs</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/why-us">Why Us</Link>
            <Link to="/help">Help Centre</Link>
          </div>

          <div className="footer-col">
            <h3>Tax Guides</h3>
            <Link to="/calculator/guides/2026">Nigeria Tax Guide 2026</Link>
            <Link to="/calculator/guides/paye">PAYE Guide Nigeria</Link>
            <Link to="/calculator/guides/vat">VAT Guide Nigeria</Link>
          </div>

          <div className="footer-col calculator-col">
            <h3>Calculator</h3>
            <Link to="/calculator/vat">VAT Calculator</Link>
            <Link to="/calculator/paye">PAYE Calculator</Link>
            <Link to="/calculator/business">Business Tax</Link>
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            <Link to="/about">About Us</Link>
            <Link to="/features">Features</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

        </div>

        <div className="powered">
          <p>Powered by</p>
          <img src={logo2} alt="Powered by Jeka" />
        </div>

      </div>


      <div className="footer">
        <p>
          <span className="copyright-symbol">©</span>
          Copyright @ Finwise 2026. All rights reserved
        </p>
      </div>

    </footer>
  );
}