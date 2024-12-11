'use client';

import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import fs from "fs";
import path from "path";

const importProducts = async () => {
    try {
        await connectToDatabase();

        const filePath = path.join(process.cwd(), "data/products.json");
        const productData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        await Product.deleteMany();
        console.log("Cleared existing products from the database.");

        await Product.insertMany(productData);
        console.log("Products seeded successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

importProducts();
