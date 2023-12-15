import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import config from "../config.json";
import { toast } from "react-toastify";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class MovieForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: { title: "", genre: "", stock: "", rate: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    stock: Joi.string().required().label("Stock"),
    genre: Joi.string().required().label("Genre"),
    rate: Joi.string().required().label("Rate"),
  };

  setRadio = (e) => {
    // clone state data
    const data = { ...this.state.data };
    // update data in state
    data.genre = e.currentTarget.value;
    this.setState({ data: data });
  };

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    // copy data from state
    const data = { ...this.state.data };
    const movie = {
      _id: ObjectId(),
      title: data.title,
      numberInStock: data.stock,
      genre: {
        name: data.genre,
      },
      dailyRentalRate: data.rate,
      liked: false,
    };
    try {
      const response = await httpService.post(
        `${config.apiEndpoint}/movies`,
        movie
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
            // title input
          }
          {this.renderInput("title", "Title")}
          {
            // genre radio boxes
          }
          <label className="text-center form-label">Genre</label>
          <div className="d-flex justify-content-evenly mb-4">
            {this.props.genres.map((genre) => {
              // uppercase first letter
              genre.name =
                genre.name.charAt(0).toUpperCase() + genre.name.slice(1);
              return this.renderRadioButton(
                genre.name,
                genre.name,
                "genres",
                this.setRadio
              );
            })}
          </div>
          {this.renderInput("stock", "Stock")}
          {this.renderInput("rate", "Rate")}
          <HorizontalDivider />
          <div className="text-center">
            {
              // renderButton is also part of "this" now
              // why tf does it throw error when both these functions are called in same {}??
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

export default MovieForm;
