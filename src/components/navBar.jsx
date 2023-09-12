import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/film-reel.svg";
import profile from "../img/profile-user.svg";
import NavItem from "./common/navItem";
import HorizontalDivider from "./common/horizontalDivider";

// This component creates a specific configuration of a bootstrap navigation
// It includes 4 links and a dropdown menu with 3 options
// Some other time I may refactor to work with any number of configurations

const NavBar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light myNav">
        <div className="container-fluid">
          {
            // Main Logo
          }
          <NavLink to="/">
            <img
              src={logo}
              className="navbar-brand me-0"
              width={100}
              height={100}
            />
          </NavLink>
          <h1 className="text-dark me-5">Vidly.</h1>
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
              <NavItem content="Rentals" path="/rentals" />
              <NavItem content="Customers" path="/customers" />
              {
                // Nav dropdown item not needed, but here's the syntax
                // main is a string, dropdowns is an array of objects that hold name and path
                //<NavItemDropdown mainItem={main} dropdowns={dropdownMenus} />
              }
            </ul>
            {
              // SEARCH BAR
            }
            <form className="d-flex me-4">
              <input
                className="navSearchBar form-control me-2 border border-dark input-lg"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <button
                className="btn btn-primary btn-lg border-dark"
                type="submit"
              >
                <i class="bi-search h3 test text-dark"></i>
              </button>
            </form>
            {
              // PROFILE LOGIN BUTTON
            }
            <div class="dropdown-center">
              <button
                className="btn bg-transparent dropdown-toggle border-0"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={profile} width={65} height={65} />
              </button>
              <ul
                class="dropdown-menu text-center border-dark"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link to="/settings" class="dropdown-item h4">
                    Settings
                  </Link>
                </li>
                <HorizontalDivider color="black" />
                <li>
                  <Link to="/login" class="dropdown-item h4">
                    Login
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/register" class="dropdown-item h4">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div className="spacer d-block"> </div>
          </div>
        </div>
      </nav>
      <br />
    </React.Fragment>
  );
};

export default NavBar;
