const express = require('express');
const { getTests, createOrUpdateTest } = require('../controllers/Test');

const router = express.Router();

router.get('/tests', getTests);

router.post('/create', createOrUpdateTest);

module.exports = router;