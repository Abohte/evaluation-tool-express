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
            });
          })
          .catch((error) => next(error))
      })

  })
  .delete('/class/:classId/student/:studentId', (req, res, next) => {
    const studentId = req.params.studentId
    const classId = req.params.classId
    Class.findByIdAndUpdate(classId, {
      $pull: {
        students: {_id: studentId}
      }
    })
    .then((aClass) => {
      res.json(aClass)
    })
    .catch((error) => next(error))
  })


  module.exports = router
