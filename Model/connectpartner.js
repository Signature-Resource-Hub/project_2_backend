var mongoose = require("mongoose");
var connectSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique:true,
        ref: "user"
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        unique:true,
        ref: "user"
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
})
module.exports = mongoose.model("connection", connectSchema);