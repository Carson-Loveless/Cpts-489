var express = require('express');
var router = express.Router();
var Listing = require('../models/Listing');

/* GET home page. */
router.get('/', async function(req, res, next) {
  
    const listings = await Listing.findAll();

    res.render('home', {
        title: 'Home' ,
        listings: listings,
    });

});

module.exports = router;
