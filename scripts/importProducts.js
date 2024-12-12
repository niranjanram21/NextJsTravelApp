import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

const importProducts = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined. Please check your .env.local file.");
        }

        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const filePath = path.join(process.cwd(), "data/products.json");
        const productData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        await Product.deleteMany();
        console.log("Cleared existing products from the database.");

        await Product.insertMany(productData);
        console.log("Products seeded successfully!");

        // await Promise.all(
        //     productData.map(async (product) => {
        //         await Product.updateOne(
        //             { id: product.id },
        //             { $set: product }, 
        //             { upsert: true }
        //         );
        //     })
        // );

        process.exit(0);
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    } finally {
        mongoose.connection.close();
    }
};

importProducts();
