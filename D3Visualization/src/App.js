import { useState, Suspense } from 'react';
import ReactTooltip from 'react-tooltip';
import Title from './components/Title';
import MapChart from './components/MapChart';
import './App.css';

function App() {
  const [content, setContent] = useState(null);

  return (
    <div className="container">
      <Suspense fallback={<div>Fetching results...</div>}>
        <Suspense fallback={<>Loading...</>}>
          <Title />
        </Suspense>
        <MapChart setTooltipContent={setContent} />
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
    </div>
  );
}

export default App;
