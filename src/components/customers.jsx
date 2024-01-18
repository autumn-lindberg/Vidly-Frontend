import React, { Component } from "react";
import CustomerTable from "./customerTable";
import CustomerForm from "./customerForm";
import Footer from "./footer";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { getCustomers } from "../services/customerService";
import { toast } from "react-toastify";
import _ from "lodash";
import httpService from "../services/httpservice";
import config from "../config.json";
import { filterCustomers } from "../utils/filterCustomers";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

class Customers extends Component {
  static contextType = UserContext;
  // title are so that table can be re-used from movie table
  state = {
    customers: [],
    filtered: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "", order: "asc" },
  };

  // handler for the delete button
  handleDelete = async (customer) => {
    // update customers to reflect deletion
    // goes through all customers and check if id matches on passed to handleDelete
    // array filter takes a function as a parameter that returns T/F whether to include or not
    const customers = this.state.customers.filter((m) => m.id !== customer.id);
    // update state to reflect this
    this.setState({ customers: customers });

    // send delete request
    try {
      const response = await httpService.delete(
        `${config.apiEndpoint}/customers/${customer._id}`
      );
      if (response.status === 200)
        toast.success(`Successfully Deleted ${customer.name}!`);
      else toast.error("An Error Occurred. Please Try Again Later.");
    } catch (exception) {
      toast.error("An Error Occurred. Please Try Again Later.");
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
    const { data: customers } = await getCustomers();
    this.setState({ customers: customers, filtered: customers });
  }

  // function to show only the information for the current page of items
  getPageData = () => {
    // grab current pagination information from state
    const { pageSize, currentPage, sortColumn } = this.state;
    let { filtered } = this.state;
    // destructure customers array to take its length, naming it numberOfCustomers
    // length is a property of EVERY array in JS
    const { length: numberOfCustomers } = filtered;
    // order data using lodash
    // params are original array, propName of column being sorted, order by
    filtered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // paginate data
    filtered = paginate(filtered, currentPage, pageSize);
    //
    return { filtered, numberOfCustomers };
  };

  handleSearch = (e) => {
    // search customers here
    const searchText = e.currentTarget.value;
    // duplicate state
    const customers = this.state.customers;
    const filtered = filterCustomers(customers, searchText);
    this.setState({ filtered: filtered });
    // check page number
    const pageData = this.getPageData();
    if (
      pageData.numberOfCustomers <=
      this.state.currentPage * this.state.pageSize
    ) {
      this.setState({ currentPage: 1 });
    }
  };

  addCustomer = (customer) => {
    const customers = [...this.state.customers];
    customers.push(customer);
    this.setState({ customers: customers });
    // grab search content and filter
    const text = document.querySelector(".customerSearch").value;
    const filtered = filterCustomers(customers, text);
    this.setState({ filtered: filtered });
  };

  removeCustomer = () => {
    const customers = [...this.state.customers];
    customers.pop();
    this.setState({ customers: customers });
    // grab search content and filter
    const text = document.querySelector(".customerSearch").value;
    const filtered = filterCustomers(customers, text);
    this.setState({ filtered: filtered });
  };

  doNothing() {}

  render() {
    let message = "";
    // get data for sorting from state
    const { pageSize, currentPage } = this.state;
    // get page data, customersObj stores customers and length of array
    const customersObj = this.getPageData();
    // extract returned values from customersObj so variables can be used
    const { filtered, numberOfCustomers } = customersObj;

    if (numberOfCustomers === 0) {
      message = "No customers found";
    } else {
      message = numberOfCustomers + " customers found";
    }
    return (
      <>
        {!localStorage.getItem("token") ? (
          <Navigate to="/login" />
        ) : (
          this.doNothing()
        )}
        <div className="page-container ms-5">
          <div className="titleAndButton d-flex justify-content-start align-items-top">
            <div className="addButtonModal">
              <button
                type="button"
                className="btn btn-primary addButton p-4 me-4 mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="mb-0">[+] New Customer</div>
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
                        New Customer
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <CustomerForm
                        addCustomer={this.addCustomer}
                        removeCustomer={this.removeCustomer}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-2 me-5 d-flex justify-content-start flex-grow-1">
              <div className="title ms-3">
                <h1>Customers List</h1>
                <h3>{message}</h3>
              </div>
              <form className="d-flex ms-5 navSearchBar">
                <input
                  className="form-control m-3 border border-dark input-lg customerSearch"
                  type="search"
                  placeholder="Search Customers"
                  aria-label="Search"
                  onChange={this.handleSearch}
                />
              </form>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <div className="customerTable">
                <CustomerTable
                  customers={filtered}
                  onSort={this.onSort}
                  sortColumn={this.state.sortColumn}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                />
              </div>
              {
                // name of prop is still numberOfMovies because it's being reused
              }
              <div className="mt-4">
                <Pagination
                  numberOfMovies={numberOfCustomers}
                  onPageChange={this.handlePageChange}
                  pageSize={pageSize}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />{" "}
      </>
    );
  }
}

export default Customers;
