import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// this component renders a bootstrap table

// take columns array (located in components/movieTable.jsx)
// sortColumn is passed in by props from components/movies.jsx to components/movieTable.jsx, then to here
// onSort handler is passed in by props in the same way
// items is the movies array passed from movies.jsx to movieTable.jsx, then to here
const Table = ({ columns, sortColumn, onSort, items }) => {
  return (
    <table className="table">
      {
        // TableHeader component is located in components/common/tableHeader.jsx
      }
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      {
        // TableBody component is located in components/common/tableBody.jsx
      }
      <TableBody items={items} columns={columns} />
    </table>
  );
};

export default Table;
