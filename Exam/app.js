const express = require('express');
const bodyParser = require('body-parser');
const ExceptionController = require('./controllers/exception-Controller');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const { fail } = require('assert');
const User = require('./models/user');


const shop = require('./routes/shop');
const admin = require('./routes/admin')


const app = express();

app.use(bodyParser.urlencoded({extended: false}))

const fileStorage = multer.diskStorage({
    destination: function (req,file,callback){
        callback (null, 'Images')
    },
    filename: function (req, file, callback){
        callback (null, file.originalname)
    }
});

const fileFilter = (req, file, callback)=> {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        callback(null,true);
    }
    else{
        callback (null, false);
    }
}
app.use(multer({storage: fileStorage, fileFilter : fileFilter}).single('image'));

app.set("view engine", "ejs");
app.set("views","views");

app.use((req, res, next) => {
    User.findById('63514ad56412944f6413385c')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/css',express.static(path.join(__dirname,'node_modules','bootstrap','dist','css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules','bootstrap','dist','js')));
app.use('/Images', express.static(path.join(__dirname,'Images')));

app.use('/css', express.static(path.join(__dirname,'public','css')));
app.use('/js', express.static(path.join(__dirname,'public','js')));
app.use('/images', express.static(path.join(__dirname,'public','images')));

app.use(shop);
app.use('/admin',admin);

app.use(ExceptionController.error);

mongoose.connect('mongodb+srv://Aptech2022:12357C@cluster0.stfth08.mongodb.net/C2104L_NodeJS?retryWrites=true&w=majority')
        .then(() => {
            app.listen(8080);
            console.log('listen to port 8080');
            console.log('connect to Mongoose');
        })
        .catch(err => console.log(err));