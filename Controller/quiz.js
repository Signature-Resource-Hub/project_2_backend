const Quiz = require('../Model/quiz')
const Quizres = require('../Model/quizresponse')
const Quizstatus = require('../Model/quizstatus')
var jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { objectId } = require("mongodb");
const { response } = require('express');

exports.addquestion = (req, res) => {
    const newques = new Quiz(req.body);
    const updateDoc = {
        $set: req.body, // Include all fields in the update document
    };
    console.log("working");
    console.log(updateDoc.$set.question)
    if (updateDoc.$set.question==null){
        return res.status(400).json({ msg: 'Please add question' });
    } else if (updateDoc.$set.option1==null) {
        return res.status(400).json({ msg: 'Please add Option1' });
    } else if (updateDoc.$set.option2==null) {
        return res.status(400).json({ msg: 'Please add Option2' });
    } else if (updateDoc.$set.option3==null) {
        return res.status(400).json({ msg: 'Please add Option3' });
    } else if (updateDoc.$set.option4==null) {
        return res.status(400).json({ msg: 'Please add Option4' });
    } 

else  {
        newques.save()
            .then((ques) => {
                if (ques) {
                    console.log("add")
                    console.log(req.body);
                    return res.status(201).json({msg: ' added successdfully' });
                }
            })
        }
}

// exports.addquestion = (req, res) => {
//     const newques = new Quiz(req.body); // Create a new instance of the Quiz model
    
//     // Validate each question before saving
//     for (var i = 0; i < req.body.length; i++) {
//         const question = req.body[i];

//         if (!question.question) {
//             return res.status(400).json({ msg: 'Please add a question' });
//         } else if (!question.option1 || !question.option2 || !question.option3 || !question.option4) {
//             return res.status(400).json({ msg: 'Please add all options for question: ' + question.question });
//         }
//     }

//     // Save the new document
//     newques.save()
//         .then((ques) => {
//             if (ques) {
//                 console.log("add")
//                 console.log(req.body);
//                 return res.status(201).json({ msg: 'Question(s) added successfully' });
//             }
//         })
//         .catch((err) => {
//             console.error(err);
//             return res.status(500).json({ msg: 'Internal server error' });
//         });
// }

exports.getQuestion= async (req,res)=>{
    console.log(req.body)
    const topic=req.body.topic
    await Quiz.find({ topic: topic }).then((data)=>{
        if (data) {
            console.log(data)
            res.status(200).json(data);
        }
        else {
            console.log("1s")
            return res.status(400).json({ 'msg': "internalserver" });
        }
    });
}
exports.gettopics = async (req, res) => {
    try {
        const data = await Quiz.find();
        if (data) {
            const questionTopics = data.map(question => question.topic);
            const uniqueTopics = [...new Set(questionTopics)]; // Remove duplicates
            console.log(uniqueTopics); // Now you have an array of unique topics
            res.status(201).json(uniqueTopics); // Send only the unique topics as the response
        } else {
            console.log("No data found");
            res.status(400).json({ 'msg': "Internal server error" });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ 'msg': "Internal server error" });
    }
};
exports.attendquiz = async (req, res) => {
    try {
        const quizres = req.body;
        await Quizres.insertMany(quizres);       
        return res.status(200).json({ msg: 'Quiz response inserted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};
exports.addstatus = async (req, res) => {
    try {
        const { userId, partnerId, topic } = req.body;

        // Find existing quiz status where the userId or partnerId matches
        let quizstatus = await Quizstatus.findOne({
            $or: [
                { userId, partnerId },
                { userId: partnerId, partnerId: userId }
            ]
        });

        if (quizstatus) {
            // Update the existing quiz status
            if (quizstatus.userId == userId) {
                quizstatus.userstatus = 'attempted';
            } 
            if (quizstatus.partnerId == userId) {
                quizstatus.partnerstatus = 'attempted';
            }
            if (quizstatus.partnerId == partnerId && quizstatus.userId === userId) {
                quizstatus.partnerstatus = 'attempted';
            }
            if (quizstatus.userId == partnerId && quizstatus.partnerId === userId) {
                quizstatus.userstatus = 'attempted';
            }

            await quizstatus.save();
        } else {
            // Create a new quiz status if none exists
            const newQuizStatus = {
                userId,
                partnerId,
                topic,
                userstatus: undefined,
                partnerstatus: undefined
            };

            // Set the status based on who is attempting first
            if (userId == req.body.userId) {
                newQuizStatus.userstatus = 'attempted';
            } 
            if (partnerId == req.body.userId) {
                newQuizStatus.partnerstatus = 'attempted';
            }

            quizstatus = new Quizstatus(newQuizStatus);
            await quizstatus.save();
        }

        return res.status(200).json({ msg: 'Quiz status inserted or updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};
exports.checkQuizStatus = async (req, res) => {
    try {
        const { userId, partnerId, topic } = req.body;

        // Find existing quiz status where the userId or partnerId matches
        let quizstatus = await Quizstatus.findOne({
            $or: [
                { userId, partnerId, topic },
                { userId: partnerId, partnerId: userId, topic }
            ]
        });

        if (quizstatus) {
            if (quizstatus.userstatus == 'attempted' && quizstatus.userId == userId) {
                return res.status(200).json({ msg: 'You have already attempted this quiz.', attempted: true });
            } 
            if (quizstatus.partnerstatus == 'attempted' && quizstatus.partnerId == userId) {
                return res.status(200).json({ msg: 'You have already attempted this quiz.', attempted: true });
            }
        }

        return res.status(202).json({ msg: 'You and your partner have not attempted this quiz yet.', attempted: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};
exports.checkpartnerQuizStatus = async (req, res) => {
    try {
        const { userId, partnerId } = req.body;

        // Find existing quiz status where the userId or partnerId matches
        let quizstatus = await Quizstatus.findOne({
            $or: [
                { userId, partnerId },
                { userId: partnerId, partnerId: userId }
            ]
        });

        if (quizstatus) {
            if (quizstatus.userstatus == 'attempted' && quizstatus.userId == partnerId) {
                return res.status(201).json({ msg: 'Your partner has already attempted this quiz.',topic:quizstatus.topic, partnerAttempted: true });
            }
            if (quizstatus.partnerstatus == 'attempted' && quizstatus.partnerId == partnerId) {
                return res.status(201).json({ msg: 'Your partner has already attempted this quiz.', partnerAttempted: true ,topic:quizstatus.topic});
            }
        }

        return res.status(202).json({ msg: 'You and your partner have not attempted this quiz yet.', attempted: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};





