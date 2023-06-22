const prompt=require("prompt-sync")();

const express = require("express");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://bhuvaneshklnbsc22:budhu2345@cluster0.d1tfzrq.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define the Shop schema
const shopSchema = new mongoose.Schema({
  name: String,
  rent: Number,
});
const Shop = mongoose.model("Shop", shopSchema);

// Create Express app
const app = express();
app.use(express.json());

// Create a shop
app.post("/shops", async (req, res) => {
  const { name, rent } = req.body;
  try {
    const shop = new Shop({ name, rent });
    await shop.save();
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ error: "Failed to create shop" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
