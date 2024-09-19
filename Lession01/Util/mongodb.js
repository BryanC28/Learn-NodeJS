const mongodb = require('mongodb');

// let _mongoConnectionPool;

const mongoConnect = (callbackFunction) => {
    mongodb.MongoClient.connect('mongodb+srv://Aptech2022:12357C@cluster0.stfth08.mongodb.net/C2104L_NodeJS?retryWrites=true&w=majority')
        .then(result => {
            _mongoConnectionPool = result.db();
            console.log('connected to MongoDB');
            callbackFunction();
        })
        .catch(err => console.log(err));
}

const getDb = () => {
    if (_mongoConnectionPool) {
        return _mongoConnectionPool;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;  