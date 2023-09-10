import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// This component encapsulates a single bootstrap navigation item
// this component only works when placed inside a bootstrap nav
// it uses two variables to display the name of the nav item and the
// path it navigates to when clicked.

const NavItem = ({ content, path }) => {
  return (
    <li className="nav-item h4">
      <NavLink className="nav-link" aria-current="page" to={path}>
        {content}
      </NavLink>
    </li>
  );
};

export default NavItem;
