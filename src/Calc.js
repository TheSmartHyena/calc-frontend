import { Helmet } from "react-helmet";
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import axios from "axios";
import { useState } from "react";
import HistoryItem from "./HistoryItem";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Calc.css";
axios.defaults.headers.post["Content-Type"] = "application/json";
const apiUrl = window.location.href.includes("heroku") ? "https://red-loon-48470.herokuapp.com" : "http://localhost:8080";

const Calc = () => {

  const [currentCalc, setCurrentCalc] = useState("");
  const [previousCalc, setPreviousCalc] = useState("");
  const [historyItems, setHistoryItems] = useState([]);
  const [nextIsFirstEntry, setNextIsFirstEntry] = useState(0);

  const handleSend = async () => {
    // Avoid useless send to api
    if (currentCalc.includes('ERROR') > 0 || currentCalc === '') {
      resetChars();
      return;
    }

    try {
      const result = await axios.post(`${apiUrl}/calc`, {calculus: currentCalc});
      setPreviousCalc(`${currentCalc} = ${result.data.result}`);
      setCurrentCalc(result.data.result);

      const historyItemsCopy = [...historyItems];
      historyItemsCopy.unshift({calculus: currentCalc, result: result.data.result});
      setHistoryItems(historyItemsCopy);
      setNextIsFirstEntry(1);
    } catch (e) {
      setPreviousCalc(`${currentCalc} = Error`);
      setCurrentCalc("ERROR");
      if (e.response.data.statusCode === 422) {
        alert(`Error during calculus: ${e.response.data.message}`);
      } else {
        alert('An un-identified error happened.');
      }
    }
  };

  const addChar = (char) => {
    if (nextIsFirstEntry === 1 && char !== "+" && char !== "-" && char !== "*" && char !== "/") {
      setNextIsFirstEntry(0);
      setCurrentCalc(char);
    } else {
      setNextIsFirstEntry(0);
      setCurrentCalc(currentCalc + char);
    }    
  }

  const resetChars = () => {
    setPreviousCalc("");
    setCurrentCalc("");
  }

  const removeLastChar = () => {
    setCurrentCalc(currentCalc.slice(0, -1));
  }

  const handleClickHistory = (previous, current) => {
    setPreviousCalc(previous);
    setCurrentCalc(current);
    setNextIsFirstEntry(0);
  }

  return (
    <div className="Calc">
      <Helmet>
        <title>Calculator</title>
        <meta name="description" content="Calc application" />
      </Helmet>

      <Container>
        <Row>
          <Col>
            <h1 className="display-4 text-center" >Simple calculator</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={4}></Col>
          <Col lg={4}>
            <Card style={{ width: '18rem' }} centered="true">
              <Card.Body>
                <div className="inputs-body">
                  <Card.Text>
                    <Form.Control type="text" value={previousCalc} className="text-right" readOnly/>
                    <Form.Control type="text" value={currentCalc} className="text-right" readOnly/>
                  </Card.Text>
                </div>
                <div className="buttons-body">
                  <Card.Text>
                    <Row>
                      <Col xs={6} ><Button onClick={() => resetChars()} variant="outline-secondary">C</Button>{' '}</Col>
                      <Col xs={3} ><Button onClick={() => removeLastChar()} variant="outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/></svg></Button>{' '}</Col>
                      <Col xs={3} ><Button onClick={() => addChar("/")} variant="outline-secondary">/</Button>{' '}</Col>
                    </Row>
                    <Row>
                      <Col xs={3}><Button onClick={() => addChar("7")} variant="outline-secondary">7</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("8")} variant="outline-secondary">8</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("9")} variant="outline-secondary">9</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("*")} variant="outline-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></Button>{' '}</Col>
                    </Row>
                    <Row>
                      <Col xs={3}><Button onClick={() => addChar("4")} variant="outline-secondary">4</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("5")} variant="outline-secondary">5</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("6")} variant="outline-secondary">6</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("-")} variant="outline-secondary">-</Button>{' '}</Col>
                    </Row>
                    <Row>
                      <Col xs={3}><Button onClick={() => addChar("1")} variant="outline-secondary">1</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("2")} variant="outline-secondary">2</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("3")} variant="outline-secondary">3</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar("+")} variant="outline-secondary">+</Button>{' '}</Col>
                    </Row>
                    <Row>
                      <Col xs={6}><Button onClick={() => addChar("0")} variant="outline-secondary">0</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => addChar(".")} variant="outline-secondary">.</Button>{' '}</Col>
                      <Col xs={3}><Button onClick={() => handleSend()} variant="outline-secondary">=</Button>{' '}</Col>
                    </Row>                    
                  </Card.Text>     
                </div>            
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            {historyItems.map(historyItem => (
              <HistoryItem details={historyItem} onClickHistory={handleClickHistory} />
            ))}
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default Calc;
