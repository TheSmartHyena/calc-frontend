import React from "react";
import { Card } from 'react-bootstrap';

const HistoryItem = ({ details, onClickHistory }) => (
  <Card style={{ width: '18rem' }} className="history-card" onClick={() => onClickHistory(details.calculus, details.result)}>
    <Card.Body>
      <Card.Subtitle className="mb-2 text-muted text-right">{details.calculus}</Card.Subtitle>
      <Card.Text className="text-right">{details.result}</Card.Text>
    </Card.Body>
  </Card>
);

export default HistoryItem;