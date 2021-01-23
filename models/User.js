var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    registered: Date,
    level: {
        type: Number,
        default: 0
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    user.registered = new Date();

    // Encrypting the password so no plain-text password is stored anywhere
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        return next();
    });
});

UserSchema.statics.authenticate = function (email, pass) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }, (err, user) => {
            if (err || !user) {
                let error = new Error('User not found');
                error.status = 401;
                return reject(error);
            }
            bcrypt.compare(pass, user.password, (err, result) => {
                if (result === true)
                    resolve(user);
                var error = new Error('Wrong password');
                error.status = 401;
                return reject(error);
            });
        });
    });   
};

var User = mongoose.model('User', UserSchema);
module.exports = User;