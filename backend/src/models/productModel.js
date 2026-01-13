const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        category: { type: String, required: true, trim: true },
        brand: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },

        discountPercentage: { type: Number, default: 0 },
        rating: { type: Number, default: 0, min: 0, max: 5 },
        stock: { type: Number, required: true, min: 0 },
        sku: { type: String, required: true, unique: true, uppercase: true },

        weight: { type: String, default: "Not specified" },
        warrantyInfo: { type: String, default: "No warranty" },
        shippingInfo: { type: String, default: "Ships in 3-5 business days" },
        returnPolicy: { type: String, default: "30 days return policy" },

        image: { type: String, required: true },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
