import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import config from "../config.json";
import { toast } from "react-toastify";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class CustomerForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: { name: "", phone: "", email: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required()
      .label("Phone")
      .error(() => {
        return {
          message: "Phone Number must be ten digits, without spaces.",
        };
      }),
    email: Joi.string().required().label("Email"),
  };

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    const data = { ...this.state.data };
    const customer = {
      _id: ObjectId(),
      name: data.name,
      dateJoined: Date.now(),
      phone: data.phone,
      email: data.email,
      isGold: false,
      points: 0,
    };

    try {
      const response = await httpService.post(
        `${config.apiEndpoint}/customers`,
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
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderInput("price", "Price")}
          {this.renderInput("stock", "Stock")}
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

export default CustomerForm;
