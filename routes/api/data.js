const express = require("express");
const router = express.Router();
const RaterData = require('../../models/RaterData');
const passport = require('passport');


router.get("/test", (req, res) => res.json({ msg: "This is the data route" }));

router.get('/rater_data', passport.authenticate('jwt', {session: false}), (req, res) => {
  // array of rater data
  RaterData.find({})
    .then(r => res.send(r))
    .catch(err => console.log(err))
})


module.exports = router;