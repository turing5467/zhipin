var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var multer = require('multer')


mongoose.connect('mongodb://localhost:27017/zhipin')
mongoose.connection.once('open', () => console.log('db open'))
mongoose.connection.once('close', () => console.log('db close'))

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var userDetailRouter = require('./routes/user_detail');
// var jobListRouter = require('./routes/job_list')
// var CPNListRouter = require('./routes/cpn_list')
var CPNDetailRouter = require('./routes/cpn_detail')
var JobDetailRouter = require('./routes/job_detail')
var staticRouter = require('./routes/static')
var uploadRouter = require('./routes/upload')
var downloadRouter = require('./routes/download')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({ extended: true, limit: '100mb'}));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', userDetailRouter);
// app.use('/', jobListRouter);
// app.use('/', CPNListRouter);
app.use('/', CPNDetailRouter);
app.use('/', JobDetailRouter);
app.use('/', staticRouter);
app.use('/', uploadRouter);
app.use('/', downloadRouter);

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

module.exports = app;
