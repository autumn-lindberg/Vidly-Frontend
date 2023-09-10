import React, { Component } from "react";
import Input from "./common/input";
import logo from "../img/film-reel.svg";

class LoginForm extends Component {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  email = React.createRef();

  // This validation algorithm for the entire form returns true when it passes and an errors object when it doesn't
  // The errors object stores two strings in separate props to represent an error trace for each input field
  validate = () => {
    // destructure data props from state
    const { data } = this.state;
    // initialize as empty object so we know what to return
    const errors = {};
    // BASIC VALIDATION FOR ENTIRE FORM
    // if username field is empty (trim function removes whitespace from a string)
    if (data.email.trim() === "") {
      errors.email = "Email is required.";
    }
    // if passwordfield is empty (trim function removes whitespace from a string)
    if (data.password.trim() === "") {
      errors.password = "Password is required.";
    }
    // if errors still empty, return nothing. Otherwise return the error
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = (input) => {
    // validate username
    if (input.name === "username") {
    }
    // validate password
    if (input.name === "password") {
    }
  };

  handleChange = (e) => {
    // clone the state by spread operator
    const data = { ...this.state.account };
    const errors = { ...this.state.errors };
    // use validation function and send error to corresponding property in errors object
    const errorMsg = this.validateProperty(e.currentTarget);
    if (errorMsg) errors[e.currentTarget.name] = errorMsg;
    else delete errors[e.currentTarget.name];
    // e.currentTarget.name takes the name property of the input field being changed
    data[e.currentTarget.name] = e.currentTarget.value;
    // update the state to reflect current input and error info
    this.setState({ data, errors });
  };

  // This function submits the login form, validates it, and displays errors if necessary
  handleSubmit = (e) => {
    e.preventDefault();

    // validate returns an object with errors that happened
    const errors = this.validate();
    // setting a state prop to null causes runtime error,
    // so set errors to an empty object if errors is null
    this.setState({ errors: errors || {} });
    // if errors is not empty (error was found) then stop and don't call server
    if (errors) return;

    // call the server
    console.log("submitted");
  };

  render() {
    // destructure state to get data array
    const { data, errors } = this.state;
    return (
      <div classtype="container">
        <h1 className="mb-4">
          Login to <img className="ms-2" src={logo} width={60} height={60} />
          Vidly.
        </h1>

        {
          // Submission handler
        }
        <form onSubmit={this.handleSubmit}>
          {
            // Input component value is whatever the state currently holds
            // Input name is email so that onChange handler can get its value and copy it into the state
          }
          <Input
            error={errors.email}
            name="email"
            type="email"
            value={data.email}
            label="Email"
            onChange={this.handleChange}
          />
          <div id="emailHelp" className="form-text mb-3">
            We'll never share your email with anyone else.
          </div>
          {
            // Input component value is whatever the state currently holds
            // Input name is email so that onChange handler can get its value and copy it into the state
          }
          <Input
            error={errors.password}
            name="password"
            type="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
          />
          {
            // CHECK BOX
          }
          <div class="mb-3 form-check">
            <input type="checkbox" id="confirm" className="form-check-input" />
            <label id="confirm" className="form-check-label" htmlFor="confirm">
              Check me out
            </label>
          </div>
          {
            // SUBMIT BUTTON
            // this.validate() is truthy when not empty, and null (empty) is falsey
          }
          <button
            disabled={this.validate()}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
