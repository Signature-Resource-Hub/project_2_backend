var mongoose = require("mongoose");
var profileSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "register"
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
    smoke: {
        type: String
    },
    drinkalchol: {
        type: String
    },
    educationqualification: {
        type: String
    },
    dreams: {
        type: String
    },
    Designation: {
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
module.exports = mongoose.model("profile", profileSchema);