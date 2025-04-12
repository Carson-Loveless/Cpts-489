var express = require('express');
var router = express.Router();

/* GET create-listing page. */
router.get('/', function(req, res, next) {
  res.render('create-listing', { title: 'Create Listing' });
});

module.exports = router;
