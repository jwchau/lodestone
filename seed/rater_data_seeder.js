// connect mongodb
const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI;
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    // .then(() => dropCollection(mongoose.connection.db))
    .catch(err => console.log(err));

// model
const RaterData = require('../models/RaterData');

// constant variables for data
const raterIds = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z',
]
const threeChoice = ['Low', 'Average', 'High']
const fiveChoice = ['Bad', 'Okay', 'Intermediate', 'Great', 'Exceptional']
const firstDay = new Date('10/01/05')


// random selection of constant variables
function randomDay(startDate, range = 30) {
  const date = new Date(startDate)
  date.setDate(startDate.getDate() + Math.random() * range)
  return date
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function createRaterData(n = 1) {
  const res = []
  for (let i = 0; i < n; ++i) {
    const correct3 = randomChoice(threeChoice)
    const correct5 = randomChoice(fiveChoice)
    const rater3 = randomChoice(threeChoice)
    const rater5 = randomChoice(fiveChoice)

    res.push(new RaterData({
      date: randomDay(firstDay),
      raterId: randomChoice(raterIds),
      correctAnswers3: correct3,
      correctAnswers5: correct5,
      raterAnswers3: rater3,
      raterAnswers5: rater5,
      taskId: Math.floor(Math.random() * 10000),
      threeMatch: correct3 === rater3,
      fiveMatch: correct5 === rater5,
    }))
  }
  return res
}

// clear database before seeding new data
function dropCollection(db) {
  db.dropCollection('raterdatas', (err) => {
    if (err !== null) console.log(err)
    else console.log('drop success')
  })
}

// set number of rater data entries
const numRaterDataEntries = 50000
const rDataset = createRaterData(numRaterDataEntries)
let done = 0
for (let i = 0; i < rDataset.length; i++) {
  const rData = rDataset[i];
  rData.save((err, res) => {
    if (++done === rDataset.length) exit()
  })
}

// check mongo shell <db.raterdatas.find()>
function exit() {
  mongoose.disconnect()
}
