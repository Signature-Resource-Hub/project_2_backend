const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailotpSchema = new Schema({
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
        unique: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("emailotp", emailotpSchema);
