import React from 'react';
import { useState } from 'react';
import '../App.css';

import Appointment from "./Appointment";
// import Select from '../components/Select';

import ReactSimpleOptionsSelector from "react-simple-options-selector"
function Maps() {
    const options=[{
        id: 'Appointments', 
        label: 'Appointments',
        selected: true,
    },
    {
        id: 'Vactinnations', 
        label: 'Vaccination',
        selected: false,
    },
    {
        id: 'Cases',
        label: 'Cases',
        selected: false,
    }
]
    const [type, setType] = useState("Appointments");
    

    return <>
   

    <ReactSimpleOptionsSelector 
    selected_text_color="#ffffff"
	selected_border_color="#f1f1f1"
	selected_background_color="#8A0078"
    options={options} onSelectionChange={(name, selected)=>{
    setType(selected[0])
    
} }/>
    <Appointment type={type}/></>
}

export default Maps;
