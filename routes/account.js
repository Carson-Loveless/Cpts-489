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

// Remove a listing
router.post('/remove', async function (req, res, next) {
    console.log('Deleting listing with ID:', req.body.id);
    Listing.destroy({
        where: {
            id: req.body.id,
        },
    }).then(() => {
        console.log('Listing deleted successfully!');
    }).catch((error) => {
        console.error('Error deleting listing:', error);
    });

    res.redirect(url = "/account");
});
module.exports = router;
