const fs = require("fs");
const path = require("path");
const connectToDatabase = require("../lib/mongodb");
const Product = require("../models/Product");
require('dotenv').config({ path: '.env.local' });

const importProducts = async () => {
    try {
        await connectToDatabase();

        // Read JSON data
        const jsonFilePath = path.join(process.cwd(), "data/products.json"); // Adjust to your JSON file's location
        const productData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

        // Insert products into the database
        await Product.deleteMany(); // Optional: Clear existing data
        await Product.insertMany(productData);

        console.log("Products have been successfully seeded!");
        process.exit();
    } catch (error) {
        console.error("Error importing products:", error);
        process.exit(1);
    }
};

importProducts();
