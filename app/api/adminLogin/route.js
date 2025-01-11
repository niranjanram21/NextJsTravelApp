import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("travel_app_db");

        const { email, password } = await req.json();

        // Validate input
        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Email and password are required!" }), { status: 400 });
        }

        // Check if the admin exists
        const admin = await db.collection("admins").findOne({ email });
        if (!admin) {
            return new Response(JSON.stringify({ error: "Invalid email or password!" }), { status: 401 });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: "Invalid email or password!" }), { status: 401 });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        return new Response(JSON.stringify({ message: "Admin login successful!", token }), { status: 200 });
    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error", details: error.message }),
            { status: 500 }
        );
    }
}
