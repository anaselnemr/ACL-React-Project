const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({


    UserID: {
        type: String,
        required: true,
        unique: true
    },  

    RefreshToken: {
    type: String,
    required: true,
},  

}, { timestamps: true });
mongoose.models = {}
const RefreshTokens = mongoose.model('RefreshTokens', Userschema);
module.exports = RefreshTokens;