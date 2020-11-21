var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var dbConfig = require('./database/db.js');
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var Local_Strategy  = require('passport-local');
var flash = require('req-flash');
const hostname = '127.0.0.1';
const port = 3000;



// require('./passport.js')(passport);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

//connect to mongodb
mongoose.connect(dbConfig.url, {
  useNewUrlParser : true,
  useUnifiedTopology: true,
  })
    .then(()=>console.log('connected to db'))
    .catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 6000000000
  }
}));

app.use(flash());


app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
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


// Configuring Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


