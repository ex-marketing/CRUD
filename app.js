const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

//MongoDB Connection
mongoose.connect('mongodb://localhost/crud');
const db = mongoose.connect;

//Routes
const routes = require('./routes/index');
const users = require('./routes/users');

//Initialise App With Express
const app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Session express
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//Initialise Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Varaiables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//APP USE
app.use('/', routes);
app.use('/users', users);

//Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('Listening on port '+app.get('port'));
});
