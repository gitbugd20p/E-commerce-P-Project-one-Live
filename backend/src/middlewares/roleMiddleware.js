exports.isAdmin = (req, res, next) => {
    // req.user is set by authMiddleware
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
        });
    }
};
