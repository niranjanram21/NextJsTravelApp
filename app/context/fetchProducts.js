'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const fetchProductsContext = createContext();

export const fetchProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState('true');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        }
        fetchProducts();
    }, [])

    return (
        <fetchProductsContext.Provider value={{ products, loading, error }}>
            {children}
        </fetchProductsContext.Provider>
    )
}

export const useProducts = () => {
    const context = useContext(FetchProductsContext);

    if (!context) {
        throw new Error(
            "useProducts must be used within a FetchProductsProvider"
        );
    }

    return context;
};