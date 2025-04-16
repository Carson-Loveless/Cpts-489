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


router.post('/filter', async function (req, res, next){
    const listings = await Listing.findAll({
        where: {
            category: req.body.filter,
        },
    });

    res.redirect(url = "/");
});

module.exports = router;
