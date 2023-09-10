import React, { Component } from "react";
import _ from "lodash";

// pagination component renders a set of buttons to select a page from and highlights the current page
// the entries that are display (a range of numbers) is calculated in utils/paginate.js

// grab pageSize, numberOfMovies (total # of movies), current page, and onPageChange function from props
const Pagination = ({
  pageSize,
  numberOfMovies,
  currentPage,
  onPageChange,
}) => {
  // calculate how many pages there will be
  const pagesCount = Math.ceil(numberOfMovies / pageSize);
  // create an array of numbers that holds the page numbers
  // lodash range function creates an array of numbers from first param to second param - 1
  // lodash range function doesn't include last number, so 1 is added
  const pages = _.range(1, pagesCount + 1);

  // do not display buttons if only one page
  if (pagesCount === 1) {
    return null;
  }
  return (
    <ul className="pagination">
      {
        // go through array of numbers (pages) and highlight the active page
        pages.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              // logic for page highlighting (bootstrap)
              pageNumber === currentPage ? "page-item active" : "page-item"
            }
          >
            {
              // handle page change when button is clicked (function is passed in by props)
              // onPageChange is defined in components/movies.jsx
            }
            <a className="page-link" onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </a>
          </li>
        ))
      }
    </ul>
  );
};

export default Pagination;
