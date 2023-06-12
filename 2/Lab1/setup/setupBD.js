const mongoose = require('mongoose');

const conectBd = async (url) =>{

const connect = await mongoose.connect(url);

     connect.connection.addListener('connect', () =>{
        console.log("DB OK");
    })

    connect.connection.addListener('error', ()=>{
        console.log("DB Error");
    })

    
    // mongoose.connect(url).then(() =>{
    //     console.log("BD is connected");
    // }).catch((err) =>{
    //     console.log("Error to connect", err);
    // })

    return connect;
}

module.exports = {conectBd}