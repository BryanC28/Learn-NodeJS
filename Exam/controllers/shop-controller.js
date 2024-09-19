const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const mongoose = require('mongoose');

exports.homepage = (req,res,next) =>{
    console.log('homepage is running');
    Product.find()
        .then(data => {
            res.render('shop/index',
                {
                    pageTitle: 'HOMEPAGE',
                    products: data,
                    path: '/'
                });
            // alert('Welcome to PAGE');
        });
}

exports.addToCartByMongoose = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product);
        }).then(result => {
            // console.log(result);
            res.redirect('/shopping-cart');
        })
        .catch(err => console.log(err));
}

exports.shoppingCarterMongoose = (req,res,next) => {
    console.log('cart is running');
    req.user
        .populate('cart.items.productId')
        .then(user => {
            // console.log(user.cart.items);
            res.render('shop/cart',{
                pageTitle: 'SHOPPING CART',
                path: '/shopping-cart',
                cartItems: user.cart.items
            })
        })
        .catch(err => console.log(err));
}

exports.deleteItemFromCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
        .then(result => res.redirect('/shopping-cart'))
        .catch(err => console.log(err));
}

exports.checkout = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const order = new Order({
                items: user.cart.items.map(item => {
                    return {
                        itemId: item._id,
                        title: item.productId.title,
                        price: item.productId.price,
                        imageUrl: item.productId.imageUrl,
                        quantity: item.quantity,
                    }
                }),
                user: {
                    userId: mongoose.Types.ObjectId(user._id)
                }
            });
            return order.save();
        })
        .then(result => {
            const user = req.user;
            user.cart.items = [];
            return user.save();
        })
        .then(result => res.redirect('/order'))
        .catch(err => console.log(err));
}

exports.order = (req, res, next) => {
    Order.find({'user.userId': mongoose.Types.ObjectId(req.user._id)})
        .then(orders => {
            const transformedOrders = orders.map(order => ({
                _id: order._id,
                items: order.items,
                user: order.user,
                total: order.items.reduce((sum, item) => sum + +item.price*item.quantity, 0)
            }));
            res.render('shop/order', {
                path: '/order',
                pageTitle: 'Orders',
                orders: transformedOrders
            })
        }).
        catch(err => console.log(err));
}