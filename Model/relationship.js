var mongoose = require("mongoose");
var relationSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("relationquiz", relationSchema);