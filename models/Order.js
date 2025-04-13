const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    useremail: { type: String, required: true },
    cake_name: { type: String, required: true },
    cake_url: { type: String, required: true },
    cake_price: { type: Number, required: true },
    cake_quan: { type: Number, required: true },
    address: { type: String, required: true },
    mobileNumber: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
