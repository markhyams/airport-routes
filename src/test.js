const { data } = require('./data');
const {getAirlineById, getAirportByCode, routes, airlines, airports} = data;

console.log(getAirlineById(24) === 'American Airlines');
console.log(getAirportByCode('SOF') === 'Sofia Airport');


// const airlinesIndex = ((allAirlines) => {
//   result = {};

//   allAirlines.forEach((airline) => {
//     result[airline.id] = airline.name;
//   });

//   return result;
// })(airlines)

// const airportsIndex = ((allAirports) => {
//   result = {};
//   allAirports.forEach((airport) => {
//     result[airport.code] = airport;
//   });
//   return result;
// })(airports);

