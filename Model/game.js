const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  playerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'connection'
      },
  partnerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'connection'
      },
  playerChoice: {
    type: String,
    required: true,
    enum: ['Rock', 'Paper', 'Scissors']
  }
});

module.exports = mongoose.model('Game', gameSchema);
