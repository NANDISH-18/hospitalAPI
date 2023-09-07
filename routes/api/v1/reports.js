const express = require('express');
const router = express.Router();

const reportController = require('../../../controllers/api/v1/report_controller');
const {verifyToken} = require('../../../config/middleware');

router.post('/:id/create_report', verifyToken, reportController.create_reports);



module.exports = router;