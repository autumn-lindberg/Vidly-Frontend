import React, { Component } from "react";
import ProductCard from "./productCard";
import ProductForm from "./productForm";
import Footer from "./footer";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getProducts } from "../services/productService";
import { toast } from "react-toastify";
import _ from "lodash";
import httpService from "../services/httpservice";
import config from "../config.json";
import { filterProducts } from "../utils/filterProducts";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

class Products extends Component {
  static contextType = UserContext;
  // title are so that table can be re-used from movie table
  state = {
    products: [],
    filtered: [],
    pageSize: 8,
    currentPage: 1,
    sortColumn: { path: "", order: "asc" },
  };

  // handler for the delete button
  handleDelete = async (product) => {
    // update products to reflect deletion
    // goes through all products and check if id matches on passed to handleDelete
    // array filter takes a function as a parameter that returns T/F whether to include or not
    const products = this.state.products.filter((m) => m.id !== product.id);
    // update state to reflect this
    this.setState({ products: products });

    // send delete request
    try {
      const response = await httpService.delete(
        `${config.apiEndpoint}/products/${product._id}`
      );
      if (response.status === 200)
        toast.success(`${product.title} Deleted Successfully!`);
      else toast.error("An Error Occurred. Please Try Again Later");
    } catch (exception) {
      toast.error("An Error Occurred. Please Try Again Later");
    }
  };

  // handler for the pagination
  handlePageChange = (pageNumber) => {
    // update state to reflect current page selected (default is 1)
    this.setState({ currentPage: pageNumber });
  };

  // handler for sorting
  onSort = (sortColumn) => {
    // update state to reflect current column to be sorted (default is none)
    this.setState({ sortColumn: sortColumn });
  };

  // get initial data into state, style title
  async componentDidMount() {
    //const listGroup = document.querySelector(".listGroup");
    // adjust style to move title and subtitle
    // title.style.paddingLeft = style;
    // CALL SERVER AND SET INITIAL DATA
    const { data: products } = await getProducts();
    this.setState({ products: products, filtered: products });
  }

  // function to show only the information for the current page of items
  getPageData = () => {
    // grab current pagination information from state
    const { pageSize, currentPage, sortColumn } = this.state;
    let { filtered } = this.state;
    // destructure products array to take its length, naming it numberOfCustomers
    // length is a property of EVERY array in JS
    const { length: numberOfProducts } = filtered;
    // order data using lodash
    // params are original array, propName of column being sorted, order by
    filtered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // paginate data
    filtered = paginate(filtered, currentPage, pageSize);
    //
    return { filtered, numberOfProducts };
  };

  handleSearch = (e) => {
    // search products here
    const searchText = e.currentTarget.value;
    // duplicate state
    const products = this.state.products;
    const filtered = filterProducts(products, searchText);
    this.setState({ filtered: filtered });
  };

  render() {
    let message = "";
    // get data for sorting from state
    const { pageSize, currentPage } = this.state;
    // get page data, productsObj stores customers and length of array
    const productsObj = this.getPageData();
    // extract returned values from productsObj so variables can be used
    const { filtered, numberOfProducts } = productsObj;

    if (numberOfProducts === 0) {
      message = "No products found";
    } else {
      message = numberOfProducts + " products in system";
    }
    return (
      <>
        {!localStorage.getItem("token") ? (
          <Navigate to="/login" />
        ) : (
          console.log("")
        )}
        <div className="page-container ms-3 me-3">
          <div className="titleAndButton d-flex mb-2 justify-content-start align-items-top">
            <div className="addButtonModal">
              <button
                type="button"
                className="btn btn-primary addButton p-4 me-4 mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="mb-0">[+] New Product</div>
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        New product
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <ProductForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-2 d-flex justify-content-start flex-grow-1">
              <div className="title ms-3">
                <h1>Products List</h1>
                <h3>{message}</h3>
              </div>
              <form className="d-flex ms-5 navSearchBar">
                <input
                  className="form-control m-3 border border-dark input-lg"
                  type="search"
                  placeholder="Search products"
                  aria-label="Search"
                  onChange={this.handleSearch}
                />
              </form>
            </div>
          </div>
          <br />
          <div className="row">
            {filtered.map((product) => {
              return <ProductCard product={product} key={product.title} />;
            })}
            {
              // name of prop is still numberOfMovies because it's being reused
            }
            <div className="ms-3 mt-3">
              <Pagination
                numberOfMovies={numberOfProducts}
                onPageChange={this.handlePageChange}
                pageSize={pageSize}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Products;
