import { useEffect, memo } from 'react';
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
import React from 'react';

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
        "#b0b8d0",
        "#a79bd5",
        "#9880d1",
        "#8667c9",
        "#7250bc",
        "#5c3aac",
        "#442599",
        "#2a1285",
        "#000070"
    ]);

const MapChart = (props) => {
    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);
    const handleMouseEnter = (geoId, name) => {
        const cur = allStates.find((s) => s.val === geoId);
        let stateData;
        
        if(props.type==="Appointments" && props.data!==null){
            stateData = props.data.data.find((e) => e.code === cur.id)
            props.setTooltipContent({
                name: stateData.name,
                provider_count: stateData.provider_brand_count,
                total_provider_count: stateData.store_count,
                provider_brands: stateData.provider_brands
            });
           
          
            
        }else if (props.type==="Cases" && props.data!==null){   
            
            stateData = props.data?.data.find((e) => e.state === cur.id)
      
            props.setTooltipContent({
               name: cur.name,
               cases:stateData.actuals.cases,
               deaths:stateData.actuals.deaths,
               newCases:stateData.actuals.newCases,
               newDeaths:stateData.actuals.newDeaths,
               riskLevels:stateData.riskLevels.overall
            });
           
        }
        else if (props.type==="Vactinnations" && props.data!==null){
            stateData = props.data?.data.find((e) => e.state === cur.id)
            console.log("vacineation==---",stateData)
            props.setTooltipContent({
                name: cur.name,
                vaccinationsCompleted:stateData.actuals.vaccinationsCompleted,
                vaccinationsInitiated:stateData.actuals.vaccinationsInitiated,
                vaccinesAdministered:stateData.actuals.vaccinesAdministered,
                vaccinesDistributed:stateData.actuals.vaccinesDistributed,
            });
           
           

        }
        ReactTooltip.rebuild();
    };

    const handleClick = (geoId) => {
        const cur = allStates.find((s) => s.val === geoId);
        props.setUSState(cur.id)
    }
    console.log("last type====",props)
    console.log("scar;lllll====",props.data)

    return (props.data &&<ComposableMap data-tip="" projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
                {({ geographies }) => (
                    <>
                        {geographies.map((geo) => {
                            
                            const centroid = geoCentroid(geo);
                            let mapData;
                            const cur = allStates.find((s) => s.val === geo.id);
                            let scale=1000;
                            if(props.type==="Appointments"){
                                const stateData = props.data?.data.find((e) => e.code === cur.id)
                                mapData=stateData?.store_count
                                if(props.data!= null){
                                    scale=Math.max.apply(Math, props.data.data.map(function(o) { return o.store_count; }))
                                }
                                mapData=stateData?.store_count/scale*1000
                                
                            }else if (props.type==="Cases"){   
                                const stateData = props.data?.data.find((e) => e.state === cur.id)
                                mapData=stateData?.actuals.cases
                                scale=10000;      
                                if(props.data!= null && mapData!==undefined){
                                    scale=Math.max.apply(Math, props.data.data.map(function(o) { return o.actuals.cases??0; }))    
                                                      
                                }
                                mapData=stateData?.actuals.cases/scale*1000
                            }else if (props.type==="Vactinnations"){
                                const stateData = props.data?.data.find((e) => e.state === cur.id)
                                mapData=stateData?.actuals.vaccinationsCompleted
                                scale=10000;   
                                if(props.data!==null && mapData!==undefined){
                                    scale=Math.max.apply(Math, props.data.data.map(function(o) { 
                                        return o.actuals.vaccinationsCompleted; 
                                    }))                          
                                }
                                mapData=stateData?.actuals.vaccinationsCompleted/scale*1000

                            }else{
                                const stateData = props.data?.data.find((e) => e.code === cur.id)
                                mapData=stateData?.store_count
                                if(props.data!= null){
                                    scale=Math.max.apply(Math, props.data.data.map(function(o) { return o.store_count; }))
                                }
                                mapData=stateData?.store_count/scale*1000
                            }
                            
                     
                            return (
                                <>
                                    <Geography
                                        key={geo.rsmKey}
                                        stroke="#FFF"
                                        geography={geo}
                                        fill="#DDD"
                                        style={{
                                            default: {
                                                fill: colorScale(mapData|| 0),
                                                outline: 'none',
                                            },
                                            hover: {
                                                fill: "#C53030",
                                                outline: 'none',
                                            }
                                        }}
                                        onMouseEnter={() => handleMouseEnter(geo.id, geo.properties.name)}
                                        onClick={() => handleClick(geo.id)}
                                        onMouseLeave={() => props.setTooltipContent(null)}
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
