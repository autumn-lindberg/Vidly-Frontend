import React from "react";
import { Link } from "react-router-dom";

const ProductEdit = ({ product }) => {
  return (
    <React.Fragment>
      <Link
        to={`/products/${customer._id}`}
        state={{
          _id: product._id,
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageSrc: product.imageSrc,
        }}
      >
        <i className="bi-pencil h2 text-dark hoverLink"></i>
      </Link>
    </React.Fragment>
  );
};

export default ProductEdit;
