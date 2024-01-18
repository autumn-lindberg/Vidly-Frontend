import React, { Component } from "react";
import GenreTable from "./genreTable";
import GenreForm from "./genreForm";
import Footer from "./footer";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";
import _ from "lodash";
import httpService from "../services/httpservice";
import config from "../config.json";
import { filterGenres } from "../utils/filterGenres";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

class Genres extends Component {
  static contextType = UserContext;
  // title are so that table can be re-used from movie table
  state = {
    genres: [],
    filtered: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "", order: "asc" },
  };

  // handler for the delete button
  handleDelete = async (genre) => {
    this.removeGenre();

    // send delete request
    try {
      const response = await httpService.delete(
        `${config.apiEndpoint}/genres/${genre._id}`
      );
      if (response.status === 200)
        toast.success(`Successfully Deleted ${genre.name}!`);
      else {
        this.addGenre(genre);
        toast.error("An Error Occurred. Please Try Again Later");
      }
    } catch (exception) {
      this.addGenre(genre);
      toast.error("An Error Occurred. Please Try Again Later");
    }
  };

  // handler for the pagination
  handlePageChange = (pageNumber) => {
    // update state to reflect current page selected (default is 1)
    this.setState({ currentPage: pageNumber });
  };

  // handler for sorting
  onSort = (sortColumn) => {
    // update state to reflect current column to be sorted (default is none)
    this.setState({ sortColumn: sortColumn });
  };

  // get initial data into state, style title
  async componentDidMount() {
    //const listGroup = document.querySelector(".listGroup");
    // adjust style to move title and subtitle
    // title.style.paddingLeft = style;
    // CALL SERVER AND SET INITIAL DATA
    const { data: genres } = await getGenres();
    this.setState({ genres: genres, filtered: genres });
  }

  // function to show only the information for the current page of items
  getPageData = () => {
    // grab current pagination information from state
    const { pageSize, currentPage, sortColumn } = this.state;
    let { filtered } = this.state;
    // destructure genres array to take its length, naming it numberOfCustomers
    // length is a property of EVERY array in JS
    const { length: numberOfGenres } = filtered;
    // order data using lodash
    // params are original array, propName of column being sorted, order by
    filtered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // paginate data
    filtered = paginate(filtered, currentPage, pageSize);
    //
    return { filtered, numberOfGenres };
  };

  handleSearch = (e) => {
    // search genres here
    const searchText = e.currentTarget.value;
    // duplicate state
    const genres = this.state.genres;
    const filtered = filterGenres(genres, searchText);
    this.setState({ filtered: filtered });
    // check page number
    const pageData = this.getPageData();
    if (
      pageData.numberOfGenres <=
      this.state.currentPage * this.state.pageSize
    ) {
      this.setState({ currentPage: 1 });
    }
  };

  addGenre = (genre) => {
    const genres = [...this.state.genres];
    genres.push(genre);
    this.setState({ genres: genres });
    // grab search content and filter
    const text = document.querySelector(".genreSearch").value;
    const filtered = filterGenres(genres, text);
    this.setState({ filtered: filtered });
  };

  removeGenre = () => {
    const genres = [...this.state.genres];
    genres.pop();
    this.setState({ genres: genres });
    // grab search content and filter
    const text = document.querySelector(".genreSearch").value;
    const filtered = filterGenres(genres, text);
    this.setState({ filtered: filtered });
  };

  doNothing() {}

  render() {
    let message = "";
    // get data for sorting from state
    const { pageSize, currentPage } = this.state;
    // get page data, genresObj stores customers and length of array
    const genresObj = this.getPageData();
    // extract returned values from genresObj so variables can be used
    const { filtered, numberOfGenres } = genresObj;

    if (numberOfGenres === 0) {
      message = "No genres found";
    } else {
      message = numberOfGenres + " genres found";
    }
    return (
      <>
        <div className="page-container ms-5">
          {!localStorage.getItem("token") ? (
            <Navigate to="/login" />
          ) : (
            this.doNothing()
          )}
          <div className="titleAndButton d-flex justify-content-start align-items-top">
            <div className="addButtonModal">
              <button
                type="button"
                className="btn btn-primary addButton p-4 me-4 mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="mb-0">[+] New Genre</div>
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        New Customer
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <GenreForm
                        addGenre={this.addGenre}
                        removeGenre={this.removeGenre}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-2 d-flex justify-content-start flex-grow-1">
              <div className="title ms-4">
                <h1>Genres List</h1>
                <h3>{message}</h3>
              </div>
              <form className="d-flex ms-5 navSearchBar">
                <input
                  className="form-control m-3 border border-dark input-lg genreSearch"
                  type="search"
                  placeholder="Search Genres"
                  aria-label="Search"
                  onChange={this.handleSearch}
                />
              </form>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <div className="genreTable">
                <GenreTable
                  genres={filtered}
                  onSort={this.onSort}
                  sortColumn={this.state.sortColumn}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                />
                {
                  // name of prop is still numberOfMovies because it's being reused
                }
                <div className="mt-4">
                  <Pagination
                    numberOfMovies={numberOfGenres}
                    onPageChange={this.handlePageChange}
                    pageSize={pageSize}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Genres;
