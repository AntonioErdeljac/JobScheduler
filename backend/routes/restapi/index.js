var router = require('express').Router();

//router file koji spaja sve podrute


router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/jobs', require('./jobs'));

module.exports = router;