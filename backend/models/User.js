var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, required: [true, "je obavezno."], index: true},
    email: {type: String, lowercase: true, required: [true, "je obavezan"], index: true, unique: true},
    salt: String,
    hash: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'je zauzeto'});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);

    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        username: this.username,
        id: this._id,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
};

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};

UserSchema.methods.toProfileJSON = function(){
    return {
        username: this.username
    };
};

mongoose.model('User', UserSchema);