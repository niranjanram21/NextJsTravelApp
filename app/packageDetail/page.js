import { useRouter } from 'next/router';
import { useProducts } from '../../context/FetchProductProvider';

export default function PackageDetail() {
    const router = useRouter();
    const { id } = router.query; // Get the ID from the route parameters
    const { products } = useProducts();

    const selectedProduct = products.find((product) => product.id === parseInt(id));

    if (!selectedProduct) return <p>Loading...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{selectedProduct.title}</h1>
            <img src={selectedProduct.image} alt={selectedProduct.title} style={{ maxWidth: '400px', height: 'auto' }} />
            <p>{selectedProduct.description}</p>
            <p>Duration: {selectedProduct.duration}</p>
            <p>Location: {selectedProduct.location}</p>
            <p>Price: ${selectedProduct.price}</p>
        </div>
    );
}
