const router = require('express').Router()
const passport = require('../config/auth')
const { Class, Student, Evaluation } = require('../models')
const utils = require('../lib/utils')

const authenticate = passport.authorize('jwt', { session: false })

router.post('/student/:id/evaluations', authenticate, (req, res, next) => {
  const id = req.params.id
  let newEvaluation = req.body

  Class.findOne({'students._id': id}, function(err, aClass) {
    Evaluation.create(newEvaluation)
      .then((evaluation) => {
        aClass.students.id(id).evaluations.push(evaluation)
        aClass.students.id(id).evaluations.sort({ date: "asc" })

        aClass.save((err, data) => {
            if(!err) {
              res.json(data)
            } else {
              next(err)
            }
        })
      })
      .catch((error) => next(error))
  })
})

module.exports = router
