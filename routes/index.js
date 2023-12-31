const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));

//console.log('test');
router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
    res.send('Welcome to the Awesome Mart API.');});

router.use('/customers',require('./customers'));

router.use('/orders',require('./orders'));

router.use('/products',require('./products'));

router.use('/vendors',require('./vendors'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/loggedinout');
    });
});

module.exports = router;