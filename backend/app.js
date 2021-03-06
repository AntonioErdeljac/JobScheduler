var fs = require('fs');
var http = require('http');
var path = require('path');
var methods = require('methods');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var passport = require('passport');
var errorhandler = require('errorhandler');
var mongoose = require('mongoose');

mongoose.promise = global.Promise;

var isProduction = process.env.NODE_ENV === 'production';

//stvaranje app objekta
var app = express();

// postavljanje express settingsa

app.use(cors()); // dozvoliti CORS

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({secret: 'jobScheduler', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));


//postavljanje error handlera izvan produkcije

if(!isProduction){
    app.use(errorhandler());
}

if(isProduction){
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/jobscheduler'); //spajanje na lokalni DB posto nismo u produkciji
    mongoose.set('debug', true);
}



require('./models/User'); //stavljam model iz drugog filea ovdje
require('./config/passport'); //passport OBAVEZNO staviti nakon User modela, i svih modela koji koriste passport
app.use(require('./routes')); //sve routes su ovdje


// 404 middleware

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler samo za development mode


if(!isProduction){
    app.use(function(err, req, res, next){
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({'errors': {
            message: err.message,
            error: err
        }})
    })
}


app.use(function(err, req,res, next){
    res.status(err.status || 500);
    res.json({'errors': {
        message: err.message,
        error: {}
    }})
});

//pocetak servera

var server = app.listen(process.env.PORT || 8000, function(){
    console.log('Zapocinjem server na http://localhost:8000')
});


