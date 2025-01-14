'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { useProducts } from '../context/FetchProductProvider';

export default function Dashboard() {
    const router = useRouter();

    // const router = typeof window !== "undefined" ? useRouter() : null;
    const [productsToDisplay, setProductsToDisplay] = useState([]);
    const [loadMoreBTn, setLoadMoreBtn] = useState("d-block");
    const { products, loading, error } = useProducts();

    useEffect(() => {
        if (products.length > 0 && productsToDisplay.length === 0) {
            setProductsToDisplay(products.slice(0, 4));
        }
    }, [products, productsToDisplay.length]);

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

            <table className="table table-striped">
                <thead class="table-dark py-4">
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
                                    width={100}
                                    height={80}
                                    className="image"
                                    priority
                                    loading="eager"
                                />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.location}</td>
                            <td>${product.price}</td>
                            <td>${product.duration}</td>
                            <td>
                                <div>
                                    <button className="update-button w-50 px-4 py-2" onClick={() => handleTabClick('')}>
                                        Update
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <button className="delete-button w-50 px-4 py-2" onClick={() => handleTabClick('')}>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={`text-center my-4 ${loadMoreBTn}`}>
                <button className="load-more-button" onClick={handleVisibleProducts}>
                    Load more products
                </button>
            </div>

            <style jsx>{`
                .table{
                    width:96%;
                    margin:2rem auto;
                }
                
                .delete-button {
                    background-color: #e60000;
                    color: white;
                    border: none;
                    font-weight: 600;
                    padding: 10px 20px;
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
                    color: black;
                    border: 1px solid #b3b3b3;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
                }

                .update-button:hover {
                    background-color: transparent;
                    color: #b3b3b3;
                    // border: 1px solid black;
                    // transform: scale(1.05);
                    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
                }
            `}</style>
        </>

    );
}
