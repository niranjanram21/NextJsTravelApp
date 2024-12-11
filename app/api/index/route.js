import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        // Await the resolved MongoDB client
        const client = await clientPromise;

        // Access the 'travel_app_db' database
        const db = client.db("travel_app_db");

        // Fetch the collections in the database
        const collections = await db.listCollections().toArray();

        // Respond with a success message
        return new Response(
            JSON.stringify({ message: "Connected to MongoDB", collections }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return new Response(
            JSON.stringify({ error: "Unable to connect to MongoDB", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
    