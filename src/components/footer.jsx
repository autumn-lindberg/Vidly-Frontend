import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/film-reel-purple.png";

function Footer() {
  return (
    <div className="jumbotron jumbotron-fluid footer">
      <div className="container d-flex justify-content-between footer-columns pb-2">
        <div className="logo-column">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="logo mb-2">
              <img
                src={logo}
                className="navbar-brand me-0"
                width={80}
                height={80}
                alt="logo"
              />
              <h1 className="h3 fw-bold vidly-text vidly-footer">Vidly.</h1>
            </div>
          </Link>
          <div className="logo-column-text">
            <div className="social-links mb-2">
              <h5>Follow us on:</h5>
              <div className="logo-row">
                <Link
                  to={{ pathname: "https://www.instagram.com" }}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <i class="bi-instagram h2"></i>
                </Link>
                <Link
                  to={{ pathname: "https://www.facebook.com" }}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <i class="bi-facebook h2"></i>
                </Link>
                <Link
                  to={{ pathname: "https://www.youtube.com" }}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <i class="bi-youtube h2"></i>
                </Link>
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
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>Home</li>
            </Link>
            <Link to="/movies" style={{ textDecoration: "none" }}>
              <li>Movies</li>
            </Link>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <li>Products</li>
            </Link>
            <Link to="/customers" style={{ textDecoration: "none" }}>
              <li>Customers</li>
            </Link>
          </ul>
        </div>
        <div className="about-column">
          <h3 className="column-header">API Docs</h3>
          <ul>
            <Link to="/api/docs/movies" style={{ textDecoration: "none" }}>
              <li>Movies</li>
            </Link>
            <Link to="/api/docs/genres" style={{ textDecoration: "none" }}>
              <li>Genres</li>
            </Link>
            <Link to="/api/docs/products" style={{ textDecoration: "none" }}>
              <li>Products</li>
            </Link>
            <Link to="/api/docs/rentals" style={{ textDecoration: "none" }}>
              <li>Rentals</li>
            </Link>
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
