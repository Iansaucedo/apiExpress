;(function () {
  'use strict'

  const mongoose = require('mongoose')
  const mongodbConfig = require('../../config/mongodb/mongodb-config').mongodb

  function prepareConnectionString(config) {
    let connectionString = 'mongodb://'
    if (config.user) {
      connectionString += `${config.user}:${config.password}@`
    }
    connectionString += `${config.server}/${config.database}`
    return connectionString
  }

  async function init() {
    try {
      const connectionString = prepareConnectionString(mongodbConfig)
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }

      await mongoose.connect(connectionString, options)
      console.log(`MongoDB connected successfully to ${mongodbConfig.database}`)

      mongoose.connection.on('error', err => {
        console.error('MongoDB connection error:', err)
      })

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected')
      })
    } catch (error) {
      console.error('MongoDB connection failed:', error.message)
      throw error
    }
  }

  module.exports = {
    init
  }
})()
