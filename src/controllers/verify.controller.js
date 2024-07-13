const mongoose = require('mongoose');
const User     = require( '../models/user.model' );
const jwt      = require( 'jsonwebtoken' );

exports.verifyToken = async ( req, res, next ) => {

    const header = req.header( "Authorization" ) || "";
    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json( { message: "Token not provied" } );
    }

    const user = await User.findOne( { token } );
    //Valid one seccion by user through token
    if( !user ){
        return res.status(401).json( { message: "Token not valid" } );
    }

    try {
        const payload = jwt.verify( token, process.env.SECRET_WORD );
        req.username = payload.username;
        next();
    } catch (error) {
        return res.status(403).json( { message: "Token not valid" } );
    }

}