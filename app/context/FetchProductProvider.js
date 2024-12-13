'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const FetchProductsContext = createContext();

// Provider Component
export const FetchProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Boolean value for loading
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array to fetch only on mount

    return (
        <FetchProductsContext.Provider value={{ products, loading, error }}>
            {children}
        </FetchProductsContext.Provider>
    );
};

// Custom Hook to Consume the Context
export const useProducts = () => {
    const context = useContext(FetchProductsContext);

    if (!context) {
        throw new Error(
            'useProducts must be used within a FetchProductProvider'
        );
    }

    return context;
};
