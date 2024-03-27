const Chat = require('../Model/chat');
var jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { objectId } = require("mongodb")
exports.chat = (req, res) => {
    // Your chat logic here
   
    const newchat = new Chat(req.body);
    newchat.save().then((chat)=>{
        if(chat)
        return res.status(201).json({msg:'message send'})
    })
};
exports.getchat=(req,res)=>{
   const senderId = req.body.senderId;
   const receiverId = req.body.receiverId;
   Chat.find({ 
    $or: [
        { $and: [{ senderId: senderId }, { receiverId: receiverId }] },
        { $and: [{ senderId: receiverId }, { receiverId: senderId }] }
    ]
})
.then((data) => {
    res.status(200).json(data);
})
.catch((error) => {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ error: "Internal server error" });
});
}