const express = require('express');
const testController = require('../controllers/Test');

const router = express.Router();

router.get('/tests', testController.getAllTests);

// router.get('/create/:ID/:module/:system/:sceen/:component/:field_desc/:test_desc/:desired_result/:project/:status', testController.createTest);
router.post('/create', testController.createTest);

module.exports = router;