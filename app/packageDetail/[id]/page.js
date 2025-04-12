"use client";

import Card from "react-bootstrap/Card";
import Image from "next/image";
import { IoMdTime } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { useProducts } from "../../context/FetchProductProvider";
import { useRouter } from "next/navigation";

export default function PackageDetail({ params }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const { id } = params;
  const { products } = useProducts();

  const selectedProduct = products.find((product) => product.id === parseInt(id));

  if (!selectedProduct) return <p>Loading...</p>;

  const handleSubmitInquiry = (id) => {
    router.push(`/packageInquire/${id}`);
  };

  return (
    <>
      <div className="container-fluid position-fixed bg-container">
        <Image src="/bgImg4.jpg" alt="Background" fill className="blurred-image" loading="lazy" />
        <div className="overlay"></div>
      </div>

      <div className="product-container">
        <Card
          className="product-card position-relative z-1"
          style={{ height: "30rem", backgroundColor: "#121212" }}
        >
          <div className="d-flex" style={{ height: "100%" }}>
            <Card.Img
              variant="top"
              src={selectedProduct.image}
              style={{ objectFit: "cover", width: "50%", height: "100%" }}
            />

            <Card.Body
              className="d-flex flex-column"
              style={{ padding: "1rem 2rem", color: "white", flex: "1" }}
            >
              <div className="fs-4 fw-bold mb-3" style={{ color: "#179ae0" }}>
                {selectedProduct.title}
              </div>
              <div>
                <MdLocationOn className="mb-1" /> {selectedProduct.location}
              </div>
              <div className=" my-1 fs-5">
                <span className="fs-6 me-2" style={{ color: "#179ae0" }}>
                  Price:
                </span>
                ${selectedProduct.price} <span className="fw-light fs-6">/person</span>
              </div>
              <div className=" my-1 fs-5">
                <span className="fs-6 me-2" style={{ color: "#179ae0" }}>
                  Duration:
                </span>
                <IoMdTime className="mb-1" /> {selectedProduct.duration}
              </div>
              <div className="my-3">{selectedProduct.description}</div>
              <div className="my-3">{selectedProduct.detailedDescription}</div>
              <div className="d-flex gap-4 mt-auto">
                <button className="wishlist-button w-100 px-3 py-2 rounded">Wishlist</button>
                <button
                  className="book-button w-100 px-3 py-2 rounded"
                  onClick={handleSubmitInquiry(selectedProduct.id)}
                >
                  Submit Inquiry
                </button>
              </div>
            </Card.Body>
          </div>
        </Card>
        ))
      </div>

      <style jsx>{`
            .bg-container {
            height: 100vh;
            width: 100%;
            overflow: hidden;
            }
            .blurred-image {
            object-fit: cover;
            filter: blur(4px);
            z-index: -1;
            }
            .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 0;
            }
            .product-container {
            position: relative;
            z-index: 1;
            padding: 12rem 12rem;
            max-width: 90%;
            margin: auto;
            border-radius: 10px;
            }
            .product-card {
            box-shadow: 5px 10px 18px red;   !important;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            }
            .product-image {
            height: 12rem !important;
            object-fit: cover !important;
            width: 100%;
            }
            .price-tag{
            background-color: #e04b17;
            color:white;
            font-weight:bold;
            }
            .trip-details{
            width:50%;
            background-color: #179ae0;
            color:white;
            }
            .book-button {
            background-color: transparent;
            font-size:14px;
            color: white;
            border: 1px solid #e04b17;
            font-weight: 600;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.4s ease, transform 0.3s ease;
            }
            .book-button:hover {
            background-color: #e04b17;
            color: white;
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
            }
            .wishlist-button {
            background-color: transparent;
            font-size:14px;
            color: white;
            border: 1px solid white;
            font-weight: 600;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
            }
            .wishlist-button:hover {
            background-color: white;
            color: black;
            border: 1px solid white;
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
            }
            .load-more-button {
            background-color: white;
            color: black;
            border: none;
            font-weight: 600;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.4s ease, border 0.4s ease, transform 0.3s ease;
            }
            .load-more-button:hover {
            background-color: transparent;
            color: white;
            border: 1px solid white;
            transform: scale(1.05);
            box-shadow: 0 4px 10px rgba(255, 255, 255, 0.15);
            }
            @media (max-width: 768px) {
                .product - container {
                padding: 4rem 2rem;
                }
            }
            `}</style>
    </>
  );
}
