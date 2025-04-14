const express = require('express');
const router = express.Router();
const User = require('../models/User');

//GET signup page
router.get('/', (req, res) => {
    res.render('signup', { title: 'Sign up', error: null });
});

//POST signup form
router.post('/', async (req, res) => {
    const { username, password, name, email } = req.body;

    try {
        //check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.render('signup', {
                title: 'Sign up',
                error: 'Username already taken'
            });
        }

        //create user
        await User.create({
            username,
            password,
            name,
            email
        });

        //send to login anfter signup
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.render('signup', {
            title: 'Sign up',
            error: 'Something went wrong. Please try again.'
        });
    }
});

module.exports = router;