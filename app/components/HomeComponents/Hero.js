'use client';
import Image from 'next/image';
import DatePicker from 'react-datepicker'; // Import the DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for DatePicker
import { useState } from 'react';

export default function Hero() {
    const [selectedDates, setSelectedDates] = useState([null, null]);
    const today = new Date(); // Set today's date as the minimum date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return (
        <>
            <div className="hero-container container-fluid position-relative d-flex align-items-center justify-content-center">
                <div className="d-flex flex-row w-100 h-100">
                    <div className="col-md-7 col-12 hero-image-container">
                        <Image
                            src="/bgImg.jpg"
                            alt="bg img 1"
                            fill
                            className="object-fit-cover"
                        />
                    </div>

                    <div className="col-md-5 d-none d-md-block">
                        <Image
                            src="/bgImg2.png"
                            alt="bg img 2"
                            layout="responsive"
                            width={100}
                            height={100}
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>
                </div>

                <div className="text-center text-md-start position-absolute z-1 w-75 mx-5 px-5">
                    <h1 className="heroText fw-bold mb-4 mx-md-4">
                        Best Travel <span className="text-primary">Experience</span>
                    </h1>
                    <p className="fs-6 w-50 fw-lighter mx-md-4">
                        Experience the various exciting tour and travel packages and make hotel reservations, find vacation packages, search cheap hotels, and events.
                    </p>
                </div>
            </div>

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

            <style jsx>{`
                .hero-image-container {
                    position: relative;
                    height: 66vh; /* Set the height of the container to 2/3 of the viewport */
                }

                @media (min-width: 768px) {
                    .hero-image-container {
                        height: auto; /* Auto height on larger screens */
                    }
                }

                .heroText {
                    font-size: 3rem;
                }

                /* Card Styles */
                .card {
                    z-index: 2;
                    bottom: 300px;
                    left: 310px;
                    width: 50vw;
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); 
                }

                /* Responsive - Mobile Screens */
                @media (max-width: 767px) {
                    .card {
                        width: 90vw; /* Full width on small screens */
                        left: 5vw; /* Center the card */
                        bottom: 50px;
                        border-radius: 10px; /* Rounded corners for better mobile look */
                    }
                }

                /* Responsive - Medium Screens */
                @media (max-width: 1200px) {
                    .card {
                        width: 80vw; /* Wider card on medium screens */
                        left: 10vw; /* Adjusted to center the card */
                        bottom: 100px; /* Adjust bottom space */
                    }
                }
            `}</style>
        </>
    );
}
