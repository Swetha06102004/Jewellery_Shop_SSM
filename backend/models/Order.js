const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: String,
  customerName: String,
  mobile: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      weight: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);