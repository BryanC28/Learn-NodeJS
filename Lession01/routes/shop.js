const express = require('express');
const path = require('path');
const shopController = require('../controllers/shop-controller');
const router = express.Router();
// const adminData = require('./admin');

router.get('/', shopController.ShowProduct);
// router.get('/shopping-cart',shopController.shoppingCart);
router.get('/shopping-cart',shopController.shoppingCarterMongoose);
// router.get('/order',shopController.order);
// router.get('/checkout',shopController.checkout1);

// router.post('/shopping-cart', shopController.addItemToCart);
router.post('/shopping-cart', shopController.addToCartByMongoose);
router.post('/cart-delete-item', shopController.deleteItemFromCart);
// router.post('/checkout',shopController.checkout);

module.exports = router;