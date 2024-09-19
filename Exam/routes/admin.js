const express = require('express');
const path = require('path');
const ProductController = require('../controllers/admin-Controller');
const router = express.Router();


// Controller
router.get('/add-product', ProductController.AddProductForm);

router.get('/edit-product/:productId',ProductController.editProductMongoose);

router.get('/list-product',ProductController.listProductMongoose);


router.post('/add-product', ProductController.InsertProductMongoose);

router.post('/edit-product',ProductController.updateProductMongoose);

router.post('/delete-product',ProductController.deleteProductMongoose);

module.exports = router;
