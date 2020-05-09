import React, { Component } from 'react';

class Map extends Component {
  render() {
    const airportIndex = this.props.airportIndex;
    const routes = this.props.routes;

    return (
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
          
          {
            routes.map((route, idx) => {
              const src = airportIndex(route.src);
              const dest = airportIndex(route.dest);
              const [x1, y1] = [src.long, src.lat];
              const [x2, y2] = [dest.long, dest.lat];

              return (
                <g key={idx}>
                  <circle 
                    className="source"
                    cx={x1}
                    cy={y1}
                    data-code={src.code}
                    onClick={this.props.onMapClick}
                  >
                    <title>{src.code} - {src.name}</title>
                  </circle> 
                  <circle 
                    className="destination"
                    cx={x2}
                    cy={y2}
                    data-code={dest.code}
                    onClick={this.props.onMapClick}
                  >
                    <title>{dest.code} - {dest.name}</title>
                  </circle>
                  <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
                </g>
              )
            })
          }
          {/* end route */}
          
        </g>
      </svg>    
    )
  }
}

export default Map;