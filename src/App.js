import "./App.css";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import Settings from "./components/settings";
import NavBar from "./components/navBar";
import Home from "./components/home";
import NotFound from "./components/notFound";
import CustomerDetails from "./components/customerDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { Route, Routes } from "react-router-dom";
import React, { Component } from "react";

function App() {
  return (
    <div class="bg-light">
      <NavBar />
      <main className="container">
        <Routes>
          {
            // TODO: route parameters for customers (id?)
          }
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
