'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { useProducts } from '../context/FetchProductProvider';

export default function Dashboard() {
    const router = useRouter();
    const { products, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleViewShow = (id) => {
        const product = products.find((product) => product.id === id);
        setSelectedProduct(product);
        setShowViewModal(true);
    };

    const handleViewClose = () => {
        setShowViewModal(false);
        setSelectedProduct(null);
    };

    const handleUpdateModalShow = (id) => {
        const product = products.find((product) => product.id === id);
        setSelectedProduct(product);
        setShowUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setSelectedProduct(null);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const productsToDisplay = products.slice(indexOfFirstItem, indexOfLastItem);

    const handleNext = () => {
        if (currentPage < Math.ceil(products.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const generatePagination = (totalPages, currentPage) => {
        const visiblePages = 4;
        const pages = [];

        if (currentPage > 2) {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
        }

        const startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
        const endPage = Math.min(totalPages - 1, currentPage + Math.floor(visiblePages / 2));

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/adminLogin");
        }
    }, [router]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>

            <div className="card bg-tertiary poppins-medium">
                <div className="card-body">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Location</th>
                                <th scope="col">Price</th>
                                <th scope="col">Duration</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsToDisplay.map((product, index) => (
                                <tr key={product.id}>
                                    <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            width={150}
                                            height={80}
                                            className="image"
                                        />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.location}</td>
                                    <td>${product.price}</td>
                                    <td>{product.duration}</td>
                                    <td className="text-end">
                                        <button className="view-button w-50 px-3 py-1" onClick={() => handleViewShow(product.id)}>
                                            View
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* View Modal */}
                    <Modal show={showViewModal} onHide={handleViewClose} size="xl"
                        // backdrop="static"
                        aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Package Id : {selectedProduct?.id || "Loading..."}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedProduct ? (
                                <div className="d-flex gap-4">
                                    <div className="">
                                        {selectedProduct.image ? (
                                            <Image
                                                src={selectedProduct.image}
                                                alt={selectedProduct.title}
                                                width={450}
                                                height={250}
                                                className="image"
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column poppins-medium">
                                        <div className="fs-4 fw-semibold mb-4">{selectedProduct.title}</div>
                                        <div><span className="fw-semibold">Location: </span> <MdLocationOn /> {selectedProduct.location}</div>
                                        <div className="mb-1 fs-6 fw-light">
                                            <span className="fw-semibold">Price: </span> ${selectedProduct.price} <span className='fw-light fs-6'>/person</span>
                                        </div>
                                        <div className="mb-1 fw-light">
                                            <span className="fw-semibold">Duration: </span><IoMdTime /> {selectedProduct.duration}
                                        </div>
                                        <div className="mb-1 fw-light"><span className="fw-semibold">Description: </span>{selectedProduct.description}</div>
                                        <div className=" fw-light"><span className="fw-semibold">Detailed Description: </span>{selectedProduct.detailedDescription}</div>

                                        <div className="d-flex gap-4 mt-5">
                                            <button className="update-button w-25 px-3 py-1" onClick={handleUpdateModalShow}>
                                                Update
                                            </button>
                                            <button className="delete-button w-25 px-3 py-1">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                "Loading..."
                            )}

                        </Modal.Body>
                        <Modal.Footer>
                            <button className="view-button w-20 px-3 py-1" onClick={handleViewClose}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal >


                    {/* Update Modal */}
                    <Modal show={showUpdateModal} onHide={handleUpdateModalClose} size="xl"
                        // backdrop="static"
                        aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Package Id : {selectedProduct?.id || "Loading..."}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            hello

                        </Modal.Body>
                        <Modal.Footer>
                            <button className="view-button w-20 px-3 py-1" onClick={handleUpdateModalClose}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal >

                    {/* Pagination */}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handlePrevious}>
                                    Previous
                                </button>
                            </li>
                            {generatePagination(Math.ceil(products.length / itemsPerPage), currentPage).map((page, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === page ? 'active' : ''
                                        } ${page === "..." ? 'disabled' : ''}`}
                                >
                                    {page === "..." ? (
                                        <span className="page-link">...</span>
                                    ) : (
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </li>
                            ))}
                            <li
                                className={`page-item ${currentPage === Math.ceil(products.length / itemsPerPage) ? 'disabled' : ''
                                    }`}
                            >
                                <button className="page-link" onClick={handleNext}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div >
            </div >

            <style jsx>{`
                .table{
                    margin:2rem auto;
                }
                thead th {
                    padding: 20px 0;
                    font-size:1.2rem;
                }

                .view-button {
                    background-color: transparent;
                    color:  #666666;
                    border: 1px solid  #666666;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }

                .view-button:hover {
                    background-color: #666666;
                    color: white;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }

                .delete-button {
                    background-color: transparent;
                    color:  #e60000;
                    border: 1px solid  #e60000;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }

                .delete-button:hover {
                    background-color: #ff3333;
                    color: #ffffff;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }

                .update-button {
                    background-color: white;
                    color: #008ae6;
                    border: 1px solid #008ae6;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }

                .update-button:hover {
                    background-color: #008ae6;
                    color: #ffffff; 
                    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
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
