import React, { Component } from "react";
import Input from "./common/input";
import logo from "../img/film-reel.svg";
const Joi = require("joi-browser");

class LoginForm extends Component {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  // validate entire form using Joi
  validate = () => {
    const options = { abortEarly: false };
    // actual validation method
    //   const { error } = this.schema.validate(this.state.data, options);
    const { error } = Joi.validate(this.state.data, this.schema, options);
    // grabbing error data from resulting array
    // don't return anything if there isn't an error
    if (!error) return null;
    // create array store error data that matches the format of our state
    const errors = {};
    // extended for loop
    for (let item of error.details) {
      // each "item" (entried in the details prop) has a message and a path
      // path[0] is the name of the culprit that caused error
      // take the input's name and use it to create a property in our errors array
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    // [name] is a computed property, it sets the validationObj's prop to name parameter
    const validationObj = { [name]: value };
    // create a new schema for each individual input using the schema for the entire form
    const schema = Joi.object({ [name]: this.schema[name] });
    // options not needed in argument list, multiple errors displayed is not user friendly
    const { error } = Joi.validate(validationObj, schema);
    // either return the error message or nothing
    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    // clone the state by spread operator
    const data = { ...this.state.data };
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
            //disabled={this.validate()}
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
