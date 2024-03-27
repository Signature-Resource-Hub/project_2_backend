var mongoose = require("mongoose");
var quizresSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "quiz"
    },
    UserSelectedoption: {
        required: true,
        type: String
    },
    PartnerSelectedoption: {
        required: true,
        type: String
    },
    user_type: {
        type: String,
        default: "user"
    }
})
module.exports = mongoose.model("quizresponse", quizresSchema);