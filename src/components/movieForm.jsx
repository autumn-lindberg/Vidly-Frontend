import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import { getGenres } from "../services/genreService";
import config from "../config.json";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class MovieForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    genres: [],
    data: this.props.placehlders
      ? {
          title: this.props.placeholders.name,
          genre: this.props.placeholders.genre.name,
          numberInStock: this.props.placeholders.numberInStock,
          dailyRentalRate: this.props.placeholders.dailyRentalRate,
        }
      : { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    navigate: false,
  };

  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.string().required().label("Stock"),
    genre: Joi.string().required().label("Genre"),
    dailyRentalRate: Joi.string().required().label("Rate"),
  };

  async componentDidMount() {
    // get genres for radio buttons
    const { data: genres } = await getGenres();
    this.setState({ genres: genres });
    // set defaults
    if (this.props.placeholders) {
      const { placeholders } = this.props;
      this.setState({ data: placeholders });
      // set radio to checked
      const checked = document.querySelector(".form-select");
      checked.value = placeholders.genre.name;
    }
  }

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    // copy data from state
    const data = { ...this.state.data };
    const movie = {
      _id: ObjectId(),
      title: data.title,
      numberInStock: data.numberInStock,
      genre: {
        name: data.genre,
      },
      dailyRentalRate: data.dailyRentalRate,
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

  handleDropdown = (e) => {
    const data = { ...this.state.data };
    data.genre = e.currentTarget.value;
    this.setState({ data: data });
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
            <select className="form-select" onChange={this.handleDropdown}>
              <option id="" name="" key="" disabled selected value="">
                {" "}
              </option>
              {this.state.genres.map((genre) => {
                const name = genre.name;
                // uppercase first letter
                genre.name =
                  genre.name.charAt(0).toUpperCase() + genre.name.slice(1);
                return this.renderDropdownItem(name, genre.name);
              })}
            </select>
          </div>
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          <HorizontalDivider />
          <div className="text-center">
            {
              // renderButton is also part of "this" now
              // why tf does it throw error when both these functions are called in same {}??
              this.renderButton("Submit", "btn btn-success")
            }
            <Link to="/movies">
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

export default MovieForm;
