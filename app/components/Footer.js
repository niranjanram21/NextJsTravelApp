"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

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
        <div className="footer-caption row">
          <div className="col-md-6 text-start">
            <div className="josefin-sans-unique fw-bold fs-1">JOIN US FOR MORE UPDATES!</div>
            <div className="text-secondary">
              Ad ex dolor in ipsum consequat veniam veniam fugiat eiusmod magna duis.
            </div>
          </div>
          <div className="col-md-3 d-none d-lg-block"></div>
          <div className="col-md-3">
            <input
              className="form-control px-2 py-3 w-100 bg-transparent"
              type="text"
              placeholder="Enter your email .."
            />
            <button className="subscribe-button w-100 px-2 py-3 mt-2">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-text-container row text-start">
        <div className="col-md-3">
          <h1 className="fw-bold primary-text-color opacity-75">GoTrip</h1>
          <p className="mt-4 text-secondary">
            Ad ex dolor in ipsum consequat veniam veniam fugiat eiusmod magna duis.
          </p>
          <div className="d-flex flex-row gap-3 fs-4 text-secondary">
            <FaInstagramSquare />
            <FaFacebook />
            <BsTwitterX />
            <IoLogoYoutube />
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2">
          <span className="border border-primary me-2 my-1"></span>
          <span className="josefin-sans-unique fw-bold">ABOUT US</span>
          <p className="mt-4 text-secondary">
            Nostrud fugiat dolore enim sint eu ea laborum duis. Ad ex dolor in ipsum consequat
            veniam veniam fugiat eiusmod magna duis.
          </p>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2">
          <span className="border border-primary me-2 my-1"></span>
          <span className="josefin-sans-unique fw-bold">CONTACT US</span>
          <p className="mt-4 text-secondary">
            Ad ex dolor in ipsum consequat veniam veniam fugiat eiusmod magna duis.
          </p>
          <p>
            <FaPhone className="me-3 primary-text-color" />
            (+91) - 982 367 3892
          </p>
          <p>
            <MdEmail className="me-3 primary-text-color" />
            gotrip@gmail.com
          </p>
          <p>
            <FaLocationDot className="me-3 primary-text-color" />
            400143, MUMBAI{" "}
          </p>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-2">
          <span className="border border-primary me-2 my-1"></span>
          <span className="josefin-sans-unique fw-bold">SERVICES</span>
          <ul className="mt-4 text-secondary">
            <li className="hover-underline-animation center">Destinations</li>
            <li className="hover-underline-animation center">Packages</li>
            <li className="hover-underline-animation center">Our Blogs</li>
            <li className="hover-underline-animation center">Luxury Travel</li>
            <li className="hover-underline-animation center">Flight Booking</li>
          </ul>
        </div>
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
          background: rgba(0, 0, 0, 0.8);
          z-index: 1;
        }

        .footer-caption {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 75%;
          z-index: 2;
          text-align: center;
          color: white;
        }

        .subscribe-button {
          background-color: transparent;
          border: 1px solid #e04b17;
          color: white;
          // border-radius: 50px;
          // border: none;
          font-weight: bold;
          transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
        }

        .subscribe-button:hover {
          background-color: #e04b17;
        }

        @media (max-width: 390px) {
          .footer-img-container {
            height: 40vh;
          }
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
          padding: 2rem 12%;
          background-color: #171717;
          color: white;
          margin: 0;
          z-index: 2;
          position: relative;
        }

        input::placeholder,
        textarea::placeholder {
          color: rgb(255, 255, 255); /* Replace with your desired color */
          opacity: 1; /* Ensures full color visibility */
        }

        .footer-text-container .col-md-3 {
          padding: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;
        }
        ul > li {
          margin-top: 0.5rem;
          cursor: pointer;
        }
        ul > li:hover {
          color: white;
        }

        .hover-underline-animation {
          display: block;
          position: relative;
        }

        .hover-underline-animation::after {
          content: "";
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #e04b17;
          transition: transform 0.25s ease-out;
        }

        .hover-underline-animation:hover::after {
          transform: scaleX(1);
        }

        .hover-underline-animation.center::after {
          transform-origin: bottom center;
        }

        .hover-underline-animation.center:hover::after {
          transform-origin: bottom center;
        }
      `}</style>
    </>
  );
}
