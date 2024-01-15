import React, { Component } from "react";
import Input from "./input";
const Joi = require("joi-browser");

class Form extends Component {
  // validate entire form using Joi
  validate = () => {
    const options = { abortEarly: false };
    // actual validation method
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
      // take the input's name and use it to create a property in our errors object
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  // this function validated individual input properties as oposed to the whole form
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
    e.currentTarget.type === "file"
      ? (data[e.currentTarget.name] = data["fileName"])
      : (data[e.currentTarget.name] = e.currentTarget.value);
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
    this.doSubmit();
  };

  // This function renders a simple button element
  // This particular method renders a submit button, which calls the validate function
  // this button is disabled until validation criteria are met
  renderButton(label, classes = "btn btn-primary") {
    return (
      // SUBMIT BUTTON
      // this.validate() is truthy when there is an error, and falsey when there is not
      <button
        disabled={this.validate()}
        type="submit"
        className={classes}
        data-bs-dismiss="modal"
      >
        {label}
      </button>
    );
  }

  // this function renders an input box with a label below it.
  // the type defaults to text, but can be changed if it's specified when called
  renderInput(name, label, type = "text") {
    // destructure state to get data array
    const { data, errors } = this.state;
    return (
      // Input component value is whatever the state currently holds
      // Input name is password so that onChange handler can get its value and copy it into the state
      <Input
        error={errors[name]}
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
      />
    );
  }

  // renders a single radio button with a label
  renderRadioButton(name, label, group, handleRadioChange) {
    return (
      <div className="form-check" key={label}>
        {}
        <input
          className="form-check-input"
          type="radio"
          name={group}
          id={name}
          value={name}
          onChange={handleRadioChange}
        />
        <label className="form-check-label" for={name}>
          {label}
        </label>
      </div>
    );
  }

  renderFileUpload(name) {
    return (
      <div className="mb-3">
        <label for="formFile" className="form-label">
          Thumbnail Photo
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={this.handleFileUpload}
          required={true}
          name={name}
        />
        <div className="invalid-feedback">Thumbnail Is Required.</div>
      </div>
    );
  }

  handleFileUpload = (e) => {
    this.setFile(e);
    this.handleChange(e);
  };

  // set file for file upload
  setFile = (e) => {
    const properties = { ...this.state.data };
    let imageSrc = e.target.files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(imageSrc);
    reader.onload = () => {
      const file = Array.from(new Uint8Array(reader.result));
      properties.imageSrc = file;
      // set file name
      // thank you https://html.spec.whatwg.org/multipage/input.html#fakepath-srsly
      // for the algorithm
      let name = imageSrc.name;
      if (name.substr(0, 12) === "C:\\fakepath\\")
        properties.fileName = name.substr(12); // modern browser
      else {
        let x;
        x = name.lastIndexOf("/");
        if (x >= 0)
          // Unix-based path
          properties.fileName = name.substr(x + 1);
        else {
          x = name.lastIndexOf("\\");
          if (x >= 0)
            // Windows-based path
            properties.fileName = name.substr(x + 1);
          properties.fileName = name; // just the filename
        }
      }
      this.setState({ data: properties });
    };
  };
}

export default Form;
