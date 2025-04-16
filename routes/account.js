const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Listing = require('../models/Listing');

//GET account page
router.get('/', async (req, res, next) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.redirect('/login');
    }

    try {
        const user = await User.findByPk(userId, {
            attributes: ['name', 'username', 'email']
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const listings = await Listing.findAll({
            where: { userId: userId },
        });

        res.render('account', {
            title: 'Account',
            listings: listings,
            user
        });
    } catch (err) {
        next(err); 
    }
});

//POST account update
router.post('/update', async (req, res, next) => {
    const userId = req.session.userId;
    const { name, username, email, password } = req.body;

    if (!userId) {
        return res.redirect('/login');
    }

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.name = name;
        user.username = username;
        user.email = email;
        user.password = password;


        await user.save();
        res.redirect('/account');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
