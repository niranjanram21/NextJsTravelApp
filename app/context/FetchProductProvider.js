'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const FetchProductsContext = createContext();

export const FetchProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

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
    }, []);

    return (
        <FetchProductsContext.Provider value={{ products, loading, error, selectedId, setSelectedId }}>
            {children}
        </FetchProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(FetchProductsContext);

    if (!context) {
        throw new Error(
            'useProducts must be used within a FetchProductProvider'
        );
    }

    return context;
};
