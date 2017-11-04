var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = require('express').Router();
var auth = require('../auth');
var Agenda = require('agenda');
var slug = require('slug');

//postavke za slack integraciju




// agenda se povezuje na DB;

var agenda = new Agenda({db: {address: 'mongodb://localhost/jobscheduler'}});

// startam agendu

agenda.on('ready', function(){
    agenda.start();
});


// definiram osnovni posao

agenda.define('new job', function(job, done){
    setTimeout(function(){
        var RtmClient = require('@slack/client').RtmClient;
        var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
        var bot_token = process.env.SLACK_BOT_TOKEN || '';

        var rtm = new RtmClient(bot_token);

        let channel;

        rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
            for (const c of rtmStartData.channels) {
                if (c.is_member && c.name === 'general') {
                    channel = c.id
                }
            }
        });

        //slanje poruke na slack, koristio bio `${nekaVrijednost}`, ali nije postavljen ES6
        //radi to svejedno ali mi smeta sto se crveni u WebStormu

        rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
            rtm.sendMessage("*Posao dovršen:* " + job.attrs.data.title + ', *Vrjieme*: ' + job.attrs.lastRunAt + ', *Autor*: ' + job.attrs.data.author.username + ' *Slug*: ' + job.attrs.data.uniqueSlug, channel);
        });

        rtm.start();
        done()
    }, 500);
});


// ruta za stvaranje poslova, prima schedule i title joba.

router.post('/', auth.required, function(req,res,next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) {
            return res.sendStatus(401);
        }

        if (typeof req.body.job.title === 'undefined') {
            return res.status(422).json({errors: {naslov: 'je obavezan'}})
        }

        if (typeof req.body.job.schedule === 'undefined') {
            return res.status(422).json({errors: {vrijeme: 'je obavezno'}})
        }

        if(req.body.job.schedule.split(' ')[0] !== 'in'){
            console.log(req.body.job.schedule.split(' ')[0], 'EVO STAVIDI OVAJ KOJI PRATI')
            return res.status(422).json({errors: {vrijeme: 'mora koristiti pravilan oblik'}})
        }

        console.log(req.body.job.schedule.split(' ')[0], 'EVO TI SCHEDULE');



        var scheduleProperty = req.body.job.schedule;

        var slugProperty = slug(req.body.job.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);

        agenda.schedule(scheduleProperty, 'new job', {
            author: user.toProfileJSON(),
            uniqueSlug: slugProperty,
            title: req.body.job.title,
            schedule: scheduleProperty
        });


        //postavke za slack interaciju



        var RtmClient = require('@slack/client').RtmClient;
        var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
        var bot_token = process.env.SLACK_BOT_TOKEN || '';

        var rtm = new RtmClient(bot_token);

        let channel;

        rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
            for (const c of rtmStartData.channels) {
                if (c.is_member && c.name === 'general') {
                    channel = c.id
                }
            }
        });

        //slanje poruke na slack, koristio bio `${nekaVrijednost}`, ali nije postavljen ES6
        //radi to svejedno ali mi smeta sto se crveni u WebStormu

        rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
            rtm.sendMessage("*Novi posao:* " + req.body.job.title + ', *Vrjieme*: ' + req.body.job.schedule + ', *Autor*: ' + user.username + ' *Slug*: ' + slugProperty, channel);
        });

        rtm.start();


        //trazim specificni job sa uniqueSlug koji sam stvorio pri schedulrianju agende
        // zatim nadjem taj job i returnam ga kao json

        agenda.jobs({}, function (err, jobs) {
            jobs.map(function (job) {
                if (job.attrs.data.uniqueSlug === slugProperty) {
                    return res.json({
                        job: job
                    })
                }
            })
        })
    });
});


//rute za fetchanje gotovih poslova

router.get('/completed', auth.optional, function(req,res,next) {
    agenda.jobs({}, function (err, jobs) {
        return res.json({
            jobs: jobs.filter(function (job) {
                console.log('JOB', job.attrs.lastFinishedAt);
                if (job.attrs.lastFinishedAt) {
                    return job;
                }
            })
        })
    });

});


//ruta za fetchanje zakazanih poslova

router.get('/scheduled', auth.optional, function(req,res,next) {
    agenda.jobs({}, function (err, jobs) {
        return res.json({
            jobs: jobs.filter(function (job) {
                console.log('JOB', job.attrs.lastFinishedAt);
                if (!job.attrs.lastFinishedAt) {
                    return job;
                }
            })
        })
    });

});


router.get('/myjobs', auth.required, function(req,res,next) {
    User.findById(req.payload.id).then(function(user){
        agenda.jobs({}, function (err, jobs) {
            return res.json({
                jobs: jobs.filter(function(job){
                    if(job.attrs.data.author.username === user.username){
                        return job;
                    }
                })
            })
        });
    })

});


// ruta za brisanje poslova, (provjerava jeli zahtjevatelj brisanja autor posla, te dali postoji posao (403 ili 404))

router.delete('/:slug', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}
        agenda.jobs({}, function(err, jobs){
            if(err) return next(err);

            jobs.map(function(job){
                if(job.attrs.data.uniqueSlug === req.params.slug){
                    if(job.attrs.data.author.username === user.username){
                        job.remove(function(){


                            var RtmClient = require('@slack/client').RtmClient;
                            var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
                            var bot_token = process.env.SLACK_BOT_TOKEN || '';

                            var rtm = new RtmClient(bot_token);

                            let channel;

                            rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
                                for (const c of rtmStartData.channels) {
                                    if (c.is_member && c.name === 'general') {
                                        channel = c.id
                                    }
                                }
                            });

                            //slanje poruke na slack, koristio bio `${nekaVrijednost}`, ali nije postavljen ES6
                            //radi to svejedno ali mi smeta sto se crveni u WebStormu

                            rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
                                rtm.sendMessage("*Posao izbrisan:* " + job.attrs.data.title + ', *Vrjieme*: ' + new Date().toLocaleTimeString() + ', *Izbrisao*: ' + user.username + ' *Slug*: ' + job.attrs.data.uniqueSlug, channel);
                            });

                            rtm.start();



                            return res.sendStatus(204);
                        })
                    } else {
                        return res.sendStatus(403);
                    }
                }
            })
        })
    })
});


// ruta za fetchanje poslova ovisno o autoru

router.get('/:username', auth.required, function(req,res,next){
    agenda.jobs({}, function(err, jobs){
        if(err) return next(err);
        return res.json({
            jobs: jobs.filter(function(job){
                if(job.attrs.data.author.username === req.params.username){
                    return job;
                }
            })
        })
    })
});



//ruta za fetchanje svih poslova

router.get('/', auth.optional, function(req,res,next){
    agenda.jobs({}, function(err, jobs){
        return res.json({
            jobs: jobs
        });
    });
});






module.exports = router;