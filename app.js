var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./app_api/models/db')  //2017125009 박지웅

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const apiRouter = require('./app_api/routes/index')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})//2017125009 박지웅
// app.use('/', indexRouter);
app.use('/api', apiRouter)

// app.get('*', function(req,res,next){
//     res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'))
// })

app.get(/(\/about)|(\/location\/[a-z0-9]{24)/, function(req,res,next){
    res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'))
})

app.use('/users', usersRouter);

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
    res.render('error');
});

module.exports = app;
