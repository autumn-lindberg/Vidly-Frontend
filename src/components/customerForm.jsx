import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class CustomerForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: this.props.placeholders
      ? {
          name: this.props.placeholders.name,
          phone: this.props.placeholders.phone,
          email: this.props.placeholders.email,
        }
      : {
          name: "",
          phone: "",
          email: "",
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
          message: '"Phone" must be ten digits, without spaces',
        };
      }),
    email: Joi.string()
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      .required()
      .label("Email")
      .error(() => {
        return {
          message: '"Email" must be a valid email',
        };
      }),
  };

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    // copy data from state
    const data = { ...this.state.data };
    if (!this.props.placeholders) {
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
        this.props.addCustomer(customer);
        const response = await httpService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/customers`,
          customer
        );
        if (response.status === 200)
          toast.success(`Created New Customer ${customer.name} Successfully!`);
        else {
          // remove customer if error
          this.props.removeCustomer(customer);
          toast.error("An Error Occurred. Please Try Again Later.");
        }
      } catch (exception) {
        // remove customer if error
        this.props.removeCustomer(customer);
        toast.error("An Error Occurred. Please Try Again Later.");
      }
    } else {
      const customer = {
        _id: this.props.placeholders._id,
        name: data.name,
        dateJoined: this.props.placeholders.dateJoined,
        phone: data.phone,
        email: data.email,
        isGold: this.props.placeholders.isGold,
        points: this.props.placeholders.points,
      };
      try {
        const response = await httpService.put(
          `${process.env.REACT_APP_API_ENDPOINT}/customers/${this.props.placeholders._id}`,
          customer
        );
        if (response.status === 200)
          toast.success(`Successfully Updated ${customer.name}!`);
        else {
          toast.error("Error Occurred. Please Try Again Later.");
        }
        this.setState({ navigate: true });
      } catch (exception) {
        toast.error("Error Occurred. Please Try Again Later.");
      }
    }
  };

  doNothing() {}

  render() {
    return (
      <div classtype="container">
        {this.state.navigate ? <Navigate to="/customers" /> : this.doNothing()}
        {
          // Submission handler
        }
        <form onSubmit={this.handleSubmit}>
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
            {this.props.placeholders ? (
              <Link to="/customers">
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  aria-label="Close"
                >
                  Cancel
                </button>
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-danger ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
