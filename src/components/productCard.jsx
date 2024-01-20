import { Buffer } from "buffer";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onDelete }) => {
  function createTarget(name) {
    return "#a" + name;
  }
  function createId(name) {
    return "a" + name;
  }

  return (
    <>
      <div className="col-sm-3 pb-4">
        <div className="card" style={{ height: "19rem", width: "15rem" }}>
          <img
            src={`data:image/jpeg;base64, ${Buffer.from(
              product.imageSrc.data || product.imageSrc
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
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target={createTarget(product._id)}
                >
                  Delete
                </button>
                <div
                  className="modal fade"
                  tabIndex="-1"
                  id={createId(product._id)}
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Delete Product</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          Are you sure you want to delete {product.title}? It
                          cannot be undone.
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          Cancel & Go Back
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => onDelete(product)}
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          Delete This Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
