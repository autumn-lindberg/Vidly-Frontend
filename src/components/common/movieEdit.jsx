import React from "react";
import { Link } from "react-router-dom";

const MovieEdit = ({ movie }) => {
  return (
    <React.Fragment>
      <Link
        to={`/movies/${movie._id}`}
        state={{
          _id: movie._id,
          title: movie.title,
          genre: movie.genre,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
          publishDate: movie.publishDate,
          liked: movie.liked,
        }}
      >
        <i className="bi-pencil h2 text-dark hoverLink"></i>
      </Link>
    </React.Fragment>
  );
};

export default MovieEdit;
