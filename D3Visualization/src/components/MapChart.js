import { useEffect, useState, memo } from 'react';
import { geoCentroid } from 'd3-geo';
import { scaleQuantize } from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation,
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import allStates from '../data/allstates.json';


// reference: https://www.react-simple-maps.io/examples/usa-counties-choropleth-quantize/
// reference: https://www.react-simple-maps.io/examples/usa-with-state-labels/
const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

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

const colorScale = scaleQuantize()
    .domain([0, 1000])
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

const MapChart = ({ setTooltipContent, setUSState }) => {
    const [vaccineData, setVaccineData] = useState(null);
    useEffect(() => {
        fetch('https://www.vaccinespotter.org/api/v0/states.json')
            .then(response => response.json())
            .then(data => setVaccineData({data}));
    }, [])

    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

    const handleMouseEnter = (geoId, name) => {
        const cur = allStates.find((s) => s.val === geoId);
        const stateData = vaccineData.data.find((e) => e.code === cur.id)
        setTooltipContent({
            name: stateData.name,
            provider_count: stateData.provider_brand_count,
            total_provider_count: stateData.store_count,
            provider_brands: stateData.provider_brands
        });
        ReactTooltip.rebuild();
    };

    const handleClick = (geoId) => {
        const cur = allStates.find((s) => s.val === geoId);
        setUSState(cur.id)
    }

    return (
        <ComposableMap data-tip="" projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
                {({ geographies }) => (
                    <>
                        {geographies.map((geo) => {
                            
                            const centroid = geoCentroid(geo);
                            console.log("___++",centroid)
                            const cur = allStates.find((s) => s.val === geo.id);
                            const stateData = vaccineData?.data.find((e) => e.code === cur.id)
                            return (
                                <>
                                    <Geography
                                        key={geo.rsmKey}
                                        stroke="#FFF"
                                        geography={geo}
                                        fill="#DDD"
                                        style={{
                                            default: {
                                                fill: colorScale(stateData?.store_count || 0),
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: "#C53030",
                                                outline: 'none',
                                            }
                                        }}
                                        onMouseEnter={() => handleMouseEnter(geo.id, geo.properties.name)}
                                        onClick={() => handleClick(geo.id)}
                                        onMouseLeave={() => setTooltipContent(null)}
                                    />
                                    <g key={geo.rsmKey + '-name'}>
                                        {cur &&
                                        centroid[0] > -160 &&
                                        centroid[0] < -67 &&
                                        (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                            <Marker coordinates={centroid}>
                                                <text
                                                    textAnchor="left"
                                                    fill="#FFF"
                                                >
                                                    {cur.id}
                                                </text>
                                            </Marker>
                                        ) : (
                                            <Annotation
                                                subject={centroid}
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
};
export default memo(MapChart);
