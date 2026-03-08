import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../styles/styles.css";
import  LogoImg from "../images/LogoImg.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 841) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
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

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">
    
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="logo">
          <NavLink to="/">
            <img src={LogoImg} alt="Logo" />
          </NavLink>
        </div>

        <ul className="nav-links">
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/faq">Faqs</NavLink></li>
          <li><NavLink to="/blog">Blog</NavLink></li>
          <li><NavLink to="/calculator">Calculator</NavLink></li>
        </ul>

        <div className="auth">
          <NavLink
            to="/signin"
            className={({ isActive }) => (isActive ? "signin active" : "signin")}
          >
            Sign In
          </NavLink>
          <NavLink to="/signup" className="signup">Sign Up</NavLink>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/faq" onClick={() => setMenuOpen(false)}>Faqs</NavLink>
        <NavLink to="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink>
        <NavLink to="/calculator" onClick={() => setMenuOpen(false)}>Calculator</NavLink>
        <NavLink to="/signin" onClick={() => setMenuOpen(false)}>Sign In</NavLink>
        <NavLink to="/signup" className="signup" onClick={() => setMenuOpen(false)}>Sign Up</NavLink>
      </div>
    </header>
  );
}