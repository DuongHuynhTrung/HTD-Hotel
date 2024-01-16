/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useState } from "react";
import { getAvailableRooms } from "../utils/ApiFunctions";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomSearchResult from "./RoomSearchResult";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const checkInDate = moment(searchQuery.checkInDate);
    const checkOutDate = moment(searchQuery.checkOutDate);
    if (!checkInDate.isValid() || !checkOutDate.isValid()) {
      setErrorMessage("Please enter valid date range");
      return;
    }
    if (!checkOutDate.isSameOrAfter(checkInDate)) {
      setErrorMessage("Check-In Date must come before Check-Out Date");
      return;
    }
    setIsLoading(true);
    await getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRooms(response);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    const checkInDate = moment(searchQuery.checkInDate);
    const checkOutDate = moment(searchQuery.checkOutDate);
    if (checkInDate.isValid() && checkOutDate.isValid()) {
      setErrorMessage("");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([]);
  };

  return (
    <>
      <Container className="mt-5 mb-5 py-5 shadow">
        <Form onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <Form.Group controlId="checkInDate">
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group controlId="checkOutDate">
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOutDate"
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group controlId="roomType">
                <Form.Label>Room Type</Form.Label>
                <div className="d-flex">
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    newRoom={searchQuery}
                  />
                  <Button variant="secondary" type="submit" className="ml-2">
                    Search
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {isLoading ? (
          <p className="mt-4">Find Available rooms .....</p>
        ) : availableRooms ? (
          <RoomSearchResult
            results={availableRooms}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <p className="mt-4">
            No rooms available for the selected dates and type
          </p>
        )}
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
      </Container>
    </>
  );
};

export default RoomSearch;
