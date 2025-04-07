'use client';

import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import dynamic from 'next/dynamic';
const DatePicker = dynamic(() => import('react-datepicker').then((mod) => mod.default), { ssr: false });
import 'react-datepicker/dist/react-datepicker.css';

export default function Hero() {

    const [state, setState] = useState({
        location: "",
        destination: "",
        adultCount: 1,
        childCount: 0,
        infantCount: 0,
        travelClass: 'ECONOMY',
        checkInDate: null,
        checkOutDate: null,
        flightData: [],
        numberOfFlights: 10,
        show: false,
        selectedFlight: null
    });
    
    const handleChange = (key, value) => {
        setState(prevState => ({ ...prevState, [key]: value }));
    };
    
    const handleSubmitInquiry = async (e) => {
        e.preventDefault();
    
        try {
            const query = {
                location: state.location,
                destination: state.destination,
                adultCount: state.adultCount,
                childCount: state.childCount,
                infantCount: state.infantCount,
                travelClass: state.travelClass,
                checkInDate: state.checkInDate ? state.checkInDate.toISOString().split('T')[0] : null,
                checkOutDate: state.checkOutDate ? state.checkOutDate.toISOString().split('T')[0] : null,
            };
    
            const response = await fetch('/api/searchFlights', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(query),
            });
    
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
    
            const data = await response.json();
            handleChange("flightData", data || []);
            console.log("Flight data fetched from API: ", data);
    
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {
        console.log("Updated flightData:", state.flightData);
    }, [state.flightData]);
    
    const flightDataToDisplay = state.flightData.slice(0, state.numberOfFlights);
    
    const handleLoadMore = () => {
        handleChange("numberOfFlights", state.numberOfFlights + 10);
    };
    
    const handleClose = () => handleChange("show", false);
    const handleShow = (flight) => {
        handleChange("selectedFlight", flight);
        handleChange("show", true);
    };
    
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
                        <form onSubmit={handleSubmitInquiry}>
                            <Card className="mb-3 shadow">
                                <Card.Body className="py-4">
                                    <Row className="g-3 align-items-center">
                                        <Col xs={12} sm={6} md={6} lg={4}>
                                            <label className="label-text mb-1 d-md-block d-sm-none">Enter current location*</label>
                                            <FloatingLabel controlId="floatingDestination" label="Eg. DXB" >
                                                <Form.Control type="text" placeholder="Enter a city"
                                                    onChange={(e) => handleChange("location", e.target.value)} />
                                            </FloatingLabel>
                                        </Col>

                                        <Col xs={12} sm={6} md={6} lg={4}>
                                            <label className="label-text mb-1 d-md-block d-sm-none">Enter Destination*</label>
                                            <FloatingLabel controlId="floatingDestination" label="Eg. LHR" >
                                                <Form.Control type="text" placeholder="Enter a city"
                                                    onChange={(e) => handleChange("destination", e.target.value)} />
                                            </FloatingLabel>
                                        </Col>

                                        <Col xs={6} md={6} lg={2}>
                                            <label className="label-text mb-1 d-md-block d-sm-none">Check-in Date*</label>
                                            <DatePicker
                                                selected={state.checkInDate}
                                                onChange={(date) => handleChange("checkInDate",date)}
                                                placeholderText="Select Check-in Date"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control datepicker-input py-3"
                                                calendarClassName="custom-datepicker-calendar"
                                                minDate={new Date()}
                                            />
                                        </Col>

                                        <Col xs={6} md={6} lg={2}>
                                            <label className="label-text mb-1 d-md-block d-sm-none">Check-out Date*</label>
                                            <DatePicker
                                                selected={state.checkOutDate}
                                                onChange={(date) => handleChange("checkOutDate",date)}
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
                                                <Form.Select aria-label="Floating label select example"
                                                    onChange={(e) => handleChange("adultcount",Number(e.target.value))} >
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
                                        <Col xs={6} md={6} lg={2}>
                                            <label className="label-text mb-1 d-md-block d-sm-none">No. of Children*</label>
                                            <FloatingLabel controlId="floatingSelect" label="select child count">
                                                <Form.Select aria-label="Floating label select example"
                                                    onChange={(e) => handleChange("childCount",Number(e.target.value))} >
                                                    <option value="0">0</option>
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
                                        <Col xs={6} md={6} lg={2}>
                                            <label className="label-text mb-1 d-md-block d-sm-none">No. of Infants*</label>
                                            <FloatingLabel controlId="floatingSelect" label="select child count">
                                                <Form.Select aria-label="Floating label select example"
                                                    onChange={(e) => handleChange("infantCount",Number(e.target.value))} >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col xs={6} md={6} lg={3}>
                                            <label className="label-text mb-1 d-md-block d-sm-none">Cabin Class*</label>
                                            <FloatingLabel controlId="floatingSelect" label="select cabin class">
                                                <Form.Select aria-label="Floating label select example"
                                                    onChange={(e) => handleChange("travelClass",e.target.value)} >
                                                    <option value="ECONOMY">Economy</option>
                                                    <option value="PREMIUM_ECONOMY">Premium Economy</option>
                                                    <option value="BUSINESS">Business</option>
                                                    <option value="FIRST">First</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>

                                        <Col xs={12} sm={6} md={4} lg={3} className="text-center">
                                            <button type='submit' className="inquire-button w-100 px-2 py-3 mt-4">Inquire</button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </form>
                    </Col>
                </Row>
            </div>

            {flightDataToDisplay.map((flight, index) => (
                <div key={index} className="flight-search-card d-flex flex-column flex-md-row justify-content-between">
                    <div className="fs-5 fw-bold text-center">
                        {flight.itineraries[0].segments[0].carrierCode} {flight.itineraries[0].segments[0].number}
                    </div>
                    <div className="text-center d-md-none">
                        <div>
                            <span className="primary-text-color">No of stops: </span>{flight.itineraries[0].segments.length - 1}
                        </div>
                        <div>{flight.itineraries[0].duration}</div>
                    </div>
                    <div>
                        <div className="fs-4 fw-bold primary-text-color">{flight.itineraries[0].segments[0].departure.iataCode}</div>
                        <div>{flight.itineraries[0].segments[0].departure.at}</div>
                    </div>
                    <div className="text-center d-none d-md-block">
                        <div>
                            <span className="primary-text-color">No of stops: </span>{flight.itineraries[0].segments.length - 1}
                        </div>
                        <hr />
                        <div>{flight.itineraries[0].duration}</div>
                    </div>
                    <div className="mb-4">
                        <div className="fs-4 fw-bold primary-text-color">{flight.itineraries[0].segments.at(-1).arrival.iataCode}</div>
                        <div>{flight.itineraries[0].segments.at(-1).arrival.at}</div>
                    </div>
                    <div className="text-center">
                        <div className="fs-4 fw-bold">{flight.price.grandTotal} {flight.price.currency}</div>
                        <button className="book-now-button px-4 py-2 my-2">Book Now</button>
                        <p style={{ fontSize: "small", cursor: "pointer" }} onClick={() => handleShow(flight)}>View Flight Details</p>
                    </div>
                </div>
            ))}

            {state.selectedFlight && (
                <Modal show={state.show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Flight Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-between">
                            <p><strong>From:</strong> {state.selectedFlight.itineraries[0].segments[0].departure.iataCode} ({state.selectedFlight.itineraries[0].segments[0].departure.at})</p>
                            <p><strong>To:</strong> {state.selectedFlight.itineraries[0].segments.at(-1).arrival.iataCode} ({state.selectedFlight.itineraries[0].segments.at(-1).arrival.at})</p>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p><strong>Airline:</strong> {state.selectedFlight.itineraries[0].segments[0].carrierCode}</p>
                            <p><strong>Flight No:</strong> {state.selectedFlight.itineraries[0].segments[0].number}</p>
                            <p><strong>Stops:</strong> {state.selectedFlight.itineraries[0].segments.length - 1}</p>
                            <p><strong>Duration:</strong> {state.selectedFlight.itineraries[0].duration}</p>
                        </div>
                        <hr />
                        <h5 className="mt-2">Pricing</h5>
                        <p><strong>Total:</strong> {state.selectedFlight.price.grandTotal} {state.selectedFlight.price.currency}</p>
                        <hr />
                        <h5 className="mt-2">Traveler Breakdown</h5>
                        {state.selectedFlight.travelerPricings?.map((traveler, i) => (
                            <div key={i}>
                                <div><strong>{traveler.travelerType}:</strong> {traveler.price.total} {traveler.price.currency}</div>
                                <div><strong>Fare:</strong> {traveler.fareOption}</div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cabin</th>
                                            <th scope="col">Class</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {traveler.fareDetailsBySegment?.map((fare, j) => (
                                            <tr key={j}>
                                                <td>{fare.cabin}</td>
                                                <td>{fare.class}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <br />
                            </div>

                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="close-button px-4 py-2 my-2" onClick={handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>
            )}

            {state.flightData.length > 0 && (<div className='text-center' onClick={handleLoadMore}>
                <button className="load-more-button px-4 py-2 my-2">Load More</button>
            </div>)}

            < style jsx > {`
                .hero-container {
                    position: relative;
                }

                .carousel-item-container {
                    position: relative;
                    height: 100vh;
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
                    bottom: 8rem;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    border-radius: 50px;
                    opacity: 0.9;
                }

                .label-text{
                    color:rgb(102, 44, 25);
                    font-weight: 500;
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

                .flight-search-card{
                    background-color:rgb(253, 243, 239);
                    width:60%;
                    margin:1rem auto;
                    padding: 2rem 2rem;
                    border: 1px solid #ffc2b3;
                    border-radius: 1rem;
                    box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.4);
                }

                .book-now-button {
                    background-color: #e04b17;
                    color: white;
                    border: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }

                .book-now-button:hover {
                    background-color: #ec9880;
                    color: black;
                    transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }
                
                .load-more-button {
                    background-color: transparent;
                    color: black;
                    border: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    border: 1px solid #e04b17;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                    }
                    
                    .load-more-button:hover {
                    background-color: #e04b17;
                    color: white;
                    transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                    }
                    
                    .close-button {
                    background-color: transparent;
                    color:  #666666;
                    border: 1px solid  #666666;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                    }
                    
                    .close-button:hover {
                    background-color: #666666;
                    color: white;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                    }
                    
                    @media (max-width:450px){
                        .flight-search-card{
                            width:80%;
                            margin:0.5rem auto;
                            padding: 2rem 1rem;
                        }
                        .carousel-item-container{
                            height:100vh;
                        }
                        .card-inquiry-container{
                            width: 90%;
                            top:1rem;
                        }
                    }

                    @media (max-width:990px){
                         .card-inquiry-container{
                            width: 90%;
                            top:6rem;
                        }
                    }
                `}</style>
        </div >
    );
}
