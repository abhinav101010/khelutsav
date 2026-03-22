const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  id:     { type: String, required: true, unique: true },
  name:   { type: String, required: true },
  roll:   { type: String, required: true },
  year:   { type: String },
  dept:   { type: String },
  phone:  { type: String },
  events: [{ type: String }],
  size:   { type: String, default: "M" },
  status: { type: String, enum: ["Confirmed", "Pending", "Cancelled"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Registration", registrationSchema);