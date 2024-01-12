import React from "react";
import ProductForm from "./productForm";
import Footer from "./footer";
import { Link, useLocation } from "react-router-dom";
import { Buffer } from "buffer";

const ProductDetails = () => {
  //const routeParams = useParams();
  const location = useLocation();
  let placeholders;
  const { state } = location;
  if (state) {
    placeholders = {
      _id: state._id,
      title: state.title,
      description: state.description,
      price: state.price,
      stock: state.stock,
      imageSrc: state.imageSrc,
      // add filename here
    };
  }
  return (
    <React.Fragment>
      <div className="page-container">
        <ProductForm placeholders={placeholders} />
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
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProductDetails;
