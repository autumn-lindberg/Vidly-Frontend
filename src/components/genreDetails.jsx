import React from "react";
import Footer from "./footer";
import { Link, useLocation } from "react-router-dom";
import GenreForm from "./genreForm";

const CustomerDetails = () => {
  //const routeParams = useParams();
  const location = useLocation();
  let placeholders;
  if (location.state) {
    placeholders = {
      _id: location.state._id,
      name: location.state.name,
    };
  }
  return (
    <React.Fragment>
      <div className="page-container">
        <GenreForm placeholders={placeholders} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CustomerDetails;
