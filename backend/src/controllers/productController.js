const Product = require("../models/productModel");

// ==========================
// Create Product (Admin)
// ==========================
exports.createProduct = async (req, res) => {
    try {
        // Product validation
        const {
            title,
            description,
            category,
            brand,
            price,
            discountPercentage,
            rating,
            stock,
            sku,
            weight,
            warrantyInfo,
            shippingInfo,
            returnPolicy,
            image,
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !brand ||
            !price ||
            !stock ||
            !sku ||
            !image
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "All required fields must be provided (Title, Description, Category, Brand, Price, Stock, SKU, Image).",
            });
        }

        // Create product
        const product = await Product.create({
            ...req.body,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product -BE",
            error: error.message,
        });
    }
};

// ==========================
// Get All Products (Public)
// ==========================
exports.getAllProducts = async (req, res) => {
    try {
        const {
            title,
            category,
            brand,
            minPrice,
            maxPrice,
            page = 1,
            limit = 20,
        } = req.query;

        let query = {};

        if (title) query.title = { $regex: title, $options: "i" };
        if (category) query.category = { $regex: category, $options: "i" };
        if (brand) query.brand = { $regex: brand, $options: "i" };

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const skip = (Number(page) - 1) * Number(limit);

        const products = await Product.find(query)
            .sort({ createdAt: -1, title: 1 })
            .skip(skip)
            .limit(Number(limit));

        // console.log(query)

        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            data: products,
            hasMore: skip + products.length < total,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products -BE",
        });
    }
};

// ==========================
// Get Single Product (Public)
// ==========================
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch single product -BE",
        });
    }
};

// ==========================
// Update Product (Admin)
// ==========================
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            { $set: req.body },
            {
                new: true,
                runValidators: true,
            },
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product -BE",
        });
    }
};

// ==========================
// Delete Product (Admin)
// ==========================
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product -BE",
        });
    }
};
