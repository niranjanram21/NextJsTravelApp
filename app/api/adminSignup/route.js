import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("travel_app_db");

        const { username, email, password, adminKey } = await req.json();

        // Security: Validate the admin key
        const validAdminKey = process.env.ADMIN_SIGNUP_KEY; // Store securely in environment variables
        if (adminKey !== validAdminKey) {
            return new Response(JSON.stringify({ error: "Unauthorized access!" }), { status: 403 });
        }

        // Validate required fields
        if (!username || !email || !password) {
            return new Response(JSON.stringify({ error: "All fields are required!" }), { status: 400 });
        }

        // Check if admin already exists
        const existingAdmin = await db.collection("admins").findOne({ email });
        if (existingAdmin) {
            return new Response(JSON.stringify({ error: "Admin already exists!" }), { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin object
        const newAdmin = {
            username,
            email,
            password: hashedPassword,
            role: "admin",
            createdAt: new Date(),
        };

        // Insert the new admin into the admins collection
        await db.collection("admins").insertOne(newAdmin);

        return new Response(JSON.stringify({ message: "Admin registered successfully!" }), { status: 201 });
    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error", details: error.message }),
            { status: 500 }
        );
    }
}
