import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const client = await clientPromise;
        const db = client.db("travel_app_db");

        const blogs = await db.collection("blogs").find({}).sort({ id: 1 }).toArray();
        return NextResponse.json(blogs);
    } catch (error) {
        console.error("Error fetching products:", error);

        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
 