const express = require('express');
const { register, login } = require('../controllers/paymentController');

const router = express.Router();

router.post('/payment', payment);

module.exports = router;