const Doctor = require('../../../models/doctor');
const Patient = require('../../../models/patient');
const Report = require('../../../models/report');

module.exports.create_reports = async function(req, res){

    // Getting the doctor id
    const doctor = req.doctor._id;
    console.log("Dr: "+ doctor);

    try {
        // Creating report
        const report = await Report.create({
            doctor: doctor,
            patient: req.params.id,
            status: req.body.status
        });
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        // Error handling
        return res.status(401).json({
            success: false,
            msg: error.message
        })
    }

}

// find patient by id and send his report
module.exports.all_reports = async function(req,res){
    try {
        const reports = await Report.find({ 'patient': req.params.id });
        return res.send(reports);
        

    } catch (error) {
        // Error handling
        return res.status(401).json({
            success: false,
            msg: error.message
        })
    }
}

// Send report by status
module.exports.report_by_status = async (req,res) => {
    try {
        const reports = await Report.find({ 'status': req.params.status });
        return res.send(reports);
        

    } catch (error) {
        // Error handling
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}
