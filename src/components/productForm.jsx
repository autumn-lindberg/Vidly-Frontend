import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import config from "../config.json";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class CustomerForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: this.props.placeholders
      ? {
          title: this.props.title,
          description: this.props.description,
          price: this.props.price,
          stock: this.props.stock,
          imageSrc: this.props.imageSrc,
          // add filename here
        }
      : { title: "", description: "", price: "", stock: "" },
    errors: {},
    navigate: false,
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

  componentDidMount() {
    if (this.props.placeholders) {
      const { placeholders } = this.props;
      this.setState({ data: placeholders });
    }
  }

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    const data = { ...this.state.data };
    if (!this.props.placeholders) {
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
    } else {
      const product = {
        _id: this.props.placeholders._id,
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageSrc: data.imageSrc,
      };
      try {
        const response = await httpService.put(
          `${config.apiEndpoint}/products/${this.props.placeholders._id}`,
          product
        );
        toast(response.status);
        this.setState({ navigate: true });
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  setFile = (e) => {
    const properties = { ...this.state.data };
    let imageSrc = e.target.files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(imageSrc);
    reader.onload = () => {
      const file = Array.from(new Uint8Array(reader.result));
      properties.imageSrc = file;
      this.setState({ data: properties });
    };
  };

  render() {
    return (
      <div classtype="container">
        {this.state.navigate ? <Navigate to="/products" /> : console.log("")}
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
          {this.props.placeholders ? (
            <img
              src={`data:image/jpeg;base64, ${Buffer.from(
                this.props.placeholders.imageSrc.data
              ).toString("base64")}`}
              className="card-img-top mx-auto"
              alt={this.props.placeholders.title}
              style={{ height: "15rem", width: "16rem" }}
            />
          ) : (
            console.log("")
          )}
          {this.renderFileUpload(this.setFile)}
          <HorizontalDivider />
          <div className="text-center">
            {
              // renderButton is also part of "this" now
              this.renderButton("Submit", "btn btn-success")
            }
            <Link to="/products">
              <button
                type="button"
                className="btn btn-danger ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
