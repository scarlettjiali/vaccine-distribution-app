import React from "react";

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Typography() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Covid 19 New Cases Prediction</Card.Title>
              </Card.Header>
              <Card.Body>

                <div className="typography-line">
                  <p>
                    <span>Data Source</span>The data that was used to perform this analysis was from 
                    <a href="https://github.com/GoogleCloudPlatform/covid-19-open-data"> COVID-19 Open-Data: curating a fine-grained, global-scale data repository for SARS-CoV-2. </a>
                    We conbined the 
                    <a href="https://storage.googleapis.com/covid19-open-data/v2/main.csv"> cases data </a>
                    and 
                    <a href="https://storage.googleapis.com/covid19-open-data/v2/vaccinations.csv"> vaccination data </a> 
                    for future prediction.
                  </p>
                </div>
                <div className="typography-line">
                  <p>
                    <span>Feature Selection</span>
                    Feature selection is quite important for us since the dataset we built 
                    has handreds features and will lead to overfitting if we directly 
                    use that. We chose seven features with the combination of the results from 
                    correlation matrix, Lasso regression and XGBoost. The seven features we finally choosed are: 
                    <b> new_tested, average_temperature, total_deceased, new_persons_fully_vaccinated, total_persons_fully_vaccinated, new_vaccine_doses_administered, population, new_confirmed</b>
                    <div className="alignImages">
                      <img src={require("assets/img/prediction/correlation.png").default} alt="..." /> 
                      <img src={require("assets/img/prediction/lasso.png").default} alt="..." />
                      <img src={require("assets/img/prediction/xgboost.png").default} alt="..."/>
                    </div>
                  </p>
                </div>
                <div className="typography-line">
                  <p>
                    <span>Prediction Model</span>We tested sevarl models in new cases prediction, such as Lasso, Ridge, Random forest and gradient boosted trees. 
                    From our evaluation we found random forest was able to produce the lowest error in its predictions. We tuned hyper parameters for max_depth, min_samples_leaf and n_estimators. 
                    And found a best set of parameters <b>'max_depth': 15, 'min_samples_leaf': 2, 'n_estimators': 200</b> with <b>R2 = 0.88</b>
                    <div className="singleImages">
                      <img src={require("assets/img/prediction/prediction.png").default} alt="..." width="800"/> 
                    </div>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Typography;
