import React from "react";
import Image from "next/image";

export default function PopularDestinations() {
    return (
        <>
            <div className="text-center">
                <div className="fw-bolder" style={{ color: "#e04b17" }}>POPULAR DESTINATION</div>
                <div className="montserrat-unique-class mb-4 fs-1">TOP NOTCH DESTINATIONS</div>
            </div>
            <div className="card-container row text-center justify-content-center">
                {/* Card 1 */}
                <div className="col-lg-3 col-md-5 col-sm-8 card-body">
                    <div className="image-wrapper">
                        <Image
                            src="/images/8_Cultural_Journey.jpg"
                            alt="Cultural Journey"
                            fill
                            className="image"
                            priority
                            loading="eager"
                        />
                    </div>
                    <div className="text-container">
                        <h5>Cultural Journey</h5>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="col-lg-3 col-md-5 col-sm-8 card-body">
                    <div className="image-wrapper">
                        <Image
                            src="/images/13_Great_Barrier_Reef.jpg"
                            alt="Great Barrier Reef"
                            fill
                            className="image"
                            priority
                            loading="eager"
                        />
                    </div>
                    <div className="text-container">
                        <h5>Great Barrier Reef</h5>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="col-lg-3 col-md-5 col-sm-8 card-body">
                    <div className="image-wrapper">
                        <Image
                            src="/images/26_Exotic_Beachfront.jpg"
                            alt="Exotic Beachfront"
                            fill
                            className="image"
                            priority
                            loading="eager"
                        />
                    </div>
                    <div className="text-container">
                        <h5>Exotic Beachfront</h5>
                    </div>
                </div>

            </div>

            <div className="text-center mt-2 mb-4">
                <button className="more-products-button px-4 py-3 mt-2">MORE DESTINATIONS</button>
            </div>


            <style jsx>{`
                .card-container {
                    width: 70%;
                    margin: 0 auto;
                    gap: 2rem;
                    display: flex;
                    flex-wrap: wrap;
                }

                .card-body {
                    border: 1px solid rgb(207, 207, 207);
                    padding: 0;
                    overflow: hidden;
                    position: relative;
                    z-index: 1;
                }

                .image-wrapper:hover {
                    transform: scale(1.05);
                    z-index: 10;
                    cursor:pointer;
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 250px;
                    transition: transform 0.3s ease-in-out, z-index 0.3s;
                }

                .image {
                    object-fit: cover;
                }

                .text-container {
                    margin: 1rem 0;
                    text-align: center;
                }
                    
                .more-products-button {
                    background-color: #e04b17;
                    color: white;
                    border: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    // border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }

                .more-products-button:hover {
                    background-color: #ec9880;
                    color: black;
                    transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }

                @media (max-width: 768px) {
                    .card-container {
                        width: 90%;
                        gap: 1rem;
                    }

                    .card-body {
                        margin-bottom: 1.5rem;
                    }
                }
            `}</style>
        </>
    );
}
