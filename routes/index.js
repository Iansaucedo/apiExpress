var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('pages/index', {
    title: 'Express Demo',
    message: 'Welcome to Express with EJS'
  })
})

module.exports = router
