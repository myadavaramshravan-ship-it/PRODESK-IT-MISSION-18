import Product from "../models/Product.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const [
      summary,
      restockPriority,
      categoryDistribution
    ] = await Promise.all([
      // -----------------------------------
      // KPI SUMMARY
      // -----------------------------------
      Product.aggregate([
        {
          $match: {
            price: {
              $exists: true,
              $ne: null
            },
            stockQuantity: {
              $gte: 0
            }
          }
        },
        {
          $group: {
            _id: null,

            totalSKUs: {
              $sum: 1
            },

            totalInventoryValue: {
              $sum: {
                $multiply: [
                  "$price",
                  "$stockQuantity"
                ]
              }
            },

            outOfStockItems: {
              $sum: {
                $cond: [
                  {
                    $eq: ["$stockQuantity", 0]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            totalSKUs: 1,
            totalInventoryValue: {
              $round: [
                "$totalInventoryValue",
                2
              ]
            },
            outOfStockItems: 1
          }
        }
      ]),

      // -----------------------------------
      // TOP 10 RESTOCK PRIORITY
      // -----------------------------------
      Product.aggregate([
        {
          $match: {
            stockQuantity: {
              $gte: 0
            }
          }
        },
        {
          $sort: {
            stockQuantity: 1
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            _id: 0,
            productName: 1,
            sku: 1,
            category: 1,
            stockQuantity: 1,
            reorderLevel: 1
          }
        }
      ]),

      // -----------------------------------
      // CATEGORY INVENTORY VALUATION
      // -----------------------------------
      Product.aggregate([
        {
          $match: {
            category: {
              $exists: true,
              $ne: null
            },
            price: {
              $exists: true,
              $ne: null
            },
            stockQuantity: {
              $gte: 0
            }
          }
        },
        {
          $group: {
            _id: "$category",

            totalProducts: {
              $sum: 1
            },

            totalStock: {
              $sum: "$stockQuantity"
            },

            totalValue: {
              $sum: {
                $multiply: [
                  "$price",
                  "$stockQuantity"
                ]
              }
            }
          }
        },
        {
          $project: {
            _id: 0,

            category: "$_id",

            totalProducts: 1,

            totalStock: 1,

            totalValuation: {
              $round: [
                "$totalValue",
                2
              ]
            },

            totalValue: {
              $round: [
                "$totalValue",
                2
              ]
            }
          }
        },
        {
          $sort: {
            totalValue: -1
          }
        }
      ])
    ]);

    res.status(200).json({
      success: true,

      data: {
        summary: summary[0] || {
          totalSKUs: 0,
          totalInventoryValue: 0,
          outOfStockItems: 0
        },

        restockPriority,

        categoryDistribution
      }
    });
  } catch (error) {
    next(error);
  }
};