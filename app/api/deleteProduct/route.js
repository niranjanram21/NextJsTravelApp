import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        console.log("Received ID:", id);

        if (!id) {
            console.log("No ID provided");
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
        }

        if (!ObjectId.isValid(id)) {
            console.log("Invalid ObjectId format:", id);
            return NextResponse.json({ message: "Invalid ObjectId format" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("travel_app_db");

        const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

        console.log("Delete result:", result);

        if (result.deletedCount === 0) {
            console.log("No matching product found for ID:", id);
            return NextResponse.json({ message: "No product found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { message: "Internal Server Error" }, 
            { status: 500 });
    }
}

