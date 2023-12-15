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
    data: { title: "", description: "", price: "", stock: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    price: Joi.string()
      .regex(/^[0-9]+$/)
      .required()
      .label("Price"),
    stock: Joi.string()
      .regex(/^[0-9]+$/)
      .required()
      .label("Stock"),
    imageSrc: Joi.any().required().label("Thumbnail"),
  };

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    const data = { ...this.state.data };
    const product = {
      _id: ObjectId(),
      title: data.title,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imageSrc: data.imageSrc,
    };

    try {
      const response = await httpService.post(
        `${config.apiEndpoint}/products`,
        product
      );
      toast(response.status);
    } catch (exception) {
      console.log(exception);
    }
  };

  setFile = (e) => {
    const properties = { ...this.state.data };
    let imageSrc = e.target.files[0];
    let reader = new FileReader();
    let file;
    reader.readAsDataURL(imageSrc);
    reader.onload = () => {
      file = reader.result;
      console.log(reader.result);
      properties.imageSrc = file;
      this.setState({ data: properties });
    };
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
          {this.renderFileUpload(this.setFile)}
          <HorizontalDivider />
          <div className="text-center">
            {
              // renderButton is also part of "this" now
              this.renderButton("Submit", "btn btn-success")
            }
            <button
              type="button"
              className="btn btn-danger ms-2"
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
