import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },

    sku: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    cost: {
      type: Number,
      required: true,
      min: 0
    },

    stockQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    reorderLevel: {
      type: Number,
      required: true,
      min: 0
    },

    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Required indexes
productSchema.index({ sku: 1 }, { unique: true });
productSchema.index({ category: 1 });
productSchema.index({ productName: 1 });
productSchema.index({ stockQuantity: 1 });

// Useful indexes for common inventory queries
productSchema.index({ price: 1 });
productSchema.index({ lastUpdated: -1 });

const Product = mongoose.model("Product", productSchema);

export default Product;