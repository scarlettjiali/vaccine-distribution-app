import './App.css';
import Appointment from "./components/Appointment";
import Vaccination from "./components/Vaccination";
import Cases from "./components/Cases";
import { Tabs, Tab, Panel } from '@bumaga/tabs' 
function App() {
    
        fetch("https://api.covidactnow.org/v2/states.json?apiKey=63f652b7dabd4bdda544b20f5bdb60e7")
            .then(response => response.json())
            .then(data => console.log("a---",data));

    console.log("-----")
    console.log("-----")
    return (
        <Tabs>
            <div>
            <Tab key={1}><button>Appointment</button></Tab>
            <Tab key={2}><button>Vaccination</button></Tab>
            <Tab key={3}><button>Cases</button></Tab>
            </div>
            <Panel key={1}><Appointment/></Panel>
            <Panel key={2}><Vaccination/></Panel>
            <Panel key={3}><Cases/></Panel>
        </Tabs>
      );
}

export default App;
