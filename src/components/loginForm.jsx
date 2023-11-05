import React from "react";
import Form from "./common/form";
import logo from "../img/film-reel.svg";
const Joi = require("joi-browser");

// login form extends form to get all its methods
class LoginForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // call the server
    console.log("submitted");
  };

  render() {
    return (
      <div classtype="container">
        <h1 className="mb-4">
          Login to{" "}
          <img
            className="ms-2"
            src={logo}
            width={60}
            height={60}
            alt="vidly logo icon"
          />
          Vidly.
        </h1>

        {
          // Submission handler
        }
        <form onSubmit={this.handleSubmit}>
          {
            // Email input
          }
          {this.renderInput("email", "Email")}
          <div id="emailHelp" className="form-text mb-3">
            We'll never share your email with anyone else.
          </div>
          {
            // Password input
          }
          {this.renderInput("password", "Password", "password")}
          {
            // CHECK BOX
          }
          <div class="mb-3 form-check">
            <input type="checkbox" id="confirm" className="form-check-input" />
            <label id="confirm" className="form-check-label" htmlFor="confirm">
              I am not a robot
            </label>
          </div>
          {
            // renderButton is also part of "this" now
            this.renderButton("Submit")
          }
        </form>
      </div>
    );
  }
}

export default LoginForm;
