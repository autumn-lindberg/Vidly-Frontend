import React, { Component } from "react";

// This component renders a bootstrap input box with a label on top of it
// It uses props data to fill in its data and use event handlers
const Input = (props) => {
  return (
    <div className="mb-3">
      <label id={props.name} htmlFor={props.name} className="form-label">
        {props.label}
      </label>
      {
        // input type is set as input name prop so that the target in ./loginForm.jsx
        // handleChange() function has a valid HTML input element type and therefor has a value
      }
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        id={props.name}
        className="form-control input-lg border-secondary"
        aria-describedby="emailHelp"
      />
      {
        // only render this error alert if error is defined
        props.error && <div className="alert alert-danger">{props.error}</div>
      }
    </div>
  );
};

export default Input;
