const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  msg: {
    type: String,
    required: true
  },
  status:{
    type:String,
    default:"sent"
    },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);