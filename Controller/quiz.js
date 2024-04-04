const Quiz = require('../Model/quiz')
const Quizres = require('../Model/quizresponse')
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
    await Quiz.find().then((data)=>{
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
exports.attendquiz = async (req, res) => {
    try {
        const quizres = req.body;
        console.log(quizres)
        await Quizres.insertMany(quizres);
        return res.status(200).json({ msg: 'Quiz response inserted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

