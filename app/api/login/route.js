import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        console.log("Parsing request body...");
        const { email, password } = await req.json();

        if (!email || !password) {
            console.error("Missing fields:", { email, password });
            return new Response(JSON.stringify({ error: "All fields are required!" }), { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email }); 

        if (!user) {
            console.error("User not found:", email);
            return new Response(JSON.stringify({ error: "User does not exist!" }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("Password mismatch for user:", email);
            return new Response(JSON.stringify({ error: "Invalid credentials!" }), { status: 401 });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Login successful!");
        return new Response(JSON.stringify({ message: "Login successful!", token }), { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}
