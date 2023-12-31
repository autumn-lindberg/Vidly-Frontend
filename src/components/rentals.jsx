import React, { Component } from "react";
import RentalTable from "./rentalTable";
import Footer from "./footer";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getRentals } from "../services/rentalService";
import { toast, ToastContainer } from "react-toastify";
import _ from "lodash";
import httpService from "../services/httpservice";
import config from "../config.json";
import "react-toastify/dist/ReactToastify.css";
import { filterRentals } from "../utils/filterRentals";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

class Rentals extends Component {
  static contextType = UserContext;
  // title are so that table can be re-used from movie table
  state = {
    rentals: [],
    filtered: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "", order: "asc" },
  };

  // handler for the delete button
  handleDelete = async (rental) => {
    // update rentals to reflect deletion
    // goes through all rentals and check if id matches on passed to handleDelete
    // array filter takes a function as a parameter that returns T/F whether to include or not
    const rentals = this.state.rentals.filter((m) => m.id !== rental.id);
    // update state to reflect this
    this.setState({ rentals: rentals });

    // send delete request
    try {
      const response = await httpService.delete(
        `${config.apiEndpoint}/rentals/${rental._id}`
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
    const { data: rentals } = await getRentals();
    this.setState({ rentals: rentals, filtered: rentals });
  }

  // function to show only the information for the current page of items
  getPageData = () => {
    // grab current pagination information from state
    const { pageSize, currentPage, sortColumn } = this.state;
    let { filtered } = this.state;
    // destructure rentals array to take its length, naming it numberOfCustomers
    // length is a property of EVERY array in JS
    const { length: numberOfRentals } = filtered;
    // order data using lodash
    // params are original array, propName of column being sorted, order by
    filtered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // paginate data
    filtered = paginate(filtered, currentPage, pageSize);
    //
    return { filtered, numberOfRentals };
  };

  handleSearch = (e) => {
    // search rentals here
    const searchText = e.currentTarget.value;
    // duplicate state
    const rentals = this.state.rentals;
    const filtered = filterRentals(rentals, searchText);
    this.setState({ filtered: filtered });
  };

  async onReturn(rental) {
    // post to rentals api
    try {
      const response = await httpService.post(
        `${config.apiEndpoint}/returns`,
        rental
      );
      toast(response.status);
    } catch (exception) {
      console.log(exception);
    }
  }

  render() {
    let message = "";
    // get data for sorting from state
    const { pageSize, currentPage } = this.state;
    // get page data, rentalsObj stores customers and length of array
    const rentalsObj = this.getPageData();
    // extract returned values from rentalsObj so variables can be used
    const { filtered, numberOfRentals } = rentalsObj;

    if (numberOfRentals === 0) {
      message = "No rentals found";
    } else {
      message = numberOfRentals + " rentals in system";
    }
    return (
      <>
        {!localStorage.getItem("token") ? (
          <Navigate to="/login" />
        ) : (
          console.log("")
        )}
        <div className="page-container">
          <ToastContainer />
          <div className="title">
            <h1>Rentals List</h1>
          </div>
          <h3>{message}</h3>
          <form className="d-flex me-4">
            <input
              className="navSearchBar form-control mb-3 mt-3 ms-3 border border-dark input-lg"
              type="search"
              placeholder="Search Rentals"
              aria-label="Search"
              onChange={this.handleSearch}
            />
          </form>
          <br />
          <div className="row">
            <div className="col">
              <RentalTable
                rentals={filtered}
                onSort={this.onSort}
                sortColumn={this.state.sortColumn}
                onReturn={this.onReturn}
                onDelete={this.handleDelete}
              />
              {
                // name of prop is still numberOfMovies because it's being reused
              }
              <Pagination
                numberOfMovies={numberOfRentals}
                onPageChange={this.handlePageChange}
                pageSize={pageSize}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Rentals;
