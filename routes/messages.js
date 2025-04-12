var express = require('express');
var router = express.Router();

/* GET messages page. */
router.get('/', function(req, res, next) {
  res.render('messages', { title: 'Messages' });
});

module.exports = router;
