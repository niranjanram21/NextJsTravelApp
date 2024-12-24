'use client';

import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import dynamic from 'next/dynamic';
const DatePicker = dynamic(() => import('react-datepicker').then((mod) => mod.default), { ssr: false });
import 'react-datepicker/dist/react-datepicker.css';

export default function Hero() {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    return (
        <div className="poppins-medium">
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
                                priority
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
                                priority
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
                        <Card className="mb-3 shadow">
                            <Card.Body className="py-4">
                                <Row className="g-3 align-items-center">
                                    <Col xs={12} sm={6} md={6} lg={3}>
                                        <label className="mb-1 d-md-block d-sm-none">Search Destination*</label>
                                        <FloatingLabel controlId="floatingDestination" label="Enter a Destination" >
                                            <Form.Control type="text" placeholder="Destination" />
                                        </FloatingLabel>
                                    </Col>

                                    <Col xs={12} sm={6} md={6} lg={3}>
                                        <label className="mb-1 d-md-block d-sm-none">No. of Passengers*</label>
                                        <FloatingLabel controlId="floatingPax" label="Enter No. of Pax">
                                            <Form.Control type="number" placeholder="Number of Pax" />
                                        </FloatingLabel>
                                    </Col>

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
                                                calendarClassName="custom-datepicker-calendar"
                                            />
                                        </FloatingLabel>
                                    </Col>

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
                                                calendarClassName="custom-datepicker-calendar"
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    <Col xs={12} sm={6} md={4} lg={2} className="text-center">
                                        <button className="inquire-button w-100 px-2 py-3 mt-4">Inquire</button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            <style jsx>{`
                .hero-container {
                    position: relative;
                }

                .carousel-item-container {
                    position: relative;
                    height: 120vh;
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
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1;
                }

                .carousel-caption {
                    z-index: 1;
                    position: absolute;
                    top: 60%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: white;
                }

                .card-inquiry-container {
                    position: absolute;
                    z-index: 2;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 90%;
                    opacity: 0.9;
                }

                .inquire-button {
                    background-color: #e04b17;
                    color: white;
                    border-radius: 50px;
                    border: none;
                    font-weight: bold;
                }

                .inquire-button:hover {
                    background-color: #f28465;
                }

                .form-floating > .form-control, 
                .form-floating > .form-control-plaintext {
                    padding: 1rem 0.75rem;
                    border-radius: 50px !important;
                }

            `}</style>
        </div>
    );
}
