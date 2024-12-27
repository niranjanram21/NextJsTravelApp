'use client';

import Image from 'next/image';
import { FaUser } from "react-icons/fa";
import { MdOutlineWifiPassword } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {

    const [loginState, setLoginState] = useState('Signup');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(data.message);
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Something went wrong!");
        }
    };
    const handleLogin = async () => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                localStorage.setItem('token', data.token);
                router.push('/');
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleLoginStateChange = () => {
        setLoginState((prevState) => (prevState === 'Signup' ? 'Login' : 'Signup'));
    };

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
                            style={{ width: "100%", height: "700px" }}
                        />
                    </div>
                    <div className="col-md-7 login-form d-flex justify-content-center align-items-center position-relative">
                        <div className="d-flex flex-column gap-4 align-items-center"
                            style={{ width: "100%", maxWidth: "400px" }}>
                            <div className="text-center head-line fs-2 fw-bold">
                                Travel around the world!
                            </div>
                            {loginState == "Signup" ? <div className="input-group mb-3 bg-transparent">
                                <span className="input-group-text text-white px-3 py-3">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    className="form-control px-3 py-3"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div> : <></>}
                            <div className="input-group mb-3 rounded-full">
                                <span className="input-group-text text-white px-3 py-3">
                                    <MdEmail />
                                </span>
                                <input
                                    type="email"
                                    className="form-control px-3 py-3"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group mb-3 rounded-full">
                                <span className="input-group-text text-white px-3 py-3">
                                    <MdOutlineWifiPassword />
                                </span>
                                <input
                                    type="password"
                                    className="form-control px-3 py-3"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div
                                className="w-100 search-button px-3 py-3"
                                onClick={loginState === "Signup" ? handleSignup : handleLogin}
                            >
                                {loginState}
                            </div>
                            <div className='text-white'>{loginState == "Signup" ? <span>Already have an account, <span className='login-tab fw-semibold' onClick={handleLoginStateChange}>Login</span></span>
                                : <span>Don`&apos;t have an account, <span className='login-tab fw-semibold' onClick={handleLoginStateChange}>Resgister</span></span>}</div>
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
                        left: 5%;
                        top: 20%;
                        box-shadow: none;
                    }
                }
                @media only screen and (max-width:768px){
                    .login-container {
                        left: 5%;
                        top: 15%;
                        box-shadow: none;
                    }
                }
                @media only screen and (max-width:1280px){
                    .login-container {
                        left: 3%;
                        top: 15%;
                        box-shadow: none;
                    }
                }
                .head-line{
                    color:#e04b17;
                }
                .login-tab{
                    color:#e04b17;
                    cursor:pointer;
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
                .form-control {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 50px;
                    color: white;
                    padding: 5px;
                }
                .input-group-text {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 50px;
                    padding: 10px;
                    color: white;
                }
                ::placeholder {
                    color: white;
                    opacity: 0.8;
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
