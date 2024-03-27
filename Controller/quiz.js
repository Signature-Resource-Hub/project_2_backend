const Quiz = require('../Model/quiz')
const Quizres = require('../Model/quizresponse')
var jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { objectId } = require("mongodb")

exports.addquestion = (req, res) => {
    const newques = new Quiz(req.body);
    const updateDoc = {
        $set: req.body, // Include all fields in the update document
    };
    console.log(updateDoc)
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
    } else {
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

exports.attendquiz = async (req, res) => {
    try {
        const quizres = new Quizres(req.body);
        const { userId, partnerId,questionId } = req.body;
        const _id =questionId;
        // Find the quiz by No
        const quiz = await Quiz.findOne({ _id });
        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }
        console.log(req.body.pselectedoption)
        console.log('quiz.userId:', req.body.userId);
        console.log('quiz.partnerId:', req.body.partnerId);
        // Check if the user or partner is attending
        if (userId === req.body.userId.toString()) {
            // User attending the quiz
            quizres.UserSelectedoption = req.body.p1selectedoption;
        } if (partnerId === req.body.partnerId.toString()) {
            // Partner attending the quiz
            quizres.PartnerSelectedoption = req.body.p2selectedoption;
        } 
        
        else {
            return res.status(400).json({ msg: 'Invalid user or partner ID' });
        }

        // Save the updated quiz
        await quizres.save();
        if(quizres.UserSelectedoption==quizres.PartnerSelectedoption){
        return res.status(200).json({ msg: 'Quiz attended successfully.......Wow!!..Your answers are matching....You are perfect couples' });

        } else{
        return res.status(200).json({ msg: 'Quiz attended successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

