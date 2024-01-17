import "./App.css";
import Movies from "./components/movies";
import MovieDetails from "./components/movieDetails";
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
import GenreDetails from "./components/genreDetails";
import Rentals from "./components/rentals";
import NewRental from "./components/newRental";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import UserContext from "./UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [user, setUser] = useState({});
  function handleLogin(user) {
    setUser(user);
  }
  function handleRegister(user) {
    setUser(user);
  }
  function handleLogout() {
    setUser({});
  }
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      {
        // give access to user and setUser
      }

      <UserContext.Provider
        value={{
          user: user,
          handleLogin: handleLogin,
          handleLogout: handleLogout,
          handleRegister: handleRegister,
        }}
      >
        <div className="bg-light">
          <NavBar />
          <ToastContainer theme="colored" />
          <main className="container-fluid pt-0 ps-0 pe-0 mainContainer">
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/:id" element={<CustomerDetails />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/genres/:id" element={<GenreDetails />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/rent/:id" element={<NewRental />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
