require('dotenv').config({
  path: __dirname + '/.env'
})
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var mongoose = require('mongoose')
var cors = require('cors')

var indexRouter = require('./routes/index')
var apiRouter = require('./routes/api')

var app = express()

var configSession = {
	secret: 'learning',
	saveUninitialized: true,
	resave: false,
	cookie: { maxAge: 600000 }
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  configSession.cookie.secure = true
}
var corsOptionsDelegate = async function (req, callback) {
  var corsOptions = { origin: false }, isCors
  try{
    // if(process.env.NODE_ENV === 'development'){
      // isCors = await Origin.getIdUrl(req.header('Origin'))
    // }
    isCors = true
    function run(){
      if(isCors){
        corsOptions = { origin: true }
      }else{
        corsOptions = { origin: false }
      }
    }
    run()
  }catch(err){
    // console.log(err)
  }finally{
    callback(null, corsOptions)
  }
}
app.use(cors(corsOptionsDelegate))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session(configSession))
app.use(async function(req,res,next){
    await mongoose.connect('mongodb://localhost/stackoverflow')
    next();
})

app.use('/', indexRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app;
