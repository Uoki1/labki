

//Підключення бібліотек

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());

// app.use((req, res, next) =>{
//     const {authorization} = req.headers;
//     if(authorization != process.env.TOKEN) {
//         return res.status(4001).send({message: "This requesst doesnt include autoriztion"})
//     };

//     return next();
// })

//Підключення різних файлів і модулів



const setupBD = require('./setup/setupBD.js');


const TheaterControler = require('./apirouts/getTheaterById.js');
const UsersController = require('./apirouts/users.js');
const SessionController = require('./apirouts/sessions.js');
const TheaterControllerInfo  = require('./apirouts/getTheaterInfo.js');




//Головна функція


const start = async () =>{

    await setupBD.conectBd(process.env.MONGO_URL); //Виклик функції на підключння до БД


   app.use(TheaterControler.router);
    
    app.use(UsersController.router);

    app.use(SessionController.router);

    app.use(TheaterControllerInfo.router);

    



app.listen(process.env.PORT, () =>{  //Запуск сервера на порті записаний в .env ('8080')
    console.log("Server started");
})

}

start();