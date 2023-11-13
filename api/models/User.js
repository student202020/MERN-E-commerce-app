const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

username:{type:String, require: true, unique: true},
name:{type:String, require: true},
password:{type:String, require: true},
image:{type:String, default:"" },
isAdmin:{type:Boolean, default: false}

},
{timestamps: true}
)
module.exports = mongoose.model("user", UserSchema )
