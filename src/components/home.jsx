import React, { Component } from "react";
import Card from "./card";
import Footer from "./footer";
import cameras from "../img/cameras.jpg";
import filmReel from "../img/film-reel-multiple.jpg";
import smiles from "../img/smiling-group.jpg";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
  render() {
    const width = "15rem";
    const height = "20rem";
    return (
      <React.Fragment>
        <ToastContainer />

        <div className="jumbotron jumbotron-fluid hero-banner">
          <div className="container">
            <h2 className="display-5 pt-5 mb-3 text-center hero-text">
              <div className="hero-movies">Movies.</div>
              <div className="hero-managed">Managed.</div>
            </h2>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4 mt-4">
                Vidly is the app created to solve one problem: simplify the
                video rental process for both the customer and video store. We
                strive to create an experience that leaves people satisfied with
                both ease of use and cost. Ready to get started?{" "}
                <span className="call-to-action">
                  Sign in or register below.
                </span>
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center btn-group">
                <div className="w-25">
                  <Link to="/register">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg me-1 px-4 gap-3"
                    >
                      Register
                    </button>
                  </Link>
                </div>
                <div className="w-25">
                  <Link to="/login">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary btn-lg text-light ms-1 px-4 ps-4 pe-4"
                    >
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          // CARDS
        }
        <div className="jumbotron jumbotron-fluid pb-4 cards h-auto">
          <div className="container d-flex justify-content-center pt-4 pb-4 cardContainer">
            <Card
              className="image-hover"
              image={filmReel}
              title="Movies"
              body="Track your inventory easily with Vidly's movie management tool. Available to all users."
              button="Inventory"
              link="/movies"
              width={width}
              height={height}
            />
            <Card
              className="image-hover"
              image={cameras}
              title="Products"
              body="Make the most of your reputation by merchandising. A cost-effective way to generate revenue."
              button="Manage"
              link="/products"
              width={width}
              height={height}
            />
            <Card
              className="image-hover"
              image={smiles}
              title="Customers"
              body="Get to know your customers by keeping in touch with them. Send newsletters, reminders, and texts."
              button="View Customers"
              link="/customers"
              width={width}
              height={height}
            />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
