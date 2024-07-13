const mongoose = require('mongoose');
const User     = require( '../models/user.model' );
const bcrypt   = require( 'bcrypt' );
const jwt      = require( 'jsonwebtoken' );

const passHelper = require( '../helpers/pass.helper' );

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
            status: 200,
            msg: 'Login successfully',
            data: {
                id: user.id,
                name: `${user.name} ${user.last_name}`,
                user: user.user,
                token
            }
        };
        return res.status( 200 ).json( response );
    } catch( error ){
        return res.status( 400 ).json( { status: 500, msg: `Error: ${error}` } );
    }
 
}

exports.forgetPass = async( req, res, next ) => {
    const email = req.body.email;
    
    if( !email ){ return res.status( 400 ).json( { status: 400, msg: 'Missing data' } ); }
    try {
        const user = await User.findOne( { email } );
        if( !email ){
            return res.status( 400 ).json( { status: 400, msg: 'Data not valid' } );
        }
        const newPass = await passHelper.generarPass( 12 );
        user.password = newPass;
        
        user.save();

        const response = {
            status: 200,
            msg: 'Generated new password successfully',
            data: {
                user: user.name,
                pass: newPass
            }
        };
        //Send by email then
        return res.status( 200 ).json( response );
        
    } catch( error ){

    }
}

exports.confirmAccount = async ( req, res, next ) => {
    const { token } = req.params;

    if( !token ){
        return res.status( 400 ).json( { status: 500, msg: 'Something wrong happened' } );
    }

    try {
        const user = await User.find( { token } )
        if( !user ){ return res.status( 400 ).json( { status: 500, msg: 'Something wrong happened' } ); }

        user.isConfirmed = true;
        user.token = '';
        await user.save();

        return res.status( 200 ).json( { status: 200, msg: 'Account was confirmed' } );

    } catch (error) {
        return res.status( 400 ).json( { status: 500, msg: `Error: ${error}` } );
    }
}


