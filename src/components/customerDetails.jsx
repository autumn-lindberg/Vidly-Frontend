import React from "react";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
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
      <div className="page-container">
        <CustomerForm placeholders={placeholders} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CustomerDetails;
