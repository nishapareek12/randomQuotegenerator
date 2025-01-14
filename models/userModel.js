const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
   username: {
    type : String,
    required : [true, "username is required"]
   },
   password: {
    type : String,
    required : [true, "password is required"]
   },
    email: {
    type : String,
    required : [true, "email is required"]
   }
}, {
    timestamps: true
})

module.exports = new mongoose.model("user", userSchema)