import { z } from "zod";

const productSchema = z
  .object({
    productName: z
      .string()
      .trim()
      .min(2, "Product name must contain at least 2 characters"),

    sku: z
      .string()
      .trim()
      .min(2, "SKU is required"),

    category: z
      .string()
      .trim()
      .min(2, "Category is required"),

    price: z
      .number({
        error: "Price must be a number"
      })
      .nonnegative("Price cannot be negative"),

    cost: z
      .number({
        error: "Cost must be a number"
      })
      .nonnegative("Cost cannot be negative"),

    stockQuantity: z
      .number({
        error: "Stock quantity must be a number"
      })
      .int("Stock quantity must be an integer")
      .nonnegative("Stock quantity cannot be negative"),

    reorderLevel: z
      .number({
        error: "Reorder level must be a number"
      })
      .int("Reorder level must be an integer")
      .nonnegative("Reorder level cannot be negative")
  })
  .refine(
    (data) => data.price >= data.cost,
    {
      message: "Price cannot be lower than cost",
      path: ["price"]
    }
  );

export default productSchema;