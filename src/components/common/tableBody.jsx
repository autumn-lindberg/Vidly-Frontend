import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  // renderCell function takes in a single

  // item is movie being rendered
  // column is the column being rendered from column array
  renderCell = (item, column) => {
    // if column has content (an icon), render its react component by calling content function
    if (column.content) {
      return column.content(item);
    }
    // otherwise render using path and label
    else {
      // lodash get arguments: object to be searched, property to look for
      // necessary because item['column.path'] doesn't work
      // this renders a movie object's data
      return _.get(item, column.path);
    }
  };

  render() {
    const { items, columns } = this.props;

    return (
      <tbody>
        {
          // for each item (a movie), create a table row
          items.map((item) => (
            <tr key={item._id}>
              {
                // for each column in columns array (located in components/movieTable.jsx and passed by props to table.jsx then here)
                columns.map((column) => (
                  // create a table cell
                  <td
                    key={
                      column.path
                        ? `${item._id}${column.path}`
                        : `${item._id}${column.key}`
                    }
                  >
                    {
                      // render a movie object's data for a given column by accessing its "path"
                      // see components/movieTable.jsx and services/fakeMovieService.js to see these props
                      this.renderCell(item, column)
                    }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    );
  }
}

export default TableBody;
