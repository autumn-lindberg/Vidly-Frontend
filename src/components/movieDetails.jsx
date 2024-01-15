import React from "react";
import Footer from "./footer";
import { Link, useLocation } from "react-router-dom";
import MovieForm from "./movieForm";

const MovieDetails = () => {
  //const routeParams = useParams();
  const location = useLocation();
  let placeholders;
  if (location.state) {
    placeholders = {
      _id: location.state._id,
      title: location.state.title,
      genre: location.state.genre,
      numberInStock: location.state.numberInStock,
      dailyRentalRate: location.state.dailyRentalRate,
      publishDate: location.state.publishDate,
      liked: location.state.liked,
    };
  }
  return (
    <React.Fragment>
      <div className="page-container">
        <MovieForm placeholders={placeholders} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default MovieDetails;
