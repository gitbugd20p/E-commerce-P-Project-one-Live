const { DecodeToken } = require("../utility/tokenUtility");

module.exports = (req, res, next) => {
    const token = req.cookies["token"];

    // Get decoded token
    const decodedToken = DecodeToken(token);

    // Check if token is valid
    if (decodedToken === null) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Please log in.",
        });
    }

    req.user = {
        email: decodedToken.email,
        _id: decodedToken._id,
        role: decodedToken.role,
    };

    // Proceed to the next middleware or route handler
    next();
};
