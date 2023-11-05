import React, { Component } from "react";
import Table from "./common/table";

class GenreTable extends Component {
  // state not needed, doesn't change throughout component life cycle
  // path is the data's property name. components/tableBody.jsx uses this to access the data inside each customer object
  columns = [
    { path: "name", label: "Name" },
    {
      key: "delete",
      // content is a function that takes in a customer and uses that to pass it to onDelete handler
      // onDelete is passed in by props from components/customers.jsx as handleDelete()
      content: (customer) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(customer)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    // columns array is in props
    // sortColumn is passed in by props from components/customers.jsx
    // onSort handler is passed in by props in the same way
    // items is the customer array passed from customers.jsx
    return (
      <Table
        columns={this.columns}
        sortColumn={this.props.sortColumn}
        onSort={this.props.onSort}
        items={this.props.genres}
      />
    );
  }
}

export default GenreTable;
