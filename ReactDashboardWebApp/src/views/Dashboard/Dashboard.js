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

import * as ChartistTooltips from 'chartist-plugin-tooltips';

import { bugs, website, server } from "variables/general.js";

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
      const positive = {
        labels: allMonths,
        series: [resp.map(e => e.positive), resp.map(e => e.death)]
      }
      const hospitalize = {
        labels: allMonths,
        series: [resp.map(e => {
          return {
            "meta" : "e.positive",
            "value" : e.hospitalizedCurrently
          }
        }),
          resp.map(e => {
            return {
              "meta" : "e.positive",
              "value" : e.inIcuCurrently
            }
          })
        ]
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
                <CardHeader color="success">
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
                          />
                      )
                    },
                    {
                      tabName: "Server",
                      tabIcon: Cloud,
                      tabContent: (
                          <Tasks
                              checkedIndexes={[1]}
                              tasksIndexes={[0, 1, 2]}
                              tasks={server}
                          />
                      )
                    }
                  ]}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                  <p className={classes.cardCategoryWhite}>
                    New employees on 15th September, 2016
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Name", "Salary", "Country"]}
                      tableData={[
                        ["1", "Dakota Rice", "$36,738", "Niger"],
                        ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                        ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                        ["4", "Philip Chaney", "$38,735", "Korea, South"]
                      ]}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
    );
  }
}
