const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

// Import routes and utilities
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const { MongoDBUtil } = require('./modules/mongodb/mongodb.module')
const UserController = require('./modules/user/user.module')().UserController

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Initialize MongoDB
MongoDBUtil.init().catch(err => {
  console.error('Failed to connect to MongoDB:', err)
  process.exit(1)
})

// Routes
app.use('/', indexRouter)
app.use('/users', usersRouter) // Web routes
app.use('/api/users', UserController) // API routes

// API status endpoint
app.get('/api/status', (req, res) => {
  const pkg = require(path.join(__dirname, 'package.json'))
  res.json({
    name: pkg.name,
    version: pkg.version,
    status: 'up',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res, next) => {
  next(createError(404))
})

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Set status code
  res.status(err.status || 500)

  // Handle both view and API responses
  if (req.accepts('html')) {
    res.render('error', {
      title: 'Error',
      message: err.message,
      error: err.status,
      stack: res.locals.error
    })
  } else {
    res.json({
      status: 'error',
      message: res.locals.message,
      error: res.locals.error
    })
  }
})

module.exports = app
