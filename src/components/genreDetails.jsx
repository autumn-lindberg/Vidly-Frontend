import React from "react";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
import GenreForm from "./genreForm";

const GenreDetails = () => {
  //const routeParams = useParams();
  const location = useLocation();
  let placeholders;
  if (location.state) {
    placeholders = {
      ...location.state,
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

export default GenreDetails;
