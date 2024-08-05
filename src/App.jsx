import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [value, setValue] = useState("");
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);
 


  const onSearch = (e) => {
    e.preventDefault();
    const currency = value.toUpperCase(); // Convert to uppercase to handle case sensitivity
    axios
      .get(`https://v6.exchangerate-api.com/v6/865702a432c241c4501222b5/latest/USD`)
      .then((response) => {
        const rates = response.data.conversion_rates;
        if (rates.hasOwnProperty(currency)) {
          setRate({ currency, value: rates[currency] });
          setError(null);
        } else {
          setError(`Currency '${currency}' not found.`);
          setRate(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setRate(null);
      });
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={onSearch}>
        <Form.Group controlId="currency">
          <Form.Label>Enter desired currency:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter currency code (e.g., USD, EUR)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Get Exchange Rate
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {rate !== null && (
        <Alert variant="success" className="mt-3">
          Exchange rate for {rate.currency}: {rate.value}
        </Alert>
      )}
    </div>
  );
}

export default App;
