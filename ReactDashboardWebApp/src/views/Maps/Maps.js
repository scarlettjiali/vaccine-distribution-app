import React from 'react';
import { useState, useEffect, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';
import '../App.css';
import LocationCard from "./LocationCard";


function Maps() {
    const [content, setContent] = useState(null);
    const [state, setUSState] = useState(null);
    const [vender, setVender] = useState(null);

    

    useEffect(() => {
        fetch(`https://www.vaccinespotter.org/api/v0/states/${state}.json`)
            .then(response => response.json())
            .then(data => setVender({data}));
    }, [state]);
    console.log(vender,state)
    return (
        <div className="container">
            <Suspense fallback={<div>Fetching results...</div>}>
                <Suspense fallback={<>Loading...</>}>
                </Suspense>
                <MapChart setTooltipContent={setContent} setUSState={setUSState} />
            </Suspense>
            <ReactTooltip
                className="tooltip"
                textColor="black"
                backgroundColor="white"
            >
                {content && (
                    <>
                        <h3>{content.name}</h3>
                        <p className="elect-total">{content.provider_count} available providers count</p>
                        <p className="elect-total">{content.total_provider_count} available stores count</p>
                        <p className="elect-total">Available detailed information</p>
                        {content.provider_brands.map((brand, i) => {
                            return <li key={brand.id}><b>{brand.name}</b> store count: {brand.location_count}</li>;
                        })}
                    </>
                )}
            </ReactTooltip>
            {vender && <LocationCard vender={vender} />}
        </div>
    );
}

export default Maps;
