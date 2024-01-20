import React, { Component } from "react";
import Table from "./common/table";
import { getRentals } from "../services/rentalService";

class RentalTable extends Component {
  createTarget(name) {
    return "#a" + name;
  }
  createId(name) {
    return "a" + name;
  }
  createTargetTwo(name) {
    return "#b" + name;
  }
  createIdTwo(name) {
    return "b" + name;
  }
  // use state to store rentals
  state = {
    rentals: [],
  };
  async componentDidMount() {
    let { data: rentals } = await getRentals();
    this.setState({ rentals: rentals });
  }

  // path is the data's property name. components/tableBody.jsx uses this to access the data inside each rental object
  columns = [
    { path: "customer.name", label: "Name" },
    { path: "movie.title", label: "Title" },
    { path: "movie.genre.name", label: "Genre" },
    {
      path: "dateOut",
      key: "Date Out",
      content: (rental) => (
        <i className="fw-light mb-0 mt-1 returnedText">
          {new Date(rental.dateOut).toLocaleString("en-us", {
            weekday: "narrow",
            year: "2-digit",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </i>
      ),
    },
    {
      key: "Return",
      content: (rental) =>
        rental.dateReturned == null ? (
          <React.Fragment>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target={this.createTarget(rental._id)}
            >
              Return
            </button>
            <div
              className="modal fade"
              tabIndex="-1"
              id={this.createId(rental._id)}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Return Movie</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Are you sure you want to return {rental.movie.title}? It
                      cannot be undone.
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel & Go Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.props.onReturn(rental)}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Return This Movie
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <i className="mb-0 mt-1 returnedText">${rental.rentalFee}</i>
        ),
    },
    {
      key: "Delete",
      // content is a function that takes in a rental and uses that to pass it to onDelete handler
      // onDelete is passed in by props from components/rentals.jsx as handleDelete()
      content: (rental) => (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target={this.createTargetTwo(rental._id)}
          >
            Delete
          </button>
          <div
            className="modal fade"
            tabIndex="-1"
            id={this.createIdTwo(rental._id)}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Movie</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to delete rental of{" "}
                    {rental.movie.title} to {rental.customer.name}? It cannot be
                    undone.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel & Go Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.props.onDelete(rental)}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Delete This Rental
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ),
    },
  ];

  render() {
    // columns array is in props
    // sortColumn is passed in by props from components/rentals.jsx
    // onSort handler is passed in by props in the same way
    // items is the rental array passed from customers.jsx
    return (
      <Table
        columns={this.columns}
        sortColumn={this.props.sortColumn}
        onSort={this.props.onSort}
        items={this.props.rentals}
      />
    );
  }
}

export default RentalTable;
