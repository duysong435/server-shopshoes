const express = require('express');
const router = express.Router();

import allCodeController from '../controllers/AllcodeController';

router.get('/get-all-code',allCodeController.getAllCode)

router.use('/', allCodeController.index)

export default router;