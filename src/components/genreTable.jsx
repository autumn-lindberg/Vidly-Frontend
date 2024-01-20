import React, { Component } from "react";
import GenreEdit from "./common/genreEdit";
import Table from "./common/table";

class GenreTable extends Component {
  createTarget(name) {
    return "#a" + name;
  }
  createId(name) {
    return "a" + name;
  }
  // path is the data's property name. components/tableBody.jsx uses this to access the data inside each customer object
  columns = [
    { path: "name", label: "Name" },
    {
      key: "Edit",
      content: (genre) => <GenreEdit genre={genre} />,
    },
    {
      key: "Delete",
      // content is a function that takes in a customer and uses that to pass it to onDelete handler
      // onDelete is passed in by props from components/customers.jsx as handleDelete()
      content: (genre) => (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target={this.createTarget(genre._id)}
          >
            Delete
          </button>
          <div
            className="modal fade"
            tabIndex="-1"
            id={this.createId(genre._id)}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Genre</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to delete {genre.name}? It cannot be
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
                    onClick={() => this.props.onDelete(genre)}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Delete This Genre
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
        items={this.props.genres}
      />
    );
  }
}

export default GenreTable;
