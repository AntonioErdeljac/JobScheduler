var jwt = require('express-jwt');
var secret = require('../config').secret;

// funkcija provjerava dali ima tokena postavljenog u headersima pod authorization keyem tipa 'Token 123'

function getTokenFromHeaders(req){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token'){
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}


// auth objekt koji cu koristiti u rutama te odabrati required ako zelim samo loginiranima korisnicima pristup omogucit ili optional ako svima


var auth = {
    required: jwt({
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: jwt({
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeaders
    })
};

module.exports = auth;