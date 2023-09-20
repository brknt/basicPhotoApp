const express = require('express');
require('dotenv').config();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const conn = require('./config/db.js');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');


const pageRoute = require('./routes/pageRoute.js');
const photoRoute = require('./routes/photoRoute.js');
const userRoute = require('./routes/userRoute.js');

const { checkUser } = require('./middlewares/authMiddleware.js');






const app = express();
const port = process.env.PORT || 3000;



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
  });





// Db:
conn();


// Template Engine (ejs):
app.set('view engine', 'ejs');


// Middlewares:
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));// form body içerisindeki veriler parse edebilmek için
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true
})); // geçici tmp klasörü oluşturmak için 'useTempFiles'



app.use('*', checkUser);
app.use('/', pageRoute.routes);
app.use('/photos', photoRoute.routes);
app.use('/users', userRoute.routes);



app.listen(port, () => {
    console.log(`App started on port ${port}`);
})