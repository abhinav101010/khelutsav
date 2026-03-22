const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  icon:       { type: String, default: "🏅" },
  name:       { type: String, required: true },
  date:       { type: String },
  venue:      { type: String },
  slots:      { type: Number, default: 16 },
  tag:        { type: String, enum: ["Individual", "Team"], default: "Individual" },
  color:      { type: String, default: "#ff6b3d" },
  status:     { type: String, enum: ["Open", "In Progress", "Completed", "Cancelled"], default: "Open" },
  winner:     { type: String, default: "" },
  registered: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Game", gameSchema);