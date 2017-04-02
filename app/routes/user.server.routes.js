var router = require('express').Router();
var passport = require('passport');
var user = require('../controllers/user.server.controller');


router.get('/signup');
router.post('/signup', user.SignUp);


module.exports = router;
