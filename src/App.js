import "./App.css";
import Movies from "./components/movies";
import Products from "./components/products";
import Customers from "./components/customers";
import NavBar from "./components/navBar";
import Home from "./components/home";
import NotFound from "./components/notFound";
import CustomerDetails from "./components/customerDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProductDetails from "./components/productDetails";
import Genres from "./components/genres";
import Rentals from "./components/rentals";
import NewRental from "./components/newRental";
import { Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div class="bg-light">
      <NavBar />
      <main className="container">
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/rent/:id" element={<NewRental />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
