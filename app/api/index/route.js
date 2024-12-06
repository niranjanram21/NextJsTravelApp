import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI); // Log the URI

        const client = await clientPromise;
        const db = client.db("travel_app_db");

        const collections = await db.listCollections().toArray();
        return new Response(
            JSON.stringify({ message: "Connected to MongoDB", collections }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error connecting to MongoDB:", error); // Log the error
        return new Response(
            JSON.stringify({ error: "Unable to connect to MongoDB", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
