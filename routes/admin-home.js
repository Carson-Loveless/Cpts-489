var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');

/* GET admin home page. */
router.get('/', async function(req, res, next) {

    const listings = await Listing.findAll();
    res.render('admin-home', {
        title: 'Admin Home',
        listings: listings,});
});

/* POST admin home page. */
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

    res.redirect(url="/admin-home");
});

// POST filter
router.post('/filter', async function (req, res, next) {
    const listings = await Listing.findAll({
        where: {
            category: req.body.filter,
        },
    });

    res.redirect(url = "/admin-home");
});
module.exports = router;
