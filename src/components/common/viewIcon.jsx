import React from "react";
import { Link } from "react-router-dom";

const ViewIcon = ({ customer }) => {
  return (
    <React.Fragment>
      <Link
        to={`/customers/${customer._id}`}
        state={{
          _id: customer._id,
          name: customer.name,
          dateJoined: customer.dateJoined,
          phone: customer.phone,
          email: customer.email,
          isGold: customer.isGold,
          points: customer.points,
        }}
      >
        <i className="bi-box-arrow-up-right h2 text-dark hoverLink"></i>
      </Link>
    </React.Fragment>
  );
};

export default ViewIcon;
