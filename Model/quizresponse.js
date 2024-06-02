var mongoose = require("mongoose");
var quizresSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    topic: {
        type: String
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "quiz"
    },
    response: {
        type: String
    },
    user_type: {
        type: String,
        default: "user"
    }
})
module.exports = mongoose.model("quizresponse", quizresSchema);