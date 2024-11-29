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
    const [selectedDates, setSelectedDates] = useState([null, null]);
    const today = new Date(); // Set today's date as the minimum date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

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
                                priority={true}
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
                                priority={true}
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
                                priority={true}
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
                    <Col sm={9} md={10} lg={10}>
                        <Card className="mb-3 shadow">
                            <Card.Header className="text-start">Travel around the world!</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                        >
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                        >
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                        >
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                        >
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <div className="text-center">
                                            <button className="inquire-button px-4 py-2 rounded-">Inquire Now</button>
                                        </div>
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

                    .inquire-button {
                        background-color: #e04b17; /* Set the background color */
                        color: white; /* Set the text color */
                        border: none; /* Remove border, optional */
                        font-weight: bold;
                    }

                    .inquire-button:hover {
                        background-color: #f28465; /* Darker shade for hover effect */
                    }
            `}</style>
        </>
    );
}


{/* <div className="card position-absolute p-2">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="fs-6 fw-bold mb-1">Location</div>
                                    <input className="fs-6 fw-lighter form-control" type="text" placeholder="Where are you going?" />
                                </div>
                                <div className="col-md-4">
                                    <div className="fs-6 fw-bold mb-1">Check in - Check out</div>
                                    <div className="fs-6 fw-lighter">
                                        <DatePicker
                                            selected={selectedDates[0]}
                                            onChange={(dates) => setSelectedDates(dates)} // Set both start and end dates
                                            startDate={selectedDates[0]}
                                            endDate={selectedDates[1]}
                                            selectsRange
                                            placeholderText={`${today.toLocaleDateString()} - ${tomorrow.toLocaleDateString()}`}
                                            monthsShown={2} // Display two months side by side
                                            minDate={today} // Set today's date as the minimum date
                                            className="form-control border-none"
                                            isClearable={true} // Optional: To clear the dates
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="fs-6 fw-bold mb-1">No. of Pax</div>
                                    <input className="fs-6 fw-lighter form-control" type="text" placeholder="Enter number of pax" />
                                </div>
                                <div className="col-md-2 d-flex align-items-end">
                                    <button className="btn btn-primary w-100">Inquire</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
