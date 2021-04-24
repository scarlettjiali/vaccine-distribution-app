import { useState, useEffect, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';
import '../App.css';
import LocationCard from "./LocationCard";



function Cases() {
    const [content, setContent] = useState(null);
    const [state, setUSState] = useState(null);
    // const [vender, setVender] = useState(null);
    // useEffect(() => {
    //     fetch(`https://www.vaccinespotter.org/api/v0/states/${state}.json`)
    //         .then(response => response.json())
    //         .then(data => setVender({data}));
    // }, [state]);
    console.log("mousre---",content)
    const type="case";
    const [Data, setData] = useState(null);
    useEffect(() => {
        fetch('https://api.covidactnow.org/v2/states.json?apiKey=63f652b7dabd4bdda544b20f5bdb60e7')
            .then(response => response.json())
            .then(data => setData({data}));
    }, [])
    return (
        <div className="container">
            <Suspense fallback={<div>Fetching results...</div>}>
                <Suspense fallback={<>Loading...</>}>
                    <h1>Covid 19 Vaccine Tracker</h1>
                </Suspense>
                <MapChart setTooltipContent={setContent} setUSState={setUSState} data={Data} case={type}/>
            </Suspense>
            <ReactTooltip
                className="tooltip"
                textColor="black"
                backgroundColor="white"
            >
                {content && (
                    <>
                        <h3>{content.name}</h3>
                        <p className="elect-total">total cases: <b>{content.cases}</b></p>
                        <p className="elect-total">total death: <b>{content.deaths}</b></p>
                        <p className="elect-total">new Case: <b>{content.newCases}</b></p>
                        <p className="elect-total">new Deaths: <b>{content.newDeaths}</b></p>
                        <p className="elect-total">riskLevel: <b>{content.riskLevels}</b></p>
                    </>
                )}
            </ReactTooltip>
            {/* {vender && <LocationCard vender={vender} />} */}
        </div>
    );
    
}

export default Cases;
