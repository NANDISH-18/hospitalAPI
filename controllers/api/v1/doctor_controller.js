const Doctor = require('../../../models/doctor');

// Doctor registration
module.exports.register = async function(req,res){
    try {
        const doctor = await Doctor.create(req.body);

        // If doctor registration  is successful
        return res.status(200).json({
            success: true,
            message: doctor
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Doctor signing in
module.exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // if email or password are not entered
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "No email or password"
            });
        }

        // Find the doctor by email
        let doctor = await Doctor.findOne({ email: email });

        if (!doctor) {
            return res.status(401).json({
                success: false,
                msg: "Invalid Username or Password!"
            });
        }

        // Checking if the password matches using the instance method
        const isMatch = await doctor.matchPassword(password);

        // Password invalid - error handling
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                msg: "Invalid Username or password!"
            });
        }

        // Getting JWT Token
        const token = doctor.getSignedJwtToken();

        // Return response
        res.status(200).json({
            success: true,
            token,
            msg: `Log in Successful! Keep the token safely ${doctor.username}!`
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            msg: 'Error Occurred'
        });
    }
};
