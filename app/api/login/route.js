import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "All fields are required!" }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("travel_app_db");

        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return new Response(JSON.stringify({ error: "User does not exist!" }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: "Invalid credentials!" }), { status: 401 });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return new Response(JSON.stringify({ message: "Login successful!", token }), { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), { status: 500 });
    }
}
