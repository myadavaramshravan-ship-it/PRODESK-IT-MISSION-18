import mongoose from "mongoose";
import Product from "../models/Product.js";

export const getInventory = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 50,
      search = "",
      category = "",
      minPrice,
      maxPrice,
      maxStock,
      sort = "-lastUpdated"
    } = req.query;

    page = Math.max(Number(page), 1);
    limit = Math.min(Math.max(Number(limit), 1), 100);

    const filter = {};

    const normalizedSearch = String(search ?? "").trim();
    const normalizedCategory = String(category ?? "").trim();
    const minPriceValue = minPrice !== undefined && minPrice !== null && String(minPrice).trim() !== "" ? Number(minPrice) : null;
    const maxPriceValue = maxPrice !== undefined && maxPrice !== null && String(maxPrice).trim() !== "" ? Number(maxPrice) : null;
    const maxStockValue = maxStock !== undefined && maxStock !== null && String(maxStock).trim() !== "" ? Number(maxStock) : null;

    if (normalizedSearch) {
      filter.$or = [
        {
          productName: {
            $regex: normalizedSearch,
            $options: "i"
          }
        },
        {
          sku: {
            $regex: normalizedSearch,
            $options: "i"
          }
        }
      ];
    }

    if (normalizedCategory) {
      filter.category = normalizedCategory;
    }

    if (minPriceValue !== null || maxPriceValue !== null) {
      filter.price = {};

      if (minPriceValue !== null) {
        filter.price.$gte = minPriceValue;
      }

      if (maxPriceValue !== null) {
        filter.price.$lte = maxPriceValue;
      }
    }

    if (maxStockValue !== null) {
      filter.stockQuantity = {
        $lte: maxStockValue
      };
    }

    const skip = (page - 1) * limit;

    const allowedSortFields = [
  "productName",
  "sku",
  "category",
  "price",
  "cost",
  "stockQuantity",
  "reorderLevel",
  "lastUpdated"
];

const requestedSort = sort.startsWith("-")
  ? sort.substring(1)
  : sort;

const sortDirection = sort.startsWith("-")
  ? -1
  : 1;

const sortOptions = {};

if (allowedSortFields.includes(requestedSort)) {
  sortOptions[requestedSort] = sortDirection;
} else {
  sortOptions.lastUpdated = -1;
}

    const [products, totalRecords] = await Promise.all([
      Product.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalRecords / limit);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};


export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};


export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};