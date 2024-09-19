// const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const ExceptionController = require('./controllers/exception-Controller');
// const mongoConnect = require('./Util/mongodb').mongoConnect;
const path = require('path');
const multer = require('multer');
// const User = require('./models/user');
const User = require('./models/userMongoose');
const { fail } = require('assert');
const mongoose = require('mongoose');

const adminRouter = require('./routes/admin');
const shop = require('./routes/shop');
// const mongoConnect = require('./Util/mongodb').mongoConnect;

const app = express();


//middleware / interceptor
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
// app.use((req,res,next)=>{
//     console.log('always run');
//     next();
// });
app.set("view engine", "ejs");
app.set("views","views");

// app.use((req, res, next) => {
//     User.findById('63514ad56412944f6413385c')
//         .then(user => {
            
//             req.user = new User(user._id, user.name, user.email, user.cart);
//             // console.log('user', user._id);
//             // console.log('req.user', req.user);
//             next();
//         })
//         .catch(err => console.log(err));
// });

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
// app.use(adminRouter);
app.use('/admin',adminRouter);
app.use(shop);

app.use(ExceptionController.error);
mongoose.connect('mongodb+srv://Aptech2022:12357C@cluster0.stfth08.mongodb.net/C2104L_NodeJS?retryWrites=true&w=majority')
        .then(() => {
            app.listen(8080);
            console.log('listen to port 8080');
            console.log('connect to Mongoose');
        })
        .catch(err => console.log(err));

// app.get('/', (req, res,next) => {
//     console.log('in /');
//     res.send('<h1>Homepage</h1>');
// });

// app.get('/add-product',(req, res,next) => {
//     console.log('add product');
//     // res.send('<h1>Add Product</h1>');
//     res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add product</button></form>');
// });


// app.post('/product',(req,res,next)=>{
//     console.log('/product',req.body); 
// })
// app.use((req, res) => {
//     console.log('in middleware 2');
// });

// const server = http.createServer(app);


// mongoConnect(() => {
//     app.listen(8080);
// });
