import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import httpService from "../services/httpservice";
import config from "../config.json";

const ProductCard = ({ product }) => {
  async function handleDelete(p) {
    try {
      await httpService.delete(`${config.apiEndpoint}/products/${p._id}`);
    } catch (exception) {
      console.log(exception);
    }
  }

  return (
    <>
      <div className="col-sm-3 pb-4">
        <div className="card" style={{ height: "19rem", width: "15rem" }}>
          <img
            src={`data:image/jpeg;base64, ${Buffer.from(
              product.imageSrc.data
            ).toString("base64")}`}
            className="card-img-top mx-auto"
            alt={product.title}
            style={{ height: "15rem", width: "16rem" }}
          />
          <div className="card-body">
            <div style={{ height: "5rem" }}>
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
            </div>
            <div className="d-flex">
              <div className="p-2">
                <Link
                  to={`/products/${product._id}`}
                  state={{
                    ...product,
                  }}
                >
                  <button className="btn btn-primary">Edit</button>
                </Link>
              </div>
              <div className="p-2">
                <button
                  onClick={() => handleDelete(product)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
