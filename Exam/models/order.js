const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
            title: {type: String, required: true},
            price: {type: Number, required: true},
            imageUrl: {type: String, required: true},
            quantity: {type: Number, required: true},
        }
    ],
    user: {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
    }
});

module.exports =mongoose.model('Order', orderSchema);