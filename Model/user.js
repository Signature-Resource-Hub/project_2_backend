var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({

    regId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "register"
    },
    partnerId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true,
        maxlength: 52,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    height: {
        type: String
    },
    weight: {
        type: String
    },
    location: {
        type: String,
    },
    community: {
        type: String
    },
    interests: {
        type: String
    },
    hobbies: {
        type: String
    },
    smokeOption: {
        type: String
    },
    drinkalchol: {
        type: String
    },
    yourgoals: {
        type: String
    },
    dreams: {
        type: String
    },
    settledownplan: {
        type: String
    },
    startlove: {
        type: Date
    },
    userData: {
        type: Array,
    },
    user_type: {
        type: String,
        default: "user"
    }
})
module.exports = mongoose.model("user", userSchema);
