const express = require('express');
const router = express.Router()
const patientController = require('../../../controllers/api/v1/patient_controller');

const {verifyToken} = require('../../../config/middleware');
const passport = require('passport');

router.post('/register', verifyToken, patientController.register);



module.exports = router;