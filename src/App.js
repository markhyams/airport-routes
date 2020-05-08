import React, { Component } from 'react';
import './App.css';

import Data from './data.js';
import Table from './components/Table.js';

const { getAirlineById, getAirportByCode, routes, airlines, airports } = Data;

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const formatValue = (property, value) => {
  if (property === 'airline') {
    return getAirlineById(value);
  } else if (property === 'src' || property === 'dest') {
    return getAirportByCode(value);
  } else {
    return '';
  }
}

class App extends Component {
  state = {
    airlineIdFilter: "",
  }

  filterRoutesByAirline = (id) => {
    if (!id) { return routes; }

    return routes.filter((route) => {
      return route.airline === id;
    })
  }

  onFilterAirlines = (e) => {
    const airlineIdFilter = Number(e.target.value);
    this.setState({ airlineIdFilter })
  }

  render() {
    const routes = this.filterRoutesByAirline(this.state.airlineIdFilter)

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>Filter:</p>
          <select onChange={this.onFilterAirlines}>
            <option value="">Choose an airline...</option>
            {
              airlines.map((airline) => (
                <option key={airline.id} value={airline.id}>{airline.name}</option>
              ))
            }
          </select>
        </section>
        <section>
          <Table 
            perPage={25}
            className="routes-table"
            columns={columns}
            rows={routes}
            format={formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;