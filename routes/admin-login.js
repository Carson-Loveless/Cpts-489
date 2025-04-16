var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET admin login page. */
router.get('/', function(req, res, next) {
  res.render('admin-login', { title: 'Admin Login' });
});

//POST login form
router.post('/', async (req, res) => {
  const { id, password } = req.body;

  try {
      const user = await User.findOne({ where: { id } });

      if (!user) {
          return res.render('login', {
              title: 'Login',
              error: 'ID not found'
          });
      }

      //compare the password 
      if (password !== user.password) {
          return res.render('login', {
              title: 'Login',
              error: 'Incorrect password'
          });
      }

      // check if user is admin
      if (!user.isAdmin) {
        return res.render('login', {
            title: 'Login',
            error: 'Access denied'
        });
    }

      //log in success
      req.session.userId = user.id;
      res.redirect('/');  //send to home page
  } catch (err) {
      console.error(err);
      res.render('login', {
          title: 'Login',
          error: 'Something went wrong. Please try again.'
      });
  }
});

module.exports = router;
