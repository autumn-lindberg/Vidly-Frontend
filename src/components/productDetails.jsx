import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Buffer } from "buffer";

const ProductDetails = () => {
  //const routeParams = useParams();
  const location = useLocation();
  const { state } = location;
  return (
    <React.Fragment>
      <img
        src={`data:${state.imageSrc.contentType};base64, ${Buffer.from(
          state.imageSrc.data
        ).toString("base64")}`}
        alt={state.title}
        style={{ height: "15rem", width: "16rem" }}
      />
      <h1>{state.title}</h1>
      <h5>{state.description}</h5>
      <br />
      <p>Price: ${state.price}</p>
      <p>Stock: {state.stock}</p>
      <br />
      <Link to="/products">
        <button type="buton" className="btn btn-success">
          Save
        </button>
      </Link>
    </React.Fragment>
  );
};

export default ProductDetails;
