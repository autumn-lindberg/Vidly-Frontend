import React from "react";
import ProductForm from "./productForm";
import Footer from "./footer";
import { Link, useLocation } from "react-router-dom";

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
