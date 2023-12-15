import React, { Component } from "react";
import Heart from "./common/heart";
import Table from "./common/table";

class MovieTable extends Component {
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
      key: "Delete",
      // content is a function that takes in a movie and uses that to pass it to onDelete handler
      // onDelete is passed in by props from components/movies.jsx as handleDelete()
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
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
