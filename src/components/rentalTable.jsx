import React, { Component } from "react";
import Table from "./common/table";
import { getRentals } from "../services/rentalService";

class RentalTable extends Component {
  // use state to store rentals
  state = {
    rentals: [],
  };
  async componentDidMount() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals: rentals });
  }
  // path is the data's property name. components/tableBody.jsx uses this to access the data inside each rental object
  columns = [
    { path: "customer.name", label: "Name" },
    { path: "movie.title", label: "Title" },
    { path: "movie.genre.name", label: "Genre" },
    {
      key: "Return",
      content: (rental) =>
        rental.dateReturned == null ? (
          <button
            className="btn btn-success"
            onClick={() => this.props.onReturn(rental)}
          >
            Return
          </button>
        ) : (
          <p>RETURNED</p>
        ),
    },
    {
      key: "Delete",
      // content is a function that takes in a rental and uses that to pass it to onDelete handler
      // onDelete is passed in by props from components/rentals.jsx as handleDelete()
      content: (rental) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(rental)}
        >
          Delete
        </button>
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
