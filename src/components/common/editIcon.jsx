import React from "react";
import { Link } from "react-router-dom";

const ViewIcon = ({ movie }) => {
  return (
    <React.Fragment>
      <Link
        to={`/movies/${movie._id}`}
        state={{
          _id: movie._id,
          name: movie.name,
          dateJoined: movie.dateJoined,
          phone: movie.phone,
          email: movie.email,
          isGold: movie.isGold,
          points: movie.points,
        }}
      >
        <i className="bi-pencil h2 text-dark hoverLink"></i>
      </Link>
    </React.Fragment>
  );
};

export default ViewIcon;
