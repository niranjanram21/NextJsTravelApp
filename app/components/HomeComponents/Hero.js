'use client';

import { useState } from 'react';
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import DatePicker from 'react-datepicker'; // Import the DatePicker
import Image from 'next/image'; // Import Next.js Image component
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for DatePicker
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function Hero() {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    return (
        <>
            {/* Hero Carousel */}
            <div className="hero-container position-relative d-flex align-items-center justify-content-center">
                <Carousel className="w-100">
                    <Carousel.Item>
                        <div className="carousel-item-container">
                            <Image
                                src="/bgImg4.jpg"
                                alt="Slide 1"
                                fill // Modern replacement for layout="fill"
                                className="object-fit-cover"
                                priority
                                loading="eager"
                            />
                            <div className="overlay"></div>
                        </div>
                        <div className="carousel-caption">
                            <h3>Explore the World</h3>
                            <p>Find your next adventure with us.</p>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="carousel-item-container">
                            <Image
                                src="/bgImg3.jpg"
                                alt="Slide 2"
                                fill
                                className="object-fit-cover"
                                priority
                                loading="eager"
                            />
                            <div className="overlay"></div>
                        </div>
                        <div className="carousel-caption">
                            <h3>Plan Your Next Adventure</h3>
                            <p>Let us help you create unforgettable memories.</p>
                        </div>
                    </Carousel.Item>

                    <Carousel.Item>
                        <div className="carousel-item-container">
                            <Image
                                src="/bgImg4.jpg"
                                alt="Slide 3"
                                fill
                                className="object-fit-cover"
                                priority
                                loading="eager"
                            />
                            <div className="overlay"></div>
                        </div>
                        <div className="carousel-caption">
                            <h3>Create Memories</h3>
                            <p>Make every journey count with our expert services.</p>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* Card Section */}

            <div className="p-3 card-inquiry-container">
                <Row className="justify-content-center">
                    <Col sm={12} md={10}>
                        <Card className="mb-3 shadow">
                            <Card.Body className="py-4">
                                <Row className="g-3 align-items-center">
                                    {/* Search Destination */}
                                    <Col xs={12} sm={6} md={6} lg={3}>
                                        <label className="mb-1 d-md-block d-sm-none">Search Destination*</label>
                                        <FloatingLabel controlId="floatingDestination" label="Enter a Destination">
                                            <Form.Control type="text" placeholder="Destination" />
                                        </FloatingLabel>
                                    </Col>

                                    {/* Pax Number */}
                                    <Col xs={12} sm={6} md={6} lg={3}>
                                        <label className="mb-1 d-md-block d-sm-none">No. of Passengers*</label>
                                        <FloatingLabel controlId="floatingPax" label="Enter No. of Pax">
                                            <Form.Control type="number" placeholder="Number of Pax" />
                                        </FloatingLabel>
                                    </Col>

                                    {/* Check-in Date */}
                                    <Col xs={12} sm={6} md={4} lg={2}>
                                        <label className="mb-1 d-md-block d-sm-none">Check-in Date*</label>
                                        <FloatingLabel controlId="floatingCheckIn">
                                            <DatePicker
                                                selected={checkInDate}
                                                onChange={(date) => setCheckInDate(date)}
                                                placeholderText="Select Check-in Date"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control datepicker-input py-3"
                                                minDate={new Date()}
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    {/* Check-out Date */}
                                    <Col xs={12} sm={6} md={4} lg={2}>
                                        <label className="mb-1 d-md-block d-sm-none">Check-out Date</label>
                                        <FloatingLabel controlId="floatingCheckOut">
                                            <DatePicker
                                                selected={checkOutDate}
                                                onChange={(date) => setCheckOutDate(date)}
                                                placeholderText="Select Check-out Date"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control datepicker-input py-3"
                                                minDate={checkInDate || new Date()}
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    {/* Inquire Button */}
                                    <Col xs={12} sm={6} md={4} lg={2} className="text-center">
                                        <button className="inquire-button w-100 px-2 py-3 mt-4 rounded">Inquire</button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Styles */}
            <style jsx>{`
                .hero-container {
                    position: relative;
                    }
                    
                .carousel-item-container {
                    position: relative;
                    height: 75vh; /* Match the original height */
                    width: 100%;
                    }

                .object-fit-cover {
                    object-fit: cover;
                }
                
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
                    z-index: 1; /* Place overlay above the image */
                    }
                    
                    .carousel-caption {
                    z-index: 2; /* Place caption above the overlay */
                    }

                 .carousel-caption {
                    z-index: 1; /* Ensure the caption is above the overlay */
                    position: absolute;
                    top: 60%; /* Move to the middle vertically */
                    left: 50%; /* Center horizontally */
                    transform: translate(-50%, -50%); /* Adjust for true centering */
                    text-align: center; /* Center-align the text */
                    color: white; /* Ensure text is visible */
                    }
                    
                    .card-inquiry-container {
                        position: absolute;
                        z-index: 2; /* Correct z-index syntax */
                        bottom: 8rem; /* Positions the container 4rem from the bottom */
                        left: 50%; /* Centers the card horizontally */
                        transform: translateX(-50%); /* Adjusts for the card width to truly center it */
                        width: 90%; /* Ensures it takes up a responsive width */
                    }

                    @media only screen and (max-width: 560px) {
                        .card-inquiry-container {
                            font-size: 14px; 
                            top:5rem;
                        }
                    }

                    .inquire-button {
                        background-color: #e04b17; /* Set the background color */
                        color: white; /* Set the text color */
                        border: none; /* Remove border, optional */
                        font-weight: bold;
                    }

                    .inquire-button:hover {
                        background-color: #f28465; /* Darker shade for hover effect */
                    }

                      .datepicker-input {
                        height: calc(3.5rem + 2px); /* Match Bootstrap input height */
                        padding: 0.75rem 1rem; /* Match Bootstrap padding */
                        font-size: 1rem; /* Match Bootstrap font size */
                        line-height: 1.5;
                        border: 1px solid #ced4da; /* Match Bootstrap border */
                        border-radius: 0.375rem; /* Match Bootstrap rounded corners */
                        color: #495057; /* Bootstrap input text color */
                    }

                    .datepicker-input:focus {
                        border-color: #86b7fe; /* Match Bootstrap focus border color */
                        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25); /* Match Bootstrap focus shadow */
                    }

            `}</style>
        </>
    );
}
