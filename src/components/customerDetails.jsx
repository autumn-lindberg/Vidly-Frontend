import React from "react";
import { Link, useLocation } from "react-router-dom";
import CustomerForm from "./customerForm";

const CustomerDetails = () => {
  //const routeParams = useParams();
  const location = useLocation();
  let placeholders = ["", "", "", "", "", "", ""];
  if (location.state) {
    placeholders = [
      location.state._id,
      location.state.name,
      location.state.dateJoined,
      location.state.phone,
      location.state.email,
      location.state.isGold,
      location.state.points,
    ];
  }
  return (
    <React.Fragment>
      <CustomerForm placeholders={placeholders} />
      <Link to="/customers">
        <button type="buton" className="btn btn-success">
          Save
        </button>
      </Link>
    </React.Fragment>
  );
};

export default CustomerDetails;
