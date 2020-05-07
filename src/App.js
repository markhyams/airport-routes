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
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table 
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