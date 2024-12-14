'use client';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';
import { IoMdTime } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { useProducts } from '../context/FetchProductProvider';
import { useState, useEffect } from 'react';

export default function DestinationPage() {
    const { products, loading, error } = useProducts();

    const [productsToDisplay, setProductsToDisplay] = useState([]);
    const [loadMoreBTn, setLoadMoreBtn] = useState("d-block");

    useEffect(() => {
        if (products.length > 0 && productsToDisplay.length === 0) {
            setProductsToDisplay(products.slice(0, 4));
        }
    }, [products]);

    useEffect(() => {
        if (productsToDisplay.length === products.length) {
            setLoadMoreBtn("d-none");
        } else {
            setLoadMoreBtn("d-block");
        }
    }, [productsToDisplay.length, products.length]);

    const handleVisibleProducts = () => {
        const additionalProducts = products.slice(productsToDisplay.length, productsToDisplay.length + 4);
        setProductsToDisplay((prev) => [...prev, ...additionalProducts]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="container-fluid position-fixed bg-container">
                <Image
                    src="/bgImg6.jpg"
                    alt="Background"
                    fill
                    className="blurred-image"
                    loading="eager"
                />
                <div className="overlay"></div>
            </div>

            <div className="product-container">
                <Row xs={1} md={2} className="g-4">
                    {productsToDisplay.map((product) => (
                        <Col key={product.id}>
                            <Card
                                className="product-card position-relative z-1"
                                style={{
                                    height: "22rem", // Fixed card height
                                    display: "flex",
                                    flexDirection: "column", // Flex layout
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                }}
                            >
                                <div className="d-flex" style={{ height: "100%" }}>
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        style={{
                                            objectFit: "cover",
                                            width: "50%",
                                            height: "100%",
                                        }}
                                    />
                                    <span className='price-tag position-absolute z-2 mt-4 px-4 py-2 fs-5'>
                                        ${product.price} <span className='fw-light fs-6'>/person</span>
                                    </span>
                                    <div className='trip-details d-flex flex-row justify-content-center overflow-auto position-absolute z-2 bottom-0 start-0 px-4 py-2'>
                                        <span><IoMdTime /> {product.duration}</span>
                                        <span className='border mx-2'></span>
                                        <span><IoPeople /> {product.people}</span>
                                        <span className='border mx-2'></span>
                                        <span><MdLocationOn /> {product.location}</span>
                                    </div>
                                    <Card.Body
                                        className="d-flex flex-column"
                                        style={{
                                            padding: "1rem 2rem",
                                            color: "white",
                                            flex: "1",
                                        }}
                                    >
                                        <div>
                                            <div className="fs-5 fw-bold mb-3" style={{ color: '#179ae0' }}>{product.title}</div>
                                            <div className="text-white-50 mb-3">{product.description}</div>
                                        </div>

                                        <div className="d-flex gap-4 mt-auto">
                                            <button className="wishlist-button w-100 px-3 py-2 rounded">
                                                Wishlist
                                            </button>
                                            <button className="book-button w-100 px-3 py-2 rounded">
                                                Book Now
                                            </button>
                                        </div>
                                    </Card.Body>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className={`text-center my-4 ${loadMoreBTn}`}>
                    <button className="load-more-button" onClick={handleVisibleProducts}>
                        Load more products
                    </button>
                </div>
            </div>

            <style jsx>{`
                .bg-container {
                    height: 100vh;
                    width: 100%;
                    overflow: hidden;
                }
                .blurred-image {
                    object-fit: cover;
                    filter: blur(4px);
                    z-index: -1;
                }
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7); 
                    z-index: 0;
                }
                .product-container {
                    position: relative;
                    z-index: 1;
                    padding: 8rem 8rem;
                    max-width: 90%;
                    margin: auto;
                    border-radius: 10px;
                }
                .product-card {
                        box-shadow: box-shadow: 5px 10px 18px red;   !important;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .product-image {
                    height: 12rem !important;
                    object-fit: cover !important;
                    width: 100%;
                }
                .price-tag{
                    background-color: #e04b17;
                    color:white;
                    font-weight:bold;
                }
                .trip-details{
                    width:50%;
                    background-color: #179ae0;
                    color:white;
                }
                .book-button {
                    background-color: transparent;
                    font-size:14px;
                    color: white;
                    border: 1px solid #e04b17;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, transform 0.3s ease;
                }
                .book-button:hover {
                    background-color: #e04b17;
                    color: white;
                    transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
                }
                .wishlist-button {
                    background-color: transparent;
                    font-size:14px;
                    color: white;
                    border: 1px solid white;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }
                .wishlist-button:hover {
                    background-color: white;
                    color: black;
                    border: 1px solid white;
                    transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
                }
                .load-more-button {
                    background-color: white;
                    color: black;
                    border: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }
                .load-more-button:hover {
                    background-color: transparent;
                    color: white;
                    border: 1px solid white;
                    transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
                }
                @media (max-width: 768px) {
                    .product-container {
                        padding: 4rem 2rem;
                    }
                }
            `}</style>
        </>
    );
}
