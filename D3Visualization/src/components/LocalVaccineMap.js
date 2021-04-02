// reference: https://codesandbox.io/s/v653jj6oz3?file=/src/index.js

import React, { useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from "react-simple-maps";
import { geoPath } from "d3-geo";
import { geoTimes } from "d3-geo-projection";

// const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const LocalVaccineMap = ({ storeData }) => {
    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 0]);

    const markers = storeData.map((store, i) => {
        return {
            markerOffset: 0,
            name: store.properties?.name,
            coordinates: [store.geometry.coordinates[0], store.geometry.coordinates[1]]
        }
    })

    const projection = () => {
        return geoTimes()
            .translate([800 / 2, 450 / 2])
            .scale(160);
    };

    const handleGeographyClick = (geography, event) => {
        const path = geoPath().projection(projection());
        const centroid = projection().invert(path.centroid(geography));
        setCenter(centroid);
        setZoom(4);
    };

    return (
        <>
            <ComposableMap projection="geoAlbersUsa">
                <ZoomableGroup center={center} zoom={zoom}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography key={geo.rsmKey} geography={geo} fill="#EEE" onClick={() => handleGeographyClick(geo, this)} />
                            ))
                        }
                    </Geographies>
                    {markers.map(({ name, coordinates, markerOffset }) => (
                        <Marker key={coordinates[0]} coordinates={coordinates}>
                            <circle r={3} fill="#F00" stroke="#fff" strokeWidth={0.5} />
                            <text
                                textAnchor="middle"
                                y={markerOffset}
                                style={{ fontFamily: "system-ui", fontSize: "5px", fill: "#5D5A6D" }}
                            >
                                {name}
                            </text>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

export default LocalVaccineMap;
