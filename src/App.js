import React, { Component } from 'react';
import './App.css';

import Data from './data.js';
import Table from './components/Table.js';
import Select from './components/Select.js';

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
    airportCodeFilter: "",
  }

  filterRoutesByAirline = (id, routes) => {
    if (!id) { return routes; }

    return routes.filter((route) => {
      return route.airline === id;
    })
  }

  filterRoutesByAirport = (code, routes) => {
    if (!code) { return routes; }

    return routes.filter((route) => {
      return route.src === code || route.dest === code;
    })
  }

  onFilterAirlines = (e) => {
    const airlineIdFilter = Number(e.target.value);
    this.setState({ airlineIdFilter })
  }

  onFilterAirports = (e) => {
    const airportCodeFilter = e.target.value;
    this.setState({ airportCodeFilter });
  }

  render() {
    let filteredRoutes = this.filterRoutesByAirline(this.state.airlineIdFilter, routes)
    filteredRoutes = this.filterRoutesByAirport(this.state.airportCodeFilter, filteredRoutes)
    const filteredAirlines = airlines;

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>Filter:</p>
          <Select 
            options={filteredAirlines}
            valueKey="id" 
            titleKey="name"
            allTitle="All Airlines"
            value=""
            onSelect={this.onFilterAirlines} 
          />
          <Select 
            options={airports}
            valueKey="code" 
            titleKey="name"
            allTitle="All Airports"
            value=""
            onSelect={this.onFilterAirports} 
          />
        </section>
        <section>
          <Table 
            perPage={25}
            className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;