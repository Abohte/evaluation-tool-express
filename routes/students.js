const router = require('express').Router()
const passport = require('../config/auth')
const { Class, Student } = require('../models')
const utils = require('../lib/utils')

const authenticate = passport.authorize('jwt', { session: false })

router.post('/class/:id/students', authenticate, (req, res, next) => {
  const id = req.params.id
  let newStudent = req.body

  Class.findById(id)
    .then((aClass) => {
      Student.create(newStudent)
        .then((student) => {
          aClass.students.push(student)
          aClass.save((err, data) => {
              if(!err) {
                res.json(student)
              } else {
                next(err)
              }
          })
        })
        .catch((error) => next(error))
    })

})
.put('/student/:id', authenticate, (req, res, next) => {
  const id = req.params.id
  let updatedStudent = req.body

  Class.findOne({'students._id': id}, function(err, aClass) {
    aClass.students.id(id).set(updatedStudent);
    aClass.save((err, data) => {
        if(!err) {
          res.json(data)
        } else {
          next(err)
        }
    })
  })
})
.delete('/student/:id', authenticate, (req, res, next) => {
  const id = req.params.id

  Class.findOne({'students._id': id}, function(err, aClass) {
    aClass.students.id(id).remove();
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
