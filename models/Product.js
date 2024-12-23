import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    detailedDescription: { type: String, required: true },
});

// Export the model (or reuse if already compiled)
export default mongoose.models.Product || mongoose.model("Product", productSchema);
