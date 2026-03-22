const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/registrations", require("./routes/registrations"));
app.use("/api/games",         require("./routes/games"));
app.use("/api/sponsors",      require("./routes/sponsors"));

app.get("/", (req, res) => res.send("Server is running 🚀"));

// Connect DB then start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error("DB error:", err));