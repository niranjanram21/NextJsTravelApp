'use client';

import React from "react";
import Image from 'next/image';
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { BsPersonGear } from "react-icons/bs";
import { FaMountainSun } from "react-icons/fa6";
import { TbTrekking } from "react-icons/tb";
import { GiCampfire } from "react-icons/gi";
import { FaMapLocationDot } from "react-icons/fa6";

export default function About() {
    return (
        <>

            <div className="position-relative d-lg-none" style={{ 'margin': '2rem 1rem', 'padding': '0 2rem', 'height': '300px' }}>
                <span className="top-left-sm josefin-sans-unique text-container-sm d-flex flex-column align-items-start justify-content-center px-2 py-1">
                    <span className="text-start">
                        <h4 className="text-white fw-bold">Explore</h4>
                        <h4 className="text-white fw-bold">Dream</h4>
                        <h4 className="text-white fw-bold">Discover</h4>
                    </span>
                    <button className="learn-more-button w-100 px-1 py-2 mt-2">LEARN MORE</button>
                </span>

                <span className="top-right-sm position-absolute z-2 top-0 end-0 border-white-sm">
                    <Image
                        src="/AboutImg1.jpg"
                        alt="Slide 1"
                        height={150}
                        width={200}
                        className="object-fit-cover"
                        priority
                        loading="eager"
                    />
                </span>
                <span className="bottom-left-sm">
                    <Image
                        src="/bgImg7.jpg"
                        alt="Slide 1"
                        height={180}
                        width={250}
                        className="object-fit-cover"
                        priority
                        loading="eager"
                    />
                </span>
                <span className="bottom-right-sm position-absolute bottom-0 end-0 border-white-sm">
                    <Image
                        src="/AboutImg3.jpg"
                        alt="Slide 1"
                        height={150}
                        width={200}
                        className="object-fit-cover"
                        priority
                        loading="eager"
                    />
                </span>
            </div>

            <div className="row text-center">
                {/* Left Column (hidden on small screens) */}
                <div className="col-lg-7 position-relative d-none d-lg-block">
                    <span className="top-left josefin-sans-unique text-container d-flex flex-column align-items-start justify-content-center p-4">
                        <span className="text-start">
                            <h1 className="text-white fw-bold">Explore</h1>
                            <h1 className="text-white fw-bold">Dream</h1>
                            <h1 className="text-white fw-bold">Discover</h1>
                        </span>
                        <button className="learn-more-button w-100 px-2 py-3 mt-2">LEARN MORE</button>
                    </span>

                    <span className="top-right position-absolute z-1 top-0 end-0 border-white">
                        <Image
                            src="/AboutImg1.jpg"
                            alt="Slide 1"
                            height={280}
                            width={400}
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </span>
                    <span className="bottom-left">
                        <Image
                            src="/bgImg7.jpg"
                            alt="Slide 1"
                            height={400}
                            width={550}
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </span>
                    <span className="bottom-right position-absolute bottom-0 end-0 border-white">
                        <Image
                            src="/AboutImg3.jpg"
                            alt="Slide 1"
                            height={300}
                            width={400}
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </span>
                </div>

                <div className="col-lg-5 d-block">
                    <div className="josefin-sans-unique text-start mt-5 mt-lg-2 px-2">
                        <div className="fw-bolder" style={{ 'color': "#e04b17" }}>INTRODUCTION ABOUT US</div>
                        <div className="montserrat-unique-class my-3 fs-1">ULTIMATE GUIDE TO EPIC ADVENTURE</div>
                        <div className="hind-madurai text-secondary">Ea qui est irure esse occaecat duis ullamco do ut mollit.
                            Ad ex dolor in ipsum consequat veniam veniam fugiat eiusmod magna duis.
                            Nostrud fugiat dolore enim sint eu ea laborum duis. Eu consequat nulla ea reprehenderit.</div>
                        <div className="d-flex flex-row gap-4 mt-5">
                            <div className="bg-icons py-3 px-4">
                                <FaHandHoldingUsd className="fs-1 text-white" />
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <h5>BEST PRICE GUARANTEED</h5>
                                <p>Ea qui est irure esse occaecat duis ullamco do ut mollit.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-4 mt-4">
                            <div className="bg-icons py-3 px-4">
                                <MdTravelExplore className="fs-1 text-white" />
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <h5>AMAZING DESTINATION</h5>
                                <p>Ea qui est irure esse occaecat duis ullamco do ut mollit.</p>
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-4 mt-4">
                            <div className="bg-icons py-3 px-4">
                                <BsPersonGear className="fs-1 text-white" />
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <h5>PERSONAL SERVICES</h5>
                                <p>Ea qui est irure esse occaecat duis ullamco do ut mollit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="parallax-container">
                <div className="parallax"></div>
                <div className="overlay"></div>

                <div className="content">
                    <p className="josefin-sans-unique fw-bolder fs-5" style={{ color: "#e04b17" }}>What do we Offer?</p>
                    <h1 className="montserrat-unique-class fw-bolder fs-1 mb-5">EXPLORE GREAT EXPERIENCE</h1>

                    <div className="text-center mt-5">
                        <div className="d-flex flex-wrap gap-2 gap-md-5 justify-content-center align-items-center">
                            <div className="feature-card">
                                <FaMountainSun className="fs-1 mb-3 text-secondary" />
                                <h2>Adventure</h2>
                                <p className="fs-6 text-secondary">15 Destinations</p>
                            </div>
                            <div className="feature-card">
                                <TbTrekking className="fs-1 mb-3 text-secondary" />
                                <h2>Trekking</h2>
                                <p className="fs-6 text-secondary">10 Destinations</p>
                            </div>
                            <div className="feature-card">
                                <GiCampfire className="fs-1 mb-3 text-secondary" />
                                <h2>Camp Fire</h2>
                                <p className="fs-6 text-secondary">12 Destinations</p>
                            </div>
                            <div className="feature-card">
                                <FaMapLocationDot className="fs-1 mb-3 text-secondary" />
                                <h2>Exploring</h2>
                                <p className="fs-6 text-secondary">20 Destinations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <style jsx>{`
                .top-left {
                    position: absolute;
                    z-index: 3;
                    top: 100px;
                    left: 180px;
                    height: 300px;
                    width: 250px;
                    display: flex;
                    background-color: #33a5da;  
                    border: 10px solid white;
                }
                .top-left-sm {
                    position: absolute;
                    z-index: 5;
                    top: 20px;
                    left: 20px;
                    height: 200px;
                    width: 150px;
                    display: flex;
                    background-color: #33a5da;  
                    border: 5px solid white;
                }

                .text-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .bottom-left {
                    position: absolute;
                    z-index: 0;
                    top: 250px;
                    left: 00px;
                }
                .bottom-left-sm {
                    position: absolute;
                    z-index: 0;
                    top:150px;
                    left: 00px;
                }

                .border-white {
                    border: 15px solid white;
                }

                .border-white-sm {
                    border: 10px solid white;
                }

                .learn-more-button {
                    background-color: #e04b17; 
                    color: white;
                    border: none;
                    font-weight: bold;
                }

                .learn-more-button:hover {
                    background-color: #f28465;
                }

                .bg-icons{
                    background-color: #e04b17;
                }

                .row{
                    margin: 4rem 12rem;
                    padding: 0 4rem;
                    height: 600px; 
                }

                @media only screen and (max-width: 990px) {
                    .row {
                        margin: 0;
                        padding: 0;
                        height: auto;
                    }
                }

                .parallax-container {
                    position: relative;
                    margin: 8rem 0;
                    width: 100%;
                }

                .parallax {
                    position: relative;
                    background-image: url('/bgImg5.jpg');
                    height: 600px;
                    background-attachment: fixed;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 1;
                }

                .content {
                    position: absolute;
                    z-index: 2;
                    color: white;
                    text-align: center;
                    top: 50%; /* Adjust as needed */
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .feature-color{
                    color:#e04b17 ;
                }

                .border {
                    border-left: 2px solid #fff;
                    height: 50px;
                    display: inline-block;
                }

                @media (max-width: 768px) {
                    .parallax {
                        background-attachment: scroll; /* Disable parallax effect on smaller screens */
                    }

                    .content {
                        top: 50%; /* Adjust alignment for smaller screens */
                    }

                    .d-flex {
                        gap: 2rem; /* Smaller gaps between items */
                    }

                    .border {
                        display: none; /* Hide borders on smaller screens */
                    }

                    .content h1 {
                        font-size: 1.75rem; /* Smaller heading */
                    }

                    .content p {
                        font-size: 1rem; /* Smaller paragraph text */
                    }
                }

                @media (max-width: 480px) {

                    .parallax {
                        height: 800px;
                    }

                    .content {
                        top: 50%; /* Further adjust for very small screens */
                    }

                    .d-flex {
                        flex-direction: column; /* Stack items vertically */
                        align-items: center;
                    }

                    .content h1 {
                        font-size: 1.5rem; /* Smaller heading for very small screens */
                    }

                    .content p {
                        font-size: 0.9rem; /* Smaller text */
                    }
                }



            `}</style>
        </>
    );
}
