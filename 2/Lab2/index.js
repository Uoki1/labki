//Бібліотеки
const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser')


//Моделі і різні функції
const Mongo = require('./setupDB/setupMongo.js');
const RegisterController = require('./api/register.js');
const loginController = require('./api/login.js');
const linkController = require('./api/links.js');
const GetLinks = require('./api/getlinks.js');
const FollowLink = require('./api/getShortLink');





//Main


const start = async () =>{
app.use(bodyParser.json());

await Mongo.startDB(process.env.MONGO_DB_URL);

app.use(RegisterController.router);
app.use(loginController.router);
app.use(linkController.router);
app.use(GetLinks.router);
app.use(FollowLink.router);



app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port  ${process.env.PORT}`);
})}


start();




