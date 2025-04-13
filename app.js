var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sequelize = require('./db');
const Listing = require('./models/Listing');
const User = require('./models/User');

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var singupRouter = require('./routes/signup');
var createListingRouter = require('./routes/create-listing');
var messagesRouter = require('./routes/messages');
var accountRouter = require('./routes/account');
var helpRouter = require('./routes/help');
var adminHomeRouter = require('./routes/admin-home');
var adminLoginRouter = require('./routes/admin-login');
const { UniqueConstraintError } = require('sequelize');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/signup', singupRouter);
app.use('/create-listing', createListingRouter);
app.use('/messages', messagesRouter);
app.use('/account', accountRouter);
app.use('/help', helpRouter);
app.use('/admin-home', adminHomeRouter);
app.use('/adminLogin', adminLoginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function setup() {
    // Create the database tables if they don't exist
    const test = await Listing.create({title: "test", description: "test", quality: "good", price: 100.99});
    const test2 = await User.create({username: "test", password: "test", email: "email@email.com", university: "university"});
    console.log("Test user and listing created");
}

sequelize.sync({ force: true }).then(() => {
    console.log("Sequelize Sync Completed...");
    setup().then(() => console.log("Database setup complete"))
})

module.exports = app;
