import { Buffer } from "buffer";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div class="col-sm-3 pb-4">
      <div class="card" style={{ width: "18rem" }}>
        <img
          src={`data:image/jpeg;base64, ${Buffer.from(
            product.imageSrc.data
          ).toString("base64")}`}
          class="card-img-top mx-auto"
          alt={product.title}
          style={{ height: "15rem", width: "16rem" }}
        />
        <div class="card-body">
          <h5 class="card-title">{product.title}</h5>
          <p class="card-text">{product.description}</p>
          <Link
            to={`/products/${product._id}`}
            state={{
              ...product,
            }}
          >
            <button class="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
