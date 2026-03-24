import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import LogoImg from "../images/LogoImg.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 841) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const getHashLinkClass = (hash) => {
    return location.hash === hash ? "active" : "";
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img src={LogoImg} alt="Logo" />
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/#About" className={() => getHashLinkClass("#About")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/#faq" className={() => getHashLinkClass("#faq")}>
              Faqs
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/calculator" className={({ isActive }) => (isActive ? "active" : "")}>
              Calculator
            </NavLink>
          </li>
        </ul>

        {/* Auth links */}
        <div className="auth">
          <NavLink to="/signin" className={({ isActive }) => (isActive ? "signin active" : "signin")}>
            Sign In
          </NavLink>
          <NavLink to="/signup" className="signup">Sign Up</NavLink>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/#About" className={() => getHashLinkClass("#About")} onClick={() => setMenuOpen(false)}>
          About
        </NavLink>
        <NavLink to="/#faq" className={() => getHashLinkClass("#faq")} onClick={() => setMenuOpen(false)}>
          Faqs
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
          Blog
        </NavLink>
        <NavLink to="/calculator" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setMenuOpen(false)}>
          Calculator
        </NavLink>
        <NavLink to="/signin" onClick={() => setMenuOpen(false)}>Sign In</NavLink>
        <NavLink to="/signup" className="signup" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
      </div>
    </header>
  );
}