const mongoose = require('mongoose');
const User     = require( '../models/user.model' );
const bcrypt   = require( 'bcrypt' );
const jwt      = require( 'jsonwebtoken' );

exports.login = async ( req, res, next ) => {

    const email = req.body.user;
    const pass = req.body.password;
    if( !email || !pass ){
        return res.status( 400 ).json( { status: 400, msg: `User and password are required` } );
    }

    try {
        const user = await User.findOne( {  email: email } );

        if( !user ){ return res.status( 400 ).json( { status: 400, msg: `Invalid credentials` } ); }
        
        const isValid = await bcrypt.compare( pass, user.password );
        if( !isValid ){ return res.status( 400 ).json( { status: 400, msg: `Invalid credentials` } ); }
        
        const payload = {
            user: user.user,
            id:   user.id
        };

        const token = jwt.sign( payload, process.env.SECRET_WORD, { expiresIn: '1d' } );
        user.token = token;
        await user.save();
        
        const response = {
            id: user.id,
            name: `${user.name} ${user.last_name}`,
            user: user.user,
            token
        };
        return res.status( 200 ).json( response );
    } catch( error ){
        return res.status( 400 ).json( { status: 500, msg: `Error: ${error}` } );
    }
 
}