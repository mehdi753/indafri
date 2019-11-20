const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/userCtrl');
const passport = require('passport');

router.post('/create', userCtrl.create);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
/*router.get('/profile', passport.authenticate('jwt', { session: false }), userCtrl.profile); */

module.exports = router;