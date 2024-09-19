const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type: String
    },
    price:{
        type: Number
    },
    description:{
        type: String
    },
    imageUrl:{
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);