import React from "react";
import { Navigate } from "react-router-dom";
import Form from "./common/form";
import logo from "../img/film-reel-purple.png";
import Footer from "./footer";
import httpService from "../services/httpservice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import UserContext from "../UserContext";
import { GoogleLogin } from "@react-oauth/google";
const Joi = require("joi-browser");

// login form extends form to get all its methods
class RegisterForm extends Form {
  static contextType = UserContext;
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
    navigate: false,
  };

  schema = {
    name: Joi.string().required().label("Full Name"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
    if (localStorage.getItem("token")) this.setState({ navigate: true });
  }

  doSubmit = async () => {
    // duplicate the state
    const data = { ...this.state.data };
    // call the server
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    // send request
    try {
      const response = await httpService.post(
        `${process.env.REACT_APP_API_ENDPOINT}/users`,
        user
      );
      if (response.status === 400) {
        toast.error("Registration Error");
      } else {
        toast.success("Account Created Successfully!");
        // store JWT
        const JWT = response.headers["x-auth-token"];
        localStorage.setItem("token", JWT);
        // decode JWT so user data can be set
        const user = jwtDecode(JWT);
        // set context
        this.context.handleRegister(user);
        this.setState({ navigate: true });
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  doNothing() {}

  render() {
    return (
      <>
        <div className="page-container login-register-page">
          <div classtype="container">
            <h1 className="mb-4 d-flex">
              Register for{" "}
              <div className="register-login-logo">
                <img
                  className="ms-2 vidly-icon"
                  src={logo}
                  width={60}
                  height={60}
                  alt="vidly logo icon"
                />
                <span className="logo-text h2 fw-bold">Vidly.</span>
              </div>
            </h1>
            {
              // Submission handler
            }
            <form onSubmit={this.handleSubmit}>
              {
                // Name input
              }
              {this.renderInput("name", "Full Name")}
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
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  id="confirm"
                  className="form-check-input"
                />
                <label
                  id="confirm"
                  className="form-check-label"
                  htmlFor="confirm"
                >
                  I am not a robot
                </label>
              </div>
              {
                // renderButton is also part of "this" now
                this.renderButton("Submit")
              }
            </form>
            <br />
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const jwt = jwtDecode(credentialResponse.credential);
                const user = {
                  name: jwt.name,
                  email: jwt.email,
                  password: jwt.sub,
                  isAdmin: true,
                };
                // send object to new user
                const response = await httpService.post(
                  `${process.env.REACT_APP_API_ENDPOINT}/users`,
                  user
                );
                if (response.status === 200) {
                  toast.success("Account Created Successfully!");
                  // store JWT
                  const token = response.headers["x-auth-token"];
                  localStorage.setItem("token", token);
                  // set context
                  const myContext = jwtDecode(token);
                  this.context.handleRegister(myContext);
                  this.setState({ navigate: true });
                } else {
                  toast.error("An Error Occurred. Please Try Again Later.");
                }
              }}
              onError={() => {
                toast.error("Login Failed.");
              }}
            />
          </div>
          {this.state.navigate ? <Navigate to="/movies" /> : this.doNothing()}
        </div>
        <Footer />
      </>
    );
  }
}

export default RegisterForm;
