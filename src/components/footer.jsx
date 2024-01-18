import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../img/film-reel-purple.png";
import Axios from "axios";

function Footer() {
  const [email, setEmail] = useState();
  useEffect(() => {
    const thankYouMessage = document.querySelector(".thankyou_message");
    thankYouMessage.style.display = "none";
  }, []);
  function handleChange(e) {
    setEmail(e.currentTarget.value);
  }
  function submitForm(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Email", email);
    Axios({
      method: "post",
      url: "https://script.google.com/macros/s/AKfycbzYMCL5dlqRBvqGg6nsUugs8o2jWPorYwZvor5drvjUhOO7A8_qMWe0fcqMlQQAFhEY/exec",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        if (response.status === 200) {
          var formElements = document.querySelector(".form-elements");
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          var thankYouMessage = document.querySelector(".thankyou_message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "flex";
          }
        }
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }
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
                  <i className="bi-instagram h2"></i>
                </Link>
                <Link
                  to={{ pathname: "https://www.facebook.com" }}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <i className="bi-facebook h2"></i>
                </Link>
                <Link
                  to={{ pathname: "https://www.youtube.com" }}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <i className="bi-youtube h2"></i>
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
          <form
            className="gform"
            //target="_blank"
            onSubmit={submitForm}
          >
            <div className="form-elements">
              <input
                onChange={handleChange}
                className="form-control subscribe"
                placeholder="Enter your email"
                type="text"
                name="Email"
                id="Email"
              />
              <button
                className="btn btn-primary subscribe-button"
                type="submit"
              >
                Subscribe
              </button>
            </div>
            <div className="thankyou_message">
              <h5 className="fw-bold">
                Thank you for contacting us! We will get back to you soon.
              </h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
