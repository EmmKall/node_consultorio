const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isConfirmed: {
        type: Boolean,
        require: false,
    },
    last_name: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        required: true,
      },
    password: {
      type: String,
      required: true,
    },
    phone:  {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false
    },
    user: {
        type: String,
        required: false
    }
});
/* Before to save data */
UserSchema.pre('save', async function(next) {
    // si el password ya esta hasheado
    if(!this.isModified('password')) {
        return next(); // deten la ejecución
    }
    // si no esta hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});
/* After save */
UserSchema.post('save', function(error, doc, next) {
    if(error.name === 'MongoError' && error.code === 11000 ){
        //next('Ese correo ya esta registrado');
    } else {
        //next(error);
    }
});

/* Auth  */
UserSchema.methods = {
    compararPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = mongoose.model('User', UserSchema);

