const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const categoryController = require("../controllers/categoryController");
const adminController = require("../controllers/adminController");

const router = express.Router();

// Sample route
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the S-E-comerce-backend-Live API",
    });
});

// Register user route
router.post("/register", userController.registerUser);
// Login user route
router.post("/login", userController.loginUser);
// Logout user route
router.get("/logout", authMiddleware, userController.logoutUser);

// ==========================
// Product Routes
// ==========================

// Public
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);

// Admin
router.post(
    "/products",
    authMiddleware,
    isAdmin,
    productController.createProduct
);
router.put(
    "/products/:id",
    authMiddleware,
    isAdmin,
    productController.updateProduct
);
router.delete(
    "/products/:id",
    authMiddleware,
    isAdmin,
    productController.deleteProduct
);

// ==========================
// Order Routes
// ==========================

// User
router.post("/orders", authMiddleware, orderController.createOrder);
router.get("/orders/my", authMiddleware, orderController.getMyOrders);
router.get("/orders/:id", authMiddleware, orderController.getOrderById);

// Admin
router.get("/orders", authMiddleware, isAdmin, orderController.getAllOrders);
router.put(
    "/orders/:id/status",
    authMiddleware,
    isAdmin,
    orderController.updateOrderStatus
);

// ==========================
// Category Routes
// ==========================
router.get("/category", categoryController.getAllCategories);
router.get("/category/:categoryName", categoryController.getProductsByCategory);

// ==========================
// AdminStats Routes
// ==========================
router.get("/admin-stats", adminController.getAdminStats);

// ==========================
// Users Routes
// ==========================
router.get("/all-user", adminController.getAllUser);

module.exports = router;
