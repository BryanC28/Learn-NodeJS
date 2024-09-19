const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    cart:{
        items:[
            {
                productId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
                quantity:   {type: Number}
            }
        ]
    }
});

userSchema.methods.addToCart = function (product) {

        const updatedCartItems = this.cart.items ? [...this.cart.items] : [];
        const indexExistingCartItem = this.cart.items ? this.cart.items.findIndex(item => item.productId.toString() === product._id.toString()) : -1;

        let newQuantity = 1;

        if (indexExistingCartItem != -1) {
            newQuantity = this.cart.items[indexExistingCartItem].quantity + 1;
            updatedCartItems[indexExistingCartItem].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongoose.Types.ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = { items: updatedCartItems };
        this.cart = updatedCart;
        return this.save();
}

userSchema.methods.deleteItemFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId);
    this.cart.items = updatedCartItems;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);