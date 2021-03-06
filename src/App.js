import React, { Component } from 'react';
import './App.css';

import Data from './data.js';
import Table from './components/Table.js';
import Select from './components/Select.js';
import Map from './components/Map.js';

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
    return getAirportByCode(value).name;
  } else {
    return '';
  }
}

class App extends Component {
  state = {
    airlineIdFilter: "",
    airportCodeFilter: "",
    page: 1,
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

  isUnfiltered = () => (!this.state.airlineIdFilter && !this.state.airportCodeFilter)

  filterSelectAirlines = (routes) => {
    if (this.isUnfiltered()) { return airlines; }
    return airlines.map((airline) => {
      const disabled = routes.every((route) => {
        return route.airline !== airline.id
      })
      return Object.assign({}, airline, { disabled })
    })
  }

  filterSelectAirports = (routes) => {
    if (this.isUnfiltered()) { return airports; }
    return airports.map((airport) => {
      const disabled = routes.every((route) => {
        return route.src !== airport.code &&
                route.dest !== airport.code;
      })
      return Object.assign({}, airport, { disabled })
    })
  }

  onFilterAirlines = (e) => {
    const airlineIdFilter = Number(e.target.value);
    const page = 1;
    this.setState({ airlineIdFilter, page })
  }

  onFilterAirports = (e) => {
    const airportCodeFilter = e.target.dataset.code || e.target.value;
    const page = 1;
    this.setState({ airportCodeFilter, page });
  }

  handleMapClick = (e) => {
    const airportCodeFilter = e.target.dataset.code;
    const page = 1;
    this.setState({ airportCodeFilter, page });
  }

  handleChangePage = (action) => {
    if (action === 'increment') {
      this.setState((state) => ({ page: state.page + 1 }))
    } else if (action === 'decrement') {
      this.setState((state) => ({ page: state.page - 1 }))      
    }
  }

  handleClear = () => {
    this.setState({
      airlineIdFilter: '',
      airportCodeFilter: '',
    });
  }

  render() {
    let filteredRoutes = this.filterRoutesByAirline(this.state.airlineIdFilter, routes)
    filteredRoutes = this.filterRoutesByAirport(this.state.airportCodeFilter, filteredRoutes)
    const filteredAirlines = this.filterSelectAirlines(filteredRoutes);
    const filteredAirports = this.filterSelectAirports(filteredRoutes);

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Map 
            routes={filteredRoutes}
            airportIndex={getAirportByCode}
            onMapClick={this.onFilterAirports}
          />
        </section>
        <section>
          <span>Show routes on:</span>
          <Select 
            options={filteredAirlines}
            valueKey="id" 
            titleKey="name"
            allTitle="All Airlines"
            value={this.state.airlineIdFilter}
            onSelect={this.onFilterAirlines} 
          />
          <span>flying in or out of</span>
          <Select 
            options={filteredAirports}
            valueKey="code" 
            titleKey="name"
            allTitle="All Airports"
            value={this.state.airportCodeFilter}
            onSelect={this.onFilterAirports} 
          />
          <button
            onClick={this.handleClear}
            disabled={!this.state.airlineIdFilter && !this.state.airportCodeFilter}
          >Clear Filters</button>
        </section>
        <section>
          <Table 
            page={this.state.page}
            perPage={25}
            className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={formatValue}
            onChangePage={this.handleChangePage}
          />
        </section>
      </div>
    );
  }
}

export default App;