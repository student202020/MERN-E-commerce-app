const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    products: [
        {
          productId: { type: String },
          quantity: { type: Number, default: 1   },
        },
      ],
amount:{type:Number, require: true},
quantity:{type:Number, require: true}


},
{timestamps: true}
)
module.exports = mongoose.model("cart", CartSchema);