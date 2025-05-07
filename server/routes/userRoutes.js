const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // ✅ must be a real controller file

// ✅ These must be real functions in userController
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;
