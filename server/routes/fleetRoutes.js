
// routes/fleetRoutes.js
const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleetController');

router.get('/', fleetController.getFleets);
// optionally: router.post('/', fleetController.createFleet);

module.exports = router;
