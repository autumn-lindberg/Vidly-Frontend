import React from "react";
import { Link } from "react-router-dom";

const CustomerEdit = ({ customer }) => {
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
        <i className="bi-pencil h2 text-dark hoverLink"></i>
      </Link>
    </React.Fragment>
  );
};

export default CustomerEdit;
