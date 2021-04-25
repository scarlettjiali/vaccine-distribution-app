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
<<<<<<< HEAD
import Death from "./Death.js";
=======

import * as ChartistTooltips from 'chartist-plugin-tooltips';

>>>>>>> 8a90d83d9fe4c6175dbc53a263da014e3ffc4de5
import { bugs, website, server } from "variables/general.js";

import {
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
<<<<<<< HEAD
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
      <Death/>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
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
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
=======

  const [loading, setLoading] = useState(true);
  const [positiveData, setPositiveData] = useState(null);
  const [hospitalData, setHospitalData] = useState(null);

  console.log(positiveData)

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

      const positiveCurrently = resp.map(e => {
        return {
          "meta" : "Total Positive Case",
          "value" : e.positive
        }
      }).reverse()

      const deathCurrently = resp.map(e => {
        return {
          "meta" : "Total Death Case",
          "value" : e.death
        }
      }).reverse()

      const positive = {
        labels: allMonths,
        series: [positiveCurrently, deathCurrently]
      }
      const hospitalize = {
        labels: allMonths,
        series: [hospitalCurrently, icuCurrently]
      }

      console.log(hospitalize)
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
                <CardHeader color="success">
                  <ChartistGraph
                      className="ct-chart"
                      data={positiveData}
                      type="Bar"
                      options={emailsSubscriptionChart.options}
                      responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                      listener={emailsSubscriptionChart.animation}
>>>>>>> 8a90d83d9fe4c6175dbc53a263da014e3ffc4de5
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Monthly COVID Positive Cases</h4>
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
                  <p className={classes.cardCategory}>Over the past year, for each month it represent the population of Hospitalize and population in ICU.</p>
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
