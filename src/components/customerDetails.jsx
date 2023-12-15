import React from "react";
import { Link, useLocation } from "react-router-dom";
import CustomerForm from "./customerForm";

const CustomerDetails = () => {
  //const routeParams = useParams();
  const location = useLocation();
  let placeholders;
  if (location.state) {
    placeholders = {
      _id: location.state._id,
      name: location.state.name,
      dateJoined: location.state.dateJoined,
      phone: location.state.phone,
      email: location.state.email,
      isGold: location.state.isGold,
      points: location.state.points,
    };
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
