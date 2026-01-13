const jwt = require("jsonwebtoken");

exports.EncodeToken = (userEmail, userID, userRole) => {
    const payload = {
        email: userEmail,
        _id: userID,
        role: userRole,
    };
    const key = process.env.JWT_SECRET || "defaultSecretKey";
    const expireTime = process.env.JWT_EXPIRE_TIME || "7d";

    return jwt.sign(payload, key, { expiresIn: expireTime });
};

exports.DecodeToken = (token) => {
    const key = process.env.JWT_SECRET || "defaultSecretKey";
    try {
        return jwt.verify(token, key);
    } catch (error) {
        return null;
    }
};
