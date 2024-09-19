// const Product = require('../models/product');
// const Product = require('../models/product1');
const Product = require('../models/productMongoose');
const User = require('../models/userMongoose');
// exports.ShowProduct = (req, res, next) => {
//     console.log('homepage is running');
//     // console.log('shop.js', products);
//     // res.send('<h1>Homepage</h1>');
//     // res.sendFile(path.join(__dirname,'..','views','shop.html'));
//     // const products = Product.fetchAll();
//     // res.render('shop/shop', { pageTitle: 'SHOP', products: products, path: '/' });
//     Product.fetchAll()
//         .then(data => {
//             res.render('shop/shop',
//                 {
//                     pageTitle: 'SHOP',
//                     products: data,
//                     path: '/'
//                 });
//         });
// }

exports.ShowProduct = (req, res, next) => {
    console.log('homepage is running');
    // console.log('shop.js', products);
    // res.send('<h1>Homepage</h1>');
    // res.sendFile(path.join(__dirname,'..','views','shop.html'));
    // const products = Product.fetchAll();
    // res.render('shop/shop', { pageTitle: 'SHOP', products: products, path: '/' });
    Product.find()
        .then(data => {
            res.render('shop/shop',
                {
                    pageTitle: 'SHOP',
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

// exports.shoppingCart = (req,res,next) => {
//     console.log('cart is running');
//     req.user.getCart()
//         .then(rs => {
//             res.render('shop/cart', { pageTitle: 'SHOPPING CART', path: '/shopping-cart', cartItems: rs });
//             // console.log(rs);
//         })
// }

// exports.addItemToCart = (req, res, next) => {
//     const productId = req.body.productId;
//     Product.findById(productId)
//         .then(product => {
//             return req.user.addToCart(product);
//         }).then(result => {
//             // console.log(result);
//             res.redirect('/shopping-cart');
//         })
//         .catch(err => console.log(err));
// }

// exports.checkout1 = (req,res,next) => {
//     console.log('checkout is running');
//     res.render('shop/checkout', { pageTitle: 'CHECKOUT', path: '/checkout' });
// }

// exports.deleteFromCart = (req,res,next) => {
//     console.log("delete cart")
//     const productId = req.body.productId;
//     // console.log(productId);
//     req.user.deleteItemFromCart(productId)
//             .then(rs => res.redirect('/shopping-cart'))
//             .catch(err => console.log(err))
// }

// exports.checkout = (req, res, next) => {
//     req.user.checkout()
//         .then(result => res.redirect('/order'))
//         .catch(err => console.log(err));
// }

// exports.order = (req, res, next) => {
//     console.log('order is running');
//     req.user.fetchAllOrder()
//         .then(rs => {
//             res.render('shop/order', { pageTitle: 'ORDER', path: '/order', orders: rs });
//             console.log(rs);
//         })
// }