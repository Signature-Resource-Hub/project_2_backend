var mongoose = require("mongoose");
var quizstatusSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    userstatus: {
        type: String,
        default:"Not Attempted"
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    partnerstatus: {
        type: String,
        default:"Not Attempted"
    },
    topic: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    
})
module.exports = mongoose.model("quizstatus", quizstatusSchema);