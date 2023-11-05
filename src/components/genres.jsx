import React, { Component } from "react";
import GenreTable from "./genreTable";
import GenreForm from "./genreForm";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";
import httpService from "../services/httpservice";
import config from "../config.json";
import "react-toastify/dist/ReactToastify.css";
import { filterGenres } from "../utils/filterGenres";

class Genres extends Component {
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
    // update genres to reflect deletion
    // goes through all genres and check if id matches on passed to handleDelete
    // array filter takes a function as a parameter that returns T/F whether to include or not
    const genres = this.state.genres.filter((m) => m.id !== genre.id);
    // update state to reflect this
    this.setState({ genres: genres });

    // send delete request
    try {
      const response = await httpService.delete(
        `${config.apiEndpoint}/genres/${genre._id}`
      );
      toast(`Status: ${response.status}`);
    } catch (exception) {
      console.log(exception);
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
  };

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
      message = numberOfGenres + " genres in system";
    }
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="ms-4 d-flex justify-content-between">
          <div className="title">
            <h1>Genres List</h1>
            <h3>{message}</h3>
          </div>
          <form className="d-flex me-4">
            <input
              className="navSearchBar form-control mb-3 mt-3 ms-3 border border-dark input-lg"
              type="search"
              placeholder="Search genres"
              aria-label="Search"
              onChange={this.handleSearch}
            />
          </form>
          <div class="titleAndButton d-flex">
            <div className="addButtonModal">
              <button
                type="button"
                className="btn btn-primary addButton p-3 h3 me-4 mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="h4 ps-2 pe-2">[+] New Genre</div>
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
                        New Customer
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <GenreForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
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
            <Pagination
              numberOfMovies={numberOfGenres}
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

export default Genres;
