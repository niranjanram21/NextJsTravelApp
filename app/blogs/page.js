'use client';

import React from "react";
import Image from 'next/image';

export default function BlogPage() {
    return (
        <>
            <div className="blog-img-container">
                <div className="image-wrapper">
                    <Image
                        src="/bgImg3.jpg"
                        alt="Footer Background"
                        fill
                        className="object-fit-cover"
                        priority
                        loading="eager"
                    />
                </div>
                <div className="inner-shape position-absolute">
                    <Image
                        src="/slider-pattern.png"
                        alt="Slider Pattern"
                        fill
                        className="object-fit-cover"
                        priority
                        loading="eager"
                    />
                </div>
                <div className="overlay"></div>
                <div className="blog-caption row">
                    <h1 className="montserrat-unique-class fw-bolder fs-1 mb-5">Archived posts</h1>
                </div>
            </div>

            <div className="blog-content-container row text-center">
                <div className="col-md-6">1</div>
                <div className="col-md-6">1</div>
            </div>

            <style jsx>{`
                 .blog-img-container {
                    position: relative;
                    height: 50vh;
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
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1;
                }

                .blog-caption {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width:75%;
                    z-index: 2; 
                    text-align: center;
                    color: white;
                }
                 .inner-shape {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100px;
                    z-index: 2;
                }

                .blog-content-container{
                    margin:4rem auto;
                }
            `}</style>
        </>
    );
}