const Register = require('../Model/register');
const User = require('../Model/user')
const emailOtp = require('../Model/emailotp')
var jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { objectId } = require("mongodb")
const { accountSID, authToken ,serviceSID} = require("../config/otp_auth");
const { response } = require('express');
const client = require("twilio") (accountSID, authToken)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   // service: 'gmail', // You can use other email services
    service: 'yahoo', // You can use other email services
    auth: {
        //user: 'milletapp30@gmail.com',
        user: 'milletapp369@yahoo.com',
       // pass: 'cbss tldq xcla sxzh'
       pass: 'qwertifmcjskdjf'

    }
});
//qwertifmcjskdjf
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

const otpStorage = {};
//verify otp
exports.verifyUser = (req, res) => {
    // console.log(req.body);
    // // Assuming you have a request body with the OTP and other necessary data
    // const contactnumber = req.body.contactnumber;
    // if (!contactnumber) {
    //     return res.status(400).json({ msg: 'Please provide contact number' });
    // } else if(contactnumber.length!=10){
    //     return res.status(400).json({ msg: 'Please provide valid contact number' });
    // }
    // else {
    //     Register.findOne({ contactnumber: req.body.contactnumber}).then(async (compregister) => {
    //         if(compregister){
                
    //             console.log("user",compregister)
    //             if(compregister.remark==="verified" || compregister.remark==="not verified" || compregister.remark==="partially verified"){
    //                 console.log('ww')
    //                 client.verify.services(serviceSID)
    //                     .verifications
    //                     .create({
    //                         to: `+91${req.body.contactnumber}`,
    //                         channel: "sms"
    //                     })
    //                 .then((resp) =>{
    //                     console.log("response",resp)
    //                 return res.status(200).json({ msg: 'already existing verified user(otp send)', compregister });
    //                })
    //             }
    //             else{
                    
    //             }
    
    //         }
    //         else{
    //                         client.verify.services(serviceSID)
    //                     .verifications
    //                     .create({
    //                         to: `+91${req.body.contactnumber}`,
    //                         channel: "sms"
    //                     }).then((resp) =>{
    //                         console.log("otpsend")
    //                         return res.status(201).json(compregister);
    //                     })
    //         }

    //        })
    // }
    const contactnumber= req.body.contactnumber;
    if (!contactnumber) {
            return res.status(400).json({ msg: 'Please provide contact number' });
        } else if(contactnumber.length!=10){
            return res.status(400).json({ msg: 'Please provide valid contact number' });
        }
        else{
        return res.status(200).json({ msg: 'user,otp send' });

    }
};

exports.verifyotp = async (req, res) => {
//     console.log(req.body)
//     //const newUser = new Register(req.body);
//     const olduser = await Register.findOne({ contactnumber: req.body.contactnumber })
//     const contactnumber = req.body.contactnumber;
//     let otp = req.body.otp
//     client.verify.services(serviceSID)
//     .verificationChecks
//     .create({
//         to: `+91${contactnumber}`,
//         code: otp
//     }).then(async (confirm)=>{
//         if(confirm.valid && contactnumber == req.body.contactnumber){
//     // Assuming your verification process succeeds here
//     //if (otp == '1234' && contactnumber == req.body.contactnumber) {
//         console.log("in verify otp")
//         if(olduser){
//             //console.log('olduser')

//             console.log('1')
//             if (olduser.remark == "verified") {
//                 const olduser = await Register.findOne({ contactnumber: req.body.contactnumber })
//                 console.log('olduser')
//                 console.log(olduser)
//                 if (olduser) {
//                     const userin=await User.findOne({regId:olduser._id})
//                     if(userin){
//                         console.log("inn")
//                         // const token = jwt.sign({_id: olduser._id, usertype: olduser.user_type,status:"not verified" }, "millet");
//                         // res.cookie("token", token, { expire: new Date() }, +9999)
//                         const token = jwt.sign({ _id: userin._id, usertype: olduser.user_type,status:"verified" }, "millet");
//                         res.cookie("token", token, { expire: new Date() }, +9999)
//                         //console.log(token) 
//                         return res.status(201).json([olduser,userin,{token:token}]);
//                     }
                    
//                 } 
//                 // else {
//                 //     console.log("in 1")
//                 //     return res.status(400).json({ msg: 'Failed to save user' });
//                 // }
//                 // console.log("hii")
//                 // const token = jwt.sign({ _id: olduser._id, usertype: olduser.user_type,status:"verified" }, "millet");
//                 // res.cookie("token", token, { expire: new Date() }, +9999)
//                 // return res.status(201).json({ token: token, msg: 'Homepage' });
    
//             } else if(olduser.remark == "partially verified"){
//                 // If verification is successful, proceed to save the user
//                 console.log("partially verified")
    
//                 var count = 0
              
//                 const olduser = await Register.findOne({ contactnumber: req.body.contactnumber })
//                 //console.log(olduser)
//                 if (olduser) {
//                     const userin=await User.findOne({regId:olduser._id})
//                     if(userin){
//                         // const token = jwt.sign({_id: olduser._id, usertype: olduser.user_type,status:"not verified" }, "millet");
//                         // res.cookie("token", token, { expire: new Date() }, +9999)
//                         return res.status(201).json([olduser,userin]);
//                     }
                    
                    
//                 } else {
//                     console.log("in 1")
//                     return res.status(400).json({ msg: 'Failed to save user' });
//                 }
                    
                    
//             }
//             else{
//                 return res.status(201).json([olduser]); 
//             }
//         }
//         else{
//             console.log("in not")
//             return res.status(201).json({msg: 'Homepage' });
//         }
        
//     } else {
//         console.log("in else")
//         return res.status(400).json({ msg: 'Invalid OTP' });
//         count = count + 1;
//     }
// }
// )}
const contactnumber=req.body.contactnumber;
let otp = req.body.otp;
if (otp == '1234' && contactnumber == req.body.contactnumber) {
    console.log(contactnumber)
    const olduser = await Register.findOne({ contactnumber: contactnumber })
    console.log(olduser)
    if(olduser){
        if(olduser.remark=='not completed'){
            const token = jwt.sign({ _id: olduser._id, usertype: olduser.user_type,status:"verified" }, "millet");
            res.cookie("token", token, { expire: new Date() }, +9999)
            return res.status(201).json({msg: 'olduser',olduser,token:token });
        }else if(olduser.remark=='completed'){
            const token = jwt.sign({ _id: olduser._id, usertype: olduser.user_type,status:"verified" }, "millet");
            res.cookie("token", token, { expire: new Date() }, +9999) 
            return res.status(201).json({msg: 'olduser' ,olduser,token:token});
        }
    }else{
            return res.status(201).json({msg: 'newuser' });
    }
}else{
        return res.status(400).json({ msg: 'Invalid OTP' });
}

}

//create profile
exports.registerUser = (req, res) => {
    // console.log(req.body)
    // const newUser = new User(req.body);
    // User.findOne({ regId: req.body.regId }).then((user) => {
    //     if (user) {+
    //         console.log("first")
    //         return res.status(400).json({ 'msg': 'account created' });
    //     } else {
    //         User.findOne({ email: req.body.email }).then((user) => {
    //             if (user) {
    //                 console.log("first")
    //                 return res.status(400).json({ 'msg': 'email exist' });
    //             } else {
    //                 Register.updateOne({_id:req.body.regId},{$set:{remark:"partially verified"}}).then((updated)=>{
    //                     if(updated){
    //                         newUser.save()
    //                         .then((user) => {
    //                             if (user) {
    //                                 console.log("send")
    //                                 const token = jwt.sign({ _id: newUser._id, usertype: newUser.user_type }, "millet");
    //                                 res.cookie("token", token, { expire: new Date() }, +9999)
    //                                 return res.status(201).json({ token: token, msg: ' register successdfully' });
    //                             }
    //                         })
    //                     }
    //                     else{
    //                         return res.status(500).json({ 'msg': 'internal error' });
    //                     }
    //                 })
                    
    //             }
    //         })
    //     }
    // })
    const{contactnumber,email,name,dob,gender} = req.body;
    if(contactnumber && email && name && dob && gender){
        const newUser = new Register({
            contactnumber,
            email,
            name,
            dob,
            gender
          });
          newUser.save() .then((user) => {
            if (user) {
                console.log("send")
                Register.findOne({contactnumber:req.body.contactnumber}).then((olduser) => {
                if(olduser){
                console.log(olduser._id)
                const token = jwt.sign({ _id: olduser._id, usertype: newUser.user_type }, "millet");
                res.cookie("token", token, { expire: new Date() }, +9999)
                console.log(token)
                return res.status(201).json({ token: token, msg: ' register successdfully' });
            }})
        }
        })

    }else{
        return res.status(500).json({ 'msg': 'internal error' });
    }
};
exports.verifyemail = async (req, res) => {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        await emailOtp.findOneAndDelete({ email: email });
        const otp = generateOTP();
        otpStorage[email] = otp; // Store OTP associated with the email

        // const mailOptions = {
        //     //from: 'milletapp30@gmail.com',
        //     from: 'milletapp369@yahoo.com',
        //     to: email,
        //     subject: 'Your OTP Code',
        //     text: `Dear Customer\n Welcome to millet App\n Your OTP code is ${otp}\n Regards\n Team Millet`
        // };
        //await transporter.sendMail(mailOptions);
        const tempCode = new emailOtp({ otp: otp ,email:email});
        tempCode.save().then((code)=>{
            return res.status(201).json({ msg: 'Added successfully',otp});
        })
};
exports.emailotp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const record = await emailOtp.findOne({ email: email, otp: otp });
        if (!record) {
            return res.status(400).json({ message: "Invalid OTP or email" });
        }

        // Optionally, delete the record after successful verification
        await emailOtp.findOneAndDelete({ email: email });
        // const mailOptions = {
        //     from: 'milletapp30@gmail.com',
        //     to: email,
        //     subject: 'Successfully Verified',
        //     text: `Dear Customer\n Greetings from Millet Team!!\n You sre successfully verified your mailid\n Regards\n Team Millet`
        // };
        // await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//complete profile
exports.completeprofile = async (req, res) => {
    // try {
    //     console.log(req.body);
    //     const updateDoc = {
    //         $set: req.body, // Include all fields in the update document
    //     };
    //     const updatedUser = await User.updateOne({ _id: req.body._id }, updateDoc);
    //     if (updatedUser) {
    //         const userid=await User.findOne({_id:req.body._id})
    //         console.log(userid)
    //         console.log(1)
    //         Register.updateOne({_id:userid.regId},{$set:{remark:"verified"}}).then((updated)=>{
    //             if(updated){
    //                 const token = jwt.sign({_id: userid._id, usertype: "user",status:"verified" }, "millet");
    //                 res.cookie("token", token, { expire: new Date() }, +9999)
    //                 res.json({ message: "Profile completed successfully", token:token  }); // Send a success response
    //             }
    //             else{
    //                 res.status(500).json({msg:"internal error"})
    //             }
    //         })

    //         console.log("Profile completed successfully!",updatedUser);
           
    //     } else {
    //         console.log("Profile with the provided _id not found");
    //         res.status(404).json({ message: "Profile not found" }); // Send a 404 error if not found
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: "Internal server error" }); // Send a 500 error for unexpected issues
    // }
    try{
    let data = User(req.body)
                //console.log(createDoc)
            await data.save(req.body.userId).then((profile)=>{
                if(profile){
                    Register.updateOne({_id:profile.userId},{$set:{remark:"completed"}}).then((updated)=>{
                        if(updated){
                            const token = jwt.sign({_id: profile.userId, usertype: "user",status:"completed" }, "millet");
                            res.cookie("token", token, { expire: new Date() }, +9999)
                            res.json({ message: "Profile completed successfully", token:token  }); // Send a success response
                        }
                        else{
                            res.status(500).json({msg:"internal error"})
                        }
                    })
                }     
        else {
            console.log("Profile with the provided _id not found");
            res.status(404).json({ message: "Profile not found" }); // Send a 404 error if not found
        }});
    }catch(error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" }); // Send a 500 error for unexpected issues
        }
};

exports.getUserStatus=(req,res)=>{
    Register.findOne({_id:req.body._id}).then((data)=>{
        if(data){
            return res.status(200).json(data)
        }
        else{
            return res.status(500).json({msg:"Internal error"})
        }
    })
}
