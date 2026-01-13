const Product = require("../models/productModel");

// ==========================
// Get All Unique Categories
// ==========================
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch categories -BE",
            error: error.message,
        });
    }
};

// ==========================
// Get Products by Category
// ==========================
exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;

        const products = await Product.find({
            category: { $regex: new RegExp(`^${categoryName}$`, "i") },
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to fetch products for category -BE: ${req.params.categoryName}`,
            error: error.message,
        });
    }
};
