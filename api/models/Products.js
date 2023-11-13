const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({

name:{type:String, require: true, unique: true},
desc:{type:String, require: true},
price:{type:Number, require: true},
image:{type:String, default:"" },
category: { type: String },
size: { type: String },
color: { type: String },

},
{timestamps: true}
)
module.exports = mongoose.model("products", ProductsSchema )

