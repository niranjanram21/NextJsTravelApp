'use client';

import React from "react";
import Image from 'next/image';
import { useBlogs } from '../context/FetchBlogProvider';
import { useState, useEffect } from 'react';

export default function BlogPage() {

    const [blogsToDisplay, setBlogsToDisplay] = useState([]);
    const [loadMoreBTn, setLoadMoreBtn] = useState("d-block");
    const { blogs, loading, error } = useBlogs();

    useEffect(() => {
        if (blogs.length > 0 && blogsToDisplay.length === 0) {
            setBlogsToDisplay(blogs.slice(0, 4));
        }
    }, [blogs, blogsToDisplay.length]);

    useEffect(() => {
        if (blogsToDisplay.length === blogs.length) {
            setLoadMoreBtn("d-none");
        } else {
            setLoadMoreBtn("d-block");
        }
    }, [blogsToDisplay.length, blogs.length]);

    const handleVisibleProducts = () => {
        const additionalBlogs = blogs.slice(blogsToDisplay.length, blogsToDisplay.length + 4);
        setBlogsToDisplay((prev) => [...prev, ...additionalBlogs]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
            <div className="row">
                <div className="col-md-9">
                    <div className="card-container row text-center justify-content-center">
                        {blogsToDisplay.map((blog) => {
                            return (
                                <div key={blog.id} className="col-md-5 col-sm-8 card-body d-flex flex-column">
                                    <div className="blog-image-wrapper">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            className="image"
                                            priority
                                            loading="eager"
                                        />
                                    </div>
                                    <div className="text-container mx-3 mt-4 flex-grow-1">
                                        <h5 className="text-start fw-bold">{blog.title}</h5>
                                        <p className="text-start">{blog.description}</p>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mx-3 mb-2">
                                        <p className="fw-semibold primary-text-color mb-0">@{blog.username}</p>
                                        <p className="text-end fw-semibold mb-0">
                                            {new Date(blog.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={`text-center my-4 ${loadMoreBTn}`}>
                        <button className="load-more-button" onClick={handleVisibleProducts}>
                            Load more blogs
                        </button>
                    </div>
                </div>
                <div className="col-md-3">hello</div>
            </div>

            <style jsx>{`
                 .blog-img-container {
                    position: relative;
                    height: 45vh;
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

                .card-container {
                    width: 55%;
                    margin: 2rem auto;
                    gap: 4rem;
                    display: flex;
                    flex-wrap: wrap;
                }

                .card-body {
                    background-color: rgb(250, 250, 250);
                    border: 1px solid rgb(227, 227, 227);
                    padding: 0;
                    overflow: hidden;
                    position: relative;
                    z-index: 1;
                }

                .blog-image-wrapper:hover {
                    transform: scale(1.05);
                    z-index: 10;
                    cursor:pointer;
                }

                .blog-image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 250px;
                    transition: transform 0.3s ease-in-out, z-index 0.3s;
                }

                .image {
                    object-fit: cover;
                }
                
                .load-more-button {
                    background-color: #e04b17;
                    color: white;
                    border: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }
                .load-more-button:hover {
                    background-color: #ec9880;
                    color: black;
                    transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }
            `}</style>
        </>
    );
}