'use client';

import React from "react";
import Image from 'next/image';

export default function About() {
    return (
        <>
            <div className="row text-center" style={{ margin: '4rem 12rem', padding: '0 4rem', height: '600px' }}>
                <div className="col-md-7 position-relative">
                    <span className="top-left border-white">
                        <Image
                            src="/bgImg7.jpg"
                            alt="Slide 1"
                            height={300}
                            width={250}
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </span>
                    <span className="top-right position-absolute z-2 top-0 end-0 border-white">
                        <Image
                            src="/bgImg3.jpg"
                            alt="Slide 1"
                            height={300}
                            width={450}
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </span>
                    <span className="bottom-left">
                        <Image
                            src="/bgImg3.jpg"
                            alt="Slide 1"
                            height={350}
                            width={350}
                            className="object-fit-cover"
                            priority
                            loading="eager"
                        />
                    </span> 
                    <span className="bottom-right position-absolute bottom-0 end-0 border-white">
                        <Image
                            src="/bgImg4.jpg"
                            alt="Slide 1"
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
                .top-left{
                    position: absolute;
                    z-index:5;
                    top: 50px;
                    left:50px;
                }
                .bottom-left{
                    position: absolute;
                    z-index:0;
                    top:320px;
                    left:20px;
                }
                .border-white{
                    border:10px solid white;
                }
            `}</style>
        </>
    );
}
