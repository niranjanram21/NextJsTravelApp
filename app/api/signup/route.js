import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectToDatabase();

        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return new Response(JSON.stringify({ error: "All fields are required!" }), { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "User already exists!" }), { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return new Response(JSON.stringify({ message: "User registered successfully!" }), { status: 201 });
    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error", details: error.message }),
            { status: 500 }
        );
    }
}
