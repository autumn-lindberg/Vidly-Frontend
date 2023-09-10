import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// This component is a general dropdown menu that uses a single variable (mainItem)
// and an array (dropdowns) to create a bootstrap dropdown nav item
// This format only works within a bootstrap nav

const NavItemDropdown = ({ mainItem, dropdowns }) => {
  return (
    <li className="nav-item dropdown h4">
      {
        // Main dropdown item
      }
      <NavLink
        className="nav-link dropdown-toggle"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {mainItem}
      </NavLink>
      {
        // Dropdown items: mapped from array of objects that hold the items'
        // content (name) and the path it goes to when clicked (path)
      }
      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        {dropdowns.map((dropdownItem) => (
          <li className="h4">
            {
              // NavItem component cannot be used because the class for the NavLink is different
            }
            <NavLink to={dropdownItem.path} className="dropdown-item">
              {dropdownItem.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default NavItemDropdown;
