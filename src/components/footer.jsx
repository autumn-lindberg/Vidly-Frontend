import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/film-reel-purple.png";

function Footer() {
  return (
    <div className="jumbotron jumbotron-fluid footer">
      <div className="container d-flex justify-content-between footer-columns pb-2">
        <div className="logo-column">
          <div className="logo mb-2">
            <img
              src={logo}
              className="navbar-brand me-0"
              width={80}
              height={80}
              alt="logo"
            />
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 className="h3 fw-bold vidly-text vidly-footer">Vidly.</h1>
            </Link>
          </div>
          <div className="logo-column-text">
            <div className="social-links mb-2">
              <h5>Follow us on:</h5>
              <div className="logo-row">
                <i class="bi-instagram h2"></i>
                <i class="bi-facebook h2"></i>
                <i class="bi-youtube h2"></i>
              </div>
            </div>
            <div className="contact">
              <h5 className="mt-2 mb-1">Email us at:</h5>
              <p className="email">questions@vidly.com</p>
            </div>
          </div>
        </div>
        <div className="navigation-column">
          <h3 className="column-header">Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Movies</li>
            <li>Products</li>
            <li>Customers</li>
          </ul>
        </div>
        <div className="about-column">
          <h3 className="column-header">API Docs</h3>
          <ul>
            <li>Movies</li>
            <li>Genres</li>
            <li>Products</li>
            <li>Rentals</li>
          </ul>
        </div>
        <div className="subscribe-column">
          <h3 className="column-header">Newsletter</h3>
          <p>Stay in the know about community events, sales, and updates.</p>
          <form>
            <input
              className="form-control subscribe"
              placeholder="Enter your email"
              type="text"
            />
            <button className="btn btn-primary subscribe-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
