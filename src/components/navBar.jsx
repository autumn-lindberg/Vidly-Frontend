import React, { useState, useContext, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/film-reel.png";
import profile from "../img/profile-user.png";
import profileHover from "../img/profile-user-hover.png";
import NavItem from "./common/navItem";
import UserContext from "./../UserContext";

// This component creates a specific configuration of a bootstrap navigation
// Some other time I may refactor to work with any number of configurations

const NavBar = () => {
  const userContext = useContext(UserContext);
  // WRAP CONTEXT IN A REF SO DEPENDENCY ARRAY CAN BE BLANK
  const userRef = useRef(userContext);
  const [navigate, setNavigate] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      userRef.current.handleLogin(user);
    }
  }, []);
  const resetNavigate = async () => {
    setNavigate(true);
    setTimeout(1000);
    setNavigate(false);
  };
  const onLogout = () => {
    // unset JWT from local storage
    localStorage.removeItem("token");
    if (localStorage.getItem("g_state")) localStorage.removeItem("g_state");
    // remove user from context
    userContext.handleLogout();
    resetNavigate();
  };
  const doNothing = () => {};
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light myNav pt-1 pb-1">
        <div className="container-fluid">
          {
            // Main Logo
          }
          <NavLink to="/">
            <img
              src={logo}
              className="navbar-brand me-0 ms-4"
              width={80}
              height={90}
              alt="logo"
            />
          </NavLink>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="h2 fw-bold me-5 vidly-text">Vidly.</h1>
          </Link>
          {
            // Bootstrap mobile nav hamburger menu button
          }
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {
            // Main navigation links
          }
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                // NavItem component creates a bootstrap nav that is highlightable and clickable
                // navItemDropdown component creates a bootstrap dropdown nav using an array for
                // the dropdown items and a single variable for the main item
              }
              <NavItem content="Home" path="/" />
              <NavItem content="Movies" path="/movies" />
              <NavItem content="Products" path="/products" />
              <NavItem content="Customers" path="/customers" />
              <NavItem content="Genres" path="/genres" />
              <NavItem content="Rentals" path="/rentals" />
              {
                // Nav dropdown item not needed, but here's the syntax
                // main is a string, dropdowns is an array of objects that hold name and path
                //<NavItemDropdown mainItem={main} dropdowns={dropdownMenus} />
              }
            </ul>
            {
              // PROFILE LOGIN BUTTON
            }
            <div className="dropdown-center">
              <button
                className="btn bg-transparent dropdown-toggle border-0"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="figure">
                  <img
                    className="image-main"
                    src={profile}
                    width={65}
                    height={65}
                    alt="profile icon"
                  />
                  <img
                    className="image-hover"
                    src={profileHover}
                    width={65}
                    height={65}
                    alt="profile icon"
                  />
                </div>
              </button>
              <ul
                className="dropdown-menu text-center border-light"
                aria-labelledby="dropdownMenuButton1"
              >
                {(!userContext.user.name ||
                  userContext.user.name.length === 0) &&
                !localStorage.getItem("token") ? (
                  <div>
                    <li className="pt-3">
                      <Link to="/login" className="dropdown-item h4">
                        Login
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link to="/register" className="dropdown-item h4">
                        Register
                      </Link>
                    </li>
                  </div>
                ) : (
                  <li className="p-3 user-name-text">
                    <h3>Welcome</h3>
                    <h4>{userContext.user.name}</h4>
                  </li>
                )}
                {userContext.user.name && userContext.user.name.length !== 0 ? (
                  <li className="mb-3">
                    <div className="dropdown-item h4">
                      <button onClick={onLogout} className="btn btn-primary">
                        Logout
                      </button>
                    </div>
                  </li>
                ) : (
                  <br />
                )}
              </ul>
            </div>
            <div className="spacer d-block"> </div>
          </div>
        </div>
      </nav>
      {navigate ? <Navigate to="/login" /> : doNothing()}
    </React.Fragment>
  );
};

export default NavBar;
