import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import httpService from "../services/httpservice";
import config from "../config.json";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { generateGenre } from "../utils/generateGenre";
import MovieTable from "./movieTable";
import MovieForm from "./movieForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

// this component is the main component on the page, called in app.js (app.js is then called in index.js)

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    currentGenre: "All Movies",
    sortColumn: { path: "", order: "asc" },
  };

  // handler for the delete button
  handleDelete = async (movie) => {
    /*
    const response = await httpService.delete(
      `${config.apiEndpoint}/movies/${movie.title}`
    );
    */
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //toast(response.data);
    // update movies to reflect deletion
    // goes through all movies and check if id matches on passed to handleDelete
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    // update state to reflect this
    this.setState({ movies: movies });
  };

  // handler for the like button
  handleLike = (movie) => {
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    // copy entire movies array from state (destructure into an array of objects using spread operator)
    const movies = [...this.state.movies];
    // indexOf returns first occurrence of given param (a movie in this case)
    const index = movies.indexOf(movie);
    // copy movie at found index into local movies array
    movies[index] = { ...movies[index] };
    // change to the opposite of whait is now
    movies[index].liked = !movies[index].liked;
    // update state
    this.setState({ movies: movies });
  };

  // handler for the pagination
  handlePageChange = (pageNumber) => {
    // update state to reflect current page selected (default is 1)
    this.setState({ currentPage: pageNumber });
  };

  // handler for the genre selection
  handleGenreChange = (genreName) => {
    // update state to reflect current genre selected (default is all)
    this.setState({ currentGenre: genreName });
  };

  // handler for sorting
  onSort = (sortColumn) => {
    // update state to reflect current column to be sorted (default is none)
    this.setState({ sortColumn: sortColumn });
  };

  // get initial data into state, style title
  componentDidMount() {
    const listGroup = document.querySelector(".listGroup");
    const addButton = document.querySelector(".addButton");
    // offsetWidth returns the width of a given element as an integer
    const listGroupWidth = listGroup.offsetWidth;
    const style = listGroupWidth + "px";
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    //////////
    // set initial data
    this.setState({ movies: getMovies(), genres: getGenres() });
    // adjust style to move title and subtitle
    // addButton.style.width = style;
  }

  // function to show only the information for the current page of items AND current genre
  getPageData = () => {
    // grab current pagination information from state
    const { pageSize, currentPage, sortColumn } = this.state;
    // only display movies from specified genre (default is set to all)
    let movies = generateGenre(this.state.movies, this.state.currentGenre);
    // destructure movies array to take its length, naming it numberOfMovies
    // length is a property of EVERY array in JS
    const { length: numberOfMovies } = movies;

    // order data using lodash
    // params are original array, propName of column being sorted, order by
    movies = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);
    // paginate data
    movies = paginate(movies, currentPage, pageSize);
    //
    return { movies, numberOfMovies };
  };

  render() {
    let message = "";
    // get data for sorting from state
    const { pageSize, currentPage } = this.state;
    // get page data, moviesObj stores movies and length of array
    const moviesObj = this.getPageData();
    // extract returned values from moviesObj so variables can be used
    const { movies, numberOfMovies } = moviesObj;

    if (numberOfMovies === 0) {
      message = "No movies found";
    } else {
      message = numberOfMovies + " movies available for rent";
    }
    return (
      // react fragment because encasing div is not the job of this table
      <React.Fragment>
        <ToastContainer />
        <div class="titleAndButton d-flex justify-content-start">
          <div className="addButtonModal">
            <button
              type="button"
              className="btn btn-primary addButton p-3 h3 me-4 mt-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <div className="h4 ps-2 pe-2">[+] New Movie</div>
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      New Movie
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <MovieForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-2 d-flex justify-content-between flex-grow-1">
            <div className="title">
              <h1>Movies List</h1>
              <h3>{message}</h3>
            </div>
            <form className="d-flex me-4">
              <input
                className="navSearchBar form-control mb-3 mt-3 ms-3 border border-dark input-lg"
                type="search"
                placeholder="Search Movies"
                aria-label="Search"
              />
              <button
                className="btn btn-primary btn-lg border-dark m-3"
                type="submit"
              >
                <i class="bi-search h3 test text-dark"></i>
              </button>
            </form>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-2 listGroup">
            <ListGroup
              genres={this.state.genres}
              currentGenre={this.state.currentGenre}
              onGenreChange={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <MovieTable
              movies={movies}
              onSort={this.onSort}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
            />
            <Pagination
              numberOfMovies={numberOfMovies}
              onPageChange={this.handlePageChange}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
