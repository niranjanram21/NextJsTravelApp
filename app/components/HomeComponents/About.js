'use client';

import React from "react";
import Image from 'next/image';
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { BsPersonGear } from "react-icons/bs";

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

                    <span className="top-right position-absolute z-2 top-0 end-0 border-white">
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

            <div className="parallax"></div>
            <div className="content">
                <h1 className="text-white">Welcome to My Parallax</h1>
                <p>This is a CSS-based parallax effect</p>
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
                
                .parallax {
                    position: relative;
                    background-image: url('/bgImg3.jpg');
                    height: 500px;
                    background-attachment: fixed;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                .content {
                    position: relative;
                    text-align: center;
                    color: white;
                    top: -100px; /* Adjust for better visibility */
                    font-size: 24px;
                }

                @media (max-width: 768px) {
                    .parallax {
                    background-attachment: scroll; /* Fix for mobile browsers */
                    }
                }

            `}</style>
        </>
    );
}
