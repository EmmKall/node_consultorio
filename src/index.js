const express = require('express');
const morgan = require( 'morgan' );
const bodyParser = require('body-parser');
require('dotenv').config()

const middleware = require( './controllers/verify.controller' );

const app = express();
app.use( morgan(':method :url :status :res[content-length] - :response-time ms') );
//DB-conection
require( './db/app.db' );
//Routes
const userRoute = require( './routes/user.route' );
const authRoute = require( './routes/auth.route' );
const port = process.env.PORT || 3001;

// habilitar body-parser
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: false }));

/* Routes */
app.use( '/auth', authRoute );
app.use( middleware.verifyToken );
app.use( '/user', userRoute );
/* Init app */
app.listen( port, () => {
    console.log(`---------- Server running on port ${port} -------------`);
});