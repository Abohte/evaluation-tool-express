const mongoose = require('../config/database')
const { Schema } = mongoose

const evaluationSchema = new Schema({
  evaluation: ['red', 'yellow', 'green'],
  date: { type: Date, required: true, default: Date.now },
  remarks: { type: String, required: false },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
})

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  evaluations: [evaluationSchema],
})

const classSchema = new Schema({
  students: [studentSchema],
  batchNumber: { type: Number, required: true },
  startsAt: { type: Date, required: true },
  endsAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('classes', classSchema)
