import React, { Component } from "react";
import RentalTable from "./rentalTable";
import Footer from "./footer";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getRentals } from "../services/rentalService";
import { toast } from "react-toastify";
import _ from "lodash";
import httpService from "../services/httpservice";
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
    const rentals = [...this.state.rentals];
    this.removeRental(rental);

    // send delete request
    try {
      const response = await httpService.delete(
        `${localStorage.getItem("API_URL")}/rentals/${rental._id}`
      );
      if (response.status === 200) {
        toast.success("Successfully Deleted Rental Record!");
      } else {
        this.addRentalBack(rental, rentals.indexOf(rental));
        toast.error("An Error Occurred. Please Try Again later.");
      }
    } catch (exception) {
      this.addRentalBack(rental, rentals.indexOf(rental));
      toast.error("An Error Occurred. Please Try Again later.");
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
    // prevent sorting for "return" and "delete"
    sortColumn.path ? this.doNothing() : (sortColumn.path = "");
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
    // check page number
    const pageData = this.getPageData();
    if (
      pageData.numberOfRentals <=
      this.state.currentPage * this.state.pageSize
    ) {
      this.setState({ currentPage: 1 });
    }
  };

  reRender = async () => {
    const { data: rentals } = await getRentals();
    this.setState({ rentals: rentals, filtered: rentals });
    /*
    const rentals = [...this.state.rentals];
    this.setState({ rentals: rentals });
    // grab search content and filter
    const text = document.querySelector(".rentalSearch").value;
    const filtered = filterRentals(rentals, text);
    this.setState({ filtered: filtered });
    */
  };

  onReturn = async (rental) => {
    // post to rentals api
    try {
      const response = await httpService.post(
        `${localStorage.getItem("API_URL")}/returns`,
        rental
      );
      if (response.status === 200) {
        toast.success(`Successfully Returned ${rental.movie.title}!`);
        // re-render page
        const { data: rentals } = await getRentals();
        this.setState({ rentals: rentals, filtered: rentals });
      } else toast.error("An Error Occurred. Please Try Again Later.");
    } catch (exception) {
      toast.error("An Error Occurred. Please Try Again Later.");
      console.log(exception);
    }
  };

  addRental = (rental) => {
    const rentals = [...this.state.rentals];
    rentals.push(rental);
    this.setState({ rentals: rentals });
    // grab search content and filter
    const text = document.querySelector(".rentalSearch").value;
    const filtered = filterRentals(rentals, text);
    this.setState({ filtered: filtered });
  };

  addRentalBack = (rental, index) => {
    const data = [...this.state.rentals];

    let { currentPage, pageSize } = this.state;
    // check if it was last item in page to be deleted
    // for example item #9 page size = 4, movieIndex would be 8
    // removeMovie() decremented page size, so use that
    if (currentPage * pageSize === index) {
      currentPage += 1;
    }
    this.setState({ currentPage: currentPage });

    const rentals = [...data.slice(0, index), rental, ...data.slice(index)];
    this.setState({ rentals: rentals });
    // grab search content and filter
    const text = document.querySelector(".rentalSearch").value;
    const filtered = filterRentals(rentals, text);
    this.setState({ filtered: filtered });
  };

  removeRental = (rental) => {
    const data = [...this.state.rentals];

    const rentalIndex = data.indexOf(rental);
    let { currentPage, pageSize } = this.state;
    // check if it was last item in page to be deleted
    // for example item #9 page size = 4, movieIndex would be 8
    // page size is not yet decremented, so math must be adjusted
    if ((currentPage - 1) * pageSize === rentalIndex) {
      currentPage -= 1;
    }
    this.setState({ currentPage: currentPage });

    // update rentals to reflect deletion
    // goes through all rentals and check if id matches on passed to handleDelete
    // array filter takes a function as a parameter that returns T/F whether to include or not
    const rentals = data.filter((r) => r._id !== rental._id);
    this.setState({ rentals: rentals });
    // grab search content and filter
    const text = document.querySelector(".rentalSearch").value;
    const filtered = filterRentals(rentals, text);
    this.setState({ filtered: filtered });
  };

  doNothing() {}

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
          this.doNothing()
        )}
        <div className="page-container ms-3">
          <div className="d-flex justify-content-start align-items-top">
            <div className="title">
              <h1>Rentals List</h1>
              <h3>{message}</h3>
            </div>
            <form className="d-flex ms-5 w-50">
              <input
                className="navSearchBar form-control mb-3 mt-3 ms-3 border border-dark input-lg rentalSearch"
                type="search"
                placeholder="Search Rentals"
                aria-label="Search"
                onChange={this.handleSearch}
              />
            </form>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <div className="rentalTable">
                <RentalTable
                  rentals={filtered}
                  onSort={this.onSort}
                  sortColumn={this.state.sortColumn}
                  onReturn={this.onReturn}
                  onDelete={this.handleDelete}
                  addRental={this.addRental}
                  removeRental={this.removeRental}
                />
              </div>
              {
                // name of prop is still numberOfMovies because it's being reused
              }
              <div className="mt-4">
                <Pagination
                  numberOfMovies={numberOfRentals}
                  onPageChange={this.handlePageChange}
                  pageSize={pageSize}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Rentals;
