'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/adminLogin");
        }

        // Optionally, you can validate the token by calling a backend API
        // Example:
        // fetch('/api/validateToken', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${token}`,
        //   },
        // }).then(response => {
        //   if (!response.ok) router.push('/admin-login');
        // });
    }, [router]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard!</p>
        </div>
    );
}
