import React from "react";
import Form from "./common/form";
import logo from "../img/film-reel.svg";
import HorizontalDivider from "./common/horizontalDivider";
const Joi = require("joi-browser");

// login form extends form to get all its methods
class CustomerForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: { id: "", name: "" },
    errors: {},
  };

  schema = {
    id: Joi.string().required().label("ID"),
    name: Joi.string().required().label("Name"),
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
            // ID input
          }
          {this.renderInput("id", "ID")}
          {
            // Name input
          }
          {this.renderInput("name", "Name")}
          <HorizontalDivider />
          <div className="text-center">
            {
              // renderButton is also part of "this" now
              // why tf does it throw error when both these functions are called in same {}??
              this.renderButton("Submit", "btn btn-success")
            }
            <button
              type="button"
              class="btn btn-danger ms-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
