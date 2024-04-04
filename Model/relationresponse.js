var mongoose = require("mongoose");
var quizresSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "relationquiz"
    },
    answer: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        default: "user"
    }
})
module.exports = mongoose.model("quizresponse", quizresSchema);