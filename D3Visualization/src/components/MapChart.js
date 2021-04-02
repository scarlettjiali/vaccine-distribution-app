import { useEffect, useState, memo } from 'react';
import { geoCentroid } from 'd3-geo';
import { scaleQuantize } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import allStates from '../data/allstates.json';
import * as constants from '../constants';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};
const colorScale = scaleQuantize()
    .domain([100, 1000])
    .range([
        "#ffedea",
        "#ffcec5",
        "#ffad9f",
        "#ff8a75",
        "#ff5533",
        "#e2492d",
        "#be3d26",
        "#9a311f",
        "#782618"
    ]);

const MapChart = ({ setTooltipContent, setUSState }) => {
  const [loading, setLoading] = useState(true);
  const [vaccineData, setVaccineData] = useState(null);
  useEffect(() => {
    fetch('https://www.vaccinespotter.org/api/v0/states.json')
      .then(response => response.json())
      .then(data => setVaccineData({data}))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  const handleHover = (geoId, name) => {
    const cur = allStates.find((s) => s.val === geoId);
    const stateData = vaccineData.data.find((e) => e.code === cur.id)
    setTooltipContent({
      name: stateData.name,
      provider_count: stateData.provider_brand_count,
      total_provider_count: stateData.store_count,
      provider_brands: stateData.provider_brands
    });
    ReactTooltip.rebuild();
  };
    const handleClick = (geoId) => {
        const cur = allStates.find((s) => s.val === geoId);
        setUSState(cur.id) // TX, CA
    }
    const calculateColorScale = (geoId, name) => {
      const cur = allStates.find((s) => s.val === geoId);
      const stateData = vaccineData.data.find((e) => e.code === cur.id)
      return colorScale(stateData?.store_count || 0)
  }

  if (loading) {
      return <p>loading...</p>
  } else {
      return (
      <ComposableMap data-tip="" projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
              {({ geographies }) => (
                  <>
                      {geographies.map((geo) => (
                          <Geography
                              key={geo.rsmKey}
                              stroke="#FFF"
                              geography={geo}
                              style={{
                                  default: {
                                      fill: calculateColorScale(geo.id, geo.properties.name)
                                  },
                                  hover: {
                                      fill: constants.RED
                                  }
                              }}
                              onMouseEnter={() => handleHover(geo.id, geo.properties.name)}
                              onClick={() => handleClick(geo.id)}
                              onMouseLeave={() => setTooltipContent(null)}
                          />
                      ))}
                      {geographies.map((geo) => {
                          const centroid = geoCentroid(geo);
                          const cur = allStates.find((s) => s.val === geo.id);
                          return (
                              <g key={geo.rsmKey + '-name'}>
                                  {cur &&
                                  centroid[0] > -160 &&
                                  centroid[0] < -67 &&
                                  (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                      <Marker coordinates={centroid}>
                                          <text
                                              y="2"
                                              fontSize={14}
                                              textAnchor="left"
                                              fill="#FFF"
                                          >
                                              {cur.id}
                                          </text>
                                      </Marker>
                                  ) : (
                                      <Annotation
                                          subject={centroid}
                                          dx={offsets[cur.id][0]}
                                          dy={offsets[cur.id][1]}
                                      >
                                          <text>
                                            {cur.id}
                                          </text>
                                      </Annotation>
                                  ))}
                              </g>
                          );
                      })}
                  </>
              )}
          </Geographies>
      </ComposableMap>
    );
  }
};
export default memo(MapChart);
