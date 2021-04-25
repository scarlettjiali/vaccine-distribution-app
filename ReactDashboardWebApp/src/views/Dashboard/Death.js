import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import AccessTime from "@material-ui/icons/AccessTime";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import Death from "./Death.js";
import { bugs, website, server } from "variables/general.js";
// import React from "react";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import ChartistTooltip from "chartist-plugin-tooltips-updated";

import { useState, useEffect } from 'react';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// https://cdc-vaccination-history.datasette.io/cdc.json?sql=select%20Date%2C%20Location%2C%20ShortName%2C%20LongName%2C%20Census2019%2C%20Doses_Distributed%2C%20Doses_Administered%2C%20Dist_Per_100K%2C%20Admin_Per_100K%2C%20Administered_Dose1%2C%20Administered_Dose1_Per_100K%2C%20Administered_Dose2%2C%20Administered_Dose2_Per_100K%2C%20Administered_Dose1_Pop_Pct%2C%20Administered_Dose2_Pop_Pct%2C%20date_type%2C%20Recip_Administered%2C%20Administered_Dose1_Recip%2C%20Administered_Dose2_Recip%2C%20Administered_Dose1_Recip_18Plus%2C%20Administered_Dose2_Recip_18Plus%2C%20Administered_Dose1_Recip_18PlusPop_Pct%2C%20Administered_Dose2_Recip_18PlusPop_Pct%2C%20Census2019_18PlusPop%2C%20Distributed_Per_100k_18Plus%2C%20Administered_18Plus%2C%20Admin_Per_100k_18Plus%2C%20id%2C%20Administered_Moderna%2C%20Administered_Pfizer%2C%20Administered_Unk_Manuf%2C%20Administered_Janssen%2C%20Administered_Dose1_Recip_65Plus%2C%20Administered_Dose1_Recip_65PlusPop_Pct%2C%20Administered_65Plus%2C%20Admin_Per_100k_65Plus%2C%20Distributed_Moderna%2C%20Distributed_Pfizer%2C%20Distributed_Janssen%2C%20Distributed_Unk_Manuf%2C%20Series_Complete_Moderna%2C%20Series_Complete_Pfizer%2C%20Series_Complete_Janssen%2C%20Series_Complete_Unk_Manuf%2C%20Series_Complete_Moderna_18Plus%2C%20Series_Complete_Pfizer_18Plus%2C%20Series_Complete_Janssen_18Plus%2C%20Series_Complete_Unk_Manuf_18Plus%2C%20Series_Complete_Moderna_65Plus%2C%20Series_Complete_Pfizer_65Plus%2C%20Series_Complete_Janssen_65Plus%2C%20Series_Complete_Unk_Manuf_65Plus%2C%20Series_Complete_Yes%2C%20Series_Complete_Pop_Pct%2C%20Series_Complete_18Plus%2C%20Series_Complete_18PlusPop_Pct%2C%20Series_Complete_65Plus%2C%20Series_Complete_65PlusPop_Pct%2C%20Administered_Fed_LTC%2C%20Administered_Fed_LTC_Dose1%2C%20Administered_Fed_LTC_Dose2%2C%20Series_Complete_FedLTC%2C%20Distributed_Per_100k_65Plus%20from%20daily_reports%20order%20by%20id%20limit%20101
// const useStyles = makeStyles(styles);
var Chartist = require("chartist");
var delays = 80,
  durations = 500;
const useStyles = makeStyles(styles);

export default function Death() {
    const classes = useStyles();

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
      if(d.date.toString().slice(-2)=="01"){
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
<Card chart>
<CardHeader color="warning">

      <ChartistGraph
        className="ct-chart"
        data={data}
        type="Line"
        options={optionsB}
        animation={animation}
        
      />
</CardHeader>
<CardBody>
  <h4 className={classes.cardTitle}>Email Subscriptions</h4>
  <p className={classes.cardCategory}>Last Campaign Performance</p>
</CardBody>
<CardFooter chart>
  <div className={classes.stats}>
    <AccessTime /> campaign sent 2 days ago
  </div>
</CardFooter>
</Card>
    );

}