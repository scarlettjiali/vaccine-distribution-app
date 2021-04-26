import React from "react";
import { useState, useEffect } from 'react';
import ChartistGraph from "react-chartist";
// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

// eslint-disable-next-line no-unused-vars
import * as ChartistTooltips from 'chartist-plugin-tooltips';

const totalUSPopulation = 332410303
const vaccineUrl = 'https://cdc-vaccination-history.datasette.io/cdc.json?sql=select%20Date%2C%20Location%2C%20ShortName%2C%20LongName%2C%20Census2019%2C%20Doses_Distributed%2C%20Doses_Administered%20from%20daily_reports%20where%20Location%20%3D%20%27US%27'

import {
  vaccineChart,
  lineCharts,
  positiveChart,
  pointCharts
} from "variables/charts";



function Dashboard() {
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

      const deathCurrently = resp.map(e => {
        return {
          "meta" : "Total Death Case",
          "value" : e.death
        }
      }).reverse()

      const positive = {
        labels: allMonths,
        series: [positiveCurrently, negativeCurrently, deathCurrently]
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
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="4" sm="3">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="8">
                    <div className="icon-big text-center icon-warning">
                      {pieData && <ChartistGraph
                          className="ct-chart"
                          data={pieData}
                          type="Pie"
                      />}
                    </div>
                  </Col>
                  <Col xs="3">
                    <div className="numbers">
                      <i className="nc-icon nc-chart-pie-36 text-danger"></i>
                      <p className="card-category">Covid 19 Total Vaccine Population</p>
                      <Card.Title as="h4">{percent} <small>%</small></Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Just Checked Today!
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-bulb-63 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Daily Positive Case Increase</p>
                      {dailyIncrease && <Card.Title as="h3">{dailyIncrease.positiveIncrease}</Card.Title>}
                      <p className="card-category">Daily Death Case Increase</p>
                      {dailyIncrease && <Card.Title as="h3">{dailyIncrease.deathIncrease}</Card.Title>}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="far fa-calendar-alt mr-1 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Daily Increase for COVID Vaccinated Population</p>
                      <Card.Title as="h3">+{increase}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Daily US Vaccine Population</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                      className="ct-chart"
                      data={vaccineData}
                      type="Bar"
                      options={vaccineChart.options}
                      responsiveOptions={vaccineChart.responsiveOptions}
                      listener={vaccineChart.animation}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Vaccine Distributed <i className="fas fa-circle text-danger"></i>
                  Vaccine Administrated
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Data loaded just now from -  <a href='https://covidtracking.com/data/api'>https://covidtracking.com/data/api</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Monthly COVID Positive/Negative Cases</Card.Title>
                <p className="card-category">Over the past year, for each month it represent the amount of positive & negative cases. Hover on the lines and you'll see actual numbe</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  {positiveData && <ChartistGraph
                      className="ct-chart"
                      data={positiveData}
                      type="Bar"
                      options={positiveChart.options}
                      responsiveOptions={positiveChart.responsiveOptions}
                      listener={positiveChart.animation}
                  />}
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Total Positive Case <i className="fas fa-circle text-danger"></i>
                  Total Negative Case  <i className="fas fa-circle text-warning"></i>
                  Total Death Case
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data loaded just now from -  <a href='https://covidtracking.com/data/api'>https://covidtracking.com/data/api</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Monthly Hospitalize/ICU/Ventilator Rate</Card.Title>
                <p className="card-category"> Over the past year, for each month it represent the population of Hospitalize and population in ICU & on Ventilator. Hover on the lines and you'll see actual number</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart">
                  {hospitalData &&<ChartistGraph
                      data={hospitalData}
                      type="Line"
                      options={pointCharts.options}
                      listener={pointCharts.animation}
                  />}
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Currently Hospitalized Case <i className="fas fa-circle text-danger"></i>
                  Currently In ICU Case  <i className="fas fa-circle text-warning"></i>
                  Currently On Ventilator Case
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data loaded just now from -  <a href='https://covidtracking.com/data/api'>https://covidtracking.com/data/api</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
