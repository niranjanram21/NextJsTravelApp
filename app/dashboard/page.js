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
    const { products, setProducts, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductForUpdateModal, setSelectedProductForUpdateModal] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState(null);

    // Modals
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
        setShowViewModal(false);
        setSelectedProductForUpdateModal(product);
        setUpdatedProduct(product);
        setShowUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setSelectedProduct(null);
    };

    // Pagination
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

    // Update Product

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!updatedProduct || !updatedProduct._id) {
            console.error("Error: updatedProduct or its _id is missing.");
            return;
        }

        const { _id, ...updateFields } = updatedProduct;

        try {
            const response = await fetch("/api/updateProducts", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    _id,
                    updatedData: updateFields,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update product: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Success:", data.message);
            alert("Product updated successfully");

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === _id ? { ...product, ...updateFields } : product
                )
            );

            setShowUpdateModal(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
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
                                            <button className="update-button w-25 px-3 py-1" onClick={() => handleUpdateModalShow(selectedProduct.id)}>
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
                    <Modal show={showUpdateModal} onHide={handleUpdateModalClose} size="lg"
                        // backdrop="static"
                        aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Package Id : {selectedProductForUpdateModal?.id || "Loading..."}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedProductForUpdateModal && (
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" id="title" className="form-control"
                                            value={updatedProduct.title || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, title: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Image</label>
                                        <input type="file" id="image" className="form-control"
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input type="text" id="location" className="form-control"
                                            value={updatedProduct.location || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, location: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input type="text" id="price" className="form-control"
                                            value={updatedProduct.price || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="duration" className="form-label">Duation</label>
                                        <input type="text" id="duration" className="form-control"
                                            value={updatedProduct.duration || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, duration: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" id="description" className="form-control"
                                            value={updatedProduct.description || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="detailedDescription" className="form-label">Detailed Description</label>
                                        <textarea className="form-control" id="detailedDescription" rows="3" style={{ width: "100%" }}
                                            value={updatedProduct.detailedDescription || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, detailedDescription: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={handleUpdateSubmit}>Update Product</button>
                                </form>
                            )}
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
