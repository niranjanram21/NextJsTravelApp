'use client';

import Image from 'next/image';
import { FaUser } from "react-icons/fa";
import { MdOutlineWifiPassword } from "react-icons/md";
import { MdEmail } from "react-icons/md";

export default function Signup() {
    return (
        <>
            <div className="container-fluid" style={{ height: "100vh", width: "100%" }}>
                <Image
                    src="/bgImg6.jpg"
                    alt="Background"
                    fill
                    className="object-fit-cover blurred-image"
                    loading="eager"
                />
            </div>
            <div className="overlay"></div>
            <div className="container login-container text-center">
                <div className="row g-0">
                    <div className="col-md-5 d-none d-md-block">
                        <Image
                            src="/travellerImg.jpg"
                            alt="traveller"
                            width={600}
                            height={750}
                            className="object-fit-cover"
                            priority
                            style={{ width: "100%" }}
                        />
                    </div>
                    <div className="col-md-7 login-form d-flex justify-content-center align-items-center position-relative">
                        <div className="position-absolute z-3 d-flex flex-column gap-4 align-items-center"
                            style={{ width: "100%", maxWidth: "400px" }}>
                            <div className="input-group mb-3 bg-transparent">
                                <span className="input-group-text text-white px-3 py-3" id="basic-addon1">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    className="form-control px-3 py-3"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="input-group mb-3 rounded-full">
                                <span className="input-group-text text-white px-3 py-3" id="basic-addon1">
                                    <MdEmail />
                                </span>
                                <input
                                    type="text"
                                    className="form-control px-3 py-3"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="input-group mb-3 rounded-full">
                                <span className="input-group-text text-white px-3 py-3" id="basic-addon1">
                                    <MdOutlineWifiPassword />
                                </span>
                                <input
                                    type="text"
                                    className="form-control px-3 py-3"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="w-100 search-button px-3 py-3 rounded">Signup</div>
                        </div>
                    </div>
                </div>
            </div >
            <style jsx>{`
                .login-container {
                    position: absolute;
                    z-index: 2;
                    padding:0;
                    left: 16%;
                    top: 15%;
                    box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.5);
                }
                @media only screen and (max-width:390px){
                    .login-container {
                        padding:0;
                        left: 5%;
                        top: 50%;
                    }
                }
                @media only screen and (max-width:780px){
                    .login-container {
                        padding:0;
                        left: 2%;
                        top: 50%;
                    }
                }
                .login-form {
                    background-color: rgba(0, 0, 0, 0.2); 
                    position: relative; 
                    padding: 20px;
                }
                
                @media only screen and(max-width: 375px){
                    .login-form {
                        background-color: none; 
                    }
                }

                .login-form::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.2);
                    z-index: -1; /* Keeps the background behind the content */
                }

                /* Form input styles */
                .form-control {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    color: white;
                    padding: 5px;
                }

                .input-group-text {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 10px;
                    color: white;
                }

                ::placeholder {
                    color: white;
                    opacity: 0.8;
                }

                .search-button {
                    background-color: rgba(0, 123, 255, 0.8);
                    color: white;
                    font-weight: bold;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .search-button:hover {
                    background-color: rgba(0, 123, 255, 1);
                }

                /* Media queries for responsiveness */
                @media only screen and (max-width: 992px) {
                .login-form {
                    padding: 15px;
                }

                .position-absolute {
                    width: 90%;
                }

                .form-control,
                    .input-group-text {
                    padding: 10px;
                }

                    .search-button {
                    padding: 10px 15px;
                    }
                }

                @media only screen and (max-width: 768px) {
                .login-form {
                    padding: 10px;
                }

                .position-absolute {
                    width: 95%;
                }

                .form-control,
                    .input-group-text {
                    padding: 8px;
                }

                .search-button {
                    padding: 8px 12px;
                    }
                }

                @media only screen and (max-width: 576px) {
                    .login-form {
                    padding: 5px;
                    }

                    .position-absolute {
                    width: 100%;
                    }

                .form-control,
                .input-group-text {
                    padding: 5px;
                    font-size: 0.9rem;
                    }

                .search-button {
                    padding: 5px 10px;
                    font-size: 0.9rem;
                    }
                }
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
                    z-index: 1; /* Place overlay above the image */
                }
                .blurred-image {
                    filter: blur(10px); /* Applies a blur of 5px */
                }
            `}</style>
        </>
    );
}
