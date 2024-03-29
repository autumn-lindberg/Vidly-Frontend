import React, { Component } from "react";
import Heart from "./common/heart";
import Table from "./common/table";
import MovieEdit from "./common/movieEdit";

class MovieTable extends Component {
  createTarget(name) {
    return "#a" + name;
  }
  createId(name) {
    return "a" + name;
  }
  // state not needed, doesn't change throughout component life cycle
  // path is the JSON data's property name. components/tableBody.jsx uses this to access the data inside each movie object
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Price" },
    {
      key: "Like",
      // content is a function that takes in a movie and uses its liked prop to fill in heart or not (using onLike function)
      // handleLike prop in heart component is the onLike prop (a function) in movieTable component passed in by props
      // onLike prop then calls handleLike function (defined in components/movies.jsx)
      content: (movie) => (
        <Heart
          liked={movie.liked}
          handleLike={() => this.props.onLike(movie)}
        />
      ),
    },
    {
      key: "Edit",
      content: (movie) => <MovieEdit movie={movie} />,
    },
    {
      key: "Delete",
      // content is a function that takes in a movie and uses that to pass it to onDelete handler
      // onDelete is passed in by props from components/movies.jsx as handleDelete()
      content: (movie) => (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target={this.createTarget(movie._id)}
          >
            Delete
          </button>
          <div
            className="modal fade"
            tabIndex="-1"
            id={this.createId(movie._id)}
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
                    Are you sure you want to delete {movie.title}? It cannot be
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
                    onClick={() => this.props.onDelete(movie)}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Delete This Movie
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
    // sortColumn is passed in by props from components/movies.jsx
    // onSort handler is passed in by props in the same way
    // items is the movies array passed from movies.jsx
    return (
      <Table
        columns={this.columns}
        sortColumn={this.props.sortColumn}
        onSort={this.props.onSort}
        items={this.props.movies}
      />
    );
  }
}

export default MovieTable;
