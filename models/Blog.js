import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    username: { type: String, required: true },
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
