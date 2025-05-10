const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { multiUpload } = require('../middleware/uploadMiddleware');

router.get('/', vehicleController.getVehicles);
router.post('/', multiUpload, vehicleController.createVehicle);

module.exports = router;
