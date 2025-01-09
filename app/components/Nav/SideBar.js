'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { MdTravelExplore } from "react-icons/md";
import { useSidebar } from '../../context/SidebarProvider';
import "./SideBar.css";

export default function SideBar() {
    const { isSidebarOpen, toggleSidebar, activeTab, updateActiveTab } = useSidebar();

    const handleTabClick = (tabName) => {
        updateActiveTab(tabName);
        toggleSidebar();
    };

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) {
        return null;
    }


    return (
        <>
            <div className={`sidebar-container h-100 px-2 position-fixed z-5 text-start py-4 shadow-lg ${isSidebarOpen ? 'visible' : 'hidden'}`}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link href="/" className="navbar-brand text-black montserrat-unique-class fs-3 fw-bolder d-flex align-items-center">
                        <MdTravelExplore className="travel-logo me-2" />
                        GoTrip
                    </Link>
                    <RxCross2 onClick={toggleSidebar} className="text-secondary fs-3 fw-bold toggleButton" />
                </div>
                <hr />

                <div className={`inner-overlay ${isSidebarOpen ? 'visible' : 'hidden'}`}></div>

                <ul className="nav nav-pills flex-column mb-auto ">
                    <li className="nav-item">
                        <Link href="/" className={`nav-link  ${activeTab === "Home" ? "navtabs-color fw-bold" : ""}`}
                            onClick={() => handleTabClick("Home")}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/destination" className={`nav-link  ${activeTab === "Destinations" ? "navtabs-color fw-bold" : ""}`}
                            onClick={() => handleTabClick("Destinations")}>
                            Destinations
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/packages" className={`nav-link  ${activeTab === "Categories" ? "navtabs-color fw-bold" : ""}`}
                            onClick={() => handleTabClick("Categories")}>
                            Packages
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/about" className={`nav-link  ${activeTab === "About" ? "navtabs-color fw-bold" : ""}`}
                            onClick={() => handleTabClick("About")}>
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/contact" className={`nav-link  ${activeTab === "Contact" ? "navtabs-color fw-bold" : ""}`}
                            onClick={() => handleTabClick("Contact")}>
                            Contact
                        </Link>
                    </li>
                </ul>
                <hr />
            </div>

            <div
                className={`overlay ${isSidebarOpen ? 'visible' : 'hidden'}`}
                onClick={toggleSidebar}
            ></div>

            <style jsx>{`
                .sidebar-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 350px; /* Sidebar width */
                    height: 100%;
                    background: white;
                    transform: translateX(-100%); /* Hide sidebar by default */
                    transition: transform 0.3s ease-in-out;
                    z-index: 5;
                }

                .sidebar-container.visible {
                    transform: translateX(0); /* Slide in when visible */
                }

                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
                    z-index: 4; /* Ensure overlay is below the sidebar */
                    visibility: hidden; /* Hide overlay by default */
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
                }

                .overlay.visible {
                    visibility: visible; /* Show overlay */
                    opacity: 1;
                }

                .nav-link {
                    z-index: 2; /* Ensure nav links are above the inner overlay */
                    position: relative;
                }

                .toggleButton {
                    cursor: pointer;
                }

                /* Mobile view adjustments */
                @media (max-width: 768px) {
                    .sidebar-container {
                        width: 250px; /* Slightly smaller sidebar on mobile */
                    }
                }
            `}</style>
        </>
    );
}
