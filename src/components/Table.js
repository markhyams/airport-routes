import React, { Component } from 'react';

class Table extends Component {
  state = {
    page: 1,
  }

  startEnd = (page) => {
    const perPage = this.props.perPage || 25;
    const start = (page - 1) * perPage;
    const end = page * perPage;
    return [start, end];
  }

  nextClick = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 }
    })
  }

  prevClick = () => {
    this.setState((prevState) => {
      return { page: prevState.page - 1 }
    })
  }

  render() {
    const [start, end] = this.startEnd(this.state.page);
    const numberOfRows = this.props.rows.length;

    return (
      <div>
        <p>
          <button
            disabled={start === 0}
            onClick={this.prevClick}
          >
            Previous Page
          </button>
          - Displaying {start + 1} thru {end} of {numberOfRows} -
          <button
            disabled={end >= numberOfRows }
            onClick={this.nextClick}
          >
            Next Page
          </button>
        </p>
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
            this.props.rows.slice(start, end).map((row, idx) => (
              <tr key={idx}>
                {
                  this.props.columns.map((col) => (
                  <td>
                    {
                      this.props.format(col.property, row[col.property])
                    }
                  </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    )
  }
}

export default Table;