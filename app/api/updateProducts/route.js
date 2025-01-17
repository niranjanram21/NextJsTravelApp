import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        const client = await clientPromise;
        const db = client.db("travel_app_db");
        const body = await req.json();

        const { _id, updatedData } = body;

        // Debug logs
        console.log("Received _id:", _id);
        console.log("Updated Data:", updatedData);

        // Validate ObjectId
        if (!ObjectId.isValid(_id)) {
            console.error("Invalid ObjectId:", _id);
            return new NextResponse(
                JSON.stringify({ message: "Invalid ObjectId provided." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const result = await db.collection("Products").updateOne(
            { _id: new ObjectId(_id) },
            { $set: updatedData }
        );

        console.log("Update result:", result);

        if (result.matchedCount === 0) {
            console.warn("No document matched with the given _id.");
            return new NextResponse(
                JSON.stringify({
                    message: "No product updated. Check if the ID exists.",
                }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return NextResponse.json({ message: "Product updated successfully!" });
    } catch (error) {
        console.error("Error updating product:", error);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
