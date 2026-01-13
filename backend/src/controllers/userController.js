const User = require("../models/userModel");
const { ObjectId } = require("mongodb");
const { EncodeToken } = require("../utility/tokenUtility");
const bcrypt = require("bcrypt");

// Register User Controller
exports.registerUser = async (req, res) => {
    try {
        // get the email and password from the request body
        const email = req.body.email.toLowerCase().trim();
        const { password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const result = await User.create({ email, password });
        // If creating user is successful
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: { id: result._id, email: result.email },
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        // Handle other errors
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "An error occurred while registering the user.",
        });
    }
};

// Login User Controller
exports.loginUser = async (req, res) => {
    try {
        // get the email and password from the request body
        const email = req.body.email.toLowerCase().trim();
        const { password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        // If password matches, generate token
        if (isMatch) {
            const token = EncodeToken(
                user.email,
                user._id.toString(),
                user.role
            );

            const option = {
                maxAge:
                    parseInt(process.env.COOKIE_EXPIRE_TIME) ||
                    7 * 24 * 60 * 60 * 1000, // Default to 7 days
                httpOnly: true,
                sameSite: "none",
                secure: true,
                partitioned: true,
            };

            // Set cookie with token
            res.cookie("token", token, option);

            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: { id: user._id, email: user.email, role: user.role },
                // Only for testing purposes, do not send token in production
                // token: token,
            });
        } else {
            // If password does not match
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "An error occurred while logging in the user.",
        });
    }
};

// Logout User Controller
exports.logoutUser = (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        // Respond with success message
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        // Handle any errors that occur during logout
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "An error occurred while logging out the user.",
        });
    }
};

// Get User Profile Controller
exports.getUserProfile = async (req, res) => {
    try {
        const email = req.user.email;

        let matchStage = {
            $match: {
                email: email.toLocaleLowerCase().trim(),
            },
        };

        let project = {
            $project: {
                password: 0,
            },
        };

        let result = await User.aggregate([matchStage, project]);

        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: result[0],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "An error occurred while fetching the user profile.",
        });
    }
};

// Update User Profile Controller
exports.updateUserProfile = async (req, res) => {
    try {
        // First get user data from request user object(authMiddleware sets this)
        const userIdFromRequest = req.user._id;
        const userId = new ObjectId(userIdFromRequest);

        // Get the email and password from the request body
        let updateData = {};
        const { email, password } = req.body;

        // Only update email if provided
        if (email) {
            updateData.email = email.toLowerCase().trim();
        }

        // Only update password if provided
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        // If nothing is provided, return an error
        if (!email && !password) {
            return res.status(400).json({
                success: false,
                message: "At least one of email or password must be provided.",
            });
        }

        // Find user by ID and update
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: { id: updatedUser._id, email: updatedUser.email },
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message:
                    "User with this email already exists, try another email.",
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "An error occurred while updating the user profile.",
        });
    }
};
