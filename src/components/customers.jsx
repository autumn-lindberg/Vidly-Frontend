import React, { Component } from "react";
import CustomerTable from "./customerTable";
import CustomerForm from "./customerForm";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Customers extends Component {
  // title are so that table can be re-used from movie table
  state = {
    customers: [
      { id: 1, name: "Fred", title: "fred" },
      { id: 2, name: "Bob", title: "bob" },
      { id: 3, name: "George", title: "george" },
      { id: 4, name: "Yankee", title: "yankee" },
      { id: 5, name: "BillyBob", title: "billybob" },
    ],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "", order: "asc" },
  };

  // handler for the delete button
  handleDelete = (customer) => {
    // update customers to reflect deletion
    // goes through all customers and check if id matches on passed to handleDelete
    // array filter takes a function as a parameter that returns T/F whether to include or not
    const customers = this.state.customers.filter((m) => m.id !== customer.id);
    // update state to reflect this
    this.setState({ customers: customers });
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
  componentDidMount() {
    const listGroup = document.querySelector(".listGroup");

    // CALL SERVER AND SET INITIAL DATA

    // adjust style to move title and subtitle
    // title.style.paddingLeft = style;
  }

  // function to show only the information for the current page of items
  getPageData = () => {
    // grab current pagination information from state
    const { pageSize, currentPage, sortColumn } = this.state;
    let { customers } = this.state;
    // destructure customers array to take its length, naming it numberOfCustomers
    // length is a property of EVERY array in JS
    const { length: numberOfCustomers } = customers;

    // order data using lodash
    // params are original array, propName of column being sorted, order by
    customers = _.orderBy(customers, [sortColumn.path], [sortColumn.order]);
    // paginate data
    customers = paginate(customers, currentPage, pageSize);
    //
    return { customers, numberOfCustomers };
  };

  render() {
    let message = "";
    // get data for sorting from state
    const { pageSize, currentPage } = this.state;
    // get page data, customersObj stores customers and length of array
    const customersObj = this.getPageData();
    // extract returned values from customersObj so variables can be used
    const { customers, numberOfCustomers } = customersObj;

    if (numberOfCustomers === 0) {
      message = "No customers found";
    } else {
      message = numberOfCustomers + " customers in system";
    }
    return (
      <React.Fragment>
        <div className="ms-4 d-flex justify-content-between">
          <div className="title">
            <h1>Customers List</h1>
            <h3>{message}</h3>
          </div>
          <form className="d-flex me-4">
            <input
              className="navSearchBar form-control mb-3 mt-3 ms-3 border border-dark input-lg"
              type="search"
              placeholder="Search Customers"
              aria-label="Search"
            />
            <button
              className="btn btn-primary btn-lg border-dark m-3"
              type="submit"
            >
              <i class="bi-search h3 test text-dark"></i>
            </button>
          </form>
          <div class="titleAndButton d-flex">
            <div className="addButtonModal">
              <button
                type="button"
                className="btn btn-primary addButton p-3 h3 me-4 mt-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="h4 ps-2 pe-2">[+] New Customer</div>
              </button>

              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        New Customer
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <CustomerForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <CustomerTable
              customers={customers}
              onSort={this.onSort}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
            />
            {
              // name of prop is still numberOfMovies because it's being reused
            }
            <Pagination
              numberOfMovies={numberOfCustomers}
              onPageChange={this.handlePageChange}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
