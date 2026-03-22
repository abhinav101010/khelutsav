const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  tier:   { type: String, enum: ["Gold", "Silver", "Bronze"], default: "Bronze" },
  color:  { type: String, default: "#ff6b3d" },
  emoji:  { type: String, default: "🏢" },
  since:  { type: String, default: "2026" },
  amount: { type: String, default: "" },
  status: { type: String, enum: ["Active", "Pending", "Inactive"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Sponsor", sponsorSchema);