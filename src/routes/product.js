const express = require('express');
const router = express.Router();

import productController from '../controllers/ProductController';

router.post('/create-product', productController.handleCreateProduct)
router.get('/get-all-product-limit', productController.getAllProductLimit)
router.put('/edit-product',productController.handleEditProduct)
router.delete('/delete-product',productController.handleDeleteProduct)
router.get('/detail/:id', productController.getDetailProduct)
router.get('/product/:id',productController.getNameProduct)

router.use('/', productController.index)

export default router;