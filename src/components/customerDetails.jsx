import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const CustomerDetails = () => {
  const routeParams = useParams();
  const location = useLocation();
  return (
    <React.Fragment>
      <h1>
        {location.state.name} is customer #{routeParams.id}
      </h1>
      <Link to="/customers">
        <button type="buton" className="btn btn-success">
          Save
        </button>
      </Link>
    </React.Fragment>
  );
};

export default CustomerDetails;
