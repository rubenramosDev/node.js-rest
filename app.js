//Librerias externas
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser');
const jwtMiddleware = require('express-jwt');

//configuraciones
const db = require('./config/database');
const { jwtSecrets } = require('./config/secrets');

//rutas
const places = require('./routes/places');
const users = require('./routes/users');
const sessions = require('./routes/sessions');
const favorites = require('./routes/favorites');
const visits = require('./routes/visits');
const visitsPlaces = require('./routes/visitsPlaces');

var app = express();
db.connect();
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  jwtMiddleware({ secret: jwtSecrets }).unless({ path: ['/sessions', '/users'], method: 'GET' }));

//Indicamos al servidor que vamos a atender a estas rutas
app.use('/places', places);
app.use('/places', visitsPlaces);
app.use('/users', users);
app.use('/sessions', sessions);
app.use('/favorites', favorites);
app.use('/visits', visits);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
