var mongoose = require("mongoose");
var regSchema = new mongoose.Schema({
    contactnumber: {
        type: Number,
        required: true,
        maxlength: 10,
        },
        timestamp:{
            type:String,
            default:Date.now()
        },
        user_type:{
        type:String,
        default:"user"
        },
        remark:{
            type:String,
            default:"not verified"
        }
})
module.exports = mongoose.model("register",regSchema);