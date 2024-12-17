import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db("travel_app_db");

        const products = await db.collection("products").find({}).sort({ id: 1 }).toArray();
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);

        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
