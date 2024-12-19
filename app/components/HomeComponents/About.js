'use client';

import React from "react";
import Image from 'next/image';

export default function About() {
    return (
        <>
            <div className="row text-center" style={{ margin: '4rem 12rem', padding: '0 4rem', height: '600px' }}>
                <div className="col-md-7 position-relative">
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

                <div className="col-md-5">
                    hello
                </div>
            </div>

            <style jsx>{`
                .top-left {
                    position: absolute;
                    z-index: 5;
                    top: 100px;
                    left: 180px;
                    height: 320px;
                    width: 260px;
                    display: flex;
                    background-color: #33a5da;  
                    border: 10px solid white;
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

                .border-white {
                    border: 15px solid white;
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
            `}</style>
        </>
    );
}
