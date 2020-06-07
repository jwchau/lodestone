const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RaterDataSchema = new Schema({
  date: {
    // between (10/01/05 - 10/30/05)
    type: Date,
    required: true
  },
  raterId: {
    type: String,
    required: true,
    index: true
  },
  correctAnswers3: {
    // Low, Average, High
    type: String,
    required: true,
  },
  correctAnswers5: {
    // Bad, Okay, Intermediate, Great, Exceptional
    type: String,
    required: true,
  },
  raterAnswers3: {
    // Low, Average, High
    type: String,
    required: true,
  },
  raterAnswers5: {
    // Bad, Okay, Intermediate, Great, Exceptional
    type: String,
    required: true,
  },
  taskId: {
    // generated (1...10_000) number
    type: Number,
    required: true,
  },
  threeMatch: {
    // if raterAnswer3 === correctAnswer3
    type: Boolean,
    required: true,
  },
  fiveMatch: {
    // if raterAnswer5 === correctAnswer5
    type: Boolean,
    required: true,
  },
})

RaterDataSchema.index({raterId: 1, taskId: 1}, {unique: true})

module.exports = RaterData = mongoose.model('RaterData', RaterDataSchema);