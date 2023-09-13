import React, { Component } from "react";

// Table Header component renders a <thead> element and

class TableHeader extends Component {
  // handler for sorting
  raiseSort = (path) => {
    // pass in sortColumn by props from components/table.jsx, then from movieTable, then from movies.jsx
    const { sortColumn } = this.props;
    if (sortColumn.path === path) {
      // if path is the same, reverse order
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      // otherwise new path, sort asc
      sortColumn.order = "asc";
      sortColumn.path = path;
    }
    // onSort function updates state to reflect changes (forces re-render)
    this.props.onSort(sortColumn);
  };

  // column label if its found, otherwise column key
  render() {
    // pass in sortColumn by props from components/table.jsx, then from movieTable, then from movies.jsx
    const { sortColumn } = this.props;
    // logic for correct class name (bootstrap)
    let className = "bi-caret-";
    if (sortColumn.order === "asc") {
      className += "up-fill";
    } else {
      className += "down-fill";
    }
    return (
      <thead>
        <tr>
          {
            // for each column defined in components/movieTable.jsx, create a <th> element (table header)
            this.props.columns.map((column) => (
              <th
                scope="col"
                key={column.label || column.key}
                // call the sort function when table header is clicked
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label || column.key}
                {
                  // if the column matches the current sort column, render the icon
                }
                {sortColumn.path === column.path ? (
                  <i className={className}></i>
                ) : (
                  ""
                )}
              </th>
            ))
          }
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
