import React, { Component } from "react";
import { Link } from "react-router-dom";

class Customers extends Component {
  state = {
    customers: [
      { id: 1, name: "Fred" },
      { id: 2, name: "Bob" },
      { id: 3, name: "George" },
      { id: 4, name: "Yankee" },
      { id: 5, name: "BillyBob" },
    ],
  };
  render() {
    return (
      <React.Fragment>
        <h1>test customers</h1>
        <div>
          <ul className="productList">
            {this.state.customers.map((customer) => (
              <li key={customer.id}>
                <Link
                  to={`/customers/${customer.id}`}
                  state={{ name: customer.name }}
                >
                  Customer #{customer.id}: {customer.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
