var express = require('express')
var router = express.Router()

// GET users listing page
router.get('/', function (req, res, next) {
  if (req.accepts('html')) {
    res.render('pages/users', {
      title: 'Users List',
      message: 'User Management System',
      users: [] // This will be populated from your MongoDB later
    })
  } else {
    res.json({
      status: 'success',
      data: [] // This will be populated from your MongoDB later
    })
  }
})

// GET single user
router.get('/:id', function (req, res, next) {
  if (req.accepts('html')) {
    res.render('pages/user-detail', {
      title: 'User Detail',
      user: null // This will be populated from your MongoDB later
    })
  } else {
    res.json({
      status: 'success',
      data: null // This will be populated from your MongoDB later
    })
  }
})

module.exports = router
