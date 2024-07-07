const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

try {
    mongoose.connect( `${process.env.DB}${process.env.DB_NAME}` , {useNewUrlParser:true});
    console.log( `------------------connection successfull------------------` );
} catch (error) {
    console.log( `Error: ${ error }` );
}
//mongoose.connect( `mongodb+srv://root:CRAZYV3Nmon@cluster0.49lqrza.mongodb.net/events` , {useNewUrlParser:true});

mongoose.connection.on('error', (error) => {
    console.log(error);
})
// importar los modelos
require('../models/user.model');

