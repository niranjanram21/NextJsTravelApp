import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db("travel_app_db");

        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return new Response(JSON.stringify({ error: "All fields are required!" }), { status: 400 });
        }

        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "User already exists!" }), { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            email,
            password: hashedPassword,
        };

        await db.collection("users").insertOne(newUser);

        return new Response(JSON.stringify({ message: "User registered successfully!" }), { status: 201 });
    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error", details: error.message }),
            { status: 500 }
        );
    }
}
