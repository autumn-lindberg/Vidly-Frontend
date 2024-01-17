import React, { Component } from "react";
import Table from "./common/table";
import EditCustomer from "./common/editCustomer";
import RentIcon from "./common/rentIcon";
import { getMovies } from "../services/movieService";

class CustomerTable extends Component {
  createTarget(name) {
    return "#" + name;
  }
  createId(name) {
    return "a" + name;
  }
  // use state to store movies
  state = {
    movies: [],
  };
  async componentDidMount() {
    const { data: movies } = await getMovies();
    this.setState({ movies: movies });
  }
  // path is the data's property name. components/tableBody.jsx uses this to access the data inside each customer object
  columns = [
    { path: "name", label: "Name" },
    {
      key: "Edit",
      content: (customer) => <EditCustomer customer={customer} />,
    },
    {
      key: "Rent",
      content: (customer) => (
        <RentIcon customer={customer} movies={this.state.movies} />
      ),
    },
    {
      key: "Delete",
      // content is a function that takes in a customer and uses that to pass it to onDelete handler
      // onDelete is passed in by props from components/customers.jsx as handleDelete()
      content: (customer) => (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target={this.createTarget(customer._id)}
          >
            Delete
          </button>
          <div
            className="modal fade"
            tabIndex="-1"
            id={this.createId(customer._id)}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Customer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to delete {customer.name}? It cannot
                    be undone.
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
                    onClick={() => this.props.onDelete(customer)}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Delete This Customer
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
    // sortColumn is passed in by props from components/customers.jsx
    // onSort handler is passed in by props in the same way
    // items is the customer array passed from customers.jsx
    return (
      <Table
        columns={this.columns}
        sortColumn={this.props.sortColumn}
        onSort={this.props.onSort}
        items={this.props.customers}
      />
    );
  }
}

export default CustomerTable;
