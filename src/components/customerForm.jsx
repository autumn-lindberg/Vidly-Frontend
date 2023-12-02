import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import config from "../config.json";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class CustomerForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: {
      name: this.props.placeholders ? this.props.placeholders[1] : "",
      phone: this.props.placeholders ? this.props.placeholders[3] : "",
      email: this.props.placeholders ? this.props.placeholders[4] : "",
    },
    errors: {},
    navigate: false,
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
    let customer;
    let placehold = true;
    const { placeholders } = this.props;
    // i feel like 4 is enough. fix this garbo, turn it into an object!!
    if (
      placeholders[0] === "" &&
      placeholders[1] === "" &&
      placeholders[2] === "" &&
      placeholders[3] === ""
    )
      placehold = false;
    const data = { ...this.state.data };
    if (!placehold) {
      customer = {
        _id: ObjectId(),
        name: data.name,
        dateJoined: Date.now(),
        phone: data.phone,
        email: data.email,
        isGold: false,
        points: 0,
      };
    } else {
      customer = {
        _id: placeholders[0],
        name: data.name,
        dateJoined: placeholders[2],
        phone: data.phone,
        email: data.email,
        isGold: placeholders[5],
        points: placeholders[6],
      };
    }

    try {
      if (!placehold) {
        const response = await httpService.post(
          `${config.apiEndpoint}/customers`,
          customer
        );
        toast(response.status);
      } else {
        const response = await httpService.put(
          `${config.apiEndpoint}/customers/${this.props.placeholders[0]}`,
          customer
        );
        this.setState({ navigate: true });
        setTimeout(5000);
        toast(response.status);
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  render() {
    return (
      <div classtype="container">
        {
          // Submission handler
          // if validation not required skip to do submit
        }
        <form onSubmit={this.doSubmit}>
          {
            // inputs
          }
          {this.renderInput("name", "Name", "text")}
          {this.renderInput("phone", "Phone", "text")}
          {this.renderInput("email", "Email", "text")}
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
        {this.state.navigate ? <Navigate to="/customers" /> : console.log("")}
      </div>
    );
  }
}

export default CustomerForm;
