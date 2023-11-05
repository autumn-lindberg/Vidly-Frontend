import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import config from "../config.json";
import { toast } from "react-toastify";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class GenreForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: { name: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
  };

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    const data = { ...this.state.data };
    const customer = {
      _id: ObjectId(),
      name: data.name,
    };

    try {
      const response = await httpService.post(
        `${config.apiEndpoint}/genres`,
        customer
      );
      toast(response.status);
    } catch (exception) {
      console.log(exception);
    }
  };

  render() {
    return (
      <div classtype="container">
        {
          // Submission handler
        }
        <form onSubmit={this.handleSubmit}>
          {
            // inputs
          }
          {this.renderInput("name", "Name")}
          <HorizontalDivider />
          <div className="text-center">
            {
              // renderButton is also part of "this" now
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

export default GenreForm;
