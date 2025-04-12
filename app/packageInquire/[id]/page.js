"use client";

import { useProducts } from "@/app/context/FetchProductProvider";
import Image from "next/image";
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

export default function PackageInquiry({ params }) {
  const { id } = params;
  const { products } = useProducts();

  const selectedProduct = products.find((product) => product.id === parseInt(id));

  return (
    <>
      <div className="container-fluid" style={{ height: "100vh", width: "100%" }}>
        <Image
          src="/bgImg9.jpg"
          alt="Background"
          fill
          className="object-fit-cover blurred-image"
          loading="eager"
        />
      </div>
      <div className="overlay"></div>
      {selectedProduct && (
        <div className="container login-container text-center">
          <div className="row g-0">
            <div className="col-md-6">
              <Image
                src={selectedProduct.image}
                alt="traveller"
                width={600}
                height={750}
                className="object-fit-cover"
                priority
                style={{ width: "100%", height: "400px" }}
              />
              <div className="text-white">
                <div>{selectedProduct.title}</div>
                <div>
                  <MdLocationOn className="mb-1" /> {selectedProduct.location}
                </div>
                <div className=" my-1 fs-5">
                  <span className="fs-6 me-2" style={{ color: "#179ae0" }}>
                    Price:
                  </span>
                  ${selectedProduct.price} <span className="fw-light fs-6">/person</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 login-form d-flex justify-content-center align-items-center position-relative">
              <div
                className="d-flex flex-column gap-4 align-items-center"
                style={{ width: "100%", maxWidth: "400px" }}
              >
                <div className="text-center head-line fs-2 fw-bold">Admin Login</div>

                <div className="input-group mb-3 bg-transparent">
                  <span className="input-group-text text-white px-3 py-3"></span>
                  <input type="text" className="form-control px-3 py-3" placeholder="Username" />
                </div>

                <div className="input-group mb-3 rounded-full">
                  <span className="input-group-text text-white px-3 py-3"></span>
                  <input type="email" className="form-control px-3 py-3" placeholder="Email" />
                </div>
                <div className="input-group mb-3 rounded-full">
                  <span className="input-group-text text-white px-3 py-3"></span>
                  <input
                    type="password"
                    className="form-control px-3 py-3"
                    placeholder="Password"
                  />
                </div>
                <div className="w-100 search-button px-3 py-3"></div>
                <div className="text-white">
                  <span>
                    Already have an account, <span className="login-tab fw-semibold">Login</span>
                  </span>

                  <span>
                    Don&apos;t have an account,{" "}
                    <span className="login-tab fw-semibold">Register</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .login-container {
          position: absolute;
          z-index: 2;
          padding: 0;
          left: 16%;
          top: 15%;
          box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.5);
        }
        .head-line {
          color: #e04b17;
        }
        .login-tab {
          color: #e04b17;
          cursor: pointer;
        }
        .login-form {
          background-color: rgba(0, 0, 0, 0.2);
          position: relative;
          padding: 20px;
        }
        .login-form::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.2);
          z-index: -1;
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
          background: rgba(0, 0, 0, 0.7);
          z-index: 1;
        }
        .blurred-image {
          filter: blur(10px);
        }
      `}</style>
    </>
  );
}
