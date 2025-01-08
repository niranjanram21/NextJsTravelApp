'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const FetchBlogsContext = createContext();

export const FetchBlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBlogs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <FetchBlogsContext.Provider value={{ blogs, loading, error }}>
            {children}
        </FetchBlogsContext.Provider>
    );
};

export const useBlogs = () => {
    const context = useContext(FetchBlogsContext);

    if (!context) {
        throw new Error(
            'useBlogs must be used within a FetchBlogProvider'
        );
    }

    return context;
};
