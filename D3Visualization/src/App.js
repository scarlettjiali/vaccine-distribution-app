import { useState, useEffect, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';
import Title from './components/Title';
import MapChart from './components/MapChart';
import './App.css';

function App() {
  const [content, setContent] = useState(null);
  const [state, setUSState] = useState(null);
  const [vender, setVender] = useState(null);

  console.log(vender)

  useEffect(() => {
    fetch(`https://www.vaccinespotter.org/api/v0/states/${state}.json`)
      .then(response => response.json())
      .then(data => setVender({data}));
  }, [state]);

  return (
    <div className="container">
      <Suspense fallback={<div>Fetching results...</div>}>
        <Suspense fallback={<>Loading...</>}>
          <Title />
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
              return <li key={brand.id}><b>{brand.name}</b> store count: {brand.location_count} - <a href={brand.url}>Visit</a></li>;
            })}
          </>
        )}
      </ReactTooltip>
        {vender && vender?.data.features.slice(0, Math.min(vender?.data.features.length, 10)).map((store, i) => {
            return <div className='card'><b>{store.properties.name}</b>: {store.properties.address}, {store.properties.city} {store.properties.state}</div>
        })}
    </div>
  );
}

export default App;
