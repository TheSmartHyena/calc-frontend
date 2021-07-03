import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1 class="display-4">Simple calculator</h1>
          </Col>
        </Row>
        <Row>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Text>
                1+2-3*4/5
              </Card.Text>
              <Card.Text>
                  <Row>
                    <Col xs={9} ><Button variant="outline-secondary">C</Button>{' '}</Col>
                    <Col xs={3} ><Button variant="outline-secondary">/</Button>{' '}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}><Button variant="outline-secondary">7</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">8</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">9</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">X</Button>{' '}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}><Button variant="outline-secondary">4</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">5</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">6</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">-</Button>{' '}</Col>
                  </Row>
                  <Row>
                    <Col xs={3} ><Button variant="outline-secondary">1</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">2</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">3</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">+</Button>{' '}</Col>
                  </Row>
                  <Row>
                    <Col xs={6}><Button variant="outline-secondary">0</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">.</Button>{' '}</Col>
                    <Col xs={3}><Button variant="outline-secondary">=</Button>{' '}</Col>
                  </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>

    </div>
  );
}

export default App;
