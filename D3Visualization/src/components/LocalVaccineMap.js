import React from "react";
import {
    Annotation,
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { geoCentroid } from 'd3-geo';
import allStates from "../data/allstates.json";


// reference: https://www.react-simple-maps.io/examples/basic-markers/
const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const LocalVaccineMap = ({ storeData }) => {
    const markers = storeData.map((store, i) => {
        return {
            markerOffset: 10,
            name: store.properties?.name,
            coordinates: [store.geometry.coordinates[0], store.geometry.coordinates[1]]
        }
    })

    return (
        <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{
                rotate: [29.787526826515943, -18.900130105681132, 0]
            }}
        >
            <Geographies geography={geoUrl}>
                {({ geographies }) => (
                    <>
                        {geographies.map((geo) => {
                            const centroid = geoCentroid(geo);
                            console.log(centroid)
                            console.log(geo)
                            return (
                                <>
                                    <Geography
                                        key={geo.rsmKey}
                                        stroke="#FFF"
                                        geography={geo}
                                        fill="#DDD"
                                        style={{
                                            default: {
                                                fill: "#EAEAEC",
                                                outline: 'none',
                                            }
                                        }}
                                    />
                                </>
                            );
                        })}
                    </>
                )}
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
                <Marker key={name} coordinates={coordinates}>
                    <circle r={3} fill="#F00" stroke="#fff" strokeWidth={2} />
                    <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "system-ui", fontSize: "8px", fill: "#5D5A6D" }}
                    >
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
};

export default LocalVaccineMap;
