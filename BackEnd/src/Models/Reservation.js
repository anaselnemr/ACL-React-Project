const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({




//Flight From Info

  Flight_IDFrom: {
    type: String,
    required: true,
  },
  Flight_NoFrom: {
    type: String,
    required: true,
  },
  Flight_From: {
    type: String,
    required: true,
  },
  Flight_DateFrom: {
    type: Date,
   required: true,
  },
  CabinFrom: {
    type: String,
   required: true
  },
  FromPrice: {
    type: Number,
   required: true
  },
  SeatsChoosenFrom: {
    type: String,
  }, 
  SeatsChoosenFromID: {
    type: Number,
  },






  //Flight To Info

  Flight_IDTo: {
    type: String,
    required: true,
  },
  Flight_NoTo: {
    type: String,
    required: true,
  },
  Flight_To: {
    type: String,
    required: true,
  },
  Flight_DateTo: {
    type: Date,
   required: true,
  },
  CabinTo: {
    type: String,
   required: true
  },
  ToPrice: {
    type: Number,
   required: true
  },
  SeatsChoosenTo: {
    type: String,
  }, 
  SeatsChoosenToID: {
    type: Number,
  }, 






  //Passenger Information

   FirstName: {
    type: String,
    required: true,
  },

  LastName: {
    type: String,
    required: true,
  },

  PassPort_No: {
    type: String,
    required: true,
  },

  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  ReservationOwner: {
    type: Boolean,
    required: true,
  },
  isChild: {
    type: Boolean,
    required: true,
  },
  TotalPrice: {
    type: Number,
   required: true
  },
  Adults: {
    type: Number,
  required: true
  },
  Children: {
      type: Number,
    required: true
    },
 

}, { timestamps: true });

mongoose.models = {}
const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;