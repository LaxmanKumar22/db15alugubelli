var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var kiteRouter = require('./routes/kite');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var kite = require("./models/kite");
var resourceRouter = require('./routes/resource');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const connectionString =  'mongodb+srv://lucky510:Laxman12@cluster0.yadva.mongodb.net/cluster0?retryWrites=true&w=majority'
mongoose = require('mongoose'); 
mongoose.connect(connectionString,  
{useNewUrlParser: true, 
useUnifiedTopology: true}); 

app.use('/', indexRouter);
app.use('/kite', kiteRouter);
app.use('/users', usersRouter);
app.use('/selector', selectorRouter);
app.use('/addmods', addmodsRouter);
app.use('/resource', resourceRouter);

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

//Get the default connection 
var db = mongoose.connection; 
 
//Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){ 
 console.log("Connection to DB succeeded")}); 

 // We can seed the collection if needed on server start 
async function recreateDB(){ 
  // Delete everything 
  await kite.deleteMany(); 
 
  let instance1 = new 
kite({Brand:"d",  color:'pink', 
price:25.4}); 
  instance1.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("First object saved") 
  }); 

  let instance2 = new 
kite({Brand:"e",  color:'purple', 
price:25.4}); 
  instance2.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("Second object saved") 
  }); 

  let instance3 = new 
kite({Brand:"r",  color:'orange', 
price:25.4}); 
  instance3.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("Third object saved") 
  }); 
} 
 
let reseed = true; 
if (reseed) { recreateDB();} 