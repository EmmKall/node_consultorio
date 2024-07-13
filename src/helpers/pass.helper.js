const bcrypt = require( 'bcrypt' );

exports.generarPass = async( length ) => {
    const characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result            = "";
    let ch;
    while ( result.length < length ){
        ch = characters.charAt(Math.floor(Math.random() * charactersLength));
        if (!result.includes(ch)){
            result += ch;
        }
    } 
    console.log( result );
    return result;
}


