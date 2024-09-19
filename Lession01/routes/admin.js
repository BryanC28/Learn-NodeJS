const express = require('express');
const path = require('path');
const ProductController = require('../controllers/product-controller');
const router = express.Router();
// const products = [];

//--None Controller
// router.get('/add-product', (req, res, next) => {
//     console.log('admin add product');
//     res.send('<h1>Add Product</h1>');
//     res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"/><button type="submit">Add product</button></form>');
//     res.sendFile(path.join(__dirname,'..','views','add-product.html'));
//     res.render('add-product', { pageTitle: "Add Product", path : '/admin/add-product'});
// });

// Controller
router.get('/add-product', ProductController.AddProductForm);
// router.get('/edit-product/:productId',ProductController.editProduct);
router.get('/edit-product/:productId',ProductController.editProductMongoose);
// router.get('/delete-product',ProductController.deleteProduct);
// router.get('/list-product',ProductController.listProduct);
router.get('/list-product',ProductController.listProductMongoose);

// router.post('/add-product', ProductController.InsertProduct);
router.post('/add-product', ProductController.InsertProductMongoose);
// router.post('/edit-product',ProductController.updateProduct);
router.post('/edit-product',ProductController.updateProductMongoose);
// router.post('/delete-product',ProductController.deleteProduct);
router.post('/delete-product',ProductController.deleteProductMongoose);

module.exports = router;
// exports.products = products;