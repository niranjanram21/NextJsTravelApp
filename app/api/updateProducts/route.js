import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

export async function PUT(req) {
    try {
        const client = await clientPromise;
        const db = client.db("travel_app_db");

        // Parse formData from the request
        const formData = await req.formData();

        // Extract fields from the form data
        const _id = formData.get("_id");
        const title = formData.get("title");
        const location = formData.get("location");
        const price = parseFloat(formData.get("price"));
        const duration = formData.get("duration");
        const description = formData.get("description");
        const detailedDescription = formData.get("detailedDescription");
        const imageFile = formData.get("image");

        // Debug logs
        console.log("Received _id:", _id);
        console.log("Received Image:", imageFile);

        // Validate ObjectId
        if (!ObjectId.isValid(_id)) {
            return NextResponse.json(
                { message: "Invalid ObjectId provided." },
                { status: 400 }
            );
        }

        let updateFields = { title, location, price, duration, description, detailedDescription };

        if (imageFile && typeof imageFile === "object") {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}_${imageFile.name}`;
            const filePath = path.join(process.cwd(), "public/images", fileName);

            fs.writeFileSync(filePath, buffer);

            updateFields.image = `/images/${fileName}`;
        } else {
            updateFields.image = formData.get("existingImage");
        }


        // Update the product in MongoDB
        const result = await db.collection("products").updateOne(
            { _id: new ObjectId(_id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: "No product updated. Check if the ID exists." },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Product updated successfully!" });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
