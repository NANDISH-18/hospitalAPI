const Patient = require('../../../models/patient');

// Patient Registration
exports.register = async  (req,res)=> {

    // Getting the doctor id
    const doctor = req.doctor._id;

    try {
        // getting the name and phone from input
        const {name , phone} = req.body;
        let patient;
        patient = await Patient.find({
            phone
        })
        
        // Create patient if he does not exist
        if(patient.length > 0){
            return res.status(200).json({
                success: true,
                body: patient[0]
            })
        }

        patient = await Patient.create({
            name,
            phone,
            doctor
        })

        // After patient registered successfully
        return res.status(201).json({
            success: true,
            body: patient,
            msg: 'Patient Registered Successfully'
        })

    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "Error occured"
        })
    }


}