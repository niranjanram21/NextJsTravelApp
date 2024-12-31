import React from "react";
import Image from "next/image";

export default function PopularDestinations() {
    return (
        <>
            <div className="text-center">
                <div className="fw-bolder" style={{ 'color': "#e04b17" }}>POPULAR DESTINATION</div>
                <div className="montserrat-unique-class mb-4 fs-1">TOP NOTCH DESTINATIONS</div>
            </div>
            <div className="card-container row text-center justify-content-center">
                <div className="col-lg-3 col-md-5 col-sm-8 card-body">
                    <div className="image-wrapper">
                        <Image
                            src="/images/8_Cultural_Journey.jpg"
                            alt="Slide 1"
                            fill
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </div>
                    <div className="text-container">
                        <h1>Hello</h1>
                    </div>
                </div>

                <div className="col-lg-3 col-md-5 col-sm-8 card-body">
                    <div className="image-wrapper">
                        <Image
                            src="/images/13_Great_Barrier_Reef.jpg"
                            alt="Slide 1"
                            fill
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </div>
                    <div className="text-container">
                        <h1>Hello</h1>
                    </div>
                </div>

                <div className="col-lg-3 col-md-5 col-sm-8 card-body">
                    <div className="image-wrapper">
                        <Image
                            src="/images/26_Exotic_Beachfront.jpg"
                            alt="Slide 1"
                            fill
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </div>
                    <div className="text-container">
                        <h1>Hello</h1>
                    </div>
                </div>

            </div>

            <style jsx>{`
            .card-container {
                width: 70%;
                margin: 0 auto 6rem auto;
                gap: 2rem;
                display: flex;
                flex-wrap: wrap;
            }

            .card-body {
                border: 1px solid rgb(207, 207, 207);
                // border-radius: 8px;
                // background-color: #f8f9fa;
                overflow: hidden;
            }
                
            .image-wrapper {
                position: relative;
                width: 100%;
                height: 300px;
            }

            .object-fit-cover {
                object-fit: cover;
            }

            .text-container {
                margin-top: 1rem;
                text-align: center;
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
