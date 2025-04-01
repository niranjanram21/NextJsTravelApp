import cloudinary from "cloudinary";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import fs from "fs/promises"; // Use fs.promises for async operations
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("travel_app_db");
        const formData = await req.formData();

        const title = formData.get("title");
        const location = formData.get("location");
        const price = formData.get("price");
        const duration = formData.get("duration");
        const description = formData.get("description");
        const detailedDescription = formData.get("detailedDescription");
        const imageFile = formData.get("image");

        let newProduct = { title, location, price, duration, description, detailedDescription };

        if (imageFile && typeof imageFile === "object") {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}_${imageFile.name}`;
            const filePath = path.join(process.cwd(), "public/images", fileName);

            await fs.mkdir(path.dirname(filePath), { recursive: true });

            await fs.writeFile(filePath, buffer);

            newProduct.image = `/images/${fileName}`;
        }

        const result = await db.collection("products").insertOne(newProduct);
        const addedProduct = await db.collection("products").findOne({ _id: result.insertedId });

        return NextResponse.json(addedProduct, { status: 201 });

    } catch (error) {
        console.error("Error adding product:", error);

        return NextResponse.json(
            { message: "Internal server error", error: error.message },
            { status: 500 }
        );
    }
}
