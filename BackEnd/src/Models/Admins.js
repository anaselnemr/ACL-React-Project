const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Adminschema = new Schema({
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
const Admin = mongoose.model('Admins', Adminschema);
module.exports = Admin;
