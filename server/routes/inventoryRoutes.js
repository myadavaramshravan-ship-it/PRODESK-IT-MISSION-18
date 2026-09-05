import express from "express";

import {
  getInventory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/inventoryController.js";

import validate from "../middleware/validate.js";
import productSchema from "../validators/productValidator.js";

const router = express.Router();

router.get("/", getInventory);
router.get("/:id", getProductById);

router.post(
  "/",
  validate(productSchema),
  createProduct
);

router.put(
  "/:id",
  validate(productSchema),
  updateProduct
);

router.delete(
  "/:id",
  deleteProduct
);

export default router;