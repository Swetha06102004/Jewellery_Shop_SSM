const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,

  mobile: {
    type: String,
    unique: true
  },

  purchases: [
    {
      productId: String,
      productName: String,
      weight: Number,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  goldPlans: [
    {
      planName: String,
      monthlyAmount: Number,
      months: Number,
      startDate: Date
    }
  ],

  wishlist: [String],  // Array of product IDs

  cart: [String]       // Array of product IDs

});

module.exports = mongoose.model("User", userSchema);