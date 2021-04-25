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
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
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
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
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
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
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
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
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
