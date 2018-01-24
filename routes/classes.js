const router = require('express').Router()
const passport = require('../config/auth')
const { Class } = require('../models')
const utils = require('../lib/utils')

const authenticate = passport.authorize('jwt', { session: false })

router.
  .get('/classes', (req, res, next) => {
    Class.find()
      // Newest first
      .sort({ createdAt: -1 })
      // Send the data in JSON format
      .then((classes) => res.json(classes))
      // Throw a 500 error if something goes wrong
      .catch((error) => next(error))
  })
  .get('/class/:id', (req, res, next) => {
    const id = req.params.id

    Class.findById(id)
      .then((aClass) => {
        if (!aClass) { return next() }
        res.json(aClass)
      })
      .catch((error) => next(error))
  })
  .post('/classes', authenticate, (req, res, next) => {
    const newClass = {
      // userId: req.account._id,
      // players: [{
      //   userId: req.account._id,
      //   pairs: []
      // }],
      // cards: utils.shuffle('✿✪♦✵♣♠♥✖'.repeat(2).split(''))
      //   .map((symbol) => ({ visible: false, symbol }))
    }

    Class.create(newClass)
      .then((aClass) => {
        io.emit('action', {
          type: 'CLASS_CREATED',
          payload: aClass
        })
        res.json(aClass)
      })
      .catch((error) => next(error))
  })

  module.exports = router
