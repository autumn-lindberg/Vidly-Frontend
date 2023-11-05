import React from "react";
import { Link } from "react-router-dom";

const RentIcon = ({ customer, movies }) => {
  return (
    <React.Fragment>
      <Link
        to={`/rent/${customer._id}`}
        state={{
          _id: customer._id,
          name: customer.name,
          dateJoined: customer.dateJoined,
          phone: customer.phone,
          email: customer.email,
          isGold: customer.isGold,
          points: customer.points,
          movies: movies,
        }}
      >
        <i className="bi-film h2 text-dark hoverLink"></i>
      </Link>
    </React.Fragment>
  );
};

export default RentIcon;
