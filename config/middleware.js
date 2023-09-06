const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');

// Verify bearer token
exports.verifyToken = async (req, res, next) => {
    console.log("Bearer Token: " + req.headers['authorization']);
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
        console.log("Token: " + token);
        req.token = token;
    }

    // If token not found
    if (!token) {
        console.log("Token Error");
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }

    // Try block
    try {
        // Decode token
        const decoded = await jwt.verify(token, 'secret');
        console.log("Decoded Token: " + decoded);

        // Find Doctor by ID
        req.doctor = await Doctor.findById(decoded.id);
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }
};
