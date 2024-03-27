const Register = require('../Model/register');
const User = require('../Model/user')
var jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const { objectId } = require("mongodb")

exports.verifyUser = (req, res) => {
    console.log(req.body);
    // Assuming you have a request body with the OTP and other necessary data
    const contactnumber = req.body.contactnumber;
    if (!contactnumber) {
        return res.status(400).json({ msg: 'Please provide contact number' });
    } else if(contactnumber.length!=10){
        return res.status(400).json({ msg: 'Please provide valid contact number' });
    }
    else {
        Register.findOne({ contactnumber: req.body.contactnumber, remark: "verified" }).then((compregister) => {
            if (compregister) {
                console.log("comreg")
                return res.status(400).json({ msg: 'olduserotp', compregister });
            }
            else {
                Register.findOne({ contactnumber: req.body.contactnumber }).then((notregister) => {
                    if (notregister) {
                        console.log("notreg")
                        return res.status(400).json({ msg: 'newuserotp', notregister });
                    } else {
                        const newUser = new Register(req.body);
                        newUser.save()
                            .then((register) => {
                                if (register) {
                                    console.log("otpsend")
                                    return res.status(201).json({ msg: 'otpsend' });
                                }
                            })
                    }

                })
        }})
    }
};

exports.verifyotp = async (req, res) => {
    console.log(req.body)
    const newUser = new Register(req.body);
    const olduser = await Register.findOne({ contactnumber: req.body.contactnumber })
    const contactnumber = req.body.contactnumber;
    let otp = req.body.otp
    // Assuming your verification process succeeds here
    if (otp == '1234' && contactnumber == req.body.contactnumber) {
        if (olduser.remark == "verified") {
            console.log("hii")
            const token = jwt.sign({ _id: olduser._id, usertype: olduser.user_type }, "millet");
            res.cookie("token", token, { expire: new Date() }, +9999)
            return res.status(201).json({ token: token, msg: 'Homepage' });
        } else {
            // If verification is successful, proceed to save the user
            console.log("not verified")

            var count = 0
            Register.updateOne({ contactnumber: req.body.contactnumber }, { $set: { remark: "verified" } })
                .then((register) => {
                    console.log(register)
                    if (register) {
                        const token = jwt.sign({ _id: register._id, usertype: register.user_type }, "millet");
                        res.cookie("token", token, { expire: new Date() }, +9999)
                        return res.status(201).json({ token: token, msg: 'verified OTP' });
                    } else {
                        console.log("in 1")
                        return res.status(400).json({ msg: 'Failed to save user' });
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log("in 2")
                    return res.status(500).json({ msg: 'Internal Server Error', error: err });
                });
        }
    } else {
        console.log("in else")
        return res.status(400).json({ msg: 'Invalid OTP' });
        count = count + 1;
    }
};

exports.registerUser = (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body);
    User.findOne({ regId: req.body.regId }).then((user) => {
        if (user) {
            console.log("first")
            return res.status(400).json({ 'msg': 'account created' });
        } else {
            User.findOne({ email: req.body.email }).then((user) => {
                if (user) {
                    console.log("first")
                    return res.status(400).json({ 'msg': 'email exist' });
                } else {
                    newUser.save()
                        .then((user) => {
                            if (user) {
                                console.log("send")
                                const token = jwt.sign({ _id: newUser._id, usertype: newUser.user_type }, "millet");
                                res.cookie("token", token, { expire: new Date() }, +9999)
                                return res.status(201).json({ token: token, msg: ' register successdfully' });
                            }
                        })
                }
            })
        }
    })
};

exports.completeprofile = async (req, res) => {
    try {
        console.log(req.body);
        const updateDoc = {
            $set: req.body, // Include all fields in the update document
        };
        const updatedUser = await User.updateOne({ _id: req.body._id }, updateDoc);
        if (updatedUser) {
            console.log("Profile completed successfully!",updatedUser);
            res.json({ message: "Profile completed successfully", data: updatedUser }); // Send a success response
        } else {
            console.log("Profile with the provided _id not found");
            res.status(404).json({ message: "Profile not found" }); // Send a 404 error if not found
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" }); // Send a 500 error for unexpected issues
    }
};
