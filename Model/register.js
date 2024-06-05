var mongoose = require("mongoose");
var regSchema = new mongoose.Schema({
    contactnumber: {
        type: Number,
        required: true,
        unique : true,
        maxlength: 10,
        },
        name: {
            type: String,
            required: true,
            maxlength: 52,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        gender: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
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
            default:"not completed"
        }
})
module.exports = mongoose.model("register",regSchema);