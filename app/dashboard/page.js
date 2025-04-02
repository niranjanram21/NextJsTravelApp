'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { useProducts } from '../context/FetchProductProvider';

export default function Dashboard() {
    const router = useRouter();
    const { products, setProducts, loading, error } = useProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddPackageModal, setShowAddPackageModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProductForUpdateModal, setSelectedProductForUpdateModal] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState(null);
    const [addProduct, setAddProduct] = useState(null);

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
    const handleAddPackageShow = () => {
        setShowAddPackageModal(true);
    };

    const handleAddPackageClose = () => {
        setShowAddPackageModal(false);
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

        const formData = new FormData();
        formData.append("_id", updatedProduct._id);
        formData.append("title", updatedProduct.title);
        formData.append("location", updatedProduct.location);
        formData.append("price", updatedProduct.price);
        formData.append("duration", updatedProduct.duration);
        formData.append("description", updatedProduct.description);
        formData.append("detailedDescription", updatedProduct.detailedDescription);

        // Check if a new image has been provided
        if (updatedProduct.image instanceof File) {
            formData.append("image", updatedProduct.image);
        } else {
            formData.append("existingImage", updatedProduct.image);
        }

        try {
            const response = await fetch("/api/updateProducts", {
                method: "PUT",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const data = await response.json();
            alert("Product updated successfully");

            // Update the product list with the updated data
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id
                        ? {
                            ...product,
                            ...updatedProduct,
                            image: updatedProduct.image instanceof File
                                ? `/images/${updatedProduct.image.name}`
                                : updatedProduct.image // Keep existing image if no new one is provided
                        }
                        : product
                )
            );

            setShowUpdateModal(false);

        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    // Add Product
    const handleAddSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", addProduct.title);
        formData.append("location", addProduct.location);
        formData.append("price", addProduct.price);
        formData.append("duration", addProduct.duration);
        formData.append("description", addProduct.description);
        formData.append("detailedDescription", addProduct.detailedDescription);

        if (addProduct.image instanceof File) {
            formData.append("image", addProduct.image);
        }

        try {
            const response = await fetch("/api/addProducts", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            const data = await response.json();  // Ensure backend returns full product

            alert("Product added successfully!");

            // Ensure all required fields are present before updating state
            if (data && data._id && data.title && data.image) {
                setProducts((prevProducts) => [data, ...prevProducts]);
            } else {
                console.error("Received incomplete product data:", data);
            }

            // Reset form
            setAddProduct({
                title: "",
                image: null,
                location: "",
                price: "",
                duration: "",
                description: "",
                detailedDescription: ""
            });

            setShowAddPackageModal(false);

        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    // Delete Product
    const handleDeleteProduct = async (productId) => {
        if (!productId) {
            alert("Invalid product ID");
            return;
        }
        const confirmDelete = window.confirm("Are you sure you want to delete this package?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/deleteProduct?id=${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            alert("Product deleted successfully");

            // Update the state to remove the deleted product instantly
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
            );

            setShowViewModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product. Please try again.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/adminLoginSignup");
        }
    }, [router]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-color py-4">
            <h2 className="panel-logo montserrat-unique-class fw-bolder ms-4">
                <MdTravelExplore className="travel-logo me-2 mb-1" />
                GoTrip
            </h2>
            {/* <h3 className="josefin-sans-unique text-center mb-4">Welcome to the admin dashboard!</h3> */}
            <div className="me-5 my-3 text-end">
                <button className="add-product-button py-2" onClick={handleAddPackageShow}>Add New Package</button>
            </div>
            {/* Add new package modal */}
            <Modal show={showAddPackageModal} onHide={setShowAddPackageModal} size="lg" backdrop="static"
                aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Package
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" id="title" className="form-control"
                                onChange={(e) => setAddProduct({ ...addProduct, title: e.target.value })} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input type="file" id="image" className="form-control"
                                onChange={(e) => setAddProduct({ ...addProduct, image: e.target.files[0] })} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input type="text" id="location" className="form-control"
                                onChange={(e) => setAddProduct({ ...addProduct, location: e.target.value })} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="text" id="price" className="form-control"
                                onChange={(e) => setAddProduct({ ...addProduct, price: e.target.value })} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="duration" className="form-label">Duration</label>
                            <input type="text" id="duration" className="form-control"
                                onChange={(e) => setAddProduct({ ...addProduct, duration: e.target.value })} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" id="description" className="form-control"
                                onChange={(e) => setAddProduct({ ...addProduct, description: e.target.value })} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="detailedDescription" className="form-label">Detailed Description</label>
                            <textarea className="form-control" id="detailedDescription" rows="3"
                                onChange={(e) => setAddProduct({ ...addProduct, detailedDescription: e.target.value })} ></textarea>
                        </div>
                        <button type="submit" className="update-button py-2 px-4" onClick={handleAddSubmit}>Add Package</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="view-button px-4 py-2" onClick={handleAddPackageClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal >
            <div className="card mx-3 poppins-medium">
                <div className="card-body">
                    <div className="table text-center">
                        <div className="row mb-4 fw-bold" style={{ margin: '2rem' }}>
                            <div className="col-md-1">Sr No.</div>
                            <div className="col-md-3">Image</div>
                            <div className="col-md-2">Title</div>
                            <div className="col-md-2">Location</div>
                            <div className="col-md-1">Price($)</div>
                            <div className="col-md-1">Duration</div>
                            <div className="col-md-2"></div>
                        </div>
                        <div style={{ margin: '2rem', borderBottom: '1px dashed #bfbfbf' }}></div>
                        {productsToDisplay.map((product, index) => (
                            <div key={product._id} className="row product-entry mt-3">
                                <div className="col-md-1">{(currentPage - 1) * itemsPerPage + index + 1}</div>
                                <div className="col-md-3">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={150}
                                        height={80}
                                        className="image"
                                    />
                                </div>
                                <div className="col-md-2">{product.title}</div>
                                <div className="col-md-2">{product.location}</div>
                                <div className="col-md-1">{product.price}</div>
                                <div className="col-md-1">{product.duration}</div>
                                <div className="col-md-2">
                                    <button className="view-button py-2 px-4" onClick={() => handleViewShow(product.id)}>
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View Modal */}
                    <Modal show={showViewModal} onHide={handleViewClose} size="xl" backdrop="static"
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
                                            <button className="update-button px-4 py-2" onClick={() => handleUpdateModalShow(selectedProduct.id)}>
                                                Update
                                            </button>
                                            <button className="delete-button px-4 py-2" onClick={() => handleDeleteProduct(selectedProduct._id)}>
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
                            <button className="view-button w-20 px-4 py-2" onClick={handleViewClose}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal >

                    {/* Update Modal */}
                    <Modal show={showUpdateModal} onHide={handleUpdateModalClose} size="lg" backdrop="static"
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
                                        <label htmlFor="image" className="form-label">Image</label>
                                        <input type="file" id="image" className="form-control"
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.files[0] })} />
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
                                        <label htmlFor="duration" className="form-label">Duration</label>
                                        <input type="text" id="duration" className="form-control"
                                            value={updatedProduct.duration || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, duration: e.target.value })} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" id="description" className="form-control"
                                            value={updatedProduct.description || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="detailedDescription" className="form-label">Detailed Description</label>
                                        <textarea className="form-control" id="detailedDescription" rows="3"
                                            value={updatedProduct.detailedDescription || ""}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, detailedDescription: e.target.value })}></textarea>
                                    </div>
                                    <button type="submit" className="update-button py-2 px-4" onClick={handleUpdateSubmit}>Update Package</button>
                                </form>

                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="view-button px-4 py-2" onClick={handleUpdateModalClose}>
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
                .bg-color{
                    background-color:#ffebe6;
                    background-image: linear-gradient(to right, #f2f2f2, #ffffff, #ffebe6);
                    height:100vh;
                }
                .card{
                    border-radius:3rem;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
               .product-entry {
                    margin: 0 2rem;
                    // padding:.5rem 0;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                    background-color: transparent;
                    div{
                        margin: 0.5rem auto;
                    }
                }
                .product-entry:hover {
                    background-color: #ffe6e6;
                    transform: scale(1.01);
                    border-radius: 2rem; 
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
                .add-product-button {
                    background-color: #e04b17;
                    color: white;
                    border: none;
                    font-weight: 600;
                    padding: 10px 30px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }
                .add-product-button:hover {
                    background-color: #ec9880;
                    color: black;
                    transform: scale(1.05);
                }
                .panel-logo{
                    border:1px solid #d9d9d9;
                    background-image: linear-gradient(to right, #f2f2f2, #ffebe6);
                    width:max-content;
                    border-radius: 4rem;
                    padding:.5rem 1rem;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }
                .active>.page-link, .page-link.active {
                    z-index: 3;
                    color: #404040;
                    background-color: #ffe6e6;
                    border-color: #a6a6a6;
                }
                .page-link {
                    color: #ff4d4d;
                }
            `}</style>
        </div>

    );
}
