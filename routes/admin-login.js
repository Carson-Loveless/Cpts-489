var express = require('express');
var router = express.Router();

/* GET admin login page. */
router.get('/', function(req, res, next) {
  res.render('admin-login', { title: 'Admin Login' });
});

module.exports = router;
