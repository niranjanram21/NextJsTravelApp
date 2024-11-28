'use client';
import Image from 'next/image';
import DatePicker from 'react-datepicker'; // Import the DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for DatePicker
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function Hero() {
    const [selectedDates, setSelectedDates] = useState([null, null]);
    const today = new Date(); // Set today's date as the minimum date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <Image
                        src="/bgImage3.jpg"
                        alt="First slide image"
                        fill // Use fill instead of layout="fill"
                        objectFit="cover" // Ensure the image covers the container
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="/bgImage.jpg"
                        alt="Second slide image"
                        fill // Use fill instead of layout="fill"
                        objectFit="cover" // Ensure the image covers the container
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src="/bgImage2.png"
                        alt="Third slide image"
                        fill // Use fill instead of layout="fill"
                        objectFit="cover" // Ensure the image covers the container
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Card Section */}
            <div className="card position-absolute p-2">
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
                        <div className="col-md-2">
                            <div></div>
                            <div>
                                <button className='btn btn-primary'>Inquire</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
