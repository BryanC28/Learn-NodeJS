const e = require('express');
const Product = require('../models/product');

exports.AddProductForm = (req, res, next) => {
    console.log('admin add product');
    res.render('admin/add-product', { pageTitle: "Add Product", path: '/admin/add-product' });
}

exports.InsertProductMongoose = (req, res, next) => {
    const image = req.file;
    if (!image) {
        res.redirect('/admin/add-product');
        return;
    }

    const imageUrl = image.path;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    // const products = new Product(null, title, imageUrl, description, price);
    const product = new Product({
        title : title,
        price: price,
        description: description,
        imageUrl: imageUrl
    });

    product.save()
        .then(result => {
            res.redirect('/admin/list-product');
        })
        .catch(err => console.log(err));
}

exports.listProductMongoose = (req, res, next) => {
    console.log('List product');
    // const products = Product.fetchAll();
    Product.find()
        .then(data => {
            res.render('admin/list-product',
                {
                    pageTitle: 'List Product',
                    products: data
                });
        });
}

exports.editProductMongoose = (req, res, next) => {
    console.log('edit product');
    const productId = req.params.productId;
    const product = Product.findById(productId)
                           .then( rs => {
                                res.render('admin/edit-product',
                                {pageTitle: 'EDIT', product: rs });
                           })
                           .catch(err => console.log(err));
    // console.log(product);
    // res.render('admin/edit-product', { pageTitle: 'EDIT', product: product });
}

 exports.updateProductMongoose = (req,res,next) => {
    let imageUrl = req.body.imageUrl;
    const image = req.file;
    if (image) {
        imageUrl = image.path;
    }

    const id = req.body.productId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    
    Product.findById(id)
           .then(product => {
                product.title = title;
                product.price = price;
                product.description = description;
                product.imageUrl = imageUrl;

                return product.save();
            })
            .then(result => res.redirect('/admin/list-product'))
            .catch(err => console.log(err));
}

exports.deleteProductMongoose = (req, res, next) => {
    console.log('delete product');
    Product.findByIdAndDelete(req.body.productId)
           .then((rs => {res.redirect('/admin/list-product')}))
           .catch(err => console.log(err));
}