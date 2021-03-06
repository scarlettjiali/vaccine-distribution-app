import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import '../App.css';

// constants
const DISPLAY_LENGTH = 8
const COL_PER_ROW = 4

const Header = ({ vender }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [listOfAppointments, setListOfAppointments] = useState([])
    const dataWithAppointments = vender?.data?.features.filter((v) => v.properties.appointments !== null && v.properties.appointments?.length !== 0)
    const sliceData = dataWithAppointments.slice(0, Math.min(vender?.data.features.length, DISPLAY_LENGTH))
    const rows = [...Array(Math.ceil(sliceData.length / COL_PER_ROW))];
    const storeRows = rows.map((row, idx) => sliceData.slice(idx * COL_PER_ROW, idx * COL_PER_ROW + COL_PER_ROW));
    const onClose = () => {
        setIsOpen(false)
    }
    const onOpen = (e) => {
        setListOfAppointments(e)
        setIsOpen(true)
    }
    const convertBoolean = (b) => {
        return (b === true) ? 'Yes' : 'No'
    }
    return (
        <div>
            {storeRows.map((stores, idx) => (
                <div className="row" key={idx}>
                    {stores.map(s =>
                    // { console.log("sto---",s)
                    <div key={s.properties.address} className="column">
                        <div className="vaccineMap">
                                <b>{s.properties.name}</b>
                                {s.properties.address},
                                {s.properties.city}
                                {s.properties.state}
                                <br /><button type="button" onClick={() => onOpen(s)}>Info</button>
                        </div>
                    </div>
                )}
                </div>)
            )}
            <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                className="mymodal">
                <h4><b>Available Vaccine</b></h4>
                <h6><b>Appointment Available:</b> {convertBoolean(listOfAppointments.properties?.appointments_available)}</h6>
                <h6><b>Appointment Second Dose Only:</b> {convertBoolean(listOfAppointments.properties?.appointments_available_2nd_dose_only)}</h6>
                <h6><b>Appointment All Dose: </b>{convertBoolean(listOfAppointments.properties?.appointments_available_all_doses)}</h6>
                <ul>
                    {listOfAppointments.properties?.appointments.map((appointment, i) => {
                        return <p key={i}>{appointment.type} available at {appointment.time}. <a href={listOfAppointments.properties?.url|| '#'}>Visit website</a></p>
                    })}
                </ul>
                {/* <LocalVaccineMap storeData={sliceData} currentState={vender} /> */}
                <button type="button" variant="info" onClick={onClose}>close</button>
            </Modal>
        </div>
    );
};

export default Header;
