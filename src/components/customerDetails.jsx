import React from "react";
import { Link, useLocation } from "react-router-dom";

const CustomerDetails = () => {
  //const routeParams = useParams();
  const location = useLocation();
  return (
    <React.Fragment>
      <h1>{location.state.name}</h1>
      <p>{location.state.dateJoined}</p>
      <p>{location.state.phone}</p>
      <p>{location.state.email}</p>
      <p>{location.state.isGold.toString()}</p>
      <p>{location.state.points}</p>
      <br />
      <Link to="/customers">
        <button type="buton" className="btn btn-success">
          Save
        </button>
      </Link>
    </React.Fragment>
  );
};

export default CustomerDetails;
