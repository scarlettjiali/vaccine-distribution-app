import React from 'react';
import { useState, useEffect, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';
import '../App.css';
import LocationCard from "./LocationCard";
import Mytooltip from "./Mytooltip"
import ReactSimpleOptionsSelector from "react-simple-options-selector"

function Appointment({type}) {
    
    console.log("----app",type)
    const [content, setContent] = useState(null);
    const [state, setUSState] = useState(null);
    const [vender, setVender] = useState(null);
    var api=""
    if (type=='Appointments'){
        api="https://www.vaccinespotter.org/api/v0/states.json"
    }
    if (type==='Cases' || type==='Vactinnations'){
        api="https://api.covidactnow.org/v2/states.json?apiKey=63f652b7dabd4bdda544b20f5bdb60e7"
    }

    useEffect(() => {
        fetch(`https://www.vaccinespotter.org/api/v0/states/${state}.json`)
            .then(response => response.json())
            .then(data => {
                setVender({data});
            });
    }, [state,type]);
    
    const [vaccineData, setVaccineData] = useState(null);
    
    useEffect(() => {
        console.log(api)
        fetch(api)
            .then(response => response.json())
            .then(data => {
                setVaccineData({data});
                
            }
                );
    }, [type]);
    

    return (
        <div className="container">
           
            <Suspense fallback={<div>Fetching results...</div>}>

                <MapChart setTooltipContent={setContent} setUSState={setUSState} data={vaccineData} type={type}/>
            </Suspense>
            <ReactTooltip
                className="tooltip"
                textColor="black"
                backgroundColor="white"
            >
                {content && (
                   <Mytooltip content={content} type={type}/>
                )}
            </ReactTooltip>
            {vender &&  <LocationCard vender={vender}/>}
        </div>
    );
}

export default Appointment;
