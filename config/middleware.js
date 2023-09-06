const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');

// Verify bear Token
exports.verifyToken = async (req,res,next) => {
    console.log("Bearer Token"+req.headers['authorization']);
    let token;

    if(req.headers.authorization && req.body.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
        console.log("Token: "+ token);
        req.token = token;
    }

    // If token not found
    if(!token){
        console.log("token Error");
        return res.status(401).json({
            success: true,
            message: "Unauthorized access"
        });
    }

    // try Block
    try {
        // Decode token
        const decoded = await jwt.verify(token, 'secret');
        console.log("DECODED TOKEN "+decoded );

        // Find Doctor by ID
        req.doctor = await Doctor.findById(decoded.id);
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        })
    }

}





