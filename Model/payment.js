const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailotpSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    cardno: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionid:{
        type: String,
        required: true,
        unique: true,
    },
    paymentstatus:{
        type: String,
        required: true,
        default:"not success"
    },
    packagetype:{
        type: String,
        required: true,
    },
    nameoncard:{
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("payments", emailotpSchema);
