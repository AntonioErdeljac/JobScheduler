var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, required: [true, "je obavezno."], index: true},
    email: {type: String, lowercase: true, required: [true, "je obavezan"], index: true, unique: true}
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'je zauzeto'});



mongoose.model('User', UserSchema);