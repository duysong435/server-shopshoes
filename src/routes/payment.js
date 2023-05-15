const express = require('express');
const router = express.Router();

import paymentController from '../controllers/PaymentController';

router.get('/config', paymentController.getConfig)

router.use('/', paymentController.index)

export default router;