import { useState, useEffect, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from './components/MapChart';
import './App.css';
import LocationCard from "./components/LocationCard";

function App() {
  const [content, setContent] = useState(null);
  const [state, setUSState] = useState(null);
  const [vender, setVender] = useState(null);

  useEffect(() => {
    fetch(`https://www.vaccinespotter.org/api/v0/states/${state}.json`)
      .then(response => response.json())
      .then(data => setVender({data}));
  }, [state]);

  return (
      <div>
          <div className="container">
              <Suspense fallback={<div>Fetching results...</div>}>
                  <Suspense fallback={<>Loading...</>}>
                      <h2 className="title">
                          Covid 19 Vaccine Providers
                      </h2>
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
                          <p>{content.provider_count} available providers count</p>
                          <p>{content.total_provider_count} available stores count</p>
                          <p>Available detailed information</p>
                          {content.provider_brands.map((brand, i) => {
                              return <li key={brand.id}><b>{brand.name}</b> store count: {brand.location_count} - <a href={brand.url}>Visit</a></li>;
                          })}
                      </>
                  )}
              </ReactTooltip>
          </div>
          {vender && <LocationCard vender={vender} />}
      </div>

  );
}

export default App;
