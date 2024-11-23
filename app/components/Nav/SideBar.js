'use client';

import Link from 'next/link';
import { RxCross2 } from "react-icons/rx";
import { MdTravelExplore } from "react-icons/md";
import { useSidebar } from '../../context/SidebarProvider';
import "./SideBar.css";

export default function SideBar() {
    const { isSidebarOpen, toggleSidebar, activeTab, updateActiveTab } = useSidebar();

    const handleTabClick = (tabName) => {
        updateActiveTab(tabName); // Update the active tab in context
    };

    return (
        <div className={`sidebar-container h-100 px-2 position-absolute z-3 bg-body-tertiary text-start py-4 shadow-lg ${isSidebarOpen ? 'visible' : 'hidden'}`}>
            {/* Sidebar Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link href="/" className="navbar-brand fs-3 fw-bold d-flex align-items-center">
                    <MdTravelExplore className="text-primary me-2" />
                    GoTrip
                </Link>
                <RxCross2 onClick={toggleSidebar} className="fs-3 fw-bold toggleButton" />
            </div>
            <hr />

            {/* Sidebar Navigation Links */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link href="/" className={`nav-link ${activeTab === "Home" ? "text-primary fw-bold" : ""}`}
                        onClick={() => handleTabClick("Home")}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/destination" className={`nav-link ${activeTab === "Destinations" ? "text-primary fw-bold" : ""}`}
                        onClick={() => handleTabClick("Destinations")}>
                        Destinations
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/categories" className={`nav-link ${activeTab === "Categories" ? "text-primary fw-bold" : ""}`}
                        onClick={() => handleTabClick("Categories")}>
                        Categories
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/about" className={`nav-link ${activeTab === "About" ? "text-primary fw-bold" : ""}`}
                        onClick={() => handleTabClick("About")}>
                        About
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/contact" className={`nav-link ${activeTab === "Contact" ? "text-primary fw-bold" : ""}`}
                        onClick={() => handleTabClick("Contact")}>
                        Contact
                    </Link>
                </li>
            </ul>
            <hr />
        </div>
    );
}
