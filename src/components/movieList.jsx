import React, { Component } from "react";
import Table from "./common/table";
import Heart from "./common/heart";
import { filterMovies } from "../utils/filterMovies";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { getRentals } from "../services/rentalService";
import _ from "lodash";

class MovieList extends Component {
  createTarget(name) {
    return "#a" + name;
  }
  createId(name) {
    return "a" + name;
  }
  state = {
    filtered: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "", order: "asc" },
  };
  // path is the JSON data's property name. components/tableBody.jsx uses this to access the data inside each movie object
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Price" },
    { path: "qtyRented", label: "Rented" },
    {
      key: "Liked",
      // content is a function that takes in a movie and uses its liked prop to fill in heart or not (using onLike function)
      // handleLike prop in heart component is the onLike prop (a function) in movieTable component passed in by props
      // onLike prop then calls handleLike function (defined in components/movies.jsx)
      content: (movie) => <Heart liked={movie.liked} />,
    },
    {
      key: "Select",
      // content is a function that takes in a movie and uses that to pass it to onDelete handler
      // onDelete is passed in by props from components/movies.jsx as handleDelete()
      content: (movie) => (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={this.createTarget(movie._id)}
          >
            Select
          </button>
          <div
            className="modal fade"
            tabIndex="-1"
            id={this.createId(movie._id)}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Rent {movie.title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to rent {movie.title}?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel & Go Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.props.onSelect(movie)}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Rent This Movie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ),
    },
  ];

  async componentDidMount() {
    // CALL SERVER AND SET INITIAL DATA
    const { data: rentals } = await getRentals();
    this.setState({ rentals: rentals });
    // sort through movies and assign extra prop "qtyRented"
    // also remove the option if number in stock is 0
    const movies = this.props.movies.map((movie) => {
      if (movie.numberInStock === 0) return {};
      movie.qtyRented = 0;
      return movie;
    });
    // get the rentals for this customer
    const thisCustomersRentals = rentals.filter((rental) => {
      return rental.customer._id === this.props.customerId;
    });
    // mark qty rented out in movie
    thisCustomersRentals.forEach((rental) => {
      movies.map((movie) => {
        if (movie._id === rental.movie._id && !rental.dateReturned)
          movie.qtyRented += 1;
        return movie;
      });
    });
    this.setState({ filtered: movies });
  }

  // function to show only the information for the current page of items AND current genre
  getPageData = () => {
    // grab current pagination information from state
    const { pageSize, currentPage, sortColumn } = this.state;
    let filtered = this.state.filtered;
    // destructure movies array to take its length, naming it numberOfMovies
    // length is a property of EVERY array in JS
    const { length: numberOfMovies } = filtered;

    // order data using lodash
    // prevent sorting for "liked", and "select"
    sortColumn.path ? this.doNothing() : (sortColumn.path = "");
    // params are original array, propName of column being sorted, order by
    filtered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // paginate data
    filtered = paginate(filtered, currentPage, pageSize);
    //
    return { filtered, numberOfMovies };
  };

  // handler for sorting
  onSort = (sortColumn) => {
    // update state to reflect current column to be sorted (default is none)
    this.setState({ sortColumn: sortColumn });
  };

  // handler for the pagination
  handlePageChange = (pageNumber) => {
    // update state to reflect current page selected (default is 1)
    this.setState({ currentPage: pageNumber });
  };

  handleSearch = (e) => {
    // duplicate state
    const movies = this.props.movies;
    const searchText = e.currentTarget.value;
    let filtered = filterMovies(movies, searchText);
    this.setState({ filtered: filtered });
    // check page number
    const pageData = this.getPageData();
    if (
      pageData.numberOfMovies <=
      this.state.currentPage * this.state.pageSize
    ) {
      this.setState({ currentPage: 1 });
    }
  };

  doNothing() {}

  render() {
    // get data for sorting from state
    const { pageSize, currentPage } = this.state;
    // get page data, moviesObj stores movies and length of array
    const moviesObj = this.getPageData();
    // extract returned values from moviesObj so variables can be used
    const { filtered, numberOfMovies } = moviesObj;
    return (
      <React.Fragment>
        <form className="d-flex me-2 mb-4">
          <input
            className="movieSearch form-control mt-3 p-3 border border-dark input-lg"
            type="search"
            placeholder="Search Movies"
            aria-label="Search"
            onChange={this.handleSearch}
          />
        </form>
        <div className="movieList">
          <Table
            columns={this.columns}
            items={filtered}
            sortColumn={this.state.sortColumn}
            onSort={this.onSort}
          />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Pagination
            numberOfMovies={numberOfMovies}
            onPageChange={this.handlePageChange}
            pageSize={pageSize}
            currentPage={currentPage}
          />
          <Link to="/customers" className="me-5">
            <button type="button" className="btn btn-danger me-3">
              Cancel
            </button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieList;
