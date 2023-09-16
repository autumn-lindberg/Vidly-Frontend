import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
  state = {};
  toastMe() {
    toast.success("Hello And Welcome!");
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <h1>Home Page</h1>
        <button onClick={this.toastMe} className="btn btn-success">
          Say Hello!
        </button>
      </React.Fragment>
    );
  }
}

export default Home;
