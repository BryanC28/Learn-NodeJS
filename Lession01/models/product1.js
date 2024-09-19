const getDb = require("../Util/mongodb").getDb;
const mongodb = require('mongodb');

class Product01 {
    constructor(_id,title, imageUrl, description, price) {
        this._id = _id ? new mongodb.ObjectId(_id) : null;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        const db = getDb();
        let rs;

        if(this._id){
            //sql: update
            rs = db.collection('products').updateOne({ _id: this._id} , {$set: this});
        }
        else{
            rs = db.collection('products').insertOne(this);
        }
        return rs.then(result => console.log(result))
                 .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
                 .find()
                 .toArray()
                 .then(product => {
                    console.log(product);
                    return product;
                 })
                 .catch(err => console.log(err));
    }

    static findById(productId){
        const db = getDb();
        return db.collection('products')
                .find({_id: new mongodb.ObjectId(productId)})
                .next()
                .then(product => {
                    console.log(product);
                    return product;
                })
                .catch(err => console.log(err));
    }

    static deleteById(productId){
        const db = getDb();
        return db.collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(productId)})
            .then(rs => console.log('DELETED'))
            .catch(err => console.log(err));
    }
}

module.exports = Product01;