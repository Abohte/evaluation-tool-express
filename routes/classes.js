const router = require('express').Router()
const passport = require('../config/auth')
const { Class } = require('../models')
const utils = require('../lib/utils')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/classes', authenticate, (req, res, next) => {
    Class.find()
      // Newest first
      .sort({ batchNumber: -1 })
      // Send the data in JSON format
      .then((classes) => res.json(classes))
      // Throw a 500 error if something goes wrong
      .catch((error) => next(error))
  })
  .get('/class/:id', authenticate, (req, res, next) => {
    const id = req.params.id

    Class.findById(id)
      .then((aClass) => {
        if (!aClass) { return next() }
        res.json(aClass)
      })
      .catch((error) => next(error))
  })
  .post('/classes', authenticate, (req, res, next) => {
    let newClass = req.body

      Class.create(newClass)
        .then((aClass) => res.json(aClass))
        .catch((error) => next(error))
    })

  module.exports = router
