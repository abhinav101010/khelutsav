const Sponsor = require("../models/Sponsor");

exports.getAll = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: 1 });
    res.json(sponsors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const sponsor = await Sponsor.create(req.body);
    res.status(201).json(sponsor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sponsor) return res.status(404).json({ error: "Not found" });
    res.json(sponsor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};