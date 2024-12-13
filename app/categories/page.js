'use client';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';
import { useProducts } from '../context/FetchProductProvider';

export default function DestinationPage() {
    const { products, loading, error } = useProducts();

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {/* Background Image */}
            <div className="container-fluid position-fixed bg-container">
                <Image
                    src="/bgImg6.jpg"
                    alt="Background"
                    fill
                    className="blurred-image"
                    loading="eager"
                />
                <div className="overlay"></div>
            </div>

            {/* Products Section */}
            <div className="product-container">
                <Row xs={1} md={2} className="g-4">
                    {products.map((product) => (
                        <Col key={product.id}>
                            <Card
                                className="product-card position-relative z-1"
                                style={{
                                    height: "24rem",
                                    display: "flex",
                                    flexDirection: "row",
                                    overflow: "hidden",
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                }}
                            >
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    className="product-image"
                                    style={{
                                        height: "100%",
                                        objectFit: "cover",
                                        width: "50%",
                                    }}
                                />
                                <div>
                                    {/* Card Content */}
                                    <Card.Body
                                        style={{
                                            flexGrow: 1,
                                            position: "absolute", // Absolute positioning for overlay effect
                                            zIndex: 2, // Correct spelling for React styles
                                            color: "white", // Ensure content is readable over black background
                                            // Add transparency to text background if needed
                                            padding: "1rem",
                                        }}
                                    >
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>
                                        <Card.Link href="#">Card Link</Card.Link>
                                        <Card.Link href="#">Another Link</Card.Link>
                                    </Card.Body>

                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Styles */}
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
                    background: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
                    z-index: 0; /* Place overlay above the background image */
                }
                .product-container {
                    position: relative;
                    z-index: 1;
                    padding: 6rem 8rem;
                    max-width: 80%;
                    margin: auto;
                    border-radius: 10px;
                }
                .product-card {
                    box-shadow: 0 4px 10px 2px rgba(0, 0, 0, 0.5) !important;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .product-image {
                    height: 12rem !important; /* Force image height */
                    object-fit: cover !important;
                    width: 100%;
                }
                @media (max-width: 768px) {
                    .product-container {
                        padding: 4rem 2rem;
                    }
                }
            `}</style>
        </>
    );
}
