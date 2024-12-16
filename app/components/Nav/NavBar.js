'use client';

import Link from 'next/link';
import { MdTravelExplore } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { useSidebar } from '../../context/SidebarProvider';
import { useEffect, useState } from 'react';
import "./SideBar.css";

export default function NavBar() {
    const { toggleSidebar, activeTab, updateActiveTab } = useSidebar();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsScrolled(false);
            } else {
                setIsScrolled(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleTabClick = (tabName) => {
        updateActiveTab(tabName);
    };

    return (
        <div
            className={`navbar py-3 navbar-expand-lg position-fixed w-100 z-2 transition-all ${isScrolled ? 'scrolled-navbar' : 'bg-body-transparent'
                }`}
        >
            <div className="container d-flex justify-content-between align-items-center">
                {/* Sidebar Toggle Icon */}
                <RiMenu2Line
                    onClick={toggleSidebar}
                    className="fs-4 text-white toggleButton me-3"
                />
                <Link href="/" className="navbar-brand text-white fs-3 fw-bold d-flex align-items-center">
                    <MdTravelExplore className="travel-logo me-2" />
                    GoTrip
                </Link>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto fw-semibold">
                        <li className="nav-item mx-2">
                            <Link
                                href="/"
                                className={`nav-link ${activeTab === 'Home' ? 'navtabs-color fw-bold' : ''
                                    }`}
                                onClick={() => handleTabClick('Home')}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                href="/destination"
                                className={`nav-link ${activeTab === 'Destinations' ? 'navtabs-color fw-bold' : ''
                                    }`}
                                onClick={() => handleTabClick('Destinations')}
                            >
                                Destinations
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                href="/packages"
                                className={`nav-link ${activeTab === 'Categories' ? 'navtabs-color fw-bold' : ''
                                    }`}
                                onClick={() => handleTabClick('Categories')}
                            >
                                Packages
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                href="/about"
                                className={`nav-link ${activeTab === 'About' ? 'navtabs-color fw-bold' : ''
                                    }`}
                                onClick={() => handleTabClick('About')}
                            >
                                About
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link
                                href="/contact"
                                className={`nav-link ${activeTab === 'Contact' ? 'navtabs-color fw-bold' : ''
                                    }`}
                                onClick={() => handleTabClick('Contact')}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex gap-4">
                        <span>
                            <button className="search-button w-100 px-4 py-2 rounded">Search</button>
                        </span>
                        <Link href="/loginSignup">
                            <button className="signup-button w-100 px-4 py-2 rounded">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
