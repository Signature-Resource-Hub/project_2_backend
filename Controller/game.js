const Game = require('../Model/game');

exports.game = async (req, res) => {
  try {
    const playerId = req.body.playerid; // Assuming player ID is in request body
    const partnerId = req.body.partnerid; // A
    // 1. Retrieve existing game data (if applicable)
    const existingGame = await Game.findOne({ playerid: playerId,partnerid:partnerId});

    // 2. Handle existing game deletion (optional):
    if (existingGame) { // Check for explicit deletion request
      await existingGame.deleteOne();  // Delete existing game if confirmed
    }

    // 3. Create new game instance:
    const newGame = new Game(req.body);

    // 4. Persist the new game:
    await newGame.save();
//     Game.find({ 
//     $or: [
//         { $and: [{ playerid: playerId }, { partnerid: partnerId }] },
//         { $and: [{ playerid: partnerId }, { partnerid: playerId }] }
//     ]
// }).then((choice) => {
//   res.status(200).json(choice);
//   console.log(choice)
// })
    // 5. Send response:
    res.json({ message: "Game saved successfully!" }); // Or customize success message

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving game" }); // Or provide more specific error messages
  }
};
let result;
exports.getchoice = async (req, res) => {
  try {
    const playerId = req.body.playerid; // Assuming player ID is in request body
    const partnerId = req.body.partnerid;
    Game.find({
      $or: [
        { $and: [{ playerid: playerId }, { partnerid: partnerId }] },
        { $and: [{ playerid: partnerId }, { partnerid: playerId }] }
      ]},
      { playerChoice: 1 }).then((choice) => {

        const player1Choice = choice[0].playerChoice; // Assuming first element is player 1
        const player2Choice = choice[1].playerChoice; // Assuming second element is player 2
        // Compare the choices here
        if (player1Choice === player2Choice) {
          result="It's a tie! Both players choose " + player1Choice;
        } else {
          // Determine the winner based on Rock-Paper-Scissors rules
          if (player1Choice === "Rock") {
            if (player2Choice === "Scissors") {
              result="you wins! Rock crushes scissors.";
            } else if (player2Choice === "Paper") {
              result="Partner wins! Paper covers rock.";
            } else {
              result="Invalid choice for player 2. Please try again.";
            }
          } else if (player1Choice === "Paper") {
            if (player2Choice === "Rock") {
              result="You wins! Paper covers rock.";
            } else if (player2Choice === "Scissors") {
              result="Partner wins! Scissors cut paper.";
            } else {
              result="Invalid choice for player 2. Please try again.";
            }
          } else if (player1Choice === "Scissors") {
            if (player2Choice === "Paper") {
              result="You wins! Scissors cut paper.";
            } else if (player2Choice === "Rock") {
              result="Partner wins! Rock crushes scissors.";
            } else {
              result="Invalid choice for Partner. Please try again.";
            }
          } else {
            result="Invalid choice for You. Please try again.";
          }
        }
    })
    res.json({ message: result }); // Or customize success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving game" }); // Or provide more specific error messages
  }
}