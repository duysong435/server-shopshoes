const express = require('express');
const router = express.Router();

import orderController from '../controllers/OrderController';

router.post('/create', orderController.createOrder)
router.post('/create-order-detail', orderController.createOrderDetail)
router.get('/get-list-order', orderController.getListOrderLimit)
router.get('/get-order-detail', orderController.getOrderDetail)
router.delete('/delete-order', orderController.deleteOrder)
router.get('/get-out-check', orderController.getOutCheckOrder)
router.get('/admin/get-list-order', orderController.getAdminOrderList)
router.put('/admin/upadte-order-status', orderController.updateOrderStatus)
router.get('/admin/get-order-detail',orderController.getAdminGetOrderDetail)

router.use('/', orderController.index)

export default router;