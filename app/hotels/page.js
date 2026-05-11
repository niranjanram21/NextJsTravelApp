"use client";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import { Card, Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import dynamic from "next/dynamic";
const DatePicker = dynamic(() => import("react-datepicker").then((mod) => mod.default), {
  ssr: false,
});
import "react-datepicker/dist/react-datepicker.css";

export default function HotelsSearchPage() {
  const [state, setState] = useState({
    destination: "",
    adultCount: 1,
    checkInDate: null,
    checkOutDate: null,
    hotelData: [],
  });

  const handleChange = (key, value) => {
    setState((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleHotelSearch = async (e) => {
    e.preventDefault();

    try {
      const query = {
        destination: state.destination,
        adultCount: state.adultCount,
        checkInDate: state.checkInDate ? state.checkInDate.toISOString().split("T")[0] : null,
        checkOutDate: state.checkOutDate ? state.checkOutDate.toISOString().split("T")[0] : null,
      };

      const response = await fetch("/api/searchHotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      handleChange("hotelData", data.data || []);
      console.log(state.hotelData);
      console.log("Hotel data fetched from API: ", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="hero-container position-relative d-flex align-items-center justify-content-center">
        <Carousel className="w-100">
          <Carousel.Item>
            <div className="carousel-item-container">
              <Image
                src="/bgImg3.jpg"
                alt="Slide 1"
                fill
                className="object-fit-cover"
                priority
                loading="eager"
              />
              <div className="overlay"></div>
            </div>
            <div className="carousel-caption">
              <h1 className="montserrat-unique-class fs-1">Explore the World</h1>
              <h5 className="hind-madurai">Find your next adventure with us.</h5>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-container">
              <Image
                src="/bgImg4.jpg"
                alt="Slide 2"
                fill
                className="object-fit-cover"
                loading="eager"
              />
              <div className="overlay"></div>
            </div>
            <div className="carousel-caption">
              <h3 className="montserrat-unique-class fs-1">Plan Your Next Adventure</h3>
              <h5 className="hind-madurai">Let us help you create unforgettable memories.</h5>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-container">
              <Image
                src="/bgImg7.jpg"
                alt="Slide 3"
                fill
                className="object-fit-cover"
                loading="eager"
              />
              <div className="overlay"></div>
            </div>
            <div className="carousel-caption">
              <h3 className="montserrat-unique-class fs-1">Create Memories</h3>
              <h5 className="hind-madurai">Make every journey count with our expert services.</h5>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="p-3 card-inquiry-container">
        <Row className="justify-content-center">
          <Col sm={12} md={10}>
            <form onSubmit={handleHotelSearch}>
              <Card className="mb-3 shadow">
                <Card.Body className="py-4">
                  <Row className="g-3 align-items-center">
                    <Col xs={12} sm={6} md={6} lg={4}>
                      <label className="label-text mb-1 d-md-block d-sm-none">
                        Enter Destination*
                      </label>
                      <FloatingLabel controlId="floatingDestination" label="Eg. LHR">
                        <Form.Control
                          type="text"
                          placeholder="Enter a city"
                          onChange={(e) => handleChange("destination", e.target.value)}
                        />
                      </FloatingLabel>
                    </Col>

                    <Col xs={6} md={6} lg={2}>
                      <label className="label-text mb-1 d-md-block d-sm-none">Check-in</label>
                      <DatePicker
                        selected={state.checkInDate}
                        onChange={(date) => handleChange("checkInDate", date)}
                        placeholderText="Select Check-in Date"
                        dateFormat="dd/MM/yyyy"
                        className="form-control datepicker-input py-3"
                        calendarClassName="custom-datepicker-calendar"
                        minDate={new Date()}
                      />
                    </Col>

                    <Col xs={6} md={6} lg={2}>
                      <label className="label-text mb-1 d-md-block d-sm-none">Check-out</label>
                      <DatePicker
                        selected={state.checkOutDate}
                        onChange={(date) => handleChange("checkOutDate", date)}
                        placeholderText="Select Check-out Date"
                        dateFormat="dd/MM/yyyy"
                        className="form-control datepicker-input py-3"
                        minDate={state.checkInDate || new Date()}
                        calendarClassName="custom-datepicker-calendar"
                      />
                    </Col>

                    <Col xs={6} md={6} lg={2}>
                      <label className="label-text mb-1 d-md-block d-sm-none">No. of Adults*</label>
                      <FloatingLabel controlId="floatingSelect" label="select adult count">
                        <Form.Select
                          aria-label="Floating label select example"
                          onChange={(e) => handleChange("adultcount", Number(e.target.value))}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    <Col xs={12} sm={6} md={4} lg={3} className="text-center">
                      <button type="submit" className="search-hotel-button w-100 px-2 py-3 mt-4">
                        Search
                      </button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </form>
          </Col>
        </Row>
      </div>

      {state.hotelData.map((hotel) => (
        <div key={hotel.id}>
          <h3>{hotel.name}</h3>
        </div>
      ))}

      <style jsx>
        {`
          .carousel-caption {
            z-index: 1;
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: white;
          }
          .search-hotel-button {
            background-color: #e04b17;
            color: white;
            border-radius: 50px;
            border: none;
            font-weight: bold;
          }

          .search-hotel-button:hover {
            background-color: #f28465;
          }
        `}
      </style>
    </div>
  );
}
