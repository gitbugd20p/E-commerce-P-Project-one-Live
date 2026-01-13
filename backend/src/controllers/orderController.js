const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// ==========================
// Create Order (User)
// ==========================
exports.createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;

        // order items validation
        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order items are required",
            });
        }

        // Shipping address validation
        if (
            !shippingAddress ||
            !shippingAddress.address ||
            !shippingAddress.phone
        ) {
            return res.status(400).json({
                success: false,
                message: "Shipping address, phone number is required",
            });
        }

        // Calculate total amount and orderItems
        let totalAmount = 0;
        let orderItems = [];

        for (let item of items) {
            const product = await Product.findById(item._id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            // Checking stock
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.title}. Only ${product.stock} is left.`,
                });
            }

            // Product price
            const itemPrice =
                product.price * (1 - (product.discountPercentage || 0) / 100);

            orderItems.push({
                product: product._id,
                title: product.title,
                image: product.image,
                price: itemPrice.toFixed(2),
                quantity: item.quantity,
            });

            totalAmount += itemPrice * item.quantity;

            // Update the product stock
            const newStock = product.stock - item.quantity;
            await Product.findByIdAndUpdate(product._id, {
                $set: { stock: newStock },
            });
        }

        // Create order
        const newOrder = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalAmount: totalAmount.toFixed(2),
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: newOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to place order -BE",
            error: error.message,
        });
    }
};

// ==========================
// Get My Orders (User)
// ==========================
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    }
};

// ==========================
// Get Single Order (Owner/Admin)
// ==========================
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "items.product",
            "title price image"
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            order.user.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch order",
        });
    }
};

// ==========================
// Get All Orders (Admin)
// ==========================
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    }
};

// ==========================
// Update Order Status (Admin)
// ==========================
exports.updateOrderStatus = async (req, res) => {
    try {
        // Status and order-id
        const { status } = req.body;
        const { id } = req.params;

        // Allowed updates
        const allowedStatus = [
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "canceled",
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        // Current-order
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Restore product stock
        if (status === "canceled" && order.status !== "canceled") {
            for (let item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stock: item.quantity },
                });
            }
        }
        // Update stock(increase) as Admin confirms and product was cancelled.
        else if (status !== "canceled" && order.status === "canceled") {
            for (let item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stock: -item.quantity },
                });
            }
        }

        const updateOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: updateOrder,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update order status",
        });
    }
};
