const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempcodeSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    uniqueId: {
        type: String,
        required: true,
        unique: true,
    },

    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("tempcode", tempcodeSchema);
