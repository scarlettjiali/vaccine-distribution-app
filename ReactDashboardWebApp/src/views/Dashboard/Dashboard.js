import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Death from "./Death.js";
import { bugs, website, server } from "variables/general.js";

import * as ChartistTooltips from 'chartist-plugin-tooltips';

import {
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [positiveData, setPositiveData] = useState(null);
  const [hospitalData, setHospitalData] = useState(null);

  const allMonths = ["20 Apr", "20 May", "20 Jun", "20 Jul", "20 Aug", "20 Sep", "20 Oct", "20 Nov", "20 Dec", "21 Jan", "21 Feb", "21 Mar"]
  const addZ = (n) => { return n < 10 ? '0' + n : '' + n; }
  const addZMonth = (n) => ("0" + (n.getMonth() + 1)).slice(-2)
//
  function makeCalls() {
    const months = Array.from({length: 12}, (_, i) => {
      const current = new Date()
      current.setMonth(current.getMonth() - i - 1)
      const formattedDate = `${current.getFullYear()}${addZMonth(current)}${addZ(1)}`
      return fetch(`https://api.covidtracking.com/v1/us/${formattedDate}.json`)
    })
    return Promise.all(months)
        .then(responses => Promise.all(responses.map(url => url.json())))
        .then(data => data)
  }

  useEffect(() => {
    makeCalls().then((resp) => {
      const hospitalCurrently = resp.map(e => {
        return {
          "meta" : "Hospitalized",
          "value" : e.hospitalizedCurrently
        }
      }).reverse()
      const icuCurrently = resp.map(e => {
        return {
          "meta" : "ICU Population",
          "value" : e.inIcuCurrently
        }
      }).reverse()

      const ventilatorCurrently = resp.map(e => {
        return {
          "meta" : "Ventilator Population",
          "value" : e.onVentilatorCurrently
        }
      }).reverse()

      const positiveCurrently = resp.map(e => {
        return {
          "meta" : "Total Positive Case",
          "value" : e.positive
        }
      }).reverse()

      const negativeCurrently = resp.map(e => {
        return {
          "meta" : "Total Negative Case",
          "value" : e.negative
        }
      }).reverse()

      const positive = {
        labels: allMonths,
        series: [positiveCurrently, negativeCurrently]
      }
      const hospitalize = {
        labels: allMonths,
        series: [hospitalCurrently, icuCurrently, ventilatorCurrently]
      }
      setPositiveData(positive)
      setHospitalData(hospitalize)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <p>Loading....</p>
  } else {
    return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card chart>
                <CardHeader color="primary">
                  <ChartistGraph
                      className="ct-chart"
                      data={positiveData}
                      type="Bar"
                      options={emailsSubscriptionChart.options}
                      responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                      listener={emailsSubscriptionChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Monthly COVID Positive/Negative Cases</h4>
                  <p className={classes.cardCategory}>Over the past year, for each month it represent the amount of positive & negative cases. Hover on the lines and you'll see actual number</p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> Data loaded just now from -  <a href='https://covidtracking.com/data/api'>https://covidtracking.com/data/api</a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card chart>
                <CardHeader color="success">
                  <Death/>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Monthly COVID Positive Cases and Death line chart</h4>
                  <p className={classes.cardCategory}>Over the past year, for each month it represent the amount of positive cases</p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> Data loaded just now from -  <a href='https://covidtracking.com/data/api'>https://covidtracking.com/data/api</a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <Card chart>
                <CardHeader color="info">
                  <ChartistGraph
                      className="ct-chart"
                      data={hospitalData}
                      type="Line"
                      options={completedTasksChart.options}
                      listener={completedTasksChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Monthly Hospitalize/ICU Rate</h4>
                  <p className={classes.cardCategory}>Over the past year, for each month it represent the population of Hospitalize and population in ICU & on Ventilator. Hover on the lines and you'll see actual number</p>
                </CardBody>
                <CardFooter chart>
                  <div className={classes.stats}>
                    <AccessTime /> Data loaded just now from -  <a href='https://covidtracking.com/data/api'>https://covidtracking.com/data/api</a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}
