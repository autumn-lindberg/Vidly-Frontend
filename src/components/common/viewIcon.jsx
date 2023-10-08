import React from "react";
import { Link } from "react-router-dom";

const ViewIcon = ({ customer }) => {
  return (
    <React.Fragment>
      <Link to={`/customers/${customer.id}`} state={{ name: customer.name }}>
        <i className="bi-box-arrow-up-right h2 text-dark hoverLink"></i>
      </Link>
    </React.Fragment>
  );
};

export default ViewIcon;
