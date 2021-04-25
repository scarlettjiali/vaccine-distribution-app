import React from 'react';
import { useState, useEffect, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';
import '../App.css';
import LocationCard from "./LocationCard";




function Mytooltip({content,type}){
    if(type=="Appointments"){
        return <>
    <h3><b>{content.name}</b></h3>
    <p className="elect-total">{content.provider_count} available providers count</p>
    <p className="elect-total">{content.total_provider_count} available stores count</p>
    <p className="elect-total">Available detailed information</p>
    {content.provider_brands.map((brand, i) => {
        return <li key={brand.id}><b>{brand.name}</b> store count: {brand.location_count}</li>;
    })}
    </>

    }else if( type=="Cases"){
        return <>
                        <h3><b>{content.name}</b></h3>
                        <p className="elect-total">total cases: <b>{content.cases}</b></p>
                        <p className="elect-total">total death: <b>{content.deaths}</b></p>
                        <p className="elect-total">new Case: <b>{content.newCases}</b></p>
                        <p className="elect-total">new Deaths: <b>{content.newDeaths}</b></p>
                        <p className="elect-total">riskLevel: <b>{content.riskLevels}</b></p>
                    </>
    }else if( type=="Vactinnations"){
        return <>
    
                        <h3><b>{content.name}</b></h3>
                        <p className="elect-total">Vaccinations Completed: <b>{content.vaccinationsCompleted}</b></p>
                        <p className="elect-total">vaccinations Initiated: <b>{content.vaccinationsInitiated}</b></p>
                        <p className="elect-total">Vaccines Administered: <b>{content.vaccinesAdministered}</b></p>
                        <p className="elect-total">Vaccines Distributed: <b>{content.vaccinesDistributed}</b></p>
                    </>
    }
    return <></>
    
}

export default Mytooltip;