import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <table>
      <thead>
        <tr>
          {
            this.props.columns.map((col) => (
              <th>{col.name}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          this.props.rows.map((route, idx) => (
            <tr key={idx}>
              {
                this.props.columns.map((col) => (
                <td>
                  {
                    this.props.format(col.property, route[col.property])
                  }
                </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
    )
  }
}

// const hello = () => {
//   routes.map((route, idx) => (
//   ))
// };
export default Table;