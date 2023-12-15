import { Buffer } from "buffer";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="col-sm-3 pb-4">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={`data:image/jpeg;base64, ${Buffer.from(
            product.imageSrc.data
          ).toString("base64")}`}
          className="card-img-top mx-auto"
          alt={product.title}
          style={{ height: "15rem", width: "16rem" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <Link
            to={`/products/${product._id}`}
            state={{
              ...product,
            }}
          >
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
