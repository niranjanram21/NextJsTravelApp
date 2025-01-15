'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import { useProducts } from '../context/FetchProductProvider';

export default function Dashboard() {
    const router = useRouter();
    const { products, loading, error } = useProducts();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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



    const handleBookNow = (id) => {
        router.push(`/packageDetail/${id}`);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/adminLogin");
        }

        // fetch('/api/validateToken', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}`,
        //     },
        // }).then(response => {
        //     if (!response.ok) router.push('/adminLoginSignup');
        // });
    }, [router]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>

            <div className="card bg-tertiary">
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
                            </tr>
                        </thead>
                        <tbody>
                            {productsToDisplay.map((product) => (
                                <tr key={product.id}>
                                    <th scope="row">{product.id}</th>
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
                                        <span>
                                            <button className="update-button w-25 px-3 py-1">
                                                Update
                                            </button>
                                        </span>
                                        <span className="ms-2">
                                            <button className="delete-button w-25 px-3 py-1">
                                                Delete
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                </div>
            </div>



            <style jsx>{`
                .table{
                    margin:2rem auto;
                }
                thead th {
                    padding: 20px 0;
                    font-size:1.2rem;
                }

                .delete-button {
                    background-color: transparent;
                    color:  #e60000;
                    border: 1px solid  #e60000;
                    font-weight: 600;
                    // padding: 10px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }

                .delete-button:hover {
                    background-color: #ff3333;
                    color: black;
                    // transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                }

                .update-button {
                    background-color: white;
                    color: #008ae6;
                    border: 1px solid #008ae6;
                    font-weight: 600;
                    // padding: 10px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }

                .update-button:hover {
                    background-color: transparent;
                    background-color: #99d6ff;
                    // border: 1px solid black;
                    // transform: scale(1.05);
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
