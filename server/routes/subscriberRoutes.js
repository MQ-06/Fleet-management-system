const express = require('express');
const router = express.Router();
const { getAllSubscribers, addSubscriber } = require('../controllers/subscriberController');

router.get('/', getAllSubscribers);
router.post('/', addSubscriber); // For test-only use

module.exports = router;
