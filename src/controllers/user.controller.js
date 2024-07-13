const mongoose = require('mongoose');
const User = require( '../models/user.model' );

exports.getAll = async ( req, res, next ) => 
{
    try {
        const data = await User.find( {} ) ?? [];
        return res.status( 200 ).json( { status: 200, msg: 'Request successfully', data: data } )
    } catch( error ){
        return res.status( 400 ).json( { status: 500, msg: `Error: ${error}` } );
    }
}

exports.findById = async ( req, res, next ) => 
{
    const { id } = req.params;
    try {
        const data = await User.findById( id ) ?? [];
        return res.status( 200 ).json( { status: 200, msg: 'Request successfully', data: data, id } )
    } catch( error ){
        return res.status( 400 ).json( { status: 500, msg: `Error: ${error}` } );
    }
}

exports.store = async ( req, res, next ) => 
    {
        const { email, name, last_name, password, phone, user } = req.body;
        //Valid data

        try {
            const row = new User( { email, name, last_name, password, phone, user, isConfirmed: false } );
            const data = await User.create( row );
            return res.status( 200 ).json( { status: 200, msg: 'Request successfully', data: data } )
        } catch( error ){
            return res.status( 400 ).json( { status: 500, msg: `Error: ${error}` } );
        }
    }
