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
    const [isReady, setIsReady] = useState(false);

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

    useEffect(() => {
        setIsReady(true);
    }, []);

    const handleTabClick = (tabName) => {
        updateActiveTab(tabName);
    };

    if (!isReady) {
        return null;
    }

    return (
        <div
            className={`navbar py-3 mt-4 navbar-expand-lg position-fixed z-4 transition-all ${isScrolled ? 'scrolled-navbar' : 'bg-body-transparent'
                }`}
        >
            <div className="container d-flex justify-content-between align-items-center">
                <RiMenu2Line
                    onClick={toggleSidebar}
                    className="navbar-brand fs-2 toggleButton me-3"
                />
                <Link href="/" className="navbar-brand montserrat-unique-class fs-3 fw-bolder d-flex align-items-center">
                    <MdTravelExplore className="travel-logo me-2" />
                    GoTrip
                </Link>

                <div className="collapse navbar-collapse poppins-medium">
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
                                href="/blogs"
                                className={`nav-link ${activeTab === 'About' ? 'navtabs-color fw-bold' : ''
                                    }`}
                                onClick={() => handleTabClick('About')}
                            >
                                Blogs
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
                            <button className="search-button w-100 px-4 py-2" onClick={() => handleTabClick('')}>Search</button>
                        </span>
                        <Link href="/loginSignup">
                            <button className="signup-button w-100 px-4 py-2" onClick={() => handleTabClick('')}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}
