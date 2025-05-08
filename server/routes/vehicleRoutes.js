const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const vehicleController = require('../controllers/vehicleController');

const photoStorage = multer.diskStorage({
  destination: 'uploads/vehicle-photos',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const docStorage = multer.diskStorage({
  destination: 'uploads/vehicle-documents',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage: (req, file, cb) => {
    if (file.fieldname === 'photos') cb(null, photoStorage);
    else cb(null, docStorage);
  }
});

const multiUpload = upload.fields([
  { name: 'photos', maxCount: 5 },
  { name: 'documents', maxCount: 10 }
]);

router.get('/', vehicleController.getVehicles);
router.post('/', multiUpload, vehicleController.createVehicle);

module.exports = router;
