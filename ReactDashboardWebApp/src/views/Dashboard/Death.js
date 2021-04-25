import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core

import ChartistTooltip from "chartist-plugin-tooltips-updated";

import { useState, useEffect } from 'react';

var Chartist = require("chartist");
var delays = 80,
  durations = 500;

export default function Death() {

    var month = {
        "01":"January",
        "02":"February",
        "03": "March",
        "04":"April",
        "05":"May",
        "06":"June",
        "07":"July",
        "08":"August",
        "09":"September",
        "10":"October",
        "11":"November",
        "12":"December",
    };

const [content, setContent] = useState(null);

  useEffect(() => {
    fetch('https://api.covidtracking.com/v1/us/daily.json')
    .then(response =>response.json())
    .then(data => setContent(data.reverse()))
}, []);
  const labels=[];
  const cases=[[],[]];
  if(content!==null){
    content.forEach((d,index) => {
      if(d.date.toString().slice(-2)==="01"){
        const t=d.date.toString().slice(0,4)+" "+month[d.date.toString().slice(4,6)];   
      labels.push(t)
      cases[0].push(d.death)
      cases[1].push(d.positive)
    }
    });
  }
  const data={
    labels: labels,
    series: cases
  };

  if(content!==null){
    console.log(Math.max(...cases[1]),Math.min(...cases[1]))
  }
  
if(content!=null){
  const my_max=Math.max(...cases[1]);
  const my_min=Math.min(...cases[1]);
  var optionsB = {
    high: my_max,
    low: my_min,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return  value;
      }
    },
    plugins: [
      ChartistTooltip({
        appendToBody: true,
        valueTransform: function (value) {
            console.log(value)
            return (value / 1000) + 'k';
        }
      })
    ]
  };
  var animation= {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  };
};



  return (  
content!==null && 

      <ChartistGraph
        className="ct-chart"
        data={data}
        type="Line"
        options={optionsB}
        animation={animation}
        
      />

    );

}