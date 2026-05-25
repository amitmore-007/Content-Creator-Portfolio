import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">
            SHAKTI<span className="footer-logo-accent"> KALE</span>
          </span>
          <p className="footer-tagline">
            Creating visual stories that
            <br />
            <em>leave a mark.</em>
          </p>
        </div>

        <nav className="footer-nav">
          <div className="footer-nav-col">
            <span className="footer-nav-title">Pages</span>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-nav-col">
            <span className="footer-nav-title">Services</span>
            <a href="#services">Model Shoots</a>
            <a href="#services">Brand Content</a>
            <a href="#services">Travel Films</a>
            <a href="#contact">Collaborations</a>
          </div>
          <div className="footer-nav-col">
            <span className="footer-nav-title">Social</span>
            <a
              href="https://www.instagram.com/shakti_kale_official?igsh=bXloeThwd21lOHV3"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@shaktiscreation?si=PCFuOdUtqskgINOm"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
            <a
              href="https://www.linkedin.com/in/shakti-kale-0b877b30a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </nav>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <span className="footer-copy">
          © {year} Shakti Kale. All rights reserved.
        </span>
        <span className="footer-location">Pune · India · Worldwide</span>
        <span className="footer-credit">Crafted with obsession</span>
      </div>
    </footer>
  );
}
