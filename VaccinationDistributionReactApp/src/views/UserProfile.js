import React from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function User() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/sean.jpeg").default}
                    ></img>
                    <h5 className="title">Sean Dudley</h5>
                  </a>
                  <p className="description">sdudley6</p>
                </div>
                <p className="description text-center">
                Engineer | Python | Machine Learning | Robotics| Data Science| PyTorch | Scikit-learn | Spark | NumPy | Pandas
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="https://www.linkedin.com/in/sean-dudley-844310188/"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/hui.jpeg").default}
                    ></img>
                    <h5 className="title">Hui Xu</h5>
                  </a>
                  <p className="description">hxu435</p>
                </div>
                <p className="description text-center">
                Software Engineer:Python, AWS, React, SQL, Go, JavaScript, Web Development, Full Stack, Algorithms, Mobile Apps
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="https://www.linkedin.com/in/hui-xu-3a06a5b9/"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/roy.png").default}
                    ></img>
                    <h5 className="title">Zongyang Hu</h5>
                  </a>
                  <p className="description">zhu364</p>
                </div>
                <p className="description text-center">
                  Data Scientist
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="https://www.linkedin.com/in/zongyang-hu-data-science/"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/jiali.jpeg").default}
                    ></img>
                    <h5 className="title">Jiali Sun</h5>
                  </a>
                  <p className="description">jsun368</p>
                </div>
                <p className="description text-center">
                  Software Development Engineer
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="https://www.linkedin.com/in/jialisun/"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-linkedin"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
