const express = require('express');
const router = express.Router();
const User = require('../models/User');

//GET login page
router.get('/', (req, res) => {
    res.render('login', { title: 'Login', error: null });
});

//POST login form
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.render('login', {
                title: 'Login',
                error: 'Username not found'
            });
        }

        //compare the password 
        if (password !== user.password) {
            return res.render('login', {
                title: 'Login',
                error: 'Incorrect password'
            });
        }

        //log in success
        req.session.userId = user.id;
        res.redirect('/');  //send to home page
    } catch (err) {
        console.error(err);
        res.render('login', {
            title: 'Login',
            error: 'Something went wrong. Please try again.'
        });
    }
});

module.exports = router;
