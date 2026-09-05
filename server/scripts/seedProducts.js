import dotenv from "dotenv";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const TOTAL_PRODUCTS = 50000;
const BATCH_SIZE = 1000;

const categories = [
  "Electronics",
  "Apparel",
  "Home & Kitchen",
  "Sports",
  "Office",
  "Beauty",
  "Grocery",
  "Toys",
  "Automotive",
  "Accessories"
];

const generateProduct = (index) => {
  const cost = Number(
    faker.commerce.price({
      min: 5,
      max: 2000,
      dec: 2
    })
  );

  const price = Number(
    (cost * faker.number.float({
      min: 1.1,
      max: 1.8,
      fractionDigits: 2
    })).toFixed(2)
  );

  const stockQuantity = faker.number.int({
    min: 0,
    max: 500
  });

  const reorderLevel = faker.number.int({
    min: 5,
    max: 100
  });

  return {
    productName: faker.commerce.productName(),

    sku: `AURA-${String(index + 1).padStart(6, "0")}`,

    category: faker.helpers.arrayElement(categories),

    price,

    cost,

    stockQuantity,

    reorderLevel,

    lastUpdated: faker.date.recent({
      days: 30
    })
  };
};

const seedProducts = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB.");
    console.log(`Starting seed of ${TOTAL_PRODUCTS} products...`);

    await Product.deleteMany({});

    console.log("Existing products cleared.");

    for (let start = 0; start < TOTAL_PRODUCTS; start += BATCH_SIZE) {
      const products = [];

      const end = Math.min(
        start + BATCH_SIZE,
        TOTAL_PRODUCTS
      );

      for (let i = start; i < end; i++) {
        products.push(generateProduct(i));
      }

      await Product.insertMany(products);

      console.log(
        `Inserted ${end.toLocaleString()} / ${TOTAL_PRODUCTS.toLocaleString()} products`
      );
    }

    const totalProducts = await Product.countDocuments();

    console.log("----------------------------------");
    console.log("Seeding completed successfully.");
    console.log(`Total products: ${totalProducts}`);
    console.log("----------------------------------");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedProducts();