const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema({
  mobile:{
    type: String
  }
}, {timestamps:true});

module.exports = Waitlist = mongoose.model("waitlists", waitlistSchema);