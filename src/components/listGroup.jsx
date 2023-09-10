import React, { Component } from "react";

// ListGroup component returns a bootstrap list group (like radio buttons, but cleaner)

// grab currentGenre, genres, and onGenreChange function from props
const ListGroup = ({ currentGenre, genres, onGenreChange }) => {
  return (
    <ul className="list-group">
      {
        // option for all movies
        // curly braces are so that this comment works
      }
      <li
        key="all"
        // logic for whether highlighted or not (for bootstrap)
        className={
          currentGenre === "All Movies"
            ? "list-group-item active"
            : "list-group-item"
        }
        // call handler to change current genre to all
        onClick={() => onGenreChange("All Movies")}
      >
        All Movies
      </li>
      {
        // map function does this process for each genre in arrays genre (passed in by props)
        // curly braces are so that this comment works
      }
      {genres.map((genre) => (
        <li
          key={genre.name}
          // logic for whether genre highlighted or not (for bootstrap)
          className={
            currentGenre === genre.name
              ? "list-group-item active"
              : "list-group-item"
          }
          // call handler to change current genre to whatever the correct genre is (passed in by props)
          // onGenreChange is defined in components/movies.jsx
          onClick={() => onGenreChange(genre.name)}
        >
          {
            // display text
            genre.name
          }
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
