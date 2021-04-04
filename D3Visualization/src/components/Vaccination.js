import { useState, useEffect, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';
import '../App.css';
import { scaleQuantize } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation,
} from 'react-simple-maps';
import LocationCard from "./LocationCard";
import allStates from '../data/allstates.json';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';


function Vaccination() {
    // const [content, setContent] = useState(null);
    const [state, setUSState] = useState(null);
    // const [vender, setVender] = useState(null);
    // const handleMouseEnter = (geoId, name) => {
    //     const cur = allStates.find((s) => s.val === geoId);
    //     const stateData = state?.data.find((e) => e.state === cur.id)
    //     setTooltipContent({
    //         name: stateData?.actuals.cases,
    //         provider_count: stateData?.actuals.cases,
    //         total_provider_count: stateData?.actuals.cases,
    //         provider_brands: stateData?.actuals.cases
    //     });
    //     ReactTooltip.rebuild();
    // };

    const handleClick = (geoId) => {
        const cur = allStates.find((s) => s.val === geoId);
        setUSState(cur.id)
    }

    const offsets = {
        VT: [50, -8],
        NH: [34, 2],
        MA: [30, -1],
        RI: [28, 2],
        CT: [35, 10],
        NJ: [34, 1],
        DE: [33, 0],
        MD: [47, 10],
        DC: [49, 21],
    };

    useEffect(() => {
        fetch("https://api.covidactnow.org/v2/states.json?apiKey=63f652b7dabd4bdda544b20f5bdb60e7")
            .then(response => response.json())
            .then(data => setUSState({data}));
    }, []);
    console.log("-----",state)
    const colorScale = scaleQuantize()
    .domain([0, 1000000])
    .range([
        "#f9fbfd",
        "#dce7f3",
        "#b0cae5",
        "#92b6db",
        "#6699cc",
        "#578fc7",
        "#3e7cb9",
        "#2f5e8d",
        "#1b3752"
    ]);
    return (
        <ComposableMap data-tip="" projection="geoAlbersUsa">
           <Geographies geography={geoUrl}>
                {({ geographies }) => (
                    <>
                    
                        {geographies.map((geo) => {
                            const cur = allStates.find((s) => s.val === geo.id);
                            const stateData = state?.data.find((e) => e.state === cur.id)
                            return (
                                
                                <>
                                    <Geography
                                        key={geo.rsmKey}
                                        stroke="#FFF"
                                        geography={geo}
                                        fill="#DDD"
                                        style={{
                                            default: {
                                                fill: colorScale(stateData?.actuals.cases),
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: "#C53030",
                                                outline: 'none',
                                            }
                                        }}
                                        // onMouseEnter={() => handleMouseEnter(geo.id, geo.properties.name)}
                                        // onClick={() => handleClick(geo.id)}
                                        // onMouseLeave={() => setTooltipContent(null)}
                                    />
                                    <g key={geo.rsmKey + '-name'}>
                                        {cur &&
                                        geo.id[0] > -160 &&
                                        geo.id[0] < -67 &&
                                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                            <Marker coordinates={geo.id}>
                                                <text
                                                    textAnchor="left"
                                                    fill="#FFF"
                                                >
                                                    {cur.id}
                                                </text>
                                            </Marker>
                                        ) : (
                                            <Annotation
                                                subject={geo.id}
                                                dx={offsets[cur.id][0]}
                                                dy={offsets[cur.id][1]}
                                            >
                                                <text x={4} fontSize={14}>
                                                    {cur.id}
                                                </text>
                                            </Annotation>
                                        ))}
                                    </g>
                                </>
                            );
                        })} 
                    </>
                )} 
            </Geographies>
        </ComposableMap>
        
    );
}

export default Vaccination;
