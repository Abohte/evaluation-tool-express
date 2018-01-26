const router = require('express').Router()
const passport = require('../config/auth')
const { Class, Student, Evaluation } = require('../models')
const utils = require('../lib/utils')

const authenticate = passport.authorize('jwt', { session: false })

router.post('/student/:id/evaluations', authenticate, (req, res, next) => {
  const id = req.params.id
  let newEvaluation = req.body
  newEvaluation.userId = req.account._id

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
.put('/evaluation/:id', authenticate, (req, res, next) => {
  const id = req.params.id
  let updatedEvaluation = req.body

  Class.findOne({'students.evaluations._id': id}, function(err, aClass) {
    let aStudent = aClass.students.find((student) => {
      return student.evaluations.some((evaluation) => evaluation._id == id)
    });
    aClass.students.id(aStudent._id).evaluations.id(id).set(updatedEvaluation);
    aClass.save((err, data) => {
        if(!err) {
          res.json(data)
        } else {
          next(err)
        }
    })
  })
})

module.exports = router
