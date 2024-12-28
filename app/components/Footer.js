'use client';

import React from "react";
import Image from 'next/image';
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
    return (
        <>
            <div className="footer-img-container">
                <div className="image-wrapper">
                    <Image
                        src="/bgImg8.jpg"
                        alt="Footer Background"
                        fill
                        className="object-fit-cover"
                        priority
                        loading="eager"
                    />
                </div>
                <div className="overlay"></div>
                <div className="footer-caption">
                    <h1 className="montserrat-unique-class fs-1">Explore the World</h1>
                    <h5 className="hind-madurai">Find your next adventure with us.</h5>
                </div>
            </div>

            <div className="footer-text-container row text-start">
                <div className="col-md-3">
                    <span className='border border-primary me-2 my-1'></span>
                    <span className="josefin-sans-unique fw-bold">
                        ABOUT US
                    </span>
                    <p className="mt-2 text-secondary">
                        Ad ex dolor in ipsum consequat veniam veniam fugiat eiusmod magna duis.
                        Nostrud fugiat dolore enim sint eu ea laborum duis.
                    </p>
                </div>
                <div className="col-md-3">
                    <span className='border border-primary me-2 my-1'></span>
                    <span className="josefin-sans-unique fw-bold">
                        CONTACT US
                    </span>
                    <p className="mt-2 text-secondary">
                        Ad ex dolor in ipsum consequat veniam veniam fugiat eiusmod magna duis.
                    </p>
                    <p><FaPhone className="me-3 text-primary" />(+91) - 982 367 3892</p>
                    <p><MdEmail className="me-3 text-primary" />gotrip@gmail.com</p>
                    <p><FaLocationDot className="me-3 text-primary" />400143, MUMBAI </p>
                </div>
                <div className="col-md-3">Section 2</div>
                <div className="col-md-3">Section 3</div>
            </div>

            <style jsx>{`
                .footer-img-container {
                    position: relative;
                    height: 25vh;
                    width: 100%;
                    overflow: hidden;
                }

                .image-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
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
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 1;
                }

                .footer-caption {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 2; 
                    text-align: center;
                    color: white;
                }

                @media (max-width: 768px) {
                    .footer-container {
                        height: 40vh;
                    }

                    .footer-caption h1 {
                        font-size: 1.5rem;
                    }

                    .footer-caption h5 {
                        font-size: 1rem;
                    }
                }

                .footer-text-container {
                    padding: 2rem 12%; /* Responsive padding */
                    background-color: #171717;
                    color: white;  
                    margin: 0; /* Ensure no unexpected horizontal margin */
                }

                .footer-text-container .col-md-3 {
                    padding: 1rem;
                }
            `}</style>
        </>
    );
}
