'use client';

import Link from 'next/link';
import { MdTravelExplore } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { useSidebar } from '../../context/SidebarProvider';
import "./SideBar.css";

export default function NavBar() {
    const { toggleSidebar, activeTab, updateActiveTab } = useSidebar();

    const handleTabClick = (tabName) => {
        updateActiveTab(tabName); // Update the active tab in context
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-transparent position-absolute w-100 z-2">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Sidebar Toggle Icon */}
                <RiMenu2Line onClick={toggleSidebar} className="fs-4 toggleButton me-3" />
                <Link href="/" className="navbar-brand fs-3 fw-bold d-flex align-items-center">
                    <MdTravelExplore className="text-primary me-2" />
                    GoTrip
                </Link>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto fw-semibold">
                        <li className="nav-item mx-2">
                            <Link href="/" className={`nav-link ${activeTab === "Home" ? "text-primary fw-bold" : ""}`}
                                onClick={() => handleTabClick("Home")}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link href="/destinations" className={`nav-link ${activeTab === "Destinations" ? "text-primary fw-bold" : ""}`}
                                onClick={() => handleTabClick("Destinations")}>
                                Destinations
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link href="/categories" className={`nav-link ${activeTab === "Categories" ? "text-primary fw-bold" : ""}`}
                                onClick={() => handleTabClick("Categories")}>
                                Categories
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link href="/about" className={`nav-link ${activeTab === "About" ? "text-primary fw-bold" : ""}`}
                                onClick={() => handleTabClick("About")}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link href="/contact" className={`nav-link ${activeTab === "Contact" ? "text-primary fw-bold" : ""}`}
                                onClick={() => handleTabClick("Contact")}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
