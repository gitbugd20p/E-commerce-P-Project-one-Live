const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.getAdminStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments({
            role: "user",
        });

        const sales = await Order.aggregate([
            { $group: { _id: null, totalSales: { $sum: "$totalAmount" } } },
        ]);

        const lowStock = await Product.countDocuments({
            stock: { $lt: 10 },
        });

        const pendingOrder = await Order.countDocuments({ status: "pending" });

        res.status(200).json({
            success: true,
            data: {
                revenue: sales[0]?.totalSales || 0,
                orders: totalOrders,
                products: totalProducts,
                users: totalUsers,
                lowStock,
                pendingOrder,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Admin Stats controller error -BE: ", error);
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password");

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Getting all user error -BE: ", error);
    }
};
