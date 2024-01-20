import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class MovieForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    genres: [],
    data: this.props.placeholders
      ? {
          title: this.props.placeholders.title,
          genre: this.props.placeholders.genre.name,
          numberInStock: this.props.placeholders.numberInStock.toString(),
          dailyRentalRate: this.props.placeholders.dailyRentalRate.toString(),
        }
      : { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    navigate: false,
  };

  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.string()
      .regex(/[0-9]+/)
      .required()
      .label("Stock")
      .error(() => {
        return {
          message: '"Stock" must be a number',
        };
      }),
    genre: Joi.string().required().label("Genre"),
    dailyRentalRate: Joi.string()
      .regex(/[0-9]+/)
      .required()
      .label("Rate")
      .error(() => {
        return {
          message: '"Rate" must be a number',
        };
      }),
  };

  async componentDidMount() {
    // get genres for radio buttons
    const { data: genres } = await getGenres();
    this.setState({ genres: genres });
    // set selected genre
    const select = document.querySelector(".form-select");
    select.value = this.state.data.genre || "";
  }

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    // copy data from state
    const data = { ...this.state.data };
    const { genres } = this.state;
    if (!this.props.placeholders) {
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
        this.props.addMovie(movie);
        const response = await httpService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/movies`,
          movie
        );
        if (response.status === 200) {
          toast.success(`Created New Movie ${movie.title}!`);
        } else {
          // remove movie if error
          this.props.removeMovie(movie);
          toast.error("An Error Occurred. Please Try Again Later.");
          console.log(response.status);
        }
      } catch (exception) {
        // remove movie if error
        this.props.removeMovie(movie);
        console.log(exception);
        toast.error("An Error Occurred. Please Try Again Later.");
      }
    } else {
      const genre = genres.find((g) => g.name === data.genre);
      console.log(genre);
      const movie = {
        _id: this.props.placeholders._id,
        title: data.title,
        numberInStock: data.numberInStock,
        genre: {
          // check if element has
          _id: genre._id,
          name: genre.name,
        },
        dailyRentalRate: data.dailyRentalRate,
        liked: this.props.placeholders.liked,
      };
      try {
        const response = await httpService.put(
          `${process.env.REACT_APP_API_ENDPOINT}/movies/${this.props.placeholders._id}`,
          movie
        );
        if (response.status === 200) {
          toast.success(`Successfully Updated ${movie.title}!`);
          this.setState({ navigate: true });
        } else toast.error("An Error Occurred. Please Try Again Later");
      } catch (exception) {
        toast.error("An Error Occurred. Please Try Again Later");
      }
    }
  };

  handleDropdown = (e) => {
    const data = { ...this.state.data };
    data.genre = e.currentTarget.value;
    this.setState({ data: data });
    this.handleChange(e);
  };

  doNothing() {}

  render() {
    return (
      <div classtype="container">
        {this.state.navigate ? <Navigate to="/movies" /> : this.doNothing()}
        {
          // Submission handler
        }
        <form onSubmit={this.handleSubmit}>
          {
            // title input
          }
          {this.renderInput("title", "Title", "text")}
          {
            // genre radio boxes
          }
          <label className="text-center form-label">Genre</label>
          <div className="d-flex justify-content-evenly mb-4">
            {this.renderDropdown(this.state.genres, "genre")}
          </div>
          {this.renderInput("numberInStock", "Stock", "text")}
          {this.renderInput("dailyRentalRate", "Rate", "text")}
          <HorizontalDivider />
          <div className="text-center">
            {
              // renderButton is also part of "this" now
              // why tf does it throw error when both these functions are called in same {}??
              this.renderButton("Submit", "btn btn-success")
            }
            {this.props.placeholders ? (
              <Link to="/movies">
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

export default MovieForm;
