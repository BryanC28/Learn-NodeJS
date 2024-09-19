const express = require('express');
const path = require('path');
const router = express.Router();
const shopController = require('../controllers/shop-controller');

router.get('/',shopController.homepage);
router.get('/shopping-cart',shopController.shoppingCarterMongoose);
router.get('/order',shopController.order);

router.post('/shopping-cart', shopController.addToCartByMongoose);
router.post('/cart-delete-item', shopController.deleteItemFromCart);
router.post('/checkout',shopController.checkout);

module.exports = router;