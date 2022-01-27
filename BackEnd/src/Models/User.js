const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({

FirstName: {
    type: String,
    required: true,
},  

LastName: {
    type: String,
    required: true,
},  

Email: {
    type: String,
    required: true,
    unique: true
},  

Date_of_Birth: {
    type: Date,
    required: true,
},

PassPort_No: {
    type: String,
    required: true,
},  

Username: {
    type: String,
    required: true,
    unique: true
  },

Password: {
    type: String,
    required: true,
  },


}, { timestamps: true });
mongoose.models = {}
const User = mongoose.model('Users', Userschema);
module.exports = User;