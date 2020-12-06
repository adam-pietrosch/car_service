const express = require('express')
const router = express.Router()
const protection = require('csurf')()
const passport = require('passport')
const User = require('../models/user')

router.use(protection)

// login routes
router.get('/', isLoggedOut, (req, res) => {
    const errors = req.flash('error')
    const postedData = req.flash('postedData')[0]

    res.render('index', {
        csrfToken: req.csrfToken(),
        errors,
        postedData
    })
})

router.post('/', isLoggedOut, passport.authenticate('local.login', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
}))


// register routes
router.get('/register', isLoggedOut, (req, res) => {
    const errors = req.flash('error')
    const postedData = req.flash('postedData')[0]

    res.render('register', {
        errors,
        csrfToken: req.csrfToken(),
        postedData
    })
})

router.post('/register', isLoggedOut, passport.authenticate('local.register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
}))


// profile and logout routes
router.get('/profile', isLoggedIn, (req, res) => {
    const userName = req.user.name
    res.render('profile', {
        userName
    })
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut()
    res.redirect('/')
})


// PROTECT ROUTES
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/')
}

function isLoggedOut(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/profile')
    next()
}


module.exports = router