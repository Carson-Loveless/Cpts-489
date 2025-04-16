var express = require('express');
var router = express.Router();
var Listing = require('../models/Listing');

/* GET create-listing page. */
router.get('/', function(req, res, next) {
    res.render('create-listing', { title: 'Create Listing' });
});


/* POST create listing. */
router.post('/', async (req, res) => {
    try {
        //Create a new listing in the database
        const newListing = await Listing.create({
        title: req.body.title,
        description: req.body.description,
        quality: req.body.quality,
        price: req.body.price,
        imageURL: req.body.image,
        category: req.body.category,
        userid: req.session.userId
        });

        res.redirect('/'); //Go to home page
    } catch (error) {
        console.error('Error creating listing:', error);
    }
});

module.exports = router;
