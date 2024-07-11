const mongoose = require('mongoose');
const User = require( '../models/user.model' );

exports.login = async ( req, res, next ) => {

    const user = req.body.user;
    const pass = req.body.password;
    if( !user || !pass ){
        return res.status( 400 ).json( { status: 400, msg: `Missing data` } );
    }
    try {

    } catch( error ){
        return res.status( 400 ).json( { status: 500, msg: `Error: ${error}` } );
    }

}