var user=require('../Model/user');
var reg = require('../Model/register')
var emailOtp = require('../Model/emailotp')

exports.getUser=(req,res)=>{
    console.log(req.body)
    reg.findOne({_id:req.body.userId}).then((data)=>{
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
exports.getprofile=(req,res)=>{
    console.log(req.body)
    user.findOne({userId:req.body.userId}).then((data)=>{
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
exports.updateContactNumber = async (req, res) => {
    const { contactnumber } = req.body;
    // Validate contact number
    if (!contactnumber || !isValidContactNumber(contactnumber)) {
      return res.status(400).json({ msg: 'Invalid contact number' });
    }
  
    // Check if the new contact number is already in use
    const existingUser = await reg.findOne({ contactnumber });
    if (existingUser) {
      return res.status(400).json({ msg: 'alreadyinuse' });
    }
    // Return a response to the client to enter the OTP
    return res.status(200).json({ message: "OTP sent to the new contact number. Please enter the OTP to verify." });
  };
  
  exports.verifyContactOtp = async (req, res) => {
    const { contactnumber, otp } = req.body;
    if (!contactnumber || !otp) {
      return res.status(400).json({ message: "Contact number and OTP are required" });
    }
  
    try {
        if (otp == '1234' && contactnumber == req.body.contactnumber) {
  
      // Update the contact number in the database
      const { _id } = req.body;
      await reg.updateOne({ _id }, { $set: { contactnumber } });
  
      return res.status(200).json({ message: "Contact number updated successfully" });
    } else{
        return res.status(400).json({ message: "Invalid OTP" });
    }
} catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
// Helper function to validate email format
function isValidEmail(email) {
    // Regular expression to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Example usage:
const email = "example@example.com";
// Update email
exports.updateEmail = async (req, res) => {
    const { email, _id } = req.body;
    // Validate email
    if (!email) {
      return res.status(400).json({ 'sg': 'please enter email' });
    }
  
    // Check if the new email is already in use
    const existingUser = await reg.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg : 'alreadyinuse' });
    }
  
    // Generate OTP and send it to the new email
    const otp = generateOTP();
    const otpRecord = new emailOtp({ email, otp });
    await otpRecord.save();
  
    // Send OTP to the new email
    // (Implement your email sending logic here)
  
    // Return a response to the client to enter the OTP
    return res.status(200).json({ message: "OTP sent to the new email. Please enter the OTP to verify." });
  
    // (Note: The below code will be executed when the client sends the OTP back)
  };
  
  exports.verifyEmailOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email ||!otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
  
    try {
      const record = await emailOtp.findOne({ email, otp });
      if (!record) {
        return res.status(400).json({ message: "Invalid OTP or email" });
      }
  
      // Update the email in the database
      await reg.updateOne({ _id: req.body._id }, { $set: { email } });
  
      // Delete the OTP record
      await emailOtp.findOneAndDelete({ email });
  
      return res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  exports.updateName = async (req, res) => {
    const { name } = req.body;
    // Validate name
    if (!name) {
      return res.status(400).json({ 'msg': 'Name is required' });
    }
  
    try {
      // Update the name in the database
      await reg.updateOne({ _id: req.body._id }, { $set: { name } });
  
      return res.status(200).json({ message: "Name updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.updateDob = async (req, res) => {
    const { dob } = req.body;
    // Validate dob
    if (!dob) {
      return res.status(400).json({ 'msg': 'Date of birth is required' });
    }
  
    try {
      // Update the date of birth in the database
      await reg.updateOne({ _id: req.body._id }, { $set: { dob } });
  
      return res.status(200).json({ message: "Date of birth updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
    exports.updateprofile = async (req, res) => {
        try {
          console.log(req.body);
          const requiredFields = ['community', 'dreams', 'drinkalchol', 'height', 'hobbies', 'interests', 'location', 'educationqualification', 'smoke','weight', 'Designation', ];
          const emptyFields = requiredFields.filter(field => !req.body[field]);

        if (emptyFields.length > 0) {
            console.log("1");
            return res.status(400).json({ message: "Please insert all required fields", emptyFields });
        }
          const updateDoc = {
            $set: req.body, // Include all fields in the update document
          };
      
          const updatedUser = await user.updateOne({ userId: req.body._id }, updateDoc);
          if (updatedUser) {
            console.log("2");
            console.log("Profile updated successfully!");
            res.json({ message: "Profile updated successfully", data: updatedUser }); // Send a success response
          } else {
            console.log("Profile with the provided _id not found");
            res.status(404).json({ message: "Profile not found" }); // Send a 404 error if not found
          }
        } 
        catch (error) {
          console.error(error);
          console.log("3");
          res.status(500).json({ message: "Internal server error" }); // Send a 500 error for unexpected issues
        }
      };
// Update user_type
exports.updateUserType = (req, res) => {
    const { user_type } = req.body;

    // Validate user_type
    if (!user_type || !isValidUserType(user_type)) {
          console.log("4");
        return res.status(400).json({ 'msg': 'Invalid user_type' });
    }
    // Update user_type in the database
    Pro.findByIdAndUpdate(req.user.id, { user_type }, { new: true }, (err, user) => {
        if (err) {
          console.log("5");
            return res.status(400).json({ 'msg': err.message });
        }
        res.status(200).json(user);
    });
};
// Helper function to validate email format
// Helper function to validate user_type
function isValidUserType(user_type) {
    return user_type === "user" || user_type === "admin"; // Example validation
}
function isValidContactNumber(contactnumber) {
    // Define the pattern for a valid contact number
    const pattern = /^\d{10}$/; // assumes a 10-digit contact number
  
    // Check if the contact number matches the pattern
    return pattern.test(contactnumber);
  }