import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Warning from "@material-ui/icons/Warning";
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Death from "./Death.js";
// eslint-disable-next-line no-unused-vars
import * as ChartistTooltips from 'chartist-plugin-tooltips';

import {
  vaccineChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const totalUSPopulation = 332410303

const vaccineUrl = 'https://cdc-vaccination-history.datasette.io/cdc.json?sql=select%20Date%2C%20Location%2C%20ShortName%2C%20LongName%2C%20Census2019%2C%20Doses_Distributed%2C%20Doses_Administered%20from%20daily_reports%20where%20Location%20%3D%20%27US%27'

export default function Dashboard() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [positiveData, setPositiveData] = useState(null);
  const [hospitalData, setHospitalData] = useState(null);
  const [vaccineData, setVaccineData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [percent, setPercent] = useState(0);
  const [increase, setIncrease] = useState(0);
  const [dailyIncrease, setDailyIncrease] = useState(null);

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

  function makeVaccineCalls() {
    return fetch(vaccineUrl)
        .then(responses => responses.json())
        .then(data => data)
        .catch((err) => console.log(err))
  }


  function makeDailyCall() {
    return fetch(`https://api.covidtracking.com/v1/us/current.json`)
        .then(responses => responses.json())
        .then(data => data)
        .catch((err) => console.log(err))
  }
  useEffect(() => {

    makeDailyCall()
        .then((resp) => {
          setDailyIncrease(resp[0])
        })
    // 0: "Date"
    // 1: "Location"
    // 2: "ShortName"
    // 3: "LongName"
    // 4: "Census2019"
    // 5: "Doses_Distributed"
    // 6: "Doses_Administered"
    // vaccine data
    makeVaccineCalls()
        .then((resp) => {
          const date = resp.rows.map(e => e[0])
          const vaccineDistributed = resp.rows.map(e => e[5])
          const vaccineAdministered = resp.rows.map(e => e[6])
          const adminLabel = vaccineAdministered.map(e => {
            return {
              "meta" : "Vaccine Administered",
              "value" : e
            }
          })
          const distributedLabel = vaccineDistributed.map(e => {
            return {
              "meta" : "Vaccine Distributed",
              "value" : e
            }
          })
          const currentUSVaccine = {
            labels: date.slice(30, date.length),
            series: [adminLabel.slice(30, date.length), distributedLabel.slice(30, date.length)]
          }
          const snapshotOfPeopleVaccinated = vaccineAdministered.slice(-1)[0]
          const snapshotIncreaseArr = vaccineAdministered.slice(Math.max(vaccineAdministered.length - 2, 1))
          setPieData({
            series: [totalUSPopulation, snapshotOfPeopleVaccinated]
          })
          setPercent((snapshotOfPeopleVaccinated * 1.0 / totalUSPopulation).toFixed(3) * 100);
          setIncrease((snapshotIncreaseArr[1] - snapshotIncreaseArr[0]))
          setVaccineData(currentUSVaccine)
        })



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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <p>Loading....</p>
  } else {
    return (
        <div>
          <GridContainer>
            <GridItem xs={8} sm={3} md={6}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                  {pieData && <ChartistGraph
                        className="ct-chart"
                        data={pieData}
                        type="Pie"
                    />}
                  </CardIcon>
                  <p className={classes.cardCategory}>Covid 19 Total Vaccine Population</p>
                  <h3 className={classes.cardTitle}>
                    {percent} <small>%</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Danger>
                      <Warning />
                    </Danger>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Data just loaded from CDC.
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={8} sm={3} md={3}>
              <Card>
                <CardHeader color="rose" stats icon>
                  <CardIcon color="rose">
                    <NewReleasesIcon />
                  </CardIcon>
                  <p className={classes.cardCategory}>Daily Positive Case Increase</p>
                  <h3 className={classes.cardTitle}>{dailyIncrease.positiveIncrease}</h3>
                  <p className={classes.cardCategory}>Daily Death Case Increase</p>
                  <h3 className={classes.cardTitle}>{dailyIncrease.deathIncrease}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <LocalOffer />
                    Tracked from API <a href='https://covidtracking.com/data/api'>https://covidtracking.com/data/api</a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={8} sm={3} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <LocalPharmacyIcon />
                  </CardIcon>
                  <p className={classes.cardCategory}>Daily Increase for COVID Vaccinated Population</p>
                  <h3 className={classes.cardTitle}>+{increase}</h3>
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
            <GridItem xs={12} sm={12} md={12}>
              <Card chart>
                <CardHeader color="info">
                  {vaccineData && <ChartistGraph
                      className="ct-chart"
                      data={vaccineData}
                      type="Bar"
                      options={vaccineChart.options}
                      responsiveOptions={vaccineChart.responsiveOptions}
                      listener={vaccineChart.animation}
                  />}
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Daily US Vaccine Population</h4>
                  <p className={classes.cardCategory}>The amount of vaccinate people in US. Hover on the lines and you'll see actual number</p>
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
                <CardHeader color="primary">
                {positiveData && <ChartistGraph
                      className="ct-chart"
                      data={positiveData}
                      type="Bar"
                      options={emailsSubscriptionChart.options}
                      responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                      listener={emailsSubscriptionChart.animation}
                  />}
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
                  {hospitalData &&<ChartistGraph
                      className="ct-chart"
                      data={hospitalData}
                      type="Line"
                      options={completedTasksChart.options}
                      listener={completedTasksChart.animation}
                  />}
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
