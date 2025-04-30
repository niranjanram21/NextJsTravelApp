"use client";

import React from "react";
import Image from "next/image";
import { useBlogs } from "../context/FetchBlogProvider";
import { useState, useEffect } from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function BlogPage() {
  const [blogsToDisplay, setBlogsToDisplay] = useState([]);
  const [blogsList, setBlogsList] = useState([]);
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

  useEffect(() => {
    const blogsFromEnd = [...blogs].reverse();
    setBlogsList(blogsFromEnd.slice(0, 5));
  }, [blogs]);

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
      <div className="row blog-container">
        <div className="col-md-8">
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
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
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
        <div className="col-md-4">
          {blogsList.map((b) => (
            <>
              <div key={b.id} className="mt-4 d-flex flex-row gap-4">
                <Image
                  src={b.image}
                  alt={b.title}
                  width={100}
                  height={80}
                  className="object-fit-cover"
                />
                <div className="">
                  <h6 className="fw-bold mb-2">{b.title}</h6>
                  <h6 className="">
                    {new Date(b.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </h6>
                  <h6 className="fw-semibold primary-text-color mb-0">@{b.username}</h6>
                </div>
              </div>
              <hr />
            </>
          ))}
          <div className="text-center mt-5">
            <button className="social-share-button w-50 px-4 py-2">SOCIAL SHARE</button>
          </div>

          <div className="mt-5 text-white px-3 d-flex flex-row justify-content-between">
            <div>
              <span className="social-share-logos social-handle-insta-logo border-end fs-6">
                <FaInstagramSquare />
              </span>
              <span className="py-3 ps-3 pe-5 social-handle-insta fs-6 text-start fw-semibold">
                Instagram
              </span>
            </div>
            <div>
              <span className="social-share-logos social-handle-fb-logo border-end fs-6">
                <FaFacebookF />
              </span>
              <span className="py-3 ps-3 pe-5 social-handle-fb fs-6 text-start fw-semibold">
                Facebook
              </span>
            </div>
          </div>

          <div className="mt-5 text-white px-3 d-flex flex-row justify-content-between">
            <div>
              <span className="social-share-logos social-handle-li-logo border-end fs-6">
                <FaLinkedin />
              </span>
              <span className="py-3 ps-3 pe-5 social-handle-li fs-6 text-start fw-semibold">
                Linked-in
              </span>
            </div>
            <div>
              <span className="social-share-logos social-handle-wa-logo border-end fs-6">
                <FaWhatsapp />
              </span>
              <span className="py-3 ps-3 pe-5 social-handle-wa fs-6 text-start fw-semibold">
                Whatsapp
              </span>
            </div>
          </div>
        </div>
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
          width: 75%;
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

        .blog-container {
          width: 70%;
          margin: 2rem auto;
        }

        .card-container {
          // width: 60%;
          margin: 0 2rem;
          gap: 2rem;
          display: flex;
          flex-wrap: wrap;
        }
        @media (max-width: 450px) {
          .blog-container {
            width: 95%;
          }
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
          cursor: pointer;
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
        .social-share-button {
          background: white;
          color: #1d8ed1;
          border: 1px solid #1d8ed1;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .social-share-button:hover {
          background: #1d8ed1;
          color: white;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }
        .social-share-logos {
          padding: 1rem;
        }
        .social-handle-insta {
          background-image: linear-gradient(to right, #ff0080, #ff1a8c, #ff3399);
        }
        .social-handle-insta-logo {
          background-color: #ff1a8c;
        }
        .social-handle-fb {
          background-image: linear-gradient(to right, #0040ff, #1a53ff, #3366ff);
        }
        .social-handle-fb-logo {
          background-color: #1a53ff;
        }
        .social-handle-wa {
          background-image: linear-gradient(to right, #339933, #39ac39, #40bf40);
        }
        .social-handle-wa-logo {
          background-color: #39ac39;
        }
        .social-handle-li {
          background-image: linear-gradient(to right, #00b8e6, #00ccff, #1ad1ff);
        }
        .social-handle-li-logo {
          background-color: #00ccff;
        }
        // @media (max-width: 390px) {
        //   .social-share-logos {
        //     padding: 0.5rem;
        //   }
        // }
      `}</style>
    </>
  );
}
