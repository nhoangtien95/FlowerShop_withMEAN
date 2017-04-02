var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var passport = require('passport');
var secret = require('./config/secret');
var db = require('./config/db');
var session = require('express-session');
var mongoStore = require('connect-mongo/es5')(session);


var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new mongoStore({ url: secret.db, autoReconnect: true })
}));

app.engine('ejs', engine);
app.set('view engine', 'ejs');

var userRoutes = require('./app/routes/user.server.routes');


app.use(userRoutes);

app.listen(secret.port, function(err)
{
  if (err) throw err;
  console.log("Server is running on port " + secret.port);
});
