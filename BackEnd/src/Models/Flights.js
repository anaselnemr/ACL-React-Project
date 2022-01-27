const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Id .....
    // unique : true,
    // dropDups: true

const flightsSchema = new Schema({

  // _id: {type: String,
  //    auto: true},

  Flight_No: {
    type: String,
    required: true,
  },   
  From: {
    type: String,
   required: true,
  },
  To: {
    type: String,
   required: true
  },
  Flight_Date: {
    type: Date,
   required: true,
  },
  Terminal: {
    type: String,
   required: true
  },
  Flight_Duration: {
    type: String,
   required: true
  },
  Economy_Seats: {
    type: Number,
   required: true
  },
  Business_Seats: {
    type: Number,
   required: true
  },
  First_Seats: {
    type: Number,
   required: true
  },
  Economy_Baggage: {
    type: Number,
   required: true
  },
  Business_Baggage: {
    type: Number,
   required: true
  },
  First_Baggage: {
    type: Number,
   required: true
  },
  Economy_Price: {
    type: Number,
   required: true
  },
  Business_Price: {
    type: Number,
   required: true
  },
  First_Price: {
    type: Number,
   required: true
  },
  Available_Seats: {
    type: [Boolean],
  },

}, { timestamps: true });

mongoose.models = {}
const Flights = mongoose.model('Flights', flightsSchema);
module.exports = Flights;
