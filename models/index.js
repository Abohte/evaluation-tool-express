// models/index.js
const Class = require('./class')
const User = require('./user')

module.exports = {
  Class: Class.classes,
  Student: Class.students,
  User
}
