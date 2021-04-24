import './App.css';
import Appointment from "./components/Appointment";
import Vaccination from "./components/Vaccination";
import Cases from "./components/Cases";
import { Tabs, Tab, Panel } from '@bumaga/tabs' 
function App() {
    
        fetch("https://api.covidactnow.org/v2/states.json?apiKey=63f652b7dabd4bdda544b20f5bdb60e7")
            .then(response => response.json())
            .then(data => console.log("a---",data));

    // console.log("-----",data)

    return (
        <Tabs>
            <div>
            <Tab><button>Appointment</button></Tab>
            <Tab><button>Vaccination</button></Tab>
            <Tab><button>Cases</button></Tab>
            </div>
            <Panel><p><Appointment/></p></Panel>
            <Panel><p><Vaccination/></p></Panel>
            <Panel><p><Cases/></p></Panel>
        </Tabs>
      );
}

export default App;
