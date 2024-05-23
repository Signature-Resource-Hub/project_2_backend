var user=require('../Model/user');
var reg = require('../Model/register')

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
    
// Helper function to validate email format
function isValidEmail(email) {
    // Regular expression to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Example usage:
const email = "example@example.com";
// Update email
exports.updateEmail = (req, res) => {
    const { email } = req.body;
    // Validate email
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ 'msg': 'Invalid email' });
    }
    // Update email in the database
    const { _id } = req.body;
    user.updateOne({ _id }, { $set: { email } })
        .then(data => {
            if (data) {
                return res.status(200).json(data);
            } else {
                return res.status(400).json({ 'msg': 'Failed to update email' });
            }
        })
        .catch(err => {
            return res.status(500).json({ 'msg': 'Internal Server Error', 'error': err });
        });
};
    exports.updateprofile = async (req, res) => {
        try {
          console.log(req.body);
          const requiredFields = ['community', 'dreams', 'drinkalchol', 'height', 'hobbies', 'interests', 'location', 'settledownplan', 'smoke','weight', 'yourgoals', ];
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
function isValidEmail(email) {
    // Implement your email validation logic here
    // For example, you could use a regular expression or a library like validator.js
}
// Helper function to validate user_type
function isValidUserType(user_type) {
    return user_type === "user" || user_type === "admin"; // Example validation
}