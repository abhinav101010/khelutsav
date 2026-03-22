require("dotenv").config();
const mongoose = require("mongoose");
const Game = require("./models/Game");
const Sponsor = require("./models/Sponsor");

const GAMES = [
  { icon: "🏃", name: "100m Sprint",   date: "Apr 10, 9:00 AM",  venue: "Main Track",  slots: 32, tag: "Individual" },
  { icon: "⚽", name: "Football",      date: "Apr 10, 10:30 AM", venue: "Ground A",    slots: 8,  tag: "Team" },
  { icon: "🏀", name: "Basketball",    date: "Apr 10, 12:00 PM", venue: "Court 1",     slots: 8,  tag: "Team" },
  { icon: "🏏", name: "Cricket",       date: "Apr 10, 9:30 AM",  venue: "Ground B",    slots: 4,  tag: "Team" },
  { icon: "🏐", name: "Volleyball",    date: "Apr 10, 2:00 PM",  venue: "Court 2",     slots: 8,  tag: "Team" },
  { icon: "🥊", name: "Arm Wrestling", date: "Apr 10, 3:00 PM",  venue: "Hall C",      slots: 16, tag: "Individual" },
  { icon: "🦅", name: "Long Jump",     date: "Apr 10, 11:00 AM", venue: "Pit Area",    slots: 20, tag: "Individual" },
  { icon: "💪", name: "Tug of War",    date: "Apr 10, 4:00 PM",  venue: "Main Ground", slots: 6,  tag: "Team" },
  { icon: "🎾", name: "Table Tennis",  date: "Apr 10, 10:00 AM", venue: "Hall A",      slots: 24, tag: "Individual" },
  { icon: "🏊", name: "Swimming",      date: "Apr 10, 8:00 AM",  venue: "Pool",        slots: 16, tag: "Individual" },
  { icon: "🤼", name: "Kabaddi",       date: "Apr 10, 1:00 PM",  venue: "Ground C",    slots: 6,  tag: "Team" },
  { icon: "🎯", name: "Javelin Throw", date: "Apr 10, 3:30 PM",  venue: "Field Zone",  slots: 20, tag: "Individual" },
];

const SPONSORS = [
  { name: "RedBull",   color: "#e53935", emoji: "🔴", tier: "Gold",   status: "Active" },
  { name: "Nike",      color: "#111111", emoji: "✔️",  tier: "Gold",   status: "Active" },
  { name: "Adidas",    color: "#1976d2", emoji: "〽️", tier: "Silver", status: "Active" },
  { name: "Puma",      color: "#e53935", emoji: "🐆", tier: "Silver", status: "Active" },
  { name: "Decathlon", color: "#0288d1", emoji: "🏬", tier: "Bronze", status: "Active" },
  { name: "BoostUp",   color: "#f57c00", emoji: "⚡", tier: "Bronze", status: "Active" },
  { name: "FitLife",   color: "#388e3c", emoji: "🌿", tier: "Bronze", status: "Active" },
  { name: "SportZone", color: "#7b1fa2", emoji: "🎯", tier: "Bronze", status: "Active" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Game.deleteMany({});
    await Sponsor.deleteMany({});
    console.log("🗑️  Cleared existing games and sponsors");

    // Insert fresh data
    await Game.insertMany(GAMES);
    console.log(`🏅 Inserted ${GAMES.length} games`);

    await Sponsor.insertMany(SPONSORS);
    console.log(`💰 Inserted ${SPONSORS.length} sponsors`);

    console.log("✅ Seed complete!");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();